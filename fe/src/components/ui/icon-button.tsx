import * as React from "react"
import { cn } from "@/lib/utils"

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ElementType
  size?: number
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon: Icon, size = 20, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer transition-all duration-150 ease-in-out hover:bg-[var(--bg-input)] active:scale-95",
          className
        )}
        {...props}
      >
        <Icon size={size} strokeWidth={2} className="text-[var(--text-muted)]" />
      </button>
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton }
