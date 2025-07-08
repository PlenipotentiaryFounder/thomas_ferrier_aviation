"use client"

import { motion } from "framer-motion"
import { Calendar, Palette, Rocket, CheckCircle } from "lucide-react"

export default function ProcessSection() {
  const steps = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Book Consultation",
      duration: "30 minutes",
      description: "We discuss your aviation background, career goals, and design preferences to create the perfect website strategy."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Design & Development",
      duration: "5-7 days",
      description: "Our team creates your custom website with your content, photos, certifications, and chosen theme."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Launch & Training",
      duration: "1 hour",
      description: "Your site goes live with your professional URL. We provide admin dashboard training and ongoing support."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Ongoing Success",
      duration: "Ongoing",
      description: "Monthly maintenance, content updates, and support to keep your site performing at its best."
    }
  ]

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            How It
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            From initial consultation to ongoing success, we handle everything so you can 
            focus on your aviation career while we build your professional online presence.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-4 border-white dark:border-slate-800 shadow-lg"></div>

                {/* Step number */}
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                  <div className="text-center lg:text-left">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-bold text-xl mb-6">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-16' : 'lg:pr-16'}`}>
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                    <div className="text-blue-600 dark:text-blue-400 mb-4">
                      {step.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    
                    <div className="inline-flex items-center px-3 py-1 bg-blue-500/10 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                      {step.duration}
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white font-medium">
            <CheckCircle className="w-5 h-5 mr-2" />
            Get started in less than 30 minutes
          </div>
        </motion.div>
      </div>
    </section>
  )
} 