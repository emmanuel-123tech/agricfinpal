import type * as React from "react"
import { cn } from "@/lib/utils"

interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: "green" | "blue" | "amber" | "purple" | "none"
  hover?: boolean
  shadow?: "sm" | "md" | "lg" | "none"
}

export function CustomCard({ className, gradient = "none", hover = false, shadow = "sm", ...props }: CustomCardProps) {
  const gradientClasses = {
    green: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-100",
    blue: "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100",
    amber: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100",
    purple: "bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100",
    none: "bg-white",
  }

  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "",
  }

  return (
    <div
      className={cn(
        "rounded-xl border overflow-hidden",
        gradientClasses[gradient],
        shadowClasses[shadow],
        hover && "transition-all hover:-translate-y-1 hover:shadow-md",
        className,
      )}
      {...props}
    />
  )
}

export function CustomCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6", className)} {...props} />
}

export function CustomCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold", className)} {...props} />
}

export function CustomCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-gray-500", className)} {...props} />
}

export function CustomCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 pb-6 pt-0", className)} {...props} />
}

export function CustomCardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center border-t bg-gray-50/50 p-6", className)} {...props} />
}
