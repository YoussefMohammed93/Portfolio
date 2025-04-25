"use client";

import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Welcome to the Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/projects">
          <Card className="cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-medium">Projects</CardTitle>
              <FolderKanban className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                Manage your portfolio projects. Add, edit, or remove projects.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
