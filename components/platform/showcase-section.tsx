"use client"

import { motion } from "framer-motion"
import { ExternalLink, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function ShowcaseSection() {
  const showcaseItems = [
    {
      name: "Thomas Ferrier",
      role: "Certified Flight Instructor",
      theme: "Neural Interface",
      url: "/u/thomas-ferrier",
      image: "/images/showcase-neural.jpg",
      stats: { views: "2.4k", interviews: 15, hired: true },
      themeColor: "from-blue-500 to-indigo-600",
      description: "Clean, professional design perfect for instructors and corporate pilots"
    },
    {
      name: "Sarah Mitchell", 
      role: "Commercial Pilot",
      theme: "Liquid Glass",
      url: "#",
      image: "/images/showcase-liquid.jpg", 
      stats: { views: "1.8k", interviews: 12, hired: true },
      themeColor: "from-cyan-500 to-blue-500",
      description: "Stunning glass morphism effects that captivate airline recruiters"
    },
    {
      name: "Michael Chen",
      role: "Airline Transport Pilot", 
      theme: "Holographic",
      url: "#",
      image: "/images/showcase-holo.jpg",
      stats: { views: "3.1k", interviews: 22, hired: true },
      themeColor: "from-purple-500 to-pink-500", 
      description: "Cutting-edge holographic design that stands out from traditional resumes"
    }
  ]

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Success Stories
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Pilots Getting
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Hired Faster
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            See how our custom aviation websites are helping pilots land their dream jobs 
            with professional portfolios that showcase their expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-xl">
                {/* Preview Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.themeColor} p-6`}>
                    {/* Mock website preview */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-full flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                        <div>
                          <div className="h-3 bg-white/30 rounded w-24 mb-1"></div>
                          <div className="h-2 bg-white/20 rounded w-16"></div>
                        </div>
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="h-2 bg-white/25 rounded w-full"></div>
                        <div className="h-2 bg-white/20 rounded w-3/4"></div>
                        <div className="h-2 bg-white/15 rounded w-1/2"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="h-8 bg-white/20 rounded"></div>
                        <div className="h-8 bg-white/15 rounded"></div>
                        <div className="h-8 bg-white/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Theme badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                    {item.theme}
                  </div>
                  
                  {/* Hired badge */}
                  {item.stats.hired && (
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-green-500 rounded-full text-white text-xs font-bold">
                      ✈️ HIRED!
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {item.role}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="shrink-0"
                      asChild
                    >
                      <Link href={item.url === "#" ? "/demo" : item.url}>
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Link>
                    </Button>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                    {item.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.stats.views}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Profile Views
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {item.stats.interviews}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Interviews
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        {item.stats.hired ? "✓" : "—"}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Hired
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Them?
            </h3>
            <p className="text-xl mb-8 text-blue-100">
              Get your custom aviation website and start getting noticed by employers today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                asChild
              >
                <Link href="/contact">
                  Start Your Website
                  <ExternalLink className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
                asChild
              >
                <Link href="/demo">
                  Try Interactive Demo
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 