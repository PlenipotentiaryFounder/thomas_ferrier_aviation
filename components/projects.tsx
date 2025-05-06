"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRef } from "react"
import { cn } from "@/lib/utils"

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const projects = [
    {
      title: "FlyRight.AI",
      description:
        "An AI-powered flight training assistant that provides real-time feedback and personalized learning paths for student pilots.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["AI", "Aviation", "Education", "React", "Python"],
      links: {
        demo: "https://flyright.ai",
        github: "https://github.com/thomasferrier/flyright-ai",
      },
      color: "blue",
    },
    {
      title: "AACA Guide",
      description:
        "A comprehensive digital guide for the Aircraft Anti-Collision Awareness procedures, designed for both students and instructors.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Safety", "Education", "NextJS", "Mobile"],
      links: {
        demo: "https://aaca-guide.com",
        github: "https://github.com/thomasferrier/aaca-guide",
      },
      color: "green",
    },
    {
      title: "Flight Weather Dashboard",
      description:
        "A customizable dashboard that aggregates weather data from multiple sources to provide pilots with comprehensive pre-flight information.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Weather", "Data Visualization", "React", "API"],
      links: {
        demo: "https://flight-weather.app",
        github: "https://github.com/thomasferrier/flight-weather",
      },
      color: "purple",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="projects" className="relative py-32 overflow-hidden bg-secondary/50" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent"></div>

        <motion.div
          style={{ y, opacity }}
          className="absolute -left-64 top-64 w-[40rem] h-[40rem] rounded-full bg-green-500/5 blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity }}
          className="absolute -right-64 bottom-64 w-[30rem] h-[30rem] rounded-full bg-blue-500/5 blur-3xl"
        />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="section-title relative inline-block">
            Projects
            <motion.div
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: "50%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            Innovative aviation technology solutions and educational resources.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Button variant="outline" size="lg" className="group">
            <span className="mr-2">View All Projects</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
}: {
  project: {
    title: string
    description: string
    image: string
    tags: string[]
    links: {
      demo?: string
      github?: string
    }
    color: "blue" | "green" | "purple"
  }
}) {
  return (
    <Card className="card-hover h-full flex flex-col border-0 shadow-lg overflow-hidden">
      <div
        className={cn(
          "h-1 w-full",
          project.color === "blue" && "bg-blue-500",
          project.color === "green" && "bg-green-500",
          project.color === "purple" && "bg-purple-500",
        )}
      />

      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
        </div>
      </div>

      <CardContent className="flex-grow p-6">
        <p className="text-muted-foreground mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <Badge
              key={i}
              variant="outline"
              className={cn(
                "font-normal",
                project.color === "blue" &&
                  "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800",
                project.color === "green" &&
                  "border-green-200 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800",
                project.color === "purple" &&
                  "border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800",
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-3">
        {project.links.demo && (
          <Button
            variant="default"
            size="sm"
            className={cn(
              "flex items-center gap-1 flex-1",
              project.color === "blue" && "bg-blue-600 hover:bg-blue-700",
              project.color === "green" && "bg-green-600 hover:bg-green-700",
              project.color === "purple" && "bg-purple-600 hover:bg-purple-700",
            )}
            asChild
          >
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              View Demo
            </a>
          </Button>
        )}

        {project.links.github && (
          <Button variant="outline" size="sm" className="flex items-center gap-1 flex-1" asChild>
            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              Source Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
