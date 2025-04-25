import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  admins: defineTable({
    email: v.string(),
    password: v.string(),
  }),
  
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    image: v.string(),
    datePublished: v.string(),
    technologies: v.array(v.string()),
    category: v.string(),
    githubUrl: v.optional(v.string()),
    demoUrl: v.optional(v.string()),
  }).index("by_category", ["category"]),
});
