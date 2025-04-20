import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { MyWork } from "@/components/sections/my-work";
import { AboutMe } from "@/components/sections/about-me";

export default function MainPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutMe />
        <MyWork />
      </main>
    </>
  );
}
