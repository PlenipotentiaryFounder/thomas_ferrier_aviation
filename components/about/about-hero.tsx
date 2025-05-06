"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Plane } from "lucide-react"

export default function AboutHero() {
  return (
    <section className="pt-32 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
            <div className="relative bg-primary/30 backdrop-blur-sm p-6 rounded-full">
              <Plane className="h-12 w-12 text-primary" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            About Thomas Ferrier
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mb-12"
          >
            Certified Flight Instructor, aviation innovator, and technology enthusiast dedicated to advancing the future
            of flight.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Thomas Ferrier in cockpit"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-white/90 text-sm">Active Flight Instructor</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Thomas Ferrier</h3>
              <p className="text-white/80">Phoenix, Arizona</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
