import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold font-opensauce mb-4 text-center">
        Blueprint Not Found
      </h1>
      <p className="text-lg text-muted-foreground text-center mb-8 max-w-md">
        The growth blueprint you're looking for doesn't exist or may have been removed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/growth-blueprints">
            Browse Growth Blueprints
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
} 