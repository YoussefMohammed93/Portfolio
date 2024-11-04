"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Navbar } from "@/components/navbar";
import BackButton from "@/components/back-button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      try {
        const response = await fetch(`/api/projects/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProject(data);
        } else {
          console.error("Failed to fetch project data");
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#1a191d]">
        <Loader2 className="size-10 text-white animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-3xl font-bold text-white bg-[#1a191d]">
        Project not found
      </div>
    );
  }

  return (
    <article className="w-full min-h-screen bg-[#1a191d]">
      <Navbar />
      <BackButton />
      <div className="main-padding pt-24 pb-12 bg-[#1a191d]">
        <div>
          <p className="text-lg font-medium text-white/70">
            • {project.category}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-black tracking-wide leading-tight text-white pb-8">
            {project.title}
          </h2>
          <div className="mt-5">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{project.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-20 mt-12">
            <div className="col-span-1">
              <p className="text-base md:text-lg text-white/80">
                <q>{project.description}</q>
              </p>
            </div>
            <div className="col-span-1">
              <div className="flex items-center gap-x-5">
                <div className="p-1 border-t border-white/30">
                  <div className="pt-2">
                    <b className="text-white">Client</b>
                    <p className="text-white/70 font-light">{project.client}</p>
                  </div>
                </div>
                <div className="p-1 border-t border-white/30">
                  <div className="pt-2">
                    <b className="text-white">Technologies</b>
                    <p className="text-white/70 font-light">
                      {project.technologies}
                    </p>
                  </div>
                </div>
              </div>
              {project.href && (
                <div className="pt-5">
                  <Link
                    href={project.href}
                    target="_blank"
                    className="flex items-center gap-x-2 text-white/70 group"
                  >
                    <p>Open project</p>
                    <ArrowRight className="group-hover:translate-x-3 transition-all duration-300" />
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 custom-md:grid-cols-3 gap-y-5 gap-x-5 w-full my-12">
            {project.images.map(
              (img, idx) =>
                img && (
                  <div key={idx} data-aos="flip-up">
                    <Dialog>
                      <DialogTrigger>
                        <div className="w-full col-span-1 cursor-pointer">
                          <Image
                            src={img}
                            alt={project.title}
                            width={800}
                            height={800}
                            className="w-full custom-md:h-[250px] bg-center bg-cover"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="fixed flex items-center justify-center p-5">
                        <div className="w-full max-w-sm sm:max-w-md md:max-w-full h-auto flex items-center justify-center">
                          <Image
                            src={img}
                            alt={project.title}
                            width={800}
                            height={800}
                            className="object-cover w-full h-auto"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )
            )}
          </div>
          <p className="text-white/80">
            © {new Date().getFullYear()}, Made with love by Youssef Mohammed,
            All rights reserved.
          </p>
        </div>
      </div>
    </article>
  );
}
