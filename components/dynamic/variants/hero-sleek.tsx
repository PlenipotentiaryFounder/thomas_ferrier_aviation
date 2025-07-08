'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Plane, Radar, Gauge } from 'lucide-react'
import { ComponentConfig } from '@/types/database'
import { getResponsiveClasses, getAnimationClasses, AVIATION_CLASSES } from '@/lib/theme-system'

interface HeroSleekProps {
  config: ComponentConfig
  variant: any
  themeConfig: any
}

export default function HeroSleek({ config, variant, themeConfig }: HeroSleekProps) {
  const content = config.content as {
    headline: string
    subheadline: string
    description: string
    primaryAction: { text: string; href: string }
    secondaryAction: { text: string; href: string }
    backgroundMedia?: { type: 'image' | 'video'; url: string }
    stats?: Array<{ value: string; label: string }>
  }

  const responsiveClasses = getResponsiveClasses(variant)
  const animationClasses = getAnimationClasses(variant)

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Aviation Grid */}
        <div className="absolute inset-0 aviation-grid opacity-30" />
        
        {/* Radar Grid Overlay */}
        <div className="absolute top-0 right-0 w-96 h-96 radar-grid opacity-20 animate-radar-sweep" />
        
        {/* Floating Cockpit Elements */}
        <div className="absolute top-20 left-10 p-4 cockpit-panel rounded-xl opacity-80">
          <div className="flex items-center space-x-2">
            <div className={AVIATION_CLASSES.cockpit.indicator} />
            <span className={`${AVIATION_CLASSES.glass.hud} animate-cockpit-flicker`}>
              SYSTEM ACTIVE
            </span>
          </div>
        </div>
        
        <div className="absolute bottom-20 right-10 p-3 cockpit-panel rounded-lg opacity-70">
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-color-radar-green animate-pulse" />
            <span className={AVIATION_CLASSES.glass.hud}>ALT: 35,000</span>
          </div>
        </div>
      </div>

      {/* Background Media */}
      {content.backgroundMedia && (
        <div className="absolute inset-0 z-0">
          {content.backgroundMedia.type === 'video' ? (
            <video
              autoPlay
              muted
              loop
              className="w-full h-full object-cover opacity-40"
            >
              <source src={content.backgroundMedia.url} type="video/mp4" />
            </video>
          ) : (
            <img
              src={content.backgroundMedia.url}
              alt="Hero background"
              className="w-full h-full object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />
        </div>
      )}

      {/* Main Content */}
      <div className={`relative z-10 flex items-center min-h-screen ${responsiveClasses}`}>
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-5xl mx-auto">
            
            {/* Animated Aircraft Icon */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <Plane className="w-16 h-16 text-color-aviation-blue animate-bounce-in" />
                <div className="absolute -right-8 top-1/2 w-20 h-px bg-gradient-to-r from-color-aviation-blue to-transparent animate-jet-trail" />
              </div>
            </motion.div>

            {/* Headline with Glass Effect */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-theme-heading font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-color-aviation-blue via-color-cyber-cyan to-color-aviation-blue bg-clip-text text-transparent animate-glass-shine">
                  {content.headline}
                </span>
              </h1>
              
              <div className="glass-effect rounded-2xl p-8 backdrop-blur-cockpit">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-theme-primary text-color-cyber-cyan mb-4 animate-fade-in">
                  {content.subheadline}
                </h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {content.description}
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            >
              <Button 
                size="lg" 
                className="group bg-color-aviation-blue hover:bg-color-cyber-cyan text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-glow"
              >
                {content.primaryAction.text}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-2 border-color-cyber-cyan text-color-cyber-cyan hover:bg-color-cyber-cyan hover:text-slate-900 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-102"
              >
                {content.secondaryAction.text}
              </Button>
            </motion.div>

            {/* Stats Section */}
            {content.stats && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              >
                {content.stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="text-center p-6 cockpit-panel rounded-xl hover:scale-105 transition-all duration-300"
                    style={{ '--stagger-index': index } as React.CSSProperties}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-color-aviation-blue mb-2 animate-pulse-glow">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider font-theme-mono">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Floating Action Indicators */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center space-y-2"
              >
                <span className="text-sm text-gray-400 font-theme-mono uppercase tracking-wider">
                  Scroll to Explore
                </span>
                <div className="w-px h-16 bg-gradient-to-b from-color-aviation-blue to-transparent" />
                <Radar className="w-6 h-6 text-color-aviation-blue animate-pulse" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-color-aviation-blue to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-color-cyber-cyan to-transparent opacity-50" />
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-color-aviation-blue to-transparent opacity-30" />
        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-color-cyber-cyan to-transparent opacity-30" />
      </div>
    </section>
  )
} 