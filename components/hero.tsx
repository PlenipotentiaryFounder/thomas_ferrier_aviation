"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Plane, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const title = "THOMAS FERRIER"
  const subtitle = "CERTIFIED FLIGHT INSTRUCTOR & AVIATION INNOVATOR"

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000">
      {/* Parallax background with overlay */}
      <div
        className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"
        style={{
          transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -20}px) scale(1.1)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 dark:from-black/80 dark:via-black/60 dark:to-black/90"></div>
      </div>

      {/* Animated grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-10 dark:opacity-5"></div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20 backdrop-blur-3xl"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <motion.div initial="hidden" animate="visible" variants={titleVariants} className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
            <div className="relative bg-primary/30 backdrop-blur-sm p-6 rounded-full">
              <Plane className="h-16 w-16 text-white" />
            </div>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter" variants={titleVariants}>
              {title.split("").map((letter, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block">
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-8 tracking-wide text-white/80">{subtitle}</h2>

            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/70">
              Passionate about flight, education, and pushing the boundaries of what's possible in aviation.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="group relative overflow-hidden bg-primary hover:bg-primary/90" asChild>
                <Link href="#contact">
                  <span className="relative z-10 flex items-center">
                    Get In Touch
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                asChild
              >
                <Link href="#logbook">View Flight Experience</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white/50 text-sm mb-2">Scroll to explore</span>
          <div className="w-8 h-14 rounded-full border-2 border-white/30 flex justify-center p-1">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 24, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
