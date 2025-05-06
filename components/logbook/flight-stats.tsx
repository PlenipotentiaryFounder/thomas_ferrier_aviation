"use client"

import { motion } from "framer-motion"
import { Plane, CloudSun, CloudRain, Users, Clock, MapPin, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Total Hours",
    value: "2,500+",
    icon: Clock,
    description: "Accumulated flight time",
  },
  {
    title: "PIC Time",
    value: "1,800+",
    icon: Plane,
    description: "Pilot in command hours",
  },
  {
    title: "Instruction Given",
    value: "950+",
    icon: Users,
    description: "Hours teaching students",
  },
  {
    title: "Night Hours",
    value: "320+",
    icon: Calendar,
    description: "Hours flown at night",
  },
  {
    title: "IFR Hours",
    value: "480+",
    icon: CloudRain,
    description: "Instrument flight rules",
  },
  {
    title: "Cross Country",
    value: "1,200+",
    icon: MapPin,
    description: "Long distance flights",
  },
  {
    title: "VFR Hours",
    value: "2,020+",
    icon: CloudSun,
    description: "Visual flight rules",
  },
  {
    title: "Airports Visited",
    value: "120+",
    icon: MapPin,
    description: "Unique landing locations",
  },
]

export default function FlightStats() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Flight Statistics</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my flight experience across various conditions, aircraft types, and roles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{stat.title}</h3>
                      <p className="text-sm text-muted-foreground">{stat.description}</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold mt-4">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
