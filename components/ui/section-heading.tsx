import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg";
}

export function SectionHeading({
  title,
  description,
  align = "center",
  size = "md",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-16",
        {
          "text-left": align === "left",
          "text-center mx-auto": align === "center",
          "text-right ml-auto": align === "right",
          "max-w-xl": size === "sm" && align === "center",
          "max-w-3xl": size === "md" && align === "center",
          "max-w-4xl": size === "lg" && align === "center",
        },
        className
      )}
      {...props}
    >
      <h2
        className={cn("font-opensauce font-bold text-foreground", {
          "text-2xl md:text-3xl": size === "sm",
          "text-3xl md:text-4xl": size === "md",
          "text-4xl md:text-5xl": size === "lg",
        })}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn("mt-4 text-muted-foreground", {
            "text-base": size === "sm",
            "text-lg": size === "md" || size === "lg",
          })}
        >
          {description}
        </p>
      )}
    </div>
  );
}