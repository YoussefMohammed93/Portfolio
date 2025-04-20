"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Code2,
  Search,
  Calendar,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { Outfit } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Project, ProjectCategory } from "@/types/types";
import { useState, memo, useMemo, useCallback } from "react";

const OutfitFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with product management, cart functionality, user authentication, and payment processing.",
    image: "/linkup.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    category: "fullstack",
    demoUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/youssefmohammed/ecommerce",
    featured: true,
    datePublished: "2023-09-15",
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, task assignment, and progress tracking.",
    image: "/linkup.png",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    category: "fullstack",
    demoUrl: "https://example.com/taskmanager",
    githubUrl: "https://github.com/youssefmohammed/taskmanager",
    datePublished: "2023-07-20",
  },
  {
    id: "3",
    title: "Social Media Dashboard",
    description:
      "A responsive dashboard for social media analytics with interactive charts and data visualization.",
    image: "/linkup.png",
    technologies: ["React", "Chart.js", "Tailwind CSS"],
    category: "web",
    demoUrl: "https://example.com/dashboard",
    githubUrl: "https://github.com/youssefmohammed/dashboard",
    featured: true,
    datePublished: "2023-11-05",
  },
  {
    id: "4",
    title: "Fitness Tracking Mobile App",
    description:
      "A mobile application for tracking workouts, nutrition, and fitness progress with personalized recommendations.",
    image: "/linkup.png",
    technologies: ["React Native", "Firebase", "Redux"],
    category: "web",
    demoUrl: "https://example.com/fitness",
    datePublished: "2023-08-12",
  },
  {
    id: "5",
    title: "Real Estate Listing Platform",
    description:
      "A platform for real estate listings with advanced search, filtering, and property management features.",
    image: "/linkup.png",
    technologies: ["Next.js", "MongoDB", "Tailwind CSS", "Mapbox"],
    category: "fullstack",
    demoUrl: "https://example.com/realestate",
    githubUrl: "https://github.com/youssefmohammed/realestate",
    datePublished: "2023-10-18",
  },
  {
    id: "6",
    title: "Portfolio Website Design",
    description:
      "A modern and responsive portfolio website design for creative professionals with smooth animations.",
    image: "/linkup.png",
    technologies: ["Figma", "Adobe XD", "Illustrator"],
    category: "web",
    demoUrl: "https://example.com/portfolio",
    datePublished: "2023-06-30",
  },
];

const categories: { label: string; value: ProjectCategory }[] = [
  { label: "All Projects", value: "all" },
  { label: "Front End", value: "web" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Mobile Apps", value: "mobile" },
];

const ProjectCard = memo(({ project }: { project: Project }) => {
  const altText = `${project.title} - ${project.description.substring(0, 50)}... | Project by Youssef Mohammed`;

  return (
    <Card className="overflow-hidden pt-0 border-opacity-50 h-full flex flex-col shadow-none">
      <div className="absolute top-2 right-2 z-10">
        {project.featured && (
          <div className="bg-primary/90 text-primary-foreground text-xs font-medium py-1 px-2 rounded-full">
            Featured
          </div>
        )}
      </div>
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={altText}
          className="object-cover w-full h-full absolute inset-0"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={project.featured}
          loading={project.featured ? "eager" : "lazy"}
          fill
          fetchPriority={project.featured ? "high" : "auto"}
          decoding="async"
        />
        {project.featured && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-medium py-1 px-2 rounded-full">
            Featured
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-xl" title={project.title}>
          {project.title}
        </CardTitle>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <Calendar className="size-3 mr-1" />
          <time dateTime={project.datePublished} itemProp="datePublished">
            {new Date(project.datePublished).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </time>
        </div>
        <CardDescription className="flex flex-wrap gap-1.5 mt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-secondary text-secondary-foreground inline-block rounded-full px-2 py-0.5 text-xs font-medium"
              itemProp="keywords"
            >
              {tech}
            </span>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <p
          className="text-muted-foreground line-clamp-2 text-sm"
          itemProp="description"
        >
          {project.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 pt-2 border-t">
        <div className="flex gap-2">
          {project.demoUrl && (
            <Button variant="outline" size="sm" asChild className="">
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.title}`}
                itemProp="url"
              >
                <ExternalLink className="size-4" />
                <span className="sr-only md:not-sr-only md:inline-block">
                  Demo
                </span>
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild className="">
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code of ${project.title} on GitHub`}
                itemProp="codeRepository"
              >
                <Code2 className="size-4" />
                <span className="sr-only md:not-sr-only md:inline-block">
                  Code
                </span>
              </Link>
            </Button>
          )}
        </div>
        <Button
          variant="default"
          size="sm"
          asChild
          className={`${OutfitFont.className}`}
        >
          <Link
            href={project.demoUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Learn more about ${project.title} project`}
            itemProp="mainEntityOfPage"
          >
            Details
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
});

ProjectCard.displayName = "ProjectCard";

const CategoryButton = memo(
  ({
    category,
    isSelected,
    onClick,
  }: {
    category: { label: string; value: ProjectCategory };
    isSelected: boolean;
    onClick: (value: ProjectCategory) => void;
  }) => {
    return (
      <Button
        key={category.value}
        variant={isSelected ? "default" : "outline"}
        size="sm"
        onClick={() => onClick(category.value)}
        className={`${OutfitFont.className} font-light sm:font-medium sm:px-2.5 px-1.5 ${isSelected ? "shadow-sm" : ""}`}
        aria-pressed={isSelected}
        aria-label={`Filter by ${category.label}`}
      >
        {category.label}
      </Button>
    );
  }
);

CategoryButton.displayName = "CategoryButton";

export const MyWork = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("all");

  const handleCategoryChange = useCallback((category: ProjectCategory) => {
    setSelectedCategory(category);
  }, []);

  const filteredProjects = useMemo(() => {
    return selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="work"
      className="w-full min-h-screen bg-secondary/5 py-10"
      aria-label="My Work"
      itemScope
      itemType="https://schema.org/CollectionPage"
      role="region"
      aria-describedby="work-section-description"
    >
      <span id="work-section-description" className="sr-only">
        Browse Youssef Mohammed&apos;s portfolio of web development, mobile app,
        and full-stack projects showcasing skills in React, Next.js, and more.
      </span>
      <div className="max-w-[1360px] mx-auto px-5">
        <div>
          <div
            itemProp="mainEntity"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            <meta
              itemProp="numberOfItems"
              content={projects.length.toString()}
            />
            <h2
              className="text-3xl sm:text-4xl md:text-5xl text-center font-bold mb-4"
              itemProp="name"
            >
              My <span className="text-primary">Work</span>
            </h2>
            <div className="flex justify-center text-center">
              <p
                className="text-muted-foreground max-w-5xl mb-8 text-base md:text-lg"
                itemProp="description"
              >
                Explore my portfolio of projects showcasing my skills in web
                development, mobile applications, and full-stack solutions. Each
                project demonstrates my commitment to creating intuitive,
                high-performance, and accessible digital experiences.
              </p>
            </div>
            <nav aria-label="Project categories" className="mb-8">
              <h3 className="sr-only">Filter projects by category</h3>
              <div className="flex justify-center">
                <div className="flex gap-1 sm:gap-3 mb-10 bg-secondary/20 rounded-xl max-w-fit">
                  {categories.map((category) => (
                    <CategoryButton
                      key={category.value}
                      category={category}
                      isSelected={selectedCategory === category.value}
                      onClick={handleCategoryChange}
                    />
                  ))}
                </div>
              </div>
            </nav>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              role="list"
              style={{ contentVisibility: "auto" }}
            >
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className=""
                  itemScope
                  itemType="https://schema.org/SoftwareApplication"
                  itemProp="itemListElement"
                  role="listitem"
                  data-project-id={project.id}
                >
                  <meta itemProp="name" content={project.title} />
                  <meta itemProp="description" content={project.description} />
                  <meta
                    itemProp="applicationCategory"
                    content={
                      project.category === "web"
                        ? "WebApplication"
                        : project.category === "mobile"
                          ? "MobileApplication"
                          : "MultiPlatform"
                    }
                  />
                  <meta itemProp="operatingSystem" content="Cross-platform" />
                  <meta itemProp="author" content="Youssef Mohammed" />
                  <meta
                    itemProp="datePublished"
                    content={project.datePublished}
                  />
                  <meta itemProp="position" content={(index + 1).toString()} />
                  {project.demoUrl && (
                    <meta itemProp="url" content={project.demoUrl} />
                  )}
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            {filteredProjects.length === 0 && (
              <div className="text-center py-12 px-4 rounded-lg mx-auto max-w-lg">
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-secondary p-4 rounded-full">
                    <Search
                      className="size-8 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-medium">No projects found</h3>
                  <p className="text-muted-foreground text-sm max-w-lg">
                    No projects found in this category yet. More exciting
                    projects coming soon! Try selecting another category to
                    explore existing work.
                  </p>
                </div>
              </div>
            )}
          </div>
          <div
            className="hidden"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <div
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content="1" />
              <Link itemProp="item" href="/">
                <span itemProp="name">Home</span>
              </Link>
            </div>
            <div
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content="2" />
              <Link itemProp="item" href="/#work">
                <span itemProp="name">My Work</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
