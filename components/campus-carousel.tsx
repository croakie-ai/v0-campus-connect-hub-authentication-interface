"use client"

import { useEffect, useState, useCallback } from "react"
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
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev + 1) % campusImages.length)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [isTransitioning])

  useEffect(() => {
    const interval = setInterval(goToNext, 4000)
    return () => clearInterval(interval)
  }, [goToNext])

  const getImageStyle = (index: number) => {
    const diff = index - activeIndex
    const wrappedDiff =
      diff > campusImages.length / 2
        ? diff - campusImages.length
        : diff < -campusImages.length / 2
          ? diff + campusImages.length
          : diff

    const isCenter = wrappedDiff === 0
    const isAdjacent = Math.abs(wrappedDiff) === 1
    const isSecondary = Math.abs(wrappedDiff) === 2

    if (isCenter) {
      return {
        transform: "translateX(0) scale(1) perspective(1000px) rotateY(0deg)",
        zIndex: 30,
        opacity: 1,
        filter: "blur(0px) brightness(1)",
      }
    }
    if (isAdjacent) {
      const direction = wrappedDiff > 0 ? 1 : -1
      return {
        transform: `translateX(${direction * 60}%) scale(0.78) perspective(1000px) rotateY(${direction * -8}deg)`,
        zIndex: 20,
        opacity: 0.6,
        filter: "blur(3px) brightness(0.6)",
      }
    }
    if (isSecondary) {
      const direction = wrappedDiff > 0 ? 1 : -1
      return {
        transform: `translateX(${direction * 110}%) scale(0.6) perspective(1000px) rotateY(${direction * -12}deg)`,
        zIndex: 10,
        opacity: 0.3,
        filter: "blur(6px) brightness(0.4)",
      }
    }
    return {
      transform: "translateX(0) scale(0.4)",
      zIndex: 0,
      opacity: 0,
      filter: "blur(10px) brightness(0.3)",
    }
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      {/* Carousel container */}
      <div className="relative flex h-[55vh] w-full items-center justify-center lg:h-[65vh]">
        {campusImages.map((image, index) => {
          const style = getImageStyle(index)
          return (
            <div
              key={image.src}
              className="absolute h-[340px] w-[480px] overflow-hidden rounded-2xl shadow-2xl transition-all duration-700 ease-in-out lg:h-[400px] lg:w-[560px]"
              style={{
                ...style,
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 1024px) 480px, 560px"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            </div>
          )
        })}
      </div>

      {/* Caption */}
      <div className="relative z-40 mt-4 text-center">
        <p
          className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-foreground transition-all duration-500 lg:text-3xl"
          key={activeIndex}
        >
          {campusImages[activeIndex].caption}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Discover a world of opportunities
        </p>
      </div>

      {/* Dots indicator */}
      <div className="relative z-40 mt-6 flex items-center gap-2">
        {campusImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true)
                setActiveIndex(index)
                setTimeout(() => setIsTransitioning(false), 700)
              }
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === activeIndex
                ? "w-8 bg-primary"
                : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
