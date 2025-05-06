"use client"

import { motion } from "framer-motion"
import { Check, Shield, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const endorsements = [
  {
    category: "Aircraft",
    items: [
      {
        name: "Complex Aircraft",
        description: "Aircraft with retractable landing gear, flaps, and controllable pitch propeller",
      },
      { name: "High Performance", description: "Aircraft with an engine of more than 200 horsepower" },
      { name: "Tailwheel", description: "Aircraft with conventional landing gear" },
    ],
  },
  {
    category: "Operations",
    items: [
      { name: "Night Flying", description: "Operations conducted between sunset and sunrise" },
      { name: "Cross-Country", description: "Flights beyond 50 nautical miles from the departure point" },
      { name: "Mountain Flying", description: "Operations in mountainous terrain and high-altitude airports" },
    ],
  },
  {
    category: "Instruction",
    items: [
      { name: "Ground Instruction", description: "Classroom and one-on-one theoretical knowledge instruction" },
      { name: "Flight Proficiency", description: "In-flight training and demonstration of maneuvers" },
      { name: "Spin Training", description: "Recognition, prevention, and recovery from spins" },
    ],
  },
]

export default function EndorsementsSection() {
  return (
    <section className="py-16 relative overflow-hidden bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Endorsements & Qualifications</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Specialized training and endorsements that enhance my capabilities as a pilot and instructor.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {endorsements.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-full bg-primary/10">
                      {category.category === "Aircraft" ? (
                        <Plane className="h-5 w-5 text-primary" />
                      ) : category.category === "Operations" ? (
                        <Shield className="h-5 w-5 text-primary" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold">{category.category} Endorsements</h3>
                  </div>

                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex items-start gap-3">
                        <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
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
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">
            Instrument Proficiency
          </Badge>
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800">
            Emergency Procedures
          </Badge>
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800">
            Formation Flying
          </Badge>
          <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800">
            Aerobatics
          </Badge>
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800">
            Emergency Maneuvers
          </Badge>
          <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 border-sky-200 dark:border-sky-800">
            Glass Cockpit
          </Badge>
          <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
            Advanced Navigation
          </Badge>
          <Badge className="bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 border-pink-200 dark:border-pink-800">
            Upset Recovery
          </Badge>
        </motion.div>
      </div>
    </section>
  )
}

// Import the Plane component that was missing
import { Plane } from "lucide-react"
