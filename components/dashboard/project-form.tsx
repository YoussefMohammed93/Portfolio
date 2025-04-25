"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { ProjectDoc } from "@/types/types";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { ConvexImage } from "@/components/ui/convex-image";

const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  datePublished: z.string().min(1, "Date is required"),
  category: z.enum(["web", "mobile", "fullstack"]),
  technologies: z.string().min(1, "At least one technology is required"),
  githubUrl: z.string().optional().or(z.literal("")),
  demoUrl: z.string().optional().or(z.literal("")),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export function ProjectForm({
  project,
  onSuccess,
}: {
  project?: ProjectDoc;
  onSuccess: () => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    project?.image && project.image.includes("/") ? project.image : ""
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  const createProject = useMutation(api.projects.createProject);
  const updateProject = useMutation(api.projects.updateProject);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const storeImage = useMutation(api.files.storeImage);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: project
      ? {
          title: project.title,
          description: project.description,
          datePublished: project.datePublished,
          category: project.category as "web" | "mobile" | "fullstack",
          technologies: project.technologies.join(", "),
          githubUrl: project.githubUrl || "",
          demoUrl: project.demoUrl || "",
        }
      : {
          title: "",
          description: "",
          datePublished: new Date().toISOString().split("T")[0],
          category: "web",
          technologies: "",
          githubUrl: "",
          demoUrl: "",
        },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
  };

  const uploadImage = async () => {
    if (!imageFile) {
      return project?.image || "";
    }

    setIsUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": imageFile.type },
        body: imageFile,
      });

      if (!result.ok) {
        throw new Error("Failed to upload image");
      }

      const { storageId } = await result.json();

      await storeImage({ storageId });

      setIsUploading(false);
      return storageId;
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
      throw error;
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
      const imageId = await uploadImage();

      const technologiesArray = data.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech !== "");

      const projectData = {
        title: data.title,
        description: data.description,
        image: imageId || project?.image || "",
        datePublished: data.datePublished,
        technologies: technologiesArray,
        category: data.category as "web" | "mobile" | "fullstack",
        githubUrl: data.githubUrl || undefined,
        demoUrl: data.demoUrl || undefined,
      };

      if (project) {
        await updateProject({
          id: project._id as Id<"projects">,
          ...projectData,
        });
      } else {
        await createProject(projectData);
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <FormLabel>Project Image</FormLabel>
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-md border">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Project preview"
                    fill
                    className="object-cover"
                  />
                ) : project?.image && !project.image.includes("/") ? (
                  <ConvexImage
                    storageId={project.image}
                    alt="Project preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="max-w-xs"
              />
            </div>
            <FormDescription>
              Upload an image for your project. Recommended size: 1200x800px.
            </FormDescription>
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Project title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your project"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="datePublished"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Published</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="web">Front End</SelectItem>
                    <SelectItem value="fullstack">Full Stack</SelectItem>
                    <SelectItem value="mobile">Mobile App</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies</FormLabel>
                <FormControl>
                  <Input
                    placeholder="React, Next.js, TypeScript, etc."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Comma-separated list of technologies used in the project.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/..." {...field} />
                </FormControl>
                <FormDescription>
                  Optional GitHub repository URL.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="demoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormDescription>Optional live demo URL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isUploading || isSubmitting}>
            {(isUploading || isSubmitting) && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {isUploading
              ? "Uploading..."
              : isSubmitting
                ? project
                  ? "Updating..."
                  : "Adding..."
                : project
                  ? "Update Project"
                  : "Add Project"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
