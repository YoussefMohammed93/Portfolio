"use client";

import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground">Logged in as: {adminEmail}</p>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
