"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Heart, Zap, BookOpen, Users, Target } from "lucide-react"

const values = [
  {
    icon: <Shield className="h-10 w-10 text-blue-500" />,
    title: "Safety",
    description:
      "Safety is paramount in everything I do. I instill a culture of safety-first thinking in all my students and projects.",
  },
  {
    icon: <Heart className="h-10 w-10 text-red-500" />,
    title: "Passion",
    description: "My love for aviation drives me to continuously improve and share that enthusiasm with others.",
  },
  {
    icon: <Zap className="h-10 w-10 text-amber-500" />,
    title: "Innovation",
    description: "I'm constantly seeking new ways to enhance flight training and aviation technology.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-green-500" />,
    title: "Education",
    description: "I believe in lifelong learning and adapting teaching methods to each student's unique needs.",
  },
  {
    icon: <Users className="h-10 w-10 text-purple-500" />,
    title: "Community",
    description: "Aviation is built on community. I'm committed to fostering connections among pilots and enthusiasts.",
  },
  {
    icon: <Target className="h-10 w-10 text-cyan-500" />,
    title: "Excellence",
    description: "I strive for excellence in every aspect of my work, from instruction to technology development.",
  },
]

export default function Values() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-16 relative overflow-hidden bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Core Values</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The principles that guide my approach to aviation, instruction, and innovation.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {values.map((value, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full border-0 shadow-lg overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-secondary mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
