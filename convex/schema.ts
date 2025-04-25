import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  admins: defineTable({
    email: v.string(),
    password: v.string(),
  }),
});
