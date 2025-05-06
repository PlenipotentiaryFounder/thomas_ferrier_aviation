"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Zap, Shield, Users, BookOpen, Plane, Wrench, Laptop, Lightbulb } from "lucide-react"

const skillCategories = [
  {
    category: "Flight Skills",
    icon: <Plane className="h-5 w-5 text-blue-500" />,
    skills: [
      { name: "Single-Engine Operations", level: 95 },
      { name: "Multi-Engine Operations", level: 85 },
      { name: "Instrument Flying", level: 90 },
      { name: "Emergency Procedures", level: 95 },
      { name: "Navigation", level: 92 },
    ],
    color: "blue",
  },
  {
    category: "Instruction",
    icon: <BookOpen className="h-5 w-5 text-green-500" />,
    skills: [
      { name: "Flight Instruction", level: 90 },
      { name: "Ground Instruction", level: 95 },
      { name: "Curriculum Development", level: 85 },
      { name: "Student Assessment", level: 90 },
      { name: "Training Material Creation", level: 88 },
    ],
    color: "green",
  },
  {
    category: "Technical",
    icon: <Wrench className="h-5 w-5 text-amber-500" />,
    skills: [
      { name: "Aircraft Systems", level: 88 },
      { name: "Avionics", level: 85 },
      { name: "Maintenance Awareness", level: 80 },
      { name: "Weather Interpretation", level: 92 },
      { name: "Performance Calculations", level: 90 },
    ],
    color: "amber",
  },
  {
    category: "Technology",
    icon: <Laptop className="h-5 w-5 text-purple-500" />,
    skills: [
      { name: "Flight Simulation", level: 90 },
      { name: "Aviation Software", level: 85 },
      { name: "Data Analysis", level: 80 },
      { name: "AI Applications", level: 75 },
      { name: "Programming", level: 70 },
    ],
    color: "purple",
  },
]

const softSkills = [
  { name: "Leadership", icon: <Users className="h-5 w-5" /> },
  { name: "Communication", icon: <Zap className="h-5 w-5" /> },
  { name: "Problem Solving", icon: <Lightbulb className="h-5 w-5" /> },
  { name: "Safety Mindset", icon: <Shield className="h-5 w-5" /> },
]

export default function Skills() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Technical abilities and competencies developed throughout my aviation career.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`p-2 rounded-full ${
                        category.color === "blue"
                          ? "bg-blue-100 dark:bg-blue-900/30"
                          : category.color === "green"
                            ? "bg-green-100 dark:bg-green-900/30"
                            : category.color === "amber"
                              ? "bg-amber-100 dark:bg-amber-900/30"
                              : "bg-purple-100 dark:bg-purple-900/30"
                      }`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold">{category.category}</h3>
                  </div>

                  <div className="space-y-5">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress
                          value={skill.level}
                          className={`h-2 ${
                            category.color === "blue"
                              ? "bg-blue-100 dark:bg-blue-900/30"
                              : category.color === "green"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : category.color === "amber"
                                  ? "bg-amber-100 dark:bg-amber-900/30"
                                  : "bg-purple-100 dark:bg-purple-900/30"
                          }`}
                          indicatorClassName={
                            category.color === "blue"
                              ? "bg-blue-500"
                              : category.color === "green"
                                ? "bg-green-500"
                                : category.color === "amber"
                                  ? "bg-amber-500"
                                  : "bg-purple-500"
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6 text-center">Core Competencies</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {softSkills.map((skill, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="p-4 rounded-full bg-primary/10 mb-4">{skill.icon}</div>
                    <h4 className="font-medium">{skill.name}</h4>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
