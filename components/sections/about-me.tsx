"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Code,
  GraduationCap,
  Briefcase,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Outfit } from "next/font/google";
import { Button } from "@/components/ui/button";
import { memo, useEffect, useState } from "react";
import { Technology, Education } from "@/types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OutfitFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ProfileImage = memo(() => {
  return (
    <div className="w-full max-w-[345px] mx-auto md:mx-0">
      <Image
        priority
        width={345}
        height={420}
        quality={95}
        src="/me-2.jpg"
        loading="eager"
        alt="Youssef Mohammed - Full Stack Web Developer from Egypt"
        className="rounded-xl object-cover h-[420px]"
        sizes="(max-width: 768px) 345px, 345px"
        itemProp="image"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAABAAAAAQAAAAEAAAAB/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/8AACwgACgAKAQERAP/EAB0AAAICAwEBAQAAAAAAAAAAAAQFAwYCBwgBCQD/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEBREhAAYSBzFBExQiUWEj/9oACAEBAAA/ANU7t3nSNsUx+tVeZ6MZlJUQlJUpSj2SkDJJ+gNQlL6y7Vn1WJSjUFoqMtcdbM5nglah8VIWQFAHPYK7HxgHWc7qNtOm1IUufX4seQhIcaC3AFhJzgjyP3Ws9v7ip1dpcerUl0OxJjQcbUCQoHAIPcEEEEfRGgFQ6tbLhNvuKr0EIaQpa1GWyEpSkZJJVgADz4Gvg6s7Tc/7VWgj/wBm/wD1r//Z"
      />
    </div>
  );
});

ProfileImage.displayName = "ProfileImage";

const TechnologyIcon = memo(
  ({ icon, name }: { icon: string; name: string }) => {
    return (
      <Image
        src={icon}
        alt={`${name} technology icon - Youssef Mohammed's tech stack`}
        width={48}
        height={48}
        className="object-contain"
        quality={95}
        loading="lazy"
        sizes="48px"
        title={`${name} - Technology used by Youssef Mohammed`}
      />
    );
  }
);

TechnologyIcon.displayName = "TechnologyIcon";

const technologies: Technology[] = [
  { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "Github", icon: "/icons/github.svg" },
  { name: "React.js", icon: "/icons/react.svg" },
  { name: "Next.js", icon: "/icons/nextjs.svg" },
  { name: "Node.js", icon: "/icons/nodejs.svg" },
  { name: "MongoDB", icon: "/icons/mongodb.svg" },
  { name: "ConvexDB", icon: "/icons/convexdb.svg" },
  { name: "Clerk Auth", icon: "/icons/clerk.svg" },
];

const education: Education[] = [
  {
    degree: "Bachelor of Computer Science",
    institution: "Mansoura University",
    year: "2023 - 2027",
    description:
      "Currently pursuing my degree with a focus on computer science fundamentals, algorithms, and software development. Maintaining excellent academic standing while actively learning and building projects.",
    meta: {
      itemType: "EducationalOccupationalCredential",
      educationalLevel: "Bachelor's Degree",
      field: "Computer Science",
    },
  },
  {
    degree: "Self-Taught Web Development",
    institution: "Online Learning Platforms",
    year: "2022 - Present",
    description:
      "Extensively learning web development through Udemy courses, YouTube tutorials, and hands-on projects. Mastered modern technologies like React, Next.js, and Node.js through practical application and continuous learning.",
    meta: {
      itemType: "EducationalOccupationalCredential",
      educationalLevel: "Professional Certificate",
      field: "Web Development",
    },
  },
];

const TechnologiesTab = memo(() => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {technologies.map((tech) => (
      <Card key={tech.name} className="p-0 overflow-hidden">
        <CardContent className="p-5 flex flex-col items-center text-center gap-4">
          <div className="size-20 flex items-center justify-center bg-secondary rounded-full">
            <TechnologyIcon icon={tech.icon} name={tech.name} />
          </div>
          <div>
            <h3 className="font-medium" itemProp="knowsAbout">
              {tech.name}
            </h3>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
));

TechnologiesTab.displayName = "TechnologiesTab";

const EducationTab = memo(() => (
  <div className="space-y-4">
    {education.map((edu, index) => (
      <Card key={index} className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-start">
            <div>
              <CardTitle itemProp="educationalCredentialAwarded">
                {edu.degree}
              </CardTitle>
              <CardDescription className="mt-1" itemProp="provider">
                {edu.institution}
              </CardDescription>
            </div>
            <span
              className="text-sm text-muted-foreground bg-secondary border sm:border-0 px-3 py-1 rounded-full"
              itemProp="temporalCoverage"
            >
              {edu.year}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p
            className="text-muted-foreground text-justify"
            itemProp="description"
            itemScope
            itemType={`https://schema.org/${edu.meta.itemType}`}
          >
            <meta
              itemProp="educationalLevel"
              content={edu.meta.educationalLevel}
            />
            <meta itemProp="competencyRequired" content={edu.meta.field} />
            {edu.description}
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
));

EducationTab.displayName = "EducationTab";

const ProjectsTab = memo(() => (
  <div
    className="bg-card text-card-foreground rounded-xl border p-6"
    itemScope
    itemType="https://schema.org/CreativeWork"
  >
    <p
      className="text-muted-foreground text-justify mb-4"
      itemProp="description"
    >
      I&apos;ve completed over 120 projects including Slack clone, social media
      platforms, full-stack e-commerce solutions, task management systems,
      Notion clones, admin dashboards, and responsive websites. My portfolio
      demonstrates expertise in React, Next.js, TypeScript, and Node.js with a
      commitment to creating intuitive, high-performance, and accessible web
      applications that solve real-world problems for clients across various
      industries. I also have experience in UI/UX design, creating user-friendly
      interfaces for various web applications.
    </p>
    <Button
      asChild
      className={`flex items-center gap-2 !h-10 rounded-full ${OutfitFont.className}`}
    >
      <Link href="#work" itemProp="url">
        View All Projects
        <ArrowDown className="size-4" />
      </Link>
    </Button>
  </div>
));

ProjectsTab.displayName = "ProjectsTab";

const AboutMeContent = memo(() => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Youssef Mohammed",
    jobTitle: "Full Stack Web Developer",
    description:
      "Full Stack Web Developer based in Egypt, specializing in React, Next.js, and Node.js development with 3+ years of experience.",
    knowsAbout: [
      "React.js",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "MongoDB",
      "ConvexDB",
    ],
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "Egypt",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-[1360px] mx-auto px-5 will-change-transform">
        <div className="flex flex-col md:flex-row gap-10 xl:gap-0 items-start">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <ProfileImage />
            <div className="mt-8">
              <h1 className="text-2xl mb-2 font-bold">Youssef Mohammed</h1>
              <p
                className="text-muted-foreground text-sm md:pr-24"
                itemProp="description"
              >
                Full Stack Web Developer based in Egypt, specializing in React,
                Next.js, and Node.js development with 3+ years of experience
                creating exceptional digital experiences and responsive web
                applications.
              </p>
              <Button
                className={`w-full sm:w-fit mt-4 !px-8 !h-12 sm:!h-10 rounded-full ${OutfitFont.className}`}
                asChild
              >
                <Link href="#contact">
                  Get In Touch
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="mb-6">
              <h2 id="about-heading" className="text-3xl mb-2 font-semibold">
                About Me
              </h2>
              <div
                className="w-20 h-1 bg-primary mb-6"
                aria-hidden="true"
              ></div>
              <p
                className="text-muted-foreground text-justify text-pretty"
                itemProp="description"
              >
                I&apos;m a passionate Full Stack Developer with over 3 years of
                experience creating modern web applications. I specialize in
                React, Next.js, and Node.js, focusing on building performant and
                accessible web experiences. My approach combines technical
                expertise with creative problem-solving to deliver solutions
                that exceed expectations. I&apos;m dedicated to creating
                responsive, user-friendly interfaces that provide exceptional
                user experiences across all devices.
              </p>
            </div>
            <Tabs defaultValue="technologies" className="w-full mt-8">
              <TabsList
                className="w-full justify-start mb-6"
                role="tablist"
                aria-label="Professional information"
              >
                <TabsTrigger
                  id="technologies-tab"
                  value="technologies"
                  className="flex items-center gap-2"
                  role="tab"
                >
                  <Code className="size-4 hidden sm:block" />
                  Technologies
                </TabsTrigger>
                <TabsTrigger
                  id="education-tab"
                  value="education"
                  className="flex items-center gap-2"
                  role="tab"
                >
                  <GraduationCap className="size-4 hidden sm:block" />
                  Education
                </TabsTrigger>
                <TabsTrigger
                  id="projects-tab"
                  value="projects"
                  className="flex items-center gap-2"
                  role="tab"
                >
                  <Briefcase className="size-4 hidden sm:block" />
                  Projects
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="technologies"
                className="space-y-4"
                role="tabpanel"
                aria-labelledby="technologies-tab"
              >
                <TechnologiesTab />
              </TabsContent>
              <TabsContent
                value="education"
                className="space-y-4"
                role="tabpanel"
                aria-labelledby="education-tab"
              >
                <EducationTab />
              </TabsContent>
              <TabsContent
                value="projects"
                className="space-y-6"
                role="tabpanel"
                aria-labelledby="projects-tab"
              >
                <ProjectsTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
});

AboutMeContent.displayName = "AboutMeContent";

export const AboutMe = memo(() => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "100px" }
    );

    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, []);

  if (!isVisible) {
    return (
      <section
        id="about"
        className="w-full min-h-screen py-16"
        aria-labelledby="about-heading"
        data-section="about"
      />
    );
  }

  return (
    <section
      id="about"
      className="w-full min-h-screen py-16"
      aria-labelledby="about-heading"
      data-section="about"
    >
      <AboutMeContent />
    </section>
  );
});

AboutMe.displayName = "AboutMe";
