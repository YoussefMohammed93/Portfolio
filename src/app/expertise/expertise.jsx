"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useEffect } from "react";

export const Expertise = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  return (
    <div className="w-full main-padding bg-[#1a191d] py-12" id="expertise">
      <div className="text-center max-w-7xl mx-auto">
        <h2
          className="text-5xl sm:text-7xl font-black tracking-wide text-white pb-12"
          data-aos="fade-down"
        >
          My Expertise
        </h2>
        <div className="w-full grid grid-cols-1 custom-md:grid-cols-3 border-2 border-[#a3a3a3]">
          <div
            className="col-span-1 border-b-2 custom-md:border-b-0 custom-md:border-r-2 border-[#a3a3a3]"
            data-aos="fade-down"
          >
            <div className="flex items-center space-x-5 p-8">
              <Image
                src="./monitor.svg"
                alt="monitor-icon"
                width={60}
                height={60}
              />
              <p className="text-2xl text-start text-white font-semibold">
                <span className="relative">
                  <span className="relative z-20">Responsive</span>
                  <span className="absolute left-0 bottom-0 z-10 w-[105%] h-[10px] bg-[#DF058D]"></span>
                </span>
                <br /> Design
              </p>
            </div>
            <div>
              <div className="relative">
                <div className="relative pb-5 mb-9">
                  <span className="absolute -top-2 left-7 text-gray-500">
                    &lt;h3&gt;
                  </span>
                  <div className="text-start text-white font-mono font-normal leading-7 relative pt-5 pl-16 pr-7">
                    Ensuring that websites and web applications are fully
                    responsive and work seamlessly across different devices,
                    including desktops, tablets, and smartphones.
                  </div>
                  <span className="absolute -bottom-7 left-7 text-gray-500 pb-5">
                    &lt;/h3&gt;
                  </span>
                </div>
                <div className="absolute opacity-30 w-0 h-3/4 bg-white border border-white bottom-[12.5%] left-[45px]" />
              </div>
            </div>
          </div>
          <div
            className="col-span-1 border-b-2 custom-md:border-b-0 custom-md:border-r-2 border-[#a3a3a3]"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            <div className="flex items-center space-x-5 p-8">
              <Image
                src="./ui.svg"
                alt="user-interface"
                width={60}
                height={60}
              />
              <p className="text-2xl text-start text-white font-semibold">
                <span className="relative">
                  <span className="relative z-20">User Interface</span>
                  <span className="absolute left-0 bottom-0 z-10 w-[105%] h-[10px] bg-[#2C49D8]"></span>
                </span>
                <br /> Development
              </p>
            </div>
            <div>
              <div className="relative">
                <div className="relative pb-5 mb-9">
                  <span className="absolute -top-2 left-7 text-gray-500">
                    &lt;h3&gt;
                  </span>
                  <div className="text-start text-white font-mono font-normal leading-7 relative pt-5 pl-16 pr-7">
                    Creating intuitive, visually appealing, and user-friendly
                    interfaces that improve user experience, using technologies
                    like HTML, CSS, and JavaScript frameworks like react and
                    next js.
                  </div>
                  <span className="absolute -bottom-7 left-7 text-gray-500 pb-5">
                    &lt;/h3&gt;
                  </span>
                </div>
                <div className="absolute opacity-30 w-0 h-3/4 bg-white border border-white bottom-[12.5%] left-[45px]" />
              </div>
            </div>
          </div>
          <div className="col-span-1" data-aos="fade-down" data-aos-delay="200">
            <div className="flex items-center space-x-5 p-8">
              <Image
                src="./react.svg"
                alt="monitor-icon"
                width={60}
                height={60}
              />
              <p className="text-2xl text-start text-white font-semibold">
                <span className="relative">
                  <span className="relative z-20">Frontend Dev</span>
                  <span className="absolute left-0 bottom-0 z-10 w-[105%] h-[10px] bg-[#FF6B2B]"></span>
                </span>
                <br /> React, NextJS
              </p>
            </div>
            <div>
              <div className="relative">
                <div className="relative pb-5 mb-9">
                  <span className="absolute -top-2 left-7 text-gray-500">
                    &lt;h3&gt;
                  </span>
                  <div className="text-start text-white font-mono font-normal leading-7 relative pt-5 pl-16 pr-7">
                    Optimizing React and Next.js applications for better loading
                    times and performance by utilizing features like code
                    splitting, lazy loading, and efficient server-side rendering
                    (SSR).
                  </div>
                  <span className="absolute -bottom-7 left-7 text-gray-500 pb-5">
                    &lt;/h3&gt;
                  </span>
                </div>
                <div className="absolute opacity-30 w-0 h-3/4 bg-white border border-white bottom-[12.5%] left-[45px]" />
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex items-center justify-center pt-12"
          data-aos="zoom-in"
        >
          <Image
            src="/code.webp"
            className="h-[280px] sm:h-auto opacity-35"
            alt="code"
            width={500}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};
