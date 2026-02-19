"use client"

import { useRef, useCallback, useState, useEffect } from "react"
import Image from "next/image"

const campusImages = [
  {
    src: "/images/campus-1.jpg",
    alt: "Modern university campus at golden hour",
    caption: "Where Ideas Come to Life",
  },
  {
    src: "/images/campus-2.jpg",
    alt: "University library interior",
    caption: "Learn Without Limits",
  },
  {
    src: "/images/campus-3.jpg",
    alt: "Campus courtyard at sunset",
    caption: "Connect & Collaborate",
  },
  {
    src: "/images/campus-4.jpg",
    alt: "Aerial view of campus",
    caption: "Your Campus, Your Network",
  },
  {
    src: "/images/campus-5.jpg",
    alt: "University innovation lab",
    caption: "Innovate Together",
  },
]

export function CampusCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startY = useRef(0)
  const currentY = useRef(0)

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(campusImages.length - 1, index))
    setActiveIndex(clamped)
  }, [])

  // Wheel scroll handler
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      if (wheelTimeout.current) return
      const direction = e.deltaY > 0 ? 1 : -1
      goTo(activeIndex + direction)
      wheelTimeout.current = setTimeout(() => {
        wheelTimeout.current = null
      }, 500)
    },
    [activeIndex, goTo]
  )

  // Touch / pointer drag handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true
    startY.current = e.clientY
    currentY.current = e.clientY
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return
    currentY.current = e.clientY
  }, [])

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return
      isDragging.current = false
      const deltaY = startY.current - currentY.current
      const threshold = 40
      if (Math.abs(deltaY) > threshold) {
        goTo(activeIndex + (deltaY > 0 ? 1 : -1))
      }
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    },
    [activeIndex, goTo]
  )

  // Keyboard support
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault()
        goTo(activeIndex + 1)
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        goTo(activeIndex - 1)
      }
    }
    el.addEventListener("keydown", handleKey)
    return () => el.removeEventListener("keydown", handleKey)
  }, [activeIndex, goTo])

  const getImageStyle = (index: number) => {
    const diff = index - activeIndex

    if (diff === 0) {
      return {
        transform: "translateY(0) scale(1) perspective(1000px) rotateX(0deg)",
        zIndex: 30,
        opacity: 1,
        filter: "blur(0px) brightness(1)",
      }
    }
    if (Math.abs(diff) === 1) {
      const direction = diff > 0 ? 1 : -1
      return {
        transform: `translateY(${direction * 55}%) scale(0.82) perspective(1000px) rotateX(${direction * 6}deg)`,
        zIndex: 20,
        opacity: 0.55,
        filter: "blur(3px) brightness(0.55)",
      }
    }
    if (Math.abs(diff) === 2) {
      const direction = diff > 0 ? 1 : -1
      return {
        transform: `translateY(${direction * 100}%) scale(0.65) perspective(1000px) rotateX(${direction * 10}deg)`,
        zIndex: 10,
        opacity: 0.25,
        filter: "blur(6px) brightness(0.4)",
      }
    }
    const direction = diff > 0 ? 1 : -1
    return {
      transform: `translateY(${direction * 140}%) scale(0.4)`,
      zIndex: 0,
      opacity: 0,
      filter: "blur(10px) brightness(0.3)",
    }
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden outline-none"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: "none" }}
      role="region"
      aria-label="Campus image carousel"
      aria-roledescription="carousel"
    >
      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      {/* Carousel + side indicators */}
      <div className="relative flex w-full items-center justify-center gap-6">
        {/* Vertical dots indicator */}
        <div className="relative z-40 flex flex-col items-center gap-2">
          {campusImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-1.5 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "h-8 bg-primary"
                  : "h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Carousel container */}
        <div className="relative flex h-[65vh] flex-1 items-center justify-center select-none lg:h-[80vh]">
          {campusImages.map((image, index) => {
            const style = getImageStyle(index)
            return (
              <div
                key={image.src}
                className="absolute h-[320px] w-[500px] overflow-hidden rounded-2xl shadow-2xl transition-all duration-700 ease-in-out lg:h-[420px] lg:w-[640px] xl:h-[480px] xl:w-[740px]"
                style={{
                  ...style,
                  transformStyle: "preserve-3d",
                }}
                aria-hidden={index !== activeIndex}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="pointer-events-none object-cover"
                  priority={index === 0}
                  sizes="(max-width: 1024px) 500px, 740px"
                  draggable={false}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Caption */}
      <div className="relative z-40 mt-2 text-center">
        <p
          className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-foreground transition-all duration-500 lg:text-3xl"
          key={activeIndex}
        >
          {campusImages[activeIndex].caption}
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Discover a world of opportunities
        </p>
      </div>
    </div>
  )
}
