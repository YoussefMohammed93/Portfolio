"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function MainPage() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="flex items-center gap-5">
        <Button
          onClick={() => {
            alert("Hello!");
          }}
        >
          Click Me
        </Button>
        <ModeToggle />
      </div>
    </main>
  );
}
