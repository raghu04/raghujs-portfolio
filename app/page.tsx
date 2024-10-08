import React from "react";
import { FiDownload } from "react-icons/fi";

// components
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import Button from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container h-full mx-auto">
        <div className="flex flex-col xl:flex-row justify-between items-center xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none mt-4 xl:mt-0">
            <span className="text-xl">SSE | React & RN Developer | CSM</span>
            <h1 className="h1 mb-6">
              Hello I&apos;m <br /> <span className="text-accent">Raghu S</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              I am a passionate frontend developer focused on creating
              innovative, user-centric web and mobile applications that deliver
              seamless digital experiences.
            </p>

            {/* btn socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Link href={"/assets/raghu140924.pdf"} target="_blank">
                <Button
                  size="lg"
                  variant="outline"
                  className="uppercase flex items-center gap-2"
                >
                  <span>Resume</span>
                  <FiDownload className="text-xl" />
                </Button>
              </Link>
              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex items-center justify-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* photo */}
          <div className="order-1 xl:order-none">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
