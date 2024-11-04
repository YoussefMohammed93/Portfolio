"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Work = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
    });

    async function fetchProjects() {
      setLoading(true);
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          const formattedData = data.map((project) => ({
            ...project,
            id: project._id.toString(),
          }));
          setProjects(formattedData);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#1a191d]">
        <Loader2 className="size-10 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="main-padding py-12 bg-[#1a191d]" id="work">
      <div className="text-center" data-aos="fade-down">
        <h2 className="text-5xl lg:text-6xl xl:text-[90px] font-black tracking-wide leading-tight text-white pb-8">
          My Work
        </h2>
      </div>
      <div className="flex flex-col items-center mt-5">
        <Tabs defaultValue="front-end" className="w-full">
          <TabsList className="flex justify-center items-center mx-auto mb-8">
            <div data-aos="fade-right">
              <TabsTrigger value="front-end">Front End</TabsTrigger>
            </div>
            <div data-aos="fade-left">
              <TabsTrigger value="full-stack">Full Stack</TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="front-end" className="w-full flex justify-center">
            <div className="grid grid-cols-1 custom-md:grid-cols-3 gap-6 mt-5 w-full max-w-7xl">
              {projects
                .filter((project) => project.category === "Front End")
                .map((project) => (
                  <div
                    key={project.id}
                    className="col-span-1 rounded-lg bg-[#201f23] group overflow-hidden"
                    onMouseEnter={() => setHoveredIndex(project.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    data-aos="flip-down"
                  >
                    <Link href={`/projects/${project.id}`}>
                      <Image
                        src={
                          project.mainImage ||
                          (project.images && project.images[0]) ||
                          "/default-image.jpg"
                        }
                        alt={project.title || "Project Image"}
                        className={`h-[200px] sm:h-[250px] lg:h-[300px] object-cover object-center rounded-lg rounded-b-none transition-transform duration-300 ease-in-out ${
                          hoveredIndex === project.id
                            ? "scale-105"
                            : "scale-100"
                        }`}
                        width={1000}
                        height={300}
                      />
                      <div className="p-5">
                        <h2 className="name text-xl sm:text-2xl font-semibold text-white">
                          {project.title}
                        </h2>
                        <p
                          className={`category flex items-center gap-x-2 text-md sm:text-lg text-white/70 mt-3 transition-transform duration-500 ease-in-out ${
                            hoveredIndex === project.id
                              ? "translate-x-4"
                              : "translate-x-0"
                          }`}
                        >
                          {hoveredIndex === project.id ? <ArrowRight /> : ""}
                          {hoveredIndex === project.id
                            ? "Show Project"
                            : project.category}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent
            value="full-stack"
            className="w-full flex justify-center"
          >
            <div className="grid grid-cols-1 custom-md:grid-cols-2 gap-6 mt-5 w-full max-w-7xl">
              {projects
                .filter((project) => project.category === "Full Stack")
                .map((project) => (
                  <div
                    key={project.id}
                    className="col-span-1 rounded-lg bg-[#201f23] group overflow-hidden"
                    onMouseEnter={() => setHoveredIndex(project.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    data-aos="flip-down"
                  >
                    <Link href={`/projects/${project.id}`}>
                      <Image
                        src={
                          project.mainImage ||
                          (project.images && project.images[0]) ||
                          "/default-image.jpg"
                        }
                        alt={project.title || "Project Image"}
                        className={`h-[200px] sm:h-[250px] lg:h-[300px] object-cover object-center rounded-lg rounded-b-none transition-transform duration-300 ease-in-out ${
                          hoveredIndex === project.id
                            ? "scale-105"
                            : "scale-100"
                        }`}
                        width={1000}
                        height={300}
                      />
                      <div className="p-5">
                        <h2 className="name text-xl sm:text-2xl font-semibold text-white">
                          {project.title}
                        </h2>
                        <p
                          className={`category flex items-center gap-x-2 text-md sm:text-lg text-white/70 mt-3 transition-transform duration-500 ease-in-out ${
                            hoveredIndex === project.id
                              ? "translate-x-4"
                              : "translate-x-0"
                          }`}
                        >
                          {hoveredIndex === project.id ? <ArrowRight /> : ""}
                          {hoveredIndex === project.id
                            ? "Show Project"
                            : project.category}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
