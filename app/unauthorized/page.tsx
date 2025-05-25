"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="max-w-md px-4 text-center">
        <div className="rounded-full bg-destructive/10 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="h-6 w-6 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold mt-2 font-opensauce">Unauthorized Access</h1>
        <p className="mt-4 text-muted-foreground">
          You don't have permission to access the admin area. This area is restricted to administrators only.
        </p>
        <div className="mt-6">
          <Button
            onClick={() => router.push("/")}
            className="mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
} 