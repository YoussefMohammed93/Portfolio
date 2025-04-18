import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { AboutMe } from "@/components/sections/about-me";

export default function MainPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutMe />
      </main>
    </>
  );
}
