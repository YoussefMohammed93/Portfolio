"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Navbar } from "@/components/navbar";

export const Home = () => {
  useEffect(() => {
    const ball = document.querySelector(".ball");
    let direction = 1;
    let position = 0;

    const moveBall = () => {
      position += direction * 0.3;
      if (position > 20 || position < -20) direction *= -1;
      ball.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(moveBall);
    };

    moveBall();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-custom bg-center bg-cover">
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center z-10 text-center gap-y-7 px-4 md:px-0">
        <h1 className="uppercase text-3xl sm:text-5xl md:text-7xl font-black text-white text-center">
          Youssef Mohammed
        </h1>
        <p className="uppercase text-md md:text-2xl font-medium md:font-semibold tracking-widest text-white">
          Computer Science Student, Front End Developer
        </p>
      </div>
      <div
        className="relative w-[50px] h-[50px] flex justify-center"
        data-aos="zoom-out"
      >
        <div className="absolute bottom-56 md:bottom-[16rem] left-24 lg:left-[124px] ball w-[50px] h-[50px] bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full shadow-[0_0_20px_12px_rgba(255,165,0,0.6)] transition-transform duration-300 ease-in-out"></div>
      </div>
      <div
        className="flex justify-center absolute bottom-0 h-40"
        data-aos="fade-up"
      >
        <div className="w-[60px] h-[72px]">
          <svg className="arrows h-[72px]">
            <path className="a1" d="M0 0 L30 32 L60 0"></path>
            <path className="a2" d="M0 20 L30 52 L60 20"></path>
            <path className="a3" d="M0 40 L30 72 L60 40"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
