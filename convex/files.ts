import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Generate an upload URL for a file
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Store a file in Convex storage
export const storeImage = mutation({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return args.storageId;
  },
});

// Get a URL for a stored file
export const getImageUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
