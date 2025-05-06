"use client"

import { motion } from "framer-motion"
import { Code, Lightbulb, Rocket } from "lucide-react"

export default function ProjectsHero() {
  return (
    <section className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-[length:30px_30px] opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Aviation <span className="text-primary">Projects</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Exploring the intersection of aviation and technology through innovative projects, research, and
            development.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-3">
              <Code className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Tech Projects</p>
                <p className="font-bold text-lg">8+</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-3">
              <Lightbulb className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Research Papers</p>
                <p className="font-bold text-lg">5+</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-3">
              <Rocket className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Innovations</p>
                <p className="font-bold text-lg">3+</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
