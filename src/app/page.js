import { Home } from "./home/home";
import { Work } from "./work/work";
import { Contact } from "./contact/contact";
import { Expertise } from "./expertise/expertise";
import { Experience } from "./experience/experience";
import CustomCursor from "@/components/custom-cursor";
import ScrollToTopButton from "@/components/scoll-to-top-button";

export default function App() {
  return (
    <main>
      <Home />
      <Expertise />
      <Work />
      <Experience />
      <Contact />
      <CustomCursor />
      <ScrollToTopButton />
    </main>
  );
}
