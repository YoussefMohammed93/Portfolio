"use client";

import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useState } from "react";
import { Button } from "./ui/button";
import { NavItem } from "@/types/types";
import { Menu, ArrowUpRight } from "lucide-react";

export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Me",
    href: "/#about",
  },
  {
    label: "Services",
    href: "/#services",
  },
  {
    label: "My Work",
    href: "/#work",
  },
  {
    label: "Testimonials",
    href: "/#testimonials",
  },
];

interface NavbarProps {
  showMobile?: boolean;
}

export const Navbar = ({ showMobile = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => {
    setIsOpen(false);
  };

  if (showMobile) {
    return (
      <div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="cursor-pointer p-1.5 rounded hover:bg-secondary dark:hover:bg-secondary/50 transition-colors duration-200">
              <Menu className="h-[1.25rem] w-[1.25rem]" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="pt-10">
            <SheetHeader className="hidden">
              <SheetTitle className="text-xl mb-4 sr-only">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeSheet}
                  className="text-lg py-2 px-4 hover:bg-secondary/20 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 px-4">
              <Button variant="outline" className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5">
                Connect
                <ArrowUpRight className="stroke-1" />
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <nav className="bg-background dark:bg-secondary/25 backdrop-blur-md border px-5 lg:px-10 py-2.5 rounded-full transition-all duration-300">
      <div className="flex items-center gap-4 lg:gap-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="relative transition-transform after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
