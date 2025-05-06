"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Plane, BookOpen, Compass, Award } from "lucide-react"

export default function Stats() {
  const stats = [
    {
      icon: <Plane className="h-10 w-10 text-primary" />,
      title: "200+",
      description: "Flight Hours",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-accent" />,
      title: "50+",
      description: "Students Trained",
    },
    {
      icon: <Compass className="h-10 w-10 text-sky" />,
      title: "25+",
      description: "Airports Visited",
    },
    {
      icon: <Award className="h-10 w-10 text-gold" />,
      title: "4",
      description: "Certifications",
    },
  ]

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">By the Numbers</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A snapshot of my aviation experience and accomplishments.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-hover h-full border-0 shadow-lg overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-primary/10">{stat.icon}</div>
                  <h3 className="text-3xl font-bold mb-1">{stat.title}</h3>
                  <p className="text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
