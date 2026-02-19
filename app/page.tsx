import { AuthForm } from "@/components/auth-form"
import { CampusCarousel } from "@/components/campus-carousel"

export default function AuthPage() {
  return (
    <main className="relative flex min-h-dvh flex-col lg:flex-row">
      {/* Left Side - Auth Panel */}
      <section className="relative z-10 flex min-h-dvh w-full flex-col lg:w-[480px] xl:w-[520px]">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 border-r border-border/40 bg-card/60 backdrop-blur-2xl" />
        {/* Subtle top accent line */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {/* Content */}
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <AuthForm />
        </div>
      </section>

      {/* Right Side - Carousel */}
      <section className="relative hidden flex-1 lg:flex">
        {/* Background layer */}
        <div className="absolute inset-0 bg-background" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Carousel content */}
        <div className="relative z-10 flex flex-1 items-center justify-center p-8">
          <CampusCarousel />
        </div>
      </section>

      {/* Mobile: Show a brief teaser for the carousel below */}
      <section className="relative flex h-[40vh] w-full items-center justify-center overflow-hidden bg-background lg:hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative z-10 w-full">
          <CampusCarousel />
        </div>
      </section>
    </main>
  )
}
