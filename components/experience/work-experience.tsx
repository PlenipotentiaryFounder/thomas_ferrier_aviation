"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react"

const workExperience = [
  {
    title: "Certified Flight Instructor",
    company: "Southwest Aviation Academy",
    location: "Phoenix, AZ",
    period: "2025 - Present",
    description:
      "Provide comprehensive flight instruction to students pursuing private and commercial pilot licenses. Develop training materials and conduct ground school sessions.",
    responsibilities: [
      "Instruct students in single and multi-engine aircraft",
      "Develop personalized training plans for each student",
      "Conduct pre-flight and post-flight briefings",
      "Evaluate student progress and provide detailed feedback",
      "Maintain training records and documentation",
    ],
    skills: ["Flight Instruction", "Curriculum Development", "Safety Management"],
    link: "https://example.com/swa",
  },
  {
    title: "Commercial Pilot",
    company: "Desert Air Charter",
    location: "Scottsdale, AZ",
    period: "2024 - 2025",
    description:
      "Operated charter flights throughout the Southwest region. Maintained aircraft logs and conducted pre-flight safety inspections.",
    responsibilities: [
      "Piloted charter flights for business and leisure clients",
      "Conducted thorough pre-flight planning and safety checks",
      "Managed passenger comfort and safety throughout flights",
      "Coordinated with ground crew and air traffic control",
      "Maintained detailed flight logs and documentation",
    ],
    skills: ["Charter Operations", "Flight Planning", "Customer Service"],
    link: "https://example.com/dac",
  },
  {
    title: "Founder",
    company: "FlyRight.AI",
    location: "Phoenix, AZ",
    period: "2023 - Present",
    description: "Founded aviation technology startup focused on AI-enhanced flight training tools and safety systems.",
    responsibilities: [
      "Lead product development for AI-powered flight training applications",
      "Collaborate with aviation experts and software engineers",
      "Secure funding and manage business operations",
      "Present at aviation technology conferences",
      "Develop partnerships with flight schools and training centers",
    ],
    skills: ["Entrepreneurship", "Aviation Technology", "Product Development"],
    link: "https://example.com/flyright",
  },
]

export default function WorkExperience() {
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
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-primary/10">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Work Experience</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            My professional journey through various roles in aviation.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {workExperience.map((job, index) => (
            <motion.div key={index} variants={item}>
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 pb-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-2xl">{job.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-muted-foreground">
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1.5" />
                            {job.company}
                          </div>
                          <div className="hidden sm:block text-muted-foreground">•</div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1.5" />
                            {job.location}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="md:whitespace-nowrap w-fit flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {job.period}
                      </Badge>
                    </div>

                    <p className="mb-6">{job.description}</p>

                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Key Responsibilities:</h4>
                      <ul className="space-y-2 list-disc pl-5">
                        {job.responsibilities.map((responsibility, i) => (
                          <li key={i} className="text-muted-foreground">
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="font-normal">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {job.link && (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary flex items-center hover:underline"
                      >
                        Visit website
                        <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                      </a>
                    )}
                  </div>

                  <div className="h-1 w-full bg-gradient-to-r from-primary/80 via-primary to-accent/80"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
