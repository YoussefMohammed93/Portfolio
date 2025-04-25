"use client";

import Link from "next/link";

import Cookies from "js-cookie";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { FolderKanban, LogOut, User } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    const adminSession = Cookies.get("adminSession");

    if (!adminSession) {
      router.push("/admin");
      return;
    }

    try {
      const session = JSON.parse(adminSession);
      if (!session.isAuthenticated) {
        router.push("/admin");
        return;
      }

      setAdminEmail(session.email);
    } catch {
      Cookies.remove("adminSession");
      router.push("/admin");
      return;
    }

    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("adminSession");
    router.push("/admin");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin size-8" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar className="bg-background">
        <SidebarHeader className="border-b p-4 h-[61px]">
          <div className="font-semibold">Admin Dashboard</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="p-4 gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/dashboard/projects"}
              >
                <Link
                  href="/dashboard/projects"
                  className="flex items-center gap-2"
                >
                  <FolderKanban className="h-4 w-4" />
                  Projects
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground truncate max-w-[180px]">
                {adminEmail}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 w-full justify-center"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center justify-between p-4 border-b">
          <SidebarTrigger />
        </div>
        <div className="p-5">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
