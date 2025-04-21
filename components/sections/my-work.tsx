"use client";

import Link from "next/link";
import Image from "next/image";

import {
  ExternalLink,
  Calendar,
  Smartphone,
  FileX,
  Github,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Project, ProjectCategory } from "@/types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    image: "/linkup.png",
    description:
      "A comprehensive dashboard for managing e-commerce operations with analytics, inventory management, and order processing.",
    datePublished: "2023-05-15",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
    ],
    category: "fullstack",
    githubUrl: "https://github.com/yourusername/ecommerce-dashboard",
    demoUrl: "https://ecommerce-dashboard-demo.com",
    featured: true,
  },
  {
    id: "2",
    title: "Social Media App",
    image: "/linkup.png",
    description:
      "A feature-rich social media application with real-time messaging, post sharing, and user profiles.",
    datePublished: "2023-03-10",
    technologies: ["React", "Firebase", "Tailwind CSS", "JavaScript"],
    category: "web",
    githubUrl: "https://github.com/yourusername/social-media-app",
    demoUrl: "https://social-media-app-demo.com",
  },
  {
    id: "3",
    title: "Task Management System",
    image: "/linkup.png",
    description:
      "A comprehensive task management system with drag-and-drop functionality, task assignments, and progress tracking.",
    datePublished: "2023-01-20",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB"],
    category: "fullstack",
    githubUrl: "https://github.com/yourusername/task-management",
  },
  {
    id: "4",
    title: "Weather App",
    image: "/linkup.png",
    description:
      "A responsive weather application that provides real-time weather information for any location with a 5-day forecast.",
    datePublished: "2022-11-05",
    technologies: ["React", "JavaScript", "CSS", "Weather API"],
    category: "web",
    githubUrl: "https://github.com/yourusername/weather-app",
    demoUrl: "https://weather-app-demo.com",
  },
  // Mobile app projects removed to show empty state
  {
    id: "6",
    title: "Restaurant Ordering System",
    image: "/linkup.png",
    description:
      "A full-stack application for restaurant ordering with menu management, order processing, and payment integration.",
    datePublished: "2022-07-20",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    category: "fullstack",
    githubUrl: "https://github.com/yourusername/restaurant-ordering",
    demoUrl: "https://restaurant-ordering-demo.com",
  },
  // Another mobile app project removed to show empty state
  {
    id: "8",
    title: "Portfolio Website",
    image: "/linkup.png",
    description:
      "A responsive portfolio website showcasing projects, skills, and professional experience with a modern design.",
    datePublished: "2022-03-15",
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    category: "web",
    githubUrl: "https://github.com/yourusername/portfolio",
    demoUrl: "https://portfolio-demo.com",
    featured: true,
  },
];

const ProjectCard = memo(({ project }: { project: Project }) => {
  const formattedDate = new Date(project.datePublished).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Card
      className="overflow-hidden h-full flex flex-col pt-0"
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} - Project by Youssef Mohammed`}
          fill
          className="object-cover transition-transform hover:scale-105 duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
          priority={project.featured}
          itemProp="image"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl truncate" itemProp="name">
          {project.title}
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground gap-1">
          <Calendar className="h-4 w-4" />
          <time dateTime={project.datePublished} itemProp="datePublished">
            {formattedDate}
          </time>
        </div>
        <CardDescription className="text-sm" itemProp="category">
          {project.category === "web"
            ? "Front End"
            : project.category === "fullstack"
              ? "Full Stack"
              : project.category === "mobile"
                ? "Mobile App"
                : "Project"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p
          className="text-muted-foreground text-sm line-clamp-2"
          itemProp="description"
        >
          {project.description}
        </p>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full"
                itemProp="keywords"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        {project.githubUrl && (
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              itemProp="codeRepository"
            >
              <Github />
              GitHub
            </Link>
          </Button>
        )}
        {project.demoUrl && (
          <Button asChild size="sm" className="flex-1">
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              itemProp="url"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
});

ProjectCard.displayName = "ProjectCard";

const EmptyMobileAppsState = memo(() => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-secondary rounded-full p-8 mb-8">
        <Smartphone className="h-20 w-20 text-primary" />
      </div>
      <h3 className="text-2xl font-medium mb-3 line-clamp-1">
        No Mobile Apps Yet
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        I&apos;m currently focusing on web development projects, but mobile app
        projects will be coming soon!
      </p>
    </div>
  );
});

EmptyMobileAppsState.displayName = "EmptyMobileAppsState";

export const MyWork = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const showMobileEmptyState =
    activeCategory === "mobile" && filteredProjects.length === 0;

  return (
    <section id="work" className="py-20 w-full" aria-label="My Work">
      <div className="max-w-[1360px] mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Work</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Explore my portfolio of projects showcasing my skills in web and
            mobile development. Each project demonstrates my expertise in
            creating responsive, user-friendly, and performant applications.
          </p>
        </div>
        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={(value) => setActiveCategory(value as ProjectCategory)}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="web">Front End</TabsTrigger>
              <TabsTrigger value="fullstack">Full Stack</TabsTrigger>
              <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            {showMobileEmptyState ? (
              <EmptyMobileAppsState />
            ) : (
              filteredProjects.length === 0 && (
                <div className="text-center max-w-lg mx-auto py-12">
                  <FileX className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No projects found in this category yet. Check back later for
                    new additions to my portfolio!
                  </p>
                </div>
              )
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
