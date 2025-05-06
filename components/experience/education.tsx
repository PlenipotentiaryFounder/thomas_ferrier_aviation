"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, MapPin, ExternalLink, Award } from "lucide-react"

const education = [
  {
    degree: "Bachelor of Science in Aeronautical Science",
    institution: "Embry-Riddle Aeronautical University",
    location: "Prescott, AZ",
    period: "2020 - 2024",
    description:
      "Specialized in professional flight with minor in aviation safety. Graduated with honors and completed advanced coursework in aerodynamics, aviation weather, and flight physiology.",
    courses: [
      "Advanced Aerodynamics",
      "Aviation Weather",
      "Flight Physiology",
      "Aviation Law",
      "Aircraft Systems and Components",
      "Aviation Safety Management",
    ],
    achievements: ["Dean's List", "Aviation Safety Research Award", "Student Pilot Association President"],
    link: "https://example.com/erau",
  },
  {
    degree: "Advanced Aviation Training",
    institution: "National Flight Academy",
    location: "Tucson, AZ",
    period: "Summer 2023",
    description:
      "Intensive summer program focused on advanced flight techniques, emergency procedures, and instructor methodology.",
    courses: [
      "Advanced Flight Maneuvers",
      "Emergency Procedures Training",
      "Instructor Methodology",
      "Aviation Communication",
    ],
    achievements: ["Outstanding Performance Certificate", "Emergency Procedures Excellence Award"],
    link: "https://example.com/nfa",
  },
]

export default function Education() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-accent/10">
              <GraduationCap className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Academic background and specialized aviation training.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {education.map((edu, index) => (
            <motion.div key={index} variants={item}>
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 pb-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-2xl">{edu.degree}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-muted-foreground">
                          <div className="flex items-center">
                            <GraduationCap className="h-4 w-4 mr-1.5" />
                            {edu.institution}
                          </div>
                          <div className="hidden sm:block text-muted-foreground">•</div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1.5" />
                            {edu.location}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="md:whitespace-nowrap w-fit flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {edu.period}
                      </Badge>
                    </div>

                    <p className="mb-6">{edu.description}</p>

                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Key Courses:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {edu.courses.map((course, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <GraduationCap className="h-3 w-3 text-accent" />
                            </div>
                            <span className="text-muted-foreground">{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Achievements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map((achievement, i) => (
                          <Badge
                            key={i}
                            className="bg-accent/10 text-accent hover:bg-accent/20 transition-colors border-0"
                          >
                            <Award className="h-3.5 w-3.5 mr-1.5" />
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {edu.link && (
                      <a
                        href={edu.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent flex items-center hover:underline"
                      >
                        Visit institution website
                        <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                      </a>
                    )}
                  </div>

                  <div className="h-1 w-full bg-gradient-to-r from-accent/80 via-accent to-primary/80"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
