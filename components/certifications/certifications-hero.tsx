"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"

export default function CertificationsHero() {
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
              <Award className="h-12 w-12 text-primary" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Certifications & Ratings
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-12"
          >
            FAA certifications and ratings earned through dedicated training and demonstrated proficiency.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
