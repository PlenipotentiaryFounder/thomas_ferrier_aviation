"use client"

import { motion } from "framer-motion"
import { Palette, Code, Smartphone, Shield, Zap, Users, Globe, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ServicesSection() {
  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Custom Design",
      description: "Bespoke aviation-themed designs that reflect your professional brand and expertise",
      features: ["Neural Interface themes", "Liquid Glass aesthetics", "Holographic elements"]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Professional Development",
      description: "Hand-coded websites built with cutting-edge technology for maximum performance",
      features: ["Next.js framework", "Optimized performance", "SEO-ready structure"]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Excellence",
      description: "Stunning responsive design that looks perfect on every device and screen size",
      features: ["Ultra-responsive design", "Touch-optimized", "Mobile-first approach"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Professional URL",
      description: "Your own branded web address that builds credibility with employers",
      features: ["yourdomain.com/u/yourname", "Professional appearance", "Easy to remember"]
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Easy Management",
      description: "Simple dashboard to update content, photos, and information yourself",
      features: ["User-friendly admin", "Content updates", "Photo management"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Ongoing Support",
      description: "Maintenance, hosting, and support included to keep your site running perfectly",
      features: ["Monthly maintenance", "Security updates", "Technical support"]
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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            What You Get
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Everything You Need to
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Stand Out
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            We handle everything from design to development, giving you a complete professional 
            website that showcases your aviation expertise and gets you noticed by employers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-blue-600 dark:text-blue-400 mb-4">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Process overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Simple 3-Step Process
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We discuss your goals, review your experience, and choose the perfect design theme"
              },
              {
                step: "02", 
                title: "Development",
                description: "We build your custom website with your content, photos, and professional information"
              },
              {
                step: "03",
                title: "Launch & Support",
                description: "Your site goes live with training on the admin dashboard and ongoing support"
              }
            ].map((step, index) => (
              <div key={step.step} className="relative">
                <div className="text-6xl font-bold text-blue-500/20 dark:text-blue-400/20 mb-4">
                  {step.step}
                </div>
                <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 