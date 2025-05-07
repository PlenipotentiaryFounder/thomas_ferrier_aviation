"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Award, BookOpen, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const timelineEvents = [
  {
    date: "April 2025",
    title: "Certified Flight Instructor (CFI)",
    description: "Earned CFI certificate after rigorous training and examination",
    icon: <Award className="h-5 w-5 text-white" />,
    color: "blue",
  },
  {
    date: "January 2025",
    title: "Commercial Pilot License (CPL)",
    description: "Achieved commercial pilot status with multi-engine and single-engine land ratings",
    icon: <Award className="h-5 w-5 text-white" />,
    color: "green",
  },
  {
    date: "October 2024",
    title: "Advanced Ground Instructor",
    description: "Completed training to provide advanced ground instruction",
    icon: <BookOpen className="h-5 w-5 text-white" />,
    color: "amber",
  },
  {
    date: "August 2024",
    title: "Instrument Rating",
    description: "Qualified for instrument flight rules operations",
    icon: <Award className="h-5 w-5 text-white" />,
    color: "purple",
  },
  {
    date: "July 2024",
    title: "Private Pilot License (PPL)",
    description: "First major milestone in aviation career",
    icon: <Award className="h-5 w-5 text-white" />,
    color: "blue",
  },
  {
    date: "May 2024",
    title: "First Solo Flight",
    description: "Completed first solo flight in a Cessna 172",
    icon: <CheckCircle className="h-5 w-5 text-white" />,
    color: "green",
  },
]

export default function Timeline() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Certification Timeline</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey through aviation training and certification milestones.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:translate-x-0 translate-x-[11px]"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn("relative flex flex-col md:flex-row", index % 2 === 0 ? "md:flex-row-reverse" : "")}
              >
                <div className="md:w-1/2 flex md:justify-end">
                  <Card
                    className={cn(
                      "w-[calc(100%-40px)] md:w-[90%] border-0 shadow-lg overflow-hidden",
                      index % 2 === 0 ? "md:mr-0 md:ml-auto" : "md:ml-0 md:mr-auto",
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{event.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-0 md:left-1/2 top-6 w-6 h-6 rounded-full transform -translate-x-[10px] md:-translate-x-1/2 flex items-center justify-center",
                    event.color === "blue" && "bg-blue-500",
                    event.color === "green" && "bg-green-500",
                    event.color === "purple" && "bg-purple-500",
                    event.color === "amber" && "bg-amber-500",
                  )}
                >
                  {event.icon}
                </div>

                <div className="md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
