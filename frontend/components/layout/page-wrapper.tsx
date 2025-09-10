import { cn } from "@/lib/utils"

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

export function PageWrapper({ 
  children, 
  className, 
  maxWidth = "2xl" 
}: PageWrapperProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full"
  }

  return (
    <div className={cn(
      "mx-auto w-full px-4 py-6 sm:px-6 lg:px-8",
      className
    )}>
      {children}
    </div>
  )
}