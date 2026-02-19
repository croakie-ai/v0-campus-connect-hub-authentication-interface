"use client"

import { useState, type FormEvent } from "react"
import { FloatingInput } from "@/components/floating-input"
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type AuthMode = "signin" | "signup"

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (mode === "signup" && !formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const toggleMode = () => {
    setMode((prev) => (prev === "signin" ? "signup" : "signin"))
    setErrors({})
    setFormData({ fullName: "", email: "", password: "", confirmPassword: "" })
    setShowPassword(false)
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 lg:px-12">
      {/* Logo & Branding */}
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-foreground">
            CampusConnectHub
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          {mode === "signin" ? "Welcome back" : "Join the network"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Sign in to connect with your campus community"
            : "Create your account and start networking"}
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="relative mb-8 flex w-full max-w-sm items-center rounded-xl bg-secondary/50 p-1 ring-1 ring-border">
        <div
          className={cn(
            "absolute h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-lg bg-primary/10 ring-1 ring-primary/20 transition-all duration-300",
            mode === "signin" ? "left-1" : "left-[calc(50%+2px)]"
          )}
        />
        <button
          type="button"
          onClick={() => mode !== "signin" && toggleMode()}
          className={cn(
            "relative z-10 flex-1 rounded-lg py-2.5 text-center text-sm font-medium transition-colors duration-200",
            mode === "signin" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => mode !== "signup" && toggleMode()}
          className={cn(
            "relative z-10 flex-1 rounded-lg py-2.5 text-center text-sm font-medium transition-colors duration-200",
            mode === "signup" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {/* Full Name - only on sign up */}
        <div
          className={cn(
            "grid transition-all duration-300",
            mode === "signup"
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <FloatingInput
              id="fullName"
              label="Full Name"
              type="text"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange("fullName")}
              error={errors.fullName}
            />
          </div>
        </div>

        {/* Email with fixed suffix */}
        <FloatingInput
          id="email"
          label="University Email"
          type="text"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange("email")}
          error={errors.email}
          suffix="@stu.upes.ac.in"
        />

        {/* Password */}
        <div className="relative">
          <FloatingInput
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={formData.password}
            onChange={handleChange("password")}
            error={errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {/* Confirm Password - only on sign up */}
        <div
          className={cn(
            "grid transition-all duration-300",
            mode === "signup"
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <FloatingInput
              id="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              error={errors.confirmPassword}
            />
          </div>
        </div>

        {/* Forgot password link */}
        {mode === "signin" && (
          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70"
        >
          <span className="relative z-10 flex items-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {mode === "signin" ? "Signing in..." : "Creating account..."}
              </>
            ) : (
              <>
                {mode === "signin" ? "Sign In" : "Create Account"}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </>
            )}
          </span>
          {/* Glow effect on hover */}
          <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary via-primary/90 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>


      </form>

      {/* Footer */}
      <p className="mt-8 text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <button type="button" className="text-primary/80 hover:text-primary underline-offset-4 hover:underline">
          Terms of Service
        </button>{" "}
        and{" "}
        <button type="button" className="text-primary/80 hover:text-primary underline-offset-4 hover:underline">
          Privacy Policy
        </button>
      </p>
    </div>
  )
}
