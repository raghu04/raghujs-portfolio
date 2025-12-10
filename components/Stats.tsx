"use client";

import React from "react";
import CountUp from "react-countup";

const stats = [
  { num: 6, name: "Year of Experience" },
  { num: 13, name: "Projects Worked" },
  { num: 10, name: "Technologies & Tools" },
  { num: 1, name: "Certification Obtained" },
];

const Stats = () => {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 mx-auto max-w-[80vw] xl:max-w-none">
          {stats.map(({ num, name }, index) => (
            <div key={index} className="flex flex-1 gap-4 mx-auto justify-center items-center xl:justify-start">
              <CountUp end={num} duration={5} delay={2} className="text-4xl xl:text-6xl font-extrabold" />
              <p className="max-w-[100px] leading-snug text-white/80">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
