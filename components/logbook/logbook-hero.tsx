"use client"

import { motion } from "framer-motion"
import { Plane, Clock, Calendar } from "lucide-react"

export default function LogbookHero() {
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
            Flight <span className="text-primary">Logbook</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            A detailed record of my aviation journey, showcasing flight hours, aircraft types, and experiences across
            various conditions and locations.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-3">
              <Clock className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Total Flight Hours</p>
                <p className="font-bold text-lg">2,500+</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-3">
              <Plane className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Aircraft Types</p>
                <p className="font-bold text-lg">15+</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg px-4 py-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Years of Experience</p>
                <p className="font-bold text-lg">12+</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
