"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const caseStudies = [
  {
    title: "Flight School Management System",
    description:
      "Developed a comprehensive management system for a flight school to streamline scheduling, student progress tracking, and aircraft maintenance.",
    tags: ["Software Development", "Database Design", "UX/UI"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Aircraft Performance Analysis Tool",
    description:
      "Created a data analysis tool to help a regional airline optimize fuel consumption and improve operational efficiency.",
    tags: ["Data Analysis", "Performance Optimization", "Reporting"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Safety Management System Implementation",
    description:
      "Assisted a charter operation in implementing a comprehensive safety management system to meet regulatory requirements and improve safety culture.",
    tags: ["Safety Systems", "Regulatory Compliance", "Training"],
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function CaseStudies() {
  return (
    <section className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Case Studies</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Examples of aviation challenges I've helped solve
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <Card key={index} className="border-0 shadow-lg overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{study.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">{study.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="p-0 h-auto">
                  <span className="text-primary flex items-center">
                    Read full case study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
