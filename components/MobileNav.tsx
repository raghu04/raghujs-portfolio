"use client";

import React from "react";
import { CiMenuFries } from "react-icons/ci";

// components
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "home",
    path: "/",
  },
  // {
  //   name: "services",
  //   path: "/services",
  // },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "work",
    path: "/work",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger aria-label="Open menu" className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/* logo */}
        {/* logo */}
        <div className="mt-28 mb-28 text-2xl text-center">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Raghu<span className="text-accent">_</span>
            </h1>
          </Link>
        </div>

        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map(({ name, path }, index) => (
            <Link
              href={path}
              key={index}
              className={`text-xl capitalize hover:text-accent transition-all ${
                pathname === path && "text-accent border-b-2 border-accent"
              }`}
            >
              <SheetTrigger>{name}</SheetTrigger>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
