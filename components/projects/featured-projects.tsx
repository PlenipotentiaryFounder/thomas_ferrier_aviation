"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Sample data - replace with actual projects
const projects = [
  {
    id: 1,
    title: "Flight Training Management System",
    description:
      "A comprehensive web application for flight schools to manage students, instructors, aircraft, and training progress.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "TypeScript", "Supabase", "Aviation"],
    demoUrl: "#",
    githubUrl: "#",
    date: "2023-02-15",
  },
  {
    id: 2,
    title: "Weather Radar Visualization Tool",
    description:
      "An interactive tool for pilots to visualize and interpret weather radar data for flight planning and in-flight decision making.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "D3.js", "Weather API", "Canvas"],
    demoUrl: "#",
    githubUrl: "#",
    date: "2022-11-10",
  },
  {
    id: 3,
    title: "Aviation Checklist Mobile App",
    description:
      "A mobile application providing digital checklists for various aircraft types with voice control and emergency procedures.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React Native", "Firebase", "Voice Recognition"],
    demoUrl: "#",
    githubUrl: "#",
    date: "2022-08-22",
  },
  {
    id: 4,
    title: "Flight Path Optimization Algorithm",
    description:
      "Research project developing algorithms to optimize flight paths for fuel efficiency and reduced environmental impact.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Python", "Machine Learning", "Data Science"],
    demoUrl: "#",
    githubUrl: "#",
    date: "2022-05-18",
  },
]

export default function FeaturedProjects() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing my work at the intersection of aviation and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(project.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>
                  <CardDescription className="mt-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
