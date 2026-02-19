"use client"

import { useState, type InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  suffix?: string
  error?: string
}

export function FloatingInput({
  label,
  suffix,
  error,
  className,
  id,
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value !== undefined && value !== ""
  const isActive = isFocused || hasValue

  return (
    <div className="group relative">
      <div
        className={cn(
          "relative flex items-center overflow-hidden rounded-xl border bg-secondary/50 transition-all duration-300",
          isFocused
            ? "border-primary/60 shadow-[0_0_20px_-5px] shadow-primary/20"
            : error
              ? "border-destructive/50"
              : "border-border hover:border-border/80",
          className
        )}
      >
        <div className="relative flex-1">
          <input
            id={id}
            value={value}
            onChange={onChange}
            onFocus={(e) => {
              setIsFocused(true)
              onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              onBlur?.(e)
            }}
            className={cn(
              "peer w-full bg-transparent px-4 pb-2 pt-6 text-sm text-foreground outline-none placeholder:text-transparent",
              suffix && "pr-0"
            )}
            placeholder={label}
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(
              "pointer-events-none absolute left-4 top-1/2 origin-left -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200",
              isActive && "top-3.5 -translate-y-1/2 scale-[0.8] text-xs text-primary"
            )}
          >
            {label}
          </label>
        </div>
        {suffix && (
          <span className="flex-shrink-0 border-l border-border/50 bg-muted/30 px-3 py-4 text-xs text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}
