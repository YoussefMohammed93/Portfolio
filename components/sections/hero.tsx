"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "../ui/button";
import { Outfit } from "next/font/google";
import { memo, useEffect, useState } from "react";
import { ArrowRight, Download } from "lucide-react";

const OutfitFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HeroButtons = memo(() => {
  return (
    <div className={`flex items-center gap-5 pt-8 ${OutfitFont.className}`}>
      <Button
        asChild
        className="flex items-center gap-2 font-normal !px-5 sm:!px-8 !h-12 rounded-full"
      >
        <Link href="/#contact" aria-label="Connect with Youssef Mohammed">
          Connect with me
          <ArrowRight className="mt-0.5" aria-hidden="true" />
        </Link>
      </Button>
      <Button
        asChild
        variant="outline"
        className="flex items-center gap-2 font-normal !px-5 sm:!px-8 !h-12 rounded-full"
      >
        <Link
          href="/resume.pdf"
          download
          aria-label="Download Youssef Mohammed's resume"
        >
          My resume
          <Download className="mt-0.5" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
});

HeroButtons.displayName = "HeroButtons";

const ProfileImage = memo(() => {
  return (
    <Image
      priority
      width={150}
      height={150}
      quality={95}
      src="/me.jpg"
      loading="eager"
      itemProp="image"
      className="rounded-full object-cover"
      alt="Youssef Mohammed - Full Stack Web Developer"
      sizes="(max-width: 768px) 150px, 150px"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAABAAAAAQAAAAEAAAAB/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/8AACwgACgAKAQERAP/EAB0AAAICAwEBAQAAAAAAAAAAAAQFAwYCBwgBCQD/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEBREhAAYSBzFBExQiUWEj/9oACAEBAAA/ANU7t3nSNsUx+tVeZ6MZlJUQlJUpSj2SkDJJ+gNQlL6y7Vn1WJSjUFoqMtcdbM5nglah8VIWQFAHPYK7HxgHWc7qNtOm1IUufX4seQhIcaC3AFhJzgjyP3Ws9v7ip1dpcerUl0OxJjQcbUCQoHAIPcEEEEfRGgFQ6tbLhNvuKr0EIaQpa1GWyEpSkZJJVgADz4Gvg6s7Tc/7VWgj/wBm/wD1r//Z"
    />
  );
});

ProfileImage.displayName = "ProfileImage";

export const Hero = memo(() => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "100px" }
    );

    const heroSection = document.getElementById("hero");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  if (!isVisible) {
    return <section id="hero" className="w-full min-h-screen pt-28 sm:pt-36" />;
  }

  return (
    <section
      id="hero"
      itemScope
      aria-label="Introduction"
      itemType="https://schema.org/Person"
      className="w-full min-h-screen pt-28 sm:pt-36"
    >
      <div className="max-w-[1360px] mx-auto flex flex-col items-center justify-center px-5 will-change-transform">
        <ProfileImage />
        <div className="max-w-3xl text-center flex flex-col gap-5 pt-5 will-change-opacity">
          <p className="text-lg font-medium text-balance" itemProp="name">
            Hi, I&apos;m Youssef Mohammed
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-balance"
            itemProp="jobTitle"
          >
            Full Stack Web Developer
          </h1>
          <p
            className="text-muted-foreground text-pretty"
            itemProp="description"
          >
            I&apos;m a Full Stack Developer from{" "}
            <span itemProp="nationality">Egypt</span> with{" "}
            <strong className="text-primary">3 years</strong> of experience and
            a strong background in building web applications using modern
            technologies like React, Next.js, and Node.js with best practices
            for performance and accessibility.
          </p>
        </div>
        <HeroButtons />
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
