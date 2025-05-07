"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data - replace with actual tech stack
const techCategories = [
  {
    id: "frontend",
    name: "Frontend",
    technologies: [
      { name: "React", description: "UI library for building interactive interfaces" },
      { name: "Next.js", description: "React framework for production-grade applications" },
      { name: "TypeScript", description: "Typed superset of JavaScript for safer code" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { name: "Three.js", description: "3D graphics library for web applications" },
      { name: "D3.js", description: "Data visualization library" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    technologies: [
      { name: "Node.js", description: "JavaScript runtime for server-side applications" },
      { name: "Express", description: "Web framework for Node.js" },
      { name: "Supabase", description: "Open source Firebase alternative" },
      { name: "PostgreSQL", description: "Advanced open source database" },
      { name: "Firebase", description: "Platform for mobile and web applications" },
    ],
  },
  {
    id: "mobile",
    name: "Mobile",
    technologies: [
      { name: "React Native", description: "Framework for building native mobile apps" },
      { name: "Expo", description: "Platform for universal React applications" },
      { name: "Swift", description: "Apple's language for iOS development" },
    ],
  },
  {
    id: "data",
    name: "Data & ML",
    technologies: [
      { name: "Python", description: "Programming language for data science and ML" },
      { name: "TensorFlow", description: "Open source machine learning framework" },
      { name: "Pandas", description: "Data analysis and manipulation library" },
      { name: "NumPy", description: "Library for numerical computations" },
      { name: "Matplotlib", description: "Visualization library for Python" },
    ],
  },
]

export default function TechnologyStack() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technology Stack</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            The tools and technologies I use to build innovative aviation solutions.
          </p>
        </motion.div>

        <Tabs defaultValue="frontend" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              {techCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {techCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {category.technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="h-full border-border/50 hover:shadow-md transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2">{tech.name}</h3>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
