"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"

// Sample data - replace with actual research papers
const researchPapers = [
  {
    id: 1,
    title: "Optimizing Flight Training Curriculum for Modern Avionics",
    abstract:
      "This paper explores how flight training methodologies can be adapted to better prepare pilots for glass cockpit environments and advanced avionics systems.",
    journal: "Journal of Aviation Education",
    date: "2023-01-15",
    tags: ["Flight Training", "Glass Cockpit", "Education"],
    url: "#",
  },
  {
    id: 2,
    title: "Weather Pattern Recognition for General Aviation Pilots",
    abstract:
      "A study on developing pattern recognition skills in general aviation pilots to improve weather-related decision making and reduce weather-related incidents.",
    journal: "Aviation Safety Quarterly",
    date: "2022-09-22",
    tags: ["Weather", "Decision Making", "Safety"],
    url: "#",
  },
  {
    id: 3,
    title: "Environmental Impact of Alternative Aviation Fuels",
    abstract:
      "An analysis of various alternative aviation fuels and their potential to reduce the carbon footprint of general aviation operations.",
    journal: "Sustainable Aviation Research",
    date: "2022-06-10",
    tags: ["Alternative Fuels", "Environment", "Sustainability"],
    url: "#",
  },
  {
    id: 4,
    title: "Cognitive Load Management in Single-Pilot IFR Operations",
    abstract:
      "This research examines strategies for managing cognitive load during single-pilot instrument flight operations, with implications for training and cockpit design.",
    journal: "Journal of Cognitive Aviation Psychology",
    date: "2022-03-05",
    tags: ["IFR", "Cognitive Load", "Single-Pilot"],
    url: "#",
  },
]

export default function ResearchSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Research & Publications</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Academic contributions to the field of aviation education, safety, and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchPapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">{paper.title}</CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(paper.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <CardDescription className="text-sm italic mt-2">Published in: {paper.journal}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm">{paper.abstract}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {paper.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={paper.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Read Paper
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
