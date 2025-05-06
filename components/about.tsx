"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Award, BookOpen, Compass, Plane, Zap, Heart, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>

        <motion.div
          style={{ y, opacity }}
          className="absolute -right-64 -top-64 w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity }}
          className="absolute -left-64 -bottom-64 w-[30rem] h-[30rem] rounded-full bg-accent/10 blur-3xl"
        />
      </div>

      <div className="section-container relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <h2 className="section-title relative inline-block">
            About Me
            <motion.div
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: "50%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-70"></div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src="/placeholder.svg?height=800&width=800" alt="Thomas Ferrier" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-white/90 text-sm">Active Flight Instructor</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Thomas Ferrier</h3>
                  <p className="text-white/80">Phoenix, Arizona</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <ValueCard icon={<Zap className="h-5 w-5 text-amber-500" />} title="Innovation" color="amber" />
              <ValueCard icon={<Shield className="h-5 w-5 text-emerald-500" />} title="Safety" color="emerald" />
              <ValueCard icon={<Heart className="h-5 w-5 text-rose-500" />} title="Passion" color="rose" />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="text-xl leading-relaxed mb-8">
              As a <span className="font-semibold text-primary">Certified Flight Instructor</span> and aviation
              enthusiast, I've dedicated my career to mastering the art and science of flight while helping others
              achieve their aviation dreams.
            </p>

            <p className="text-lg leading-relaxed mb-8">
              My approach combines technical precision with a passion for innovation. Whether I'm in the cockpit
              teaching complex maneuvers or developing new training methodologies, I bring the same commitment to
              excellence and safety.
            </p>

            <p className="text-lg leading-relaxed mb-12">
              Beyond instruction, I'm the founder of <span className="font-semibold">FlyRight.AI</span>, where we're
              developing next-generation tools to enhance pilot training and flight safety through artificial
              intelligence and data analytics.
            </p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <StatCard icon={<Plane className="h-10 w-10 text-primary" />} title="200+" description="Flight Hours" />
              <StatCard
                icon={<BookOpen className="h-10 w-10 text-accent" />}
                title="50+"
                description="Students Trained"
              />
              <StatCard icon={<Compass className="h-10 w-10 text-sky" />} title="25+" description="Airports Visited" />
              <StatCard icon={<Award className="h-10 w-10 text-gold" />} title="4" description="Certifications" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <Card className="card-3d overflow-hidden border-0 shadow-lg">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="mb-4 p-3 rounded-full bg-primary/10">{icon}</div>
          <h3 className="text-2xl font-bold mb-1">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ValueCard({
  icon,
  title,
  color,
}: {
  icon: React.ReactNode
  title: string
  color: "amber" | "emerald" | "rose"
}) {
  return (
    <div
      className={cn(
        "p-3 rounded-xl text-center",
        color === "amber" && "bg-amber-500/10",
        color === "emerald" && "bg-emerald-500/10",
        color === "rose" && "bg-rose-500/10",
      )}
    >
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-sm font-medium">{title}</p>
    </div>
  )
}
