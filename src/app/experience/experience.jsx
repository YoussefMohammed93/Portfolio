"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDownIcon, Compass, MapPin } from "lucide-react";

export const Experience = () => {
  const [activeItem, setActiveItem] = useState("item-1");

  const handleToggle = (item) => {
    setActiveItem(activeItem === item ? null : item);
  };

  return (
    <div className="main-padding py-12 bg-[#1a191d]" id="experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl sm:text-5xl lg:text-7xl font-black text-center tracking-wide text-white pb-8 sm:pb-12"
          data-aos="fade-down"
        >
          My Experience
        </h2>
        <div className="w-full flex items-center justify-center">
          <Accordion
            type="single"
            collapsible
            value={activeItem}
            onValueChange={(value) => handleToggle(value)}
            defaultValue="item-1"
            className="w-full max-w-lg sm:max-w-xl lg:max-w-4xl"
          >
            <div data-aos="flip-left">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <p className="text-start text-base sm:text-lg">
                    Freelance Front-End Developer | Khamsat
                  </p>
                  <div className="flex items-center space-x-5">
                    <span className="text-sm sm:text-base">2023</span>
                    <ChevronDownIcon
                      className={`size-6 shrink-0 text-white transition-transform duration-200 ${
                        activeItem === "item-1" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="w-full flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center space-x-0 sm:space-x-5 space-y-4 sm:space-y-0">
                      <div className="flex items-center">
                        <MapPin className="size-6 text-[#b7f] mr-2" />
                        <p className="text-sm sm:text-lg text-white/70 mt-0.5 font-mono">
                          Remote
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Compass className="size-6 text-[#b7f] mr-2" />
                        <p className="text-sm sm:text-lg text-white/70 mt-0.5 font-mono">
                          khamsat.com
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between mt-5 ml-1 space-y-4 sm:space-y-0">
                      <p className="text-white max-w-full sm:max-w-[85%] text-sm sm:text-base">
                        As a front-end developer, I worked with clients from
                        various industries, delivering responsive, user-friendly
                        websites. My key responsibilities included: Designing
                        layouts using HTML, CSS, and JavaScript. Ensuring mobile
                        responsiveness and cross-browser compatibility.
                        Developing interactive features with modern frameworks.
                        Collaborating with clients for tailored solutions.
                        Optimizing for performance, accessibility, and SEO.
                        Providing ongoing support and maintenance for updates.
                      </p>
                      <div className="flex-shrink-0">
                        <Image
                          src="/khamsat.svg"
                          alt="khamsat"
                          width={80}
                          height={80}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-5">
                      <div className="px-5 py-1.5 rounded-full bg-[#2c3599]">
                        <p className="text-white/85 text-sm sm:text-base">
                          HTML
                        </p>
                      </div>
                      <div className="px-5 py-1.5 rounded-full bg-[#2c3599]">
                        <p className="text-white/85 text-sm sm:text-base">
                          CSS
                        </p>
                      </div>
                      <div className="px-5 py-1.5 rounded-full bg-[#2c3599]">
                        <p className="text-white/85 text-sm sm:text-base">
                          JavaScript
                        </p>
                      </div>
                      <div className="px-5 py-1.5 rounded-full bg-[#2c3599]">
                        <p className="text-white/85 text-sm sm:text-base">
                          Bootstrap
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
            <div data-aos="flip-right">
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <p className="text-start text-base sm:text-lg">
                    Freelance Front-End Developer | Fiverr
                  </p>
                  <div className="flex items-center space-x-5">
                    <span className="text-sm sm:text-base">2024</span>
                    <ChevronDownIcon
                      className={`size-6 shrink-0 text-white transition-transform duration-200 ${
                        activeItem === "item-2" ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="w-full flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center space-x-0 sm:space-x-5 space-y-4 sm:space-y-0">
                      <div className="flex items-center">
                        <MapPin className="size-6 text-[#b7f] mr-2" />
                        <p className="text-sm sm:text-lg text-white/70 mt-0.5 font-mono">
                          Remote
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Compass className="size-6 text-[#b7f] mr-2" />
                        <p className="text-sm sm:text-lg text-white/70 mt-0.5 font-mono">
                          fiverr.com
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between mt-5 ml-1 space-y-4 sm:space-y-0">
                      <p className="text-white max-w-full sm:max-w-[85%] text-sm sm:text-base">
                        As a front-end developer on Fiverr, I partnered with
                        clients across various industries to create responsive
                        and user-centric websites. My primary responsibilities
                        included: Crafting website layouts with HTML, CSS, and
                        JavaScript. Ensuring seamless mobile responsiveness and
                        cross-browser functionality. Building dynamic,
                        interactive elements using modern frameworks.
                        Collaborating closely with clients to customize
                        solutions to their needs. Enhancing website performance,
                        accessibility, and SEO optimization. Offering continuous
                        support and maintenance for updates and improvements.
                      </p>
                      <div className="flex-shrink-0">
                        <Image
                          src="/fiverr.svg"
                          alt="fiverr"
                          width={80}
                          height={80}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-5">
                      <div className="px-5 py-1.5 rounded-full bg-[#2c3599]">
                        <p className="text-white/85 text-sm sm:text-base">
                          JavaScript
                        </p>
                      </div>
                      <div className="px-5 py-1.5 rounded-full bg-[#2c3599]">
                        <p className="text-white/85 text-sm sm:text-base">
                          Tailwind CSS
                        </p>
                      </div>
                      <div className="px-5 py-1.5 rounded-full bg-[#2c3599]">
                        <p className="text-white/85 text-sm sm:text-base">
                          Typescript
                        </p>
                      </div>
                      <div className="px-5 py-1.5 rounded-full bg-[#2c3599]">
                        <p className="text-white/85 text-sm sm:text-base">
                          React.Js
                        </p>
                      </div>
                      <div className="px-5 py-1.5 rounded-full bg-[#2c3599]">
                        <p className="text-white/85 text-sm sm:text-base">
                          Next.Js
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
