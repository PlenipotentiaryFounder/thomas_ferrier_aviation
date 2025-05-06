"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Briefcase, GraduationCap, Calendar, MapPin, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRef } from "react"

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const workExperience = [
    {
      title: "Certified Flight Instructor",
      company: "Southwest Aviation Academy",
      location: "Phoenix, AZ",
      period: "2025 - Present",
      description:
        "Provide comprehensive flight instruction to students pursuing private and commercial pilot licenses. Develop training materials and conduct ground school sessions.",
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
      skills: ["Charter Operations", "Flight Planning", "Customer Service"],
      link: "https://example.com/dac",
    },
    {
      title: "Founder",
      company: "FlyRight.AI",
      location: "Phoenix, AZ",
      period: "2023 - Present",
      description:
        "Founded aviation technology startup focused on AI-enhanced flight training tools and safety systems.",
      skills: ["Entrepreneurship", "Aviation Technology", "Product Development"],
      link: "https://example.com/flyright",
    },
  ]

  const education = [
    {
      degree: "Bachelor of Science in Aeronautical Science",
      institution: "Embry-Riddle Aeronautical University",
      location: "Prescott, AZ",
      period: "2020 - 2024",
      description: "Specialized in professional flight with minor in aviation safety. Graduated with honors.",
      achievements: ["Dean's List", "Aviation Safety Research Award", "Student Pilot Association President"],
      link: "https://example.com/erau",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section id="experience" className="relative py-32 overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-secondary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-secondary/50 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>

        <motion.div
          style={{ y, opacity }}
          className="absolute -right-64 top-64 w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity }}
          className="absolute -left-64 bottom-64 w-[30rem] h-[30rem] rounded-full bg-accent/5 blur-3xl"
        />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="section-title relative inline-block">
            Experience & Education
            <motion.div
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: "50%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            Professional journey through aviation and academic achievements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="p-2 rounded-full bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="section-subtitle mb-0">Work Experience</h3>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={container}
              className="space-y-8"
            >
              {workExperience.map((job, index) => (
                <motion.div key={index} variants={item}>
                  <TimelineItem
                    title={job.title}
                    subtitle={job.company}
                    location={job.location}
                    period={job.period}
                    description={job.description}
                    tags={job.skills}
                    link={job.link}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="p-2 rounded-full bg-accent/10">
                <GraduationCap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="section-subtitle mb-0">Education</h3>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={container}
              className="space-y-8"
            >
              {education.map((edu, index) => (
                <motion.div key={index} variants={item}>
                  <TimelineItem
                    title={edu.degree}
                    subtitle={edu.institution}
                    location={edu.location}
                    period={edu.period}
                    description={edu.description}
                    tags={edu.achievements}
                    link={edu.link}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({
  title,
  subtitle,
  location,
  period,
  description,
  tags,
  link,
}: {
  title: string
  subtitle: string
  location: string
  period: string
  description: string
  tags: string[]
  link?: string
}) {
  return (
    <Card className="card-hover border-0 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 pb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
            <div>
              <h4 className="font-bold text-xl">{title}</h4>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-muted-foreground">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1.5" />
                  {subtitle}
                </div>
                <div className="hidden sm:block text-muted-foreground">•</div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1.5" />
                  {location}
                </div>
              </div>
            </div>
            <Badge variant="outline" className="md:whitespace-nowrap w-fit flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {period}
            </Badge>
          </div>

          <p className="mb-4">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>

          {link && (
            <a
              href={link}
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
  )
}
