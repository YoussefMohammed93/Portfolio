"use client";

import {
  ExternalLink,
  Calendar,
  Smartphone,
  FileX,
  Github as GithubIcon,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { useState, memo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { Project, ProjectCategory, ProjectDoc } from "@/types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProjectWithId = (Project | ProjectDoc) & {
  _id?: Id<"projects">;
  id?: string;
};

import { ConvexImage } from "@/components/ui/convex-image";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectCard = memo(({ project }: { project: ProjectWithId }) => {
  const formattedDate = new Date(project.datePublished).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const isFeatured = "featured" in project ? project.featured : false;

  return (
    <Card
      className="overflow-hidden h-full flex flex-col pt-0"
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      <div className="relative h-48 w-full overflow-hidden">
        {project.image.includes("/") ? (
          <Image
            src={project.image}
            alt={`${project.title} - Project by Youssef Mohammed`}
            fill
            className="object-cover transition-transform hover:scale-105 duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={90}
            priority={isFeatured}
            itemProp="image"
          />
        ) : (
          <ConvexImage
            storageId={project.image}
            alt={`${project.title} - Project by Youssef Mohammed`}
            fill
            className="object-cover transition-transform hover:scale-105 duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={isFeatured}
            itemProp="image"
          />
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl line-clamp-1" itemProp="name">
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
              <GithubIcon className="h-4 w-4 mr-1" />
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
              <ExternalLink className="h-4 w-4 mr-1" />
              Live Demo
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
});

ProjectCard.displayName = "ProjectCard";

const ProjectSkeleton = memo(() => {
  return (
    <Card className="overflow-hidden h-full flex flex-col pt-0">
      <div className="relative h-48 w-full overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-4 w-1/4" />
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <div className="flex flex-wrap gap-2 mt-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
});

ProjectSkeleton.displayName = "ProjectSkeleton";

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

  const allProjects = useQuery(api.projects.getProjects);

  const categoryProjects = useQuery(
    api.projects.getProjectsByCategory,
    activeCategory !== "all" ? { category: activeCategory } : "skip"
  );

  const projects = activeCategory === "all" ? allProjects : categoryProjects;

  const filteredProjects = projects || [];

  const showMobileEmptyState =
    activeCategory === "mobile" && filteredProjects.length === 0;

  const isLoading = projects === undefined;

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
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ProjectSkeleton key={i} />
                ))}
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project: ProjectWithId) => {
                  const key = project._id || project.id;
                  return <ProjectCard key={key} project={project} />;
                })}
              </div>
            ) : showMobileEmptyState ? (
              <EmptyMobileAppsState />
            ) : (
              <div className="text-center max-w-lg mx-auto py-12">
                <FileX className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  No projects found in this category yet. Check back later for
                  new additions to my portfolio!
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
