"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Captain Sarah Mitchell",
      role: "Southwest Airlines Pilot",
      company: "Southwest Airlines",
      image: "/images/testimonial-sarah.jpg",
      content: "The custom website completely transformed my job search. I went from getting no responses to having 3 major airlines reach out within the first month. The neural interface design really made me stand out.",
      rating: 5,
      result: "Hired in 6 weeks"
    },
    {
      name: "Michael Chen",
      role: "Corporate Pilot",
      company: "NetJets",
      image: "/images/testimonial-michael.jpg", 
      content: "I was skeptical about investing in a website, but the ROI was incredible. The professional URL and liquid glass design impressed every employer I sent it to. Worth every penny.",
      rating: 5,
      result: "3x more interviews"
    },
    {
      name: "David Rodriguez",
      role: "CFI & Commercial Pilot",
      company: "ATP Flight School",
      image: "/images/testimonial-david.jpg",
      content: "As a flight instructor, I needed to stand out from hundreds of other CFIs. The holographic theme and interview video section got me noticed by Delta's recruitment team.",
      rating: 5,
      result: "Dream job at Delta"
    },
    {
      name: "Jennifer Walsh",
      role: "First Officer",
      company: "United Airlines",
      image: "/images/testimonial-jennifer.jpg",
      content: "The process was seamless and the team understood exactly what airlines look for. My website showcases my experience perfectly and the admin dashboard makes updates so easy.",
      rating: 5,
      result: "Promoted to Captain"
    },
    {
      name: "Marcus Johnson",
      role: "Charter Pilot",
      company: "Flexjet",
      image: "/images/testimonial-marcus.jpg",
      content: "The professional package with the flight logbook integration was a game-changer. Employers could see my exact experience and certifications instantly. No more sending PDFs back and forth.",
      rating: 5,
      result: "Hired within 2 months"
    },
    {
      name: "Lisa Thompson",
      role: "Helicopter Pilot",
      company: "PHI Air Medical",
      image: "/images/testimonial-lisa.jpg",
      content: "Even in the helicopter industry, having a professional website made all the difference. The customization options perfectly showcased my EMS and offshore experience.",
      rating: 5,
      result: "Multiple job offers"
    }
  ]

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Client Success Stories
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Pilots Love Their
            <span className="block bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              New Websites
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            See what aviation professionals are saying about their custom websites 
            and how they're transforming their careers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* Quote icon */}
                  <div className="text-blue-500 mb-4">
                    <Quote className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Result badge */}
                  <div className="inline-flex items-center px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium rounded-full mb-4">
                    ✈️ {testimonial.result}
                  </div>

                  {/* Author */}
                  <div className="flex items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.role}
                      </div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">
              Join the Success Stories
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-blue-100">Get More Interviews</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">72%</div>
                <div className="text-blue-100">Hired Faster</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">89%</div>
                <div className="text-blue-100">Salary Increase</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-100">Satisfaction Rate</div>
              </div>
            </div>
            
            <p className="text-xl text-blue-100">
              Ready to transform your aviation career with a professional website?
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 