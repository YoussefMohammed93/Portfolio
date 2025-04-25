"use client";

import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  Calendar,
  Github,
  ExternalLink,
  FileX,
  Loader2,
} from "lucide-react";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { ConvexImage } from "@/components/ui/convex-image";
import { ProjectCategory, ProjectDoc } from "@/types/types";
import { ProjectForm } from "@/components/dashboard/project-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProjectsPage() {
  const projects = useQuery(api.projects.getProjects);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDoc | null>(
    null
  );

  const deleteProject = useMutation(api.projects.deleteProject);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects?.filter((project) => project.category === activeCategory);

  const handleEdit = (project: ProjectDoc) => {
    setSelectedProject(project);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (project: ProjectDoc) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  const handleView = (project: ProjectDoc) => {
    setSelectedProject(project);
    setIsViewDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProject) {
      setIsDeleting(true);
      try {
        await deleteProject({ id: selectedProject._id as Id<"projects"> });
      } catch (error) {
        console.error("Error deleting project:", error);
      } finally {
        setIsDeleting(false);
        setIsDeleteDialogOpen(false);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new project to your portfolio.
              </DialogDescription>
            </DialogHeader>
            <ProjectForm onSuccess={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <Tabs
        defaultValue="all"
        value={activeCategory}
        onValueChange={(value) => setActiveCategory(value as ProjectCategory)}
        className="w-full"
      >
        <div className="flex justify-start mb-5">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="web">Front End</TabsTrigger>
            <TabsTrigger value="fullstack">Full Stack</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={activeCategory} className="mt-0">
          {!projects ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card
                  key={i}
                  className="overflow-hidden h-full flex flex-col pt-0"
                >
                  <div className="h-48 w-full bg-muted animate-pulse" />
                  <CardHeader>
                    <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-1/2 bg-muted animate-pulse rounded mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-full bg-muted animate-pulse rounded mb-2" />
                    <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProjects && filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                />
              ))}
            </div>
          ) : (
            <div className="text-center max-w-lg mx-auto py-12">
              <FileX className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No projects found in this category yet. Click Add Project to
                create one!
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update the details of your project.
            </DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <ProjectForm
              project={selectedProject}
              onSuccess={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time dateTime={selectedProject?.datePublished}>
                {selectedProject?.datePublished &&
                  new Date(selectedProject.datePublished).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
              </time>
            </div>
          </DialogHeader>
          {selectedProject && (
            <>
              <div className="relative h-60 w-full overflow-hidden rounded-md">
                {selectedProject.image.includes("/") ? (
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <ConvexImage
                    storageId={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedProject.description}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Category</h3>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                    {selectedProject.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <Github className="h-4 w-4" />
                      GitHub Repository
                    </a>
                  )}
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project
              {selectedProject?.title} from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive/90 text-white hover:bg-destructive/75 dark:bg-destructive"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ProjectCard({
  project,
  onEdit,
  onDelete,
  onView,
}: {
  project: ProjectDoc;
  onEdit: (project: ProjectDoc) => void;
  onDelete: (project: ProjectDoc) => void;
  onView: (project: ProjectDoc) => void;
}) {
  const formattedDate = new Date(project.datePublished).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Card className="overflow-hidden h-full flex flex-col pt-0">
      <div className="relative h-48 w-full overflow-hidden">
        {project.image.includes("/") ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform hover:scale-105 duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <ConvexImage
            storageId={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform hover:scale-105 duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl truncate">{project.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground gap-1">
          <Calendar className="h-4 w-4" />
          <time dateTime={project.datePublished}>{formattedDate}</time>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {project.technologies.slice(0, 3).map((tech: string) => (
            <span
              key={tech}
              className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md text-xs"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md text-xs">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button variant="outline" size="sm" onClick={() => onView(project)}>
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete(project)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
