"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Radar, Zap, Brain, Globe, Target, Navigation } from "lucide-react";

interface HeroModernProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: string;
  secondaryAction?: string;
  stats?: Array<{ label: string; value: string; }>;
  backgroundImage?: string;
  variant?: "liquid-glass" | "neural-interface" | "holographic" | "bio-symbiotic";
}

export default function HeroModern({
  title = "NEXT-GEN AVIATION INTERFACE",
  subtitle = "Neural Flight Systems",
  description = "Experience the future of aviation with our revolutionary bio-symbiotic flight interface. Seamlessly merge human intuition with advanced AI systems through liquid glass morphology and neural-responsive controls.",
  primaryAction = "Initialize Neural Link",
  secondaryAction = "View Holographic Demo",
  stats = [
    { label: "Neural Response", value: "0.002ms" },
    { label: "Bio-Sync Rate", value: "99.97%" },
    { label: "Quantum Coherence", value: "100%" },
    { label: "Dimensional Stability", value: "∞" }
  ],
  backgroundImage = "/images/aircraft-wing-sunset-clouds.jpg",
  variant = "neural-interface"
}: HeroModernProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [neuralActivity, setNeuralActivity] = useState(0);

  // Advanced parallax transforms
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // Neural activity simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralActivity(Math.sin(Date.now() * 0.003) * 0.5 + 0.5);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for holographic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case "liquid-glass":
        return {
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(40px) saturate(150%)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)"
        };
      case "neural-interface":
        return {
          background: "radial-gradient(ellipse at center, rgba(14,165,233,0.15) 0%, rgba(59,130,246,0.1) 45%, rgba(99,102,241,0.05) 100%)",
          backdropFilter: "blur(24px) brightness(110%)",
          border: "1px solid rgba(14,165,233,0.3)",
          boxShadow: `0 0 60px rgba(14,165,233,${neuralActivity * 0.3}), inset 0 1px 0 rgba(14,165,233,0.4)`
        };
      case "holographic":
        return {
          background: "linear-gradient(45deg, rgba(168,85,247,0.1) 0%, rgba(236,72,153,0.1) 50%, rgba(59,130,246,0.1) 100%)",
          backdropFilter: "blur(32px) hue-rotate(10deg)",
          border: "1px solid rgba(168,85,247,0.4)",
          boxShadow: "0 24px 48px rgba(168,85,247,0.2), 0 0 0 1px rgba(236,72,153,0.1)"
        };
      case "bio-symbiotic":
        return {
          background: "linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(16,185,129,0.08) 50%, rgba(6,182,212,0.1) 100%)",
          backdropFilter: "blur(28px) contrast(120%)",
          border: "1px solid rgba(34,197,94,0.3)",
          boxShadow: "0 32px 64px rgba(34,197,94,0.15), inset 0 2px 4px rgba(34,197,94,0.2)"
        };
      default:
        return {};
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Background with Liquid Glass Effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        
        {/* Liquid Glass Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
                rgba(255,255,255,0.15) 0%, 
                rgba(255,255,255,0.05) 40%, 
                transparent 70%
              ),
              linear-gradient(135deg, 
                rgba(14,165,233,0.1) 0%, 
                rgba(99,102,241,0.08) 50%, 
                rgba(168,85,247,0.1) 100%
              )
            `,
            backdropFilter: "blur(60px) saturate(180%) brightness(110%)"
          }}
        />

        {/* Neural Network Animation */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Holographic Grid System */}
      <div className="absolute inset-0 z-10 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14,165,233,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14,165,233,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `perspective(1000px) rotateX(${mousePosition.y * 10 - 5}deg) rotateY(${mousePosition.x * 10 - 5}deg)`,
          }}
        />
      </div>

      {/* Main Content Container */}
      <motion.div 
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity }}
      >
        <div className="text-center space-y-8">
          
          {/* Neural Status Indicator */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={getVariantStyles()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-5 h-5 text-blue-400" />
            </motion.div>
            <span className="text-sm font-medium text-blue-300 tracking-wider">
              NEURAL LINK ESTABLISHED
            </span>
            <motion.div 
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Kinetic Typography Title */}
          <div className="space-y-6">
            <motion.h2
              className="text-xl sm:text-2xl font-semibold text-blue-300/80 tracking-[0.2em] uppercase"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subtitle.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  animate={{ 
                    y: [0, -5, 0],
                    textShadow: [
                      "0 0 0px rgba(14,165,233,0)",
                      "0 0 20px rgba(14,165,233,0.6)",
                      "0 0 0px rgba(14,165,233,0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h2>

            <motion.h1
              className="text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: `drop-shadow(0 0 ${neuralActivity * 30}px rgba(14,165,233,0.5))`,
              }}
            >
              {title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-4"
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0 0 30px rgba(14,165,233,0.8)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Bio-Symbiotic Description */}
          <motion.p
            className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {description}
          </motion.p>

          {/* Holographic Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-500 hover:via-purple-500 hover:to-blue-700 text-white font-semibold tracking-wide transition-all duration-300 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(14,165,233,0.9) 0%, rgba(99,102,241,0.9) 50%, rgba(168,85,247,0.9) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: `0 8px 32px rgba(14,165,233,0.3), inset 0 1px 0 rgba(255,255,255,0.3)`
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                {primaryAction}
              </span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 bg-black/20 border-white/30 text-white hover:bg-white/10 font-semibold tracking-wide backdrop-blur-sm"
            >
              <Globe className="w-5 h-5 mr-2" />
              {secondaryAction}
            </Button>
          </motion.div>

          {/* Volumetric Stats Display */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl"
                style={{
                  ...getVariantStyles(),
                  transform: `perspective(500px) rotateY(${(mousePosition.x - 0.5) * 10}deg) rotateX(${(mousePosition.y - 0.5) * 5}deg)`
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <motion.div
                  className="text-2xl lg:text-3xl font-black text-white mb-2"
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(14,165,233,0)",
                      "0 0 20px rgba(14,165,233,0.6)",
                      "0 0 0px rgba(14,165,233,0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-blue-300 font-medium tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Immersive 3D Elements */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Floating Aircraft Icons */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute z-30 pointer-events-none"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                initial={{ opacity: 0, scale: 0, rotateY: 0 }}
                animate={{ 
                  opacity: 0.6, 
                  scale: 1, 
                  rotateY: 360,
                  y: [0, -20, 0]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Plane className="w-8 h-8 text-blue-400" />
              </motion.div>
            ))}

            {/* Radar Sweep Effect */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute top-1/2 left-1/2 w-96 h-96 border-2 border-green-400 rounded-full"
                style={{ transform: "translate(-50%, -50%)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="absolute top-1/2 left-1/2 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent origin-left"
                  style={{ transform: "translate(-50%, -50%)" }}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
} 