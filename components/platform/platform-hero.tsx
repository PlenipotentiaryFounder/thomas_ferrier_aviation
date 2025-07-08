"use client"

import { motion } from "framer-motion"
import { Plane, Star, Users, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function PlatformHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating aviation elements */}
      <motion.div
        className="absolute top-32 right-32 text-blue-400/20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0] 
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Plane className="w-12 h-12" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-32 text-cyan-400/20"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -3, 0] 
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Plane className="w-8 h-8" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Professional Aviation Websites
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            Get Hired
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Faster
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Custom-built aviation websites that showcase your expertise, certifications, and experience. 
            Stand out from other pilots with a professional portfolio that gets you noticed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            asChild
          >
            <Link href="/contact">
              Start Your Custom Website
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            asChild
          >
            <Link href="/demo">
              View Live Demo
            </Link>
          </Button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-slate-300 text-sm">5-star custom websites</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center text-blue-400 mb-2">
              <Users className="w-6 h-6 mr-2" />
              <span className="text-2xl font-bold text-white">50+</span>
            </div>
            <p className="text-slate-300 text-sm">Pilots hired faster</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center text-green-400 mb-2">
              <Zap className="w-6 h-6 mr-2" />
              <span className="text-2xl font-bold text-white">72%</span>
            </div>
            <p className="text-slate-300 text-sm">More interview callbacks</p>
          </div>
        </motion.div>

        {/* Preview showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20"
        >
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Preview cards */}
                {[
                  { title: "Neural Interface", color: "from-blue-500 to-indigo-600" },
                  { title: "Liquid Glass", color: "from-cyan-500 to-blue-500" },
                  { title: "Holographic", color: "from-purple-500 to-pink-500" }
                ].map((theme, index) => (
                  <motion.div
                    key={theme.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                    className="relative"
                  >
                    <div className={`h-48 rounded-xl bg-gradient-to-br ${theme.color} p-4 flex flex-col justify-between`}>
                      <div className="text-white text-sm font-medium">{theme.title} Theme</div>
                      <div className="space-y-2">
                        <div className="h-2 bg-white/30 rounded w-3/4"></div>
                        <div className="h-2 bg-white/20 rounded w-1/2"></div>
                        <div className="h-6 bg-white/40 rounded w-full flex items-center justify-center text-xs font-medium text-white">
                          Professional Portfolio
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <p className="text-slate-400 text-sm">
                  Multiple cutting-edge design themes • Fully customizable • Mobile optimized
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
} 