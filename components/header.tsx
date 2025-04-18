"use client";

import { Logo } from "./logo";
import { Navbar } from "./navbar";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full fixed top-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300">
      <div className="max-w-[1360px] mx-auto px-5 py-3 flex items-center justify-between">
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? "md:opacity-0 md:-translate-x-10 opacity-100"
              : "opacity-100"
          }`}
        >
          <Logo />
        </div>
        <div className="hidden md:block transition-all duration-300">
          <Navbar showMobile={false} />
        </div>
        <div className="flex items-center gap-3">
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <Navbar showMobile={true} />
          </div>
          <div
            className={`hidden md:flex items-center gap-3 transition-all duration-300 ${isScrolled ? "opacity-0 translate-x-10 invisible" : "opacity-100"}`}
          >
            <ModeToggle />
            <Button
              variant="outline"
              className="flex items-center gap-2 !px-4 lg:!px-8 !h-11 rounded-full"
            >
              Connect
              <ArrowUpRight className="stroke-1" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
