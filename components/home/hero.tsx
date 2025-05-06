"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plane, ChevronRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 dark:from-black/80 dark:via-black/60 dark:to-black/90"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <div className="flex flex-col items-center">
          <div className="relative mb-8">
            <div className="relative bg-primary/30 backdrop-blur-sm p-6 rounded-full">
              <Plane className="h-16 w-16 text-white" />
            </div>
          </div>

          <div className="overflow-hidden mb-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">THOMAS FERRIER</h1>
          </div>

          <div className="h-16 md:h-20">
            <h2 className="text-xl md:text-2xl lg:text-3xl tracking-wide text-white/80">CERTIFIED FLIGHT INSTRUCTOR</h2>
          </div>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/70">
            Passionate about flight, education, and pushing the boundaries of what's possible in aviation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="group relative overflow-hidden bg-primary hover:bg-primary/90" asChild>
              <Link href="/contact">
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
              <Link href="/logbook">View Flight Experience</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center">
          <span className="text-white/50 text-sm mb-2">Scroll to explore</span>
          <div className="w-8 h-14 rounded-full border-2 border-white/30 flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
