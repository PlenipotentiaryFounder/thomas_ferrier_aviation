"use client"

import { motion } from "framer-motion"
import { Award, Check, Calendar, FileText, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const certifications = [
  {
    title: "Flight Instructor",
    type: "CFI",
    description: "Certified to instruct students in single-engine aircraft",
    date: "April 2025",
    endorsements: ["Ground Instruction", "Flight Proficiency", "Spin Training"],
    color: "blue",
  },
  {
    title: "Commercial Pilot",
    type: "CPL",
    description: "Multi-Engine and Single-Engine Land",
    date: "January 2025",
    endorsements: ["Complex Aircraft", "High Performance"],
    color: "green",
  },
  {
    title: "Instrument Rating",
    type: "IR",
    description: "Qualified for instrument flight rules operations",
    date: "August 2024",
    endorsements: ["Approach Procedures", "Holding Patterns", "Airways Navigation"],
    color: "purple",
  },
  {
    title: "Private Pilot",
    type: "PPL",
    description: "Single-Engine Land",
    date: "July 2024",
    endorsements: ["Night Flying", "Cross-Country"],
    color: "amber",
  },
]

export default function CertificationsList() {
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
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">FAA Certifications</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional aviation certifications and ratings earned through rigorous training and examination.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {certifications.map((cert, index) => (
            <motion.div key={cert.type} variants={item}>
              <CertificationCard certification={cert} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Button variant="outline" size="lg" className="group">
            <FileText className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
            <span className="mr-2">Download Complete Certificate Records</span>
            <Download className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function CertificationCard({
  certification,
}: {
  certification: {
    title: string
    type: string
    description: string
    date: string
    endorsements: string[]
    color: "blue" | "green" | "purple" | "amber"
  }
}) {
  return (
    <Card className={cn("card-hover h-full overflow-hidden border-0 shadow-lg relative")}>
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-1",
          certification.color === "blue" && "bg-blue-500",
          certification.color === "green" && "bg-green-500",
          certification.color === "purple" && "bg-purple-500",
          certification.color === "amber" && "bg-amber-500",
        )}
      />

      <CardHeader className="pb-2 pt-6">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant="outline"
            className={cn(
              "w-fit font-medium",
              certification.color === "blue" &&
                "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800",
              certification.color === "green" &&
                "border-green-200 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800",
              certification.color === "purple" &&
                "border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800",
              certification.color === "amber" &&
                "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800",
            )}
          >
            {certification.type}
          </Badge>

          <div className="flex items-center text-muted-foreground text-sm">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {certification.date}
          </div>
        </div>

        <CardTitle className="flex items-center gap-2 text-xl">
          <Award
            className={cn(
              "h-5 w-5",
              certification.color === "blue" && "text-blue-500",
              certification.color === "green" && "text-green-500",
              certification.color === "purple" && "text-purple-500",
              certification.color === "amber" && "text-amber-500",
            )}
          />
          {certification.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4">{certification.description}</p>

        <h4 className="text-sm font-semibold mb-3">Endorsements:</h4>
        <ul className="space-y-2">
          {certification.endorsements.map((endorsement, i) => (
            <li key={i} className="text-sm flex items-start gap-2">
              <div
                className={cn(
                  "mt-0.5 h-4 w-4 rounded-full flex items-center justify-center",
                  certification.color === "blue" && "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
                  certification.color === "green" &&
                    "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
                  certification.color === "purple" &&
                    "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
                  certification.color === "amber" &&
                    "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
                )}
              >
                <Check className="h-3 w-3" />
              </div>
              <span>{endorsement}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-2 pb-6">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full text-xs justify-start pl-2 -ml-2",
            certification.color === "blue" &&
              "text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/50",
            certification.color === "green" &&
              "text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/50",
            certification.color === "purple" &&
              "text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950/50",
            certification.color === "amber" &&
              "text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/50",
          )}
        >
          <FileText className="h-3.5 w-3.5 mr-1.5" />
          View certificate details
        </Button>
      </CardFooter>
    </Card>
  )
}
