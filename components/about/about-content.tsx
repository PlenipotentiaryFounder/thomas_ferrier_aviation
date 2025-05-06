"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutContent() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">My Aviation Journey</h2>

            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                As a <span className="font-semibold text-primary">Certified Flight Instructor</span> and aviation
                enthusiast, I've dedicated my career to mastering the art and science of flight while helping others
                achieve their aviation dreams.
              </p>

              <p className="text-lg leading-relaxed">
                My approach combines technical precision with a passion for innovation. Whether I'm in the cockpit
                teaching complex maneuvers or developing new training methodologies, I bring the same commitment to
                excellence and safety.
              </p>

              <p className="text-lg leading-relaxed">
                Beyond instruction, I'm the founder of <span className="font-semibold">FlyRight.AI</span>, where we're
                developing next-generation tools to enhance pilot training and flight safety through artificial
                intelligence and data analytics.
              </p>

              <p className="text-lg leading-relaxed">
                My journey in aviation began with a childhood fascination with aircraft and the freedom of flight. That
                passion led me to pursue formal training at Embry-Riddle Aeronautical University, where I graduated with
                honors in Aeronautical Science.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-70"></div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/placeholder.svg?height=800&width=1000"
                  alt="Thomas Ferrier teaching in cockpit"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-8 bg-secondary/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">My Philosophy</h3>
              <p className="text-muted-foreground">
                "Aviation is not just about operating an aircraft—it's about developing a mindset of precision,
                continuous learning, and respect for the elements. I believe in teaching not just the mechanics of
                flight, but the art of decision-making that keeps pilots safe."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
