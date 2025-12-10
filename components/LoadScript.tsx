import { useEffect } from "react";

type LoadScriptProps = {
  apiKey: string;
  onLoad: () => void; // Callback function when the script is loaded
};

const SCRIPT_ID = "google-maps";

const LoadScript: React.FC<LoadScriptProps> = ({ apiKey, onLoad }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const expectedSrc = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    // If a script exists but with a different key/src, remove it and load a fresh one
    if (existingScript && existingScript.src !== expectedSrc) {
      existingScript.remove();
    }

    const currentScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!currentScript) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = expectedSrc;
      script.async = true;
      script.defer = true;

      const handleLoad = () => {
        script.setAttribute("data-loaded", "true");
        try {
          onLoad();
        } catch (err) {
          // swallow user callback errors to avoid breaking other effects
          // but log for debugging
          // eslint-disable-next-line no-console
          console.error("LoadScript onLoad callback error:", err);
        }
      };

      const handleError = (ev: Event | string) => {
        // eslint-disable-next-line no-console
        console.error("Failed to load Google Maps script:", ev);
      };

      script.addEventListener("load", handleLoad, { once: true });
      script.addEventListener("error", handleError, { once: true });

      document.head.appendChild(script);

      // cleanup: remove listeners if component unmounts before load
      return () => {
        script.removeEventListener("load", handleLoad as EventListener);
        script.removeEventListener("error", handleError as EventListener);
      };
    } else {
      const el = currentScript as HTMLScriptElement;

      // If already loaded, call onLoad immediately
      if (el.getAttribute("data-loaded") === "true" || (window as any).google) {
        onLoad();
        return;
      }

      // Otherwise attach a one-time listener for when it finishes loading
      const handleExistingLoad = () => {
        el.setAttribute("data-loaded", "true");
        onLoad();
      };

      el.addEventListener("load", handleExistingLoad, { once: true });

      return () => {
        el.removeEventListener("load", handleExistingLoad as EventListener);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, onLoad]);

  return null;
};

export default LoadScript;
