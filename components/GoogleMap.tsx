import { useEffect, useRef } from "react";
import { darkModeStyle } from "./darkModeStyle";

type GoogleMapProps = {
  lat: number;
  lng: number;
  zoom: number;
};

// Wait for `window.google` to be available with a poll and timeout
const waitForGoogle = (timeout = 10000, interval = 100): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google) return resolve();

    const start = Date.now();
    const id = setInterval(() => {
      if (window.google) {
        clearInterval(id);
        return resolve();
      }

      if (Date.now() - start > timeout) {
        clearInterval(id);
        return reject(new Error("Timed out waiting for Google Maps API"));
      }
    }, interval);
  });
};

const GoogleMap: React.FC<GoogleMapProps> = ({ lat, lng, zoom }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerInstance = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await waitForGoogle();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Google Maps API not available:", err);
        return;
      }

      if (!mounted || !mapRef.current) return;

      const google = window.google;

      // Create map
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom,
        styles: darkModeStyle,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false,
        keyboardShortcuts: false,
      });

      // Add marker
      markerInstance.current = new google.maps.Marker({
        position: { lat, lng },
        map: mapInstance.current,
      });
    };

    init();

    return () => {
      mounted = false;

      // Cleanup marker
      try {
        if (markerInstance.current) {
          markerInstance.current.setMap(null);
          markerInstance.current = null;
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("Error cleaning up Google Maps marker:", err);
      }

      // Cleanup map reference
      mapInstance.current = null;
    };
  }, [lat, lng, zoom]);

  return <div ref={mapRef} className="w-full h-[500px]" />;
};

export default GoogleMap;
