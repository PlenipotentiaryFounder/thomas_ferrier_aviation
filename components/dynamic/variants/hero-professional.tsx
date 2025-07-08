'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Award, Users } from 'lucide-react'
import { ComponentConfig } from '@/types/database'
import { getResponsiveClasses, getAnimationClasses } from '@/lib/theme-system'

interface HeroProfessionalProps {
  config: ComponentConfig
  variant: any
  themeConfig: any
}

export default function HeroProfessional({ config, variant, themeConfig }: HeroProfessionalProps) {
  const content = config.content as {
    headline: string
    subheadline: string
    description: string
    primaryAction: { text: string; href: string }
    secondaryAction: { text: string; href: string }
    backgroundMedia?: { type: 'image' | 'video'; url: string }
    certifications?: Array<{ name: string; icon: string }>
    stats?: Array<{ value: string; label: string }>
  }

  const responsiveClasses = getResponsiveClasses(variant)
  const animationClasses = getAnimationClasses(variant)

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Background Media */}
      {content.backgroundMedia && (
        <div className="absolute inset-0 z-0">
          {content.backgroundMedia.type === 'video' ? (
            <video
              autoPlay
              muted
              loop
              className="w-full h-full object-cover opacity-20"
            >
              <source src={content.backgroundMedia.url} type="video/mp4" />
            </video>
          ) : (
            <img
              src={content.backgroundMedia.url}
              alt="Hero background"
              className="w-full h-full object-cover opacity-20"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/40 dark:from-slate-900/80 dark:via-transparent dark:to-slate-900/40" />
        </div>
      )}

      {/* Main Content */}
      <div className={`relative z-10 flex items-center min-h-screen ${responsiveClasses}`}>
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            
            {/* Content Column */}
            <div className="space-y-8">
              
              {/* Trust Indicators */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex items-center space-x-4 text-sm text-color-navy-blue dark:text-color-gold-accent font-semibold"
              >
                <Shield className="w-5 h-5" />
                <span>Certified Professional Aviation Services</span>
                <Award className="w-5 h-5" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-theme-heading font-bold text-slate-900 dark:text-white leading-tight">
                  {content.headline}
                </h1>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-theme-primary text-color-navy-blue dark:text-color-gold-accent font-medium">
                  {content.subheadline}
                </h2>
                
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                  {content.description}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  size="lg" 
                  className="bg-color-navy-blue hover:bg-color-aviation-blue text-white px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  {content.primaryAction.text}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-color-navy-blue text-color-navy-blue hover:bg-color-navy-blue hover:text-white px-8 py-4 text-lg rounded-lg transition-all duration-300"
                >
                  {content.secondaryAction.text}
                </Button>
              </motion.div>

              {/* Certifications */}
              {content.certifications && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="space-y-4"
                >
                  <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Certifications & Credentials
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {content.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
                      >
                        <img src={cert.icon} alt={cert.name} className="w-6 h-6" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {cert.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Visual Column */}
            <div className="relative">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative"
              >
                {/* Main Visual Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700">
                  <div className="space-y-6">
                    
                    {/* Professional Photo Placeholder */}
                    <div className="relative">
                      <div className="w-full h-64 bg-gradient-to-br from-color-navy-blue to-color-aviation-blue rounded-xl flex items-center justify-center">
                        <Users className="w-16 h-16 text-white opacity-50" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-color-gold-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Professional
                      </div>
                    </div>

                    {/* Stats Grid */}
                    {content.stats && (
                      <div className="grid grid-cols-2 gap-4">
                        {content.stats.map((stat, index) => (
                          <div 
                            key={index}
                            className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
                          >
                            <div className="text-2xl md:text-3xl font-bold text-color-navy-blue dark:text-color-gold-accent mb-1">
                              {stat.value}
                            </div>
                            <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Experience Timeline */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800 dark:text-white">Experience Highlights</h4>
                      <div className="space-y-2">
                        {[
                          "Commercial Pilot License",
                          "Instrument Rating",
                          "Multi-Engine Rating"
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-color-navy-blue rounded-full"></div>
                            <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-color-gold-accent rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-color-navy-blue rounded-full opacity-40"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>FAA Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Insured & Bonded</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Trusted by 500+ Students</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 