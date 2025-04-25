import { v } from "convex/values";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { action, mutation, query } from "./_generated/server";

export const getAdminByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("admins")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
  },
});

export const login = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (
    ctx,
    args
  ): Promise<{
    success: boolean;
    message?: string;
    admin?: {
      id: Id<"admins">;
      email: string;
    };
  }> => {
    const admin = await ctx.runQuery(api.auth.getAdminByEmail, {
      email: args.email,
    });

    if (!admin) {
      return { success: false, message: "Invalid email or password" };
    }

    if (admin.password !== args.password) {
      return { success: false, message: "Invalid email or password" };
    }

    return {
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    };
  },
});

export const createInitialAdmin = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const existingAdmins = await ctx.db.query("admins").collect();

    if (existingAdmins.length > 0) {
      throw new Error("Admin already exists");
    }

    const adminId = await ctx.db.insert("admins", {
      email: args.email,
      password: args.password,
    });
    return adminId;
  },
});
