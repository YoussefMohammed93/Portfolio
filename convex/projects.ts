import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all projects
export const getProjects = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

// Get projects by category
export const getProjectsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

// Get a single project by ID
export const getProject = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new project
export const createProject = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    image: v.string(),
    datePublished: v.string(),
    technologies: v.array(v.string()),
    category: v.string(),
    githubUrl: v.optional(v.string()),
    demoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", {
      title: args.title,
      description: args.description,
      image: args.image,
      datePublished: args.datePublished,
      technologies: args.technologies,
      category: args.category,
      githubUrl: args.githubUrl,
      demoUrl: args.demoUrl,
    });
  },
});

// Update an existing project
export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    title: v.string(),
    description: v.string(),
    image: v.string(),
    datePublished: v.string(),
    technologies: v.array(v.string()),
    category: v.string(),
    githubUrl: v.optional(v.string()),
    demoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...projectData } = args;

    const existingProject = await ctx.db.get(id);
    if (!existingProject) {
      throw new Error(`Project with ID ${id} not found`);
    }

    return await ctx.db.patch(id, projectData);
  },
});

// Delete a project
export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const existingProject = await ctx.db.get(args.id);
    if (!existingProject) {
      throw new Error(`Project with ID ${args.id} not found`);
    }

    await ctx.db.delete(args.id);
    return { success: true };
  },
});
