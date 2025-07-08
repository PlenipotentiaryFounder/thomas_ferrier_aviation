"use client"

import { motion } from "framer-motion"
import { Check, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function PricingPreview() {
  const packages = [
    {
      name: "Essential",
      price: "$2,995",
      description: "Perfect for new pilots and flight instructors",
      features: [
        "Custom aviation-themed design",
        "Professional domain (yourname.aviationpro.co)",
        "5 core pages (Home, About, Experience, Certifications, Contact)",
        "Mobile-optimized responsive design",
        "Admin dashboard for content updates",
        "3 months of maintenance included",
        "Email support"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Professional",
      price: "$4,995",
      description: "Ideal for commercial pilots and aviation professionals",
      features: [
        "Everything in Essential, plus:",
        "Advanced theme customization",
        "Flight logbook integration",
        "Photo gallery with 50+ images",
        "Interactive resume timeline",
        "Video testimonials section",
        "6 months of maintenance included",
        "Priority phone & email support",
        "Social media integration"
      ],
      popular: true,
      cta: "Most Popular"
    },
    {
      name: "Executive",
      price: "$7,995",
      description: "Premium solution for airline pilots and aviation executives",
      features: [
        "Everything in Professional, plus:",
        "Multiple theme variants",
        "Custom interactive elements",
        "Advanced analytics dashboard",
        "Interview video management system",
        "Custom contact forms",
        "12 months of maintenance included",
        "Dedicated account manager",
        "Quarterly strategy calls",
        "Custom integrations"
      ],
      popular: false,
      cta: "Go Premium"
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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Investment Options
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Choose Your
            <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Package
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            One-time investment in your aviation career. All packages include ongoing 
            maintenance, hosting, and support to keep your website performing perfectly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full">
                  Most Popular
                </div>
              )}
              
              <Card className={`h-full relative overflow-hidden ${
                pkg.popular 
                  ? 'border-2 border-blue-500 shadow-2xl transform scale-105' 
                  : 'border border-slate-200 dark:border-slate-700 shadow-lg'
              }`}>
                {pkg.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                )}
                
                <CardContent className="p-8 relative">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {pkg.description}
                    </p>
                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
                      {pkg.price}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">
                      One-time investment
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                        : ''
                    }`}
                    size="lg"
                    asChild
                  >
                    <Link href="/contact">
                      {pkg.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="max-w-4xl mx-auto bg-slate-100 dark:bg-slate-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              All Packages Include
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Hosting & SSL
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Admin Training
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Mobile Optimized
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                SEO Ready
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Not sure which package is right for you? 
                <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                  Schedule a free consultation
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 