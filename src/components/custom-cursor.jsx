"use client";

import React, { useState, useEffect } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 z-50 opacity-50 w-7 h-7 bg-transparent border border-[#6ddbed] rounded-full hidden md:flex items-center justify-center pointer-events-none"
        style={{
          transform: `translate(${position.x - 14}px, ${position.y - 14}px)`,
        }}
      >
        <div className="w-2 h-2 bg-[#6ddbed] rounded-full"></div>
      </div>
    </>
  );
};

export default CustomCursor;
