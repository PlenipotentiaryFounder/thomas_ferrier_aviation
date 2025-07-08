"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import all the badass components
import HeroModern from "@/components/dynamic/variants/hero-modern";
import CockpitDashboard from "@/components/dynamic/variants/cockpit-dashboard";
import ImmersiveNavigation from "@/components/dynamic/variants/immersive-navigation";
import LiquidGlassStats from "@/components/dynamic/variants/liquid-glass-stats";

import { 
  Plane, 
  Eye, 
  Palette, 
  Zap, 
  Brain, 
  Layers, 
  Sparkles,
  Rocket,
  Target,
  Globe
} from "lucide-react";

type ComponentType = "hero" | "dashboard" | "navigation" | "stats";
type VariantType = "liquid-glass" | "neural-interface" | "holographic" | "bio-symbiotic" | "volumetric" | "tangible";

export default function DemoPage() {
  const [activeComponent, setActiveComponent] = useState<ComponentType>("hero");
  const [activeVariant, setActiveVariant] = useState<VariantType>("neural-interface");
  const [showNavigation, setShowNavigation] = useState(false);
  const [isImmersive, setIsImmersive] = useState(false);

  const components = [
    {
      id: "hero" as ComponentType,
      name: "Hero Modern",
      icon: <Rocket className="w-5 h-5" />,
      description: "Next-gen hero sections with volumetric displays",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: "dashboard" as ComponentType,
      name: "Cockpit Dashboard",
      icon: <Target className="w-5 h-5" />,
      description: "Immersive flight control interfaces",
      color: "from-green-500 to-teal-600"
    },
    {
      id: "navigation" as ComponentType,
      name: "Immersive Navigation",
      icon: <Globe className="w-5 h-5" />,
      description: "Holographic navigation matrices",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: "stats" as ComponentType,
      name: "Liquid Glass Stats",
      icon: <Sparkles className="w-5 h-5" />,
      description: "Bio-responsive data visualization",
      color: "from-orange-500 to-red-600"
    }
  ];

  const variants = [
    {
      id: "neural-interface" as VariantType,
      name: "Neural Interface",
      description: "Brain-computer interface aesthetics",
      color: "text-blue-400",
      glow: "rgba(59,130,246,0.4)"
    },
    {
      id: "liquid-glass" as VariantType,
      name: "Liquid Glass",
      description: "Apple's revolutionary interface material",
      color: "text-cyan-400",
      glow: "rgba(34,211,238,0.4)"
    },
    {
      id: "holographic" as VariantType,
      name: "Holographic",
      description: "Volumetric holographic displays",
      color: "text-purple-400",
      glow: "rgba(168,85,247,0.4)"
    },
    {
      id: "bio-symbiotic" as VariantType,
      name: "Bio-Symbiotic",
      description: "Adaptive biometric interfaces",
      color: "text-green-400",
      glow: "rgba(34,197,94,0.4)"
    },
    {
      id: "volumetric" as VariantType,
      name: "Volumetric",
      description: "3D immersive elements",
      color: "text-pink-400",
      glow: "rgba(236,72,153,0.4)"
    },
    {
      id: "tangible" as VariantType,
      name: "Tangible",
      description: "Physical interaction simulation",
      color: "text-teal-400",
      glow: "rgba(20,184,166,0.4)"
    }
  ];

  // Auto-cycle variants for demonstration
  useEffect(() => {
    if (isImmersive) {
      const interval = setInterval(() => {
        setActiveVariant(prev => {
          const currentIndex = variants.findIndex(v => v.id === prev);
          const nextIndex = (currentIndex + 1) % variants.length;
          return variants[nextIndex].id;
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isImmersive, variants]);

  const renderActiveComponent = () => {
    const commonProps = {
      variant: activeVariant,
    };

    switch (activeComponent) {
      case "hero":
        return <HeroModern {...commonProps} />;
      case "dashboard":
        return <CockpitDashboard {...commonProps} />;
      case "navigation":
        return (
          <div className="h-screen bg-black">
            <ImmersiveNavigation 
              {...commonProps} 
              isOpen={showNavigation}
              onToggle={() => setShowNavigation(!showNavigation)}
            />
          </div>
        );
      case "stats":
        return <LiquidGlassStats {...commonProps} />;
      default:
        return <HeroModern {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Neural Network Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 2, 0],
              opacity: [0, 1, 0],
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Control Panel */}
      <motion.div
        className="fixed top-4 left-4 z-50 p-4 lg:p-6 rounded-2xl max-w-xs lg:max-w-md mobile:relative mobile:top-0 mobile:left-0 mobile:max-w-full mobile:rounded-none mobile:p-3"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(15,23,42,0.9) 100%)",
          backdropFilter: "blur(40px) saturate(180%)",
          border: "1px solid rgba(59,130,246,0.3)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
        }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        
        {/* Header */}
        <div className="mb-6">
                     <motion.h1
             className="text-lg lg:text-xl font-black text-white mb-2 mobile:text-mobile-lg"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🚀 2025 AVIATION UI DEMO
          </motion.h1>
                     <p className="text-xs lg:text-sm text-gray-400 mobile:text-mobile-xs">
             Next-generation badass components
           </p>
        </div>

        {/* Component Selector */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            COMPONENTS
          </h3>
                     <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
            {components.map((component) => (
              <motion.button
                key={component.id}
                onClick={() => setActiveComponent(component.id)}
                                 className={`p-2 lg:p-3 rounded-xl text-left text-xs mobile:text-mobile-xs transition-all touch-target ${
                  activeComponent === component.id
                    ? 'bg-blue-500/20 border-blue-400/50 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                } border`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                                 <div className="flex items-center gap-1 lg:gap-2 mb-1">
                   <div className="w-4 h-4 lg:w-5 lg:h-5">{component.icon}</div>
                   <span className="font-medium text-xs lg:text-sm mobile:text-mobile-xs">{component.name}</span>
                 </div>
                 <p className="text-xs mobile:text-mobile-xs opacity-70 leading-tight mobile:hidden lg:block">
                   {component.description}
                 </p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Variant Selector */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            VARIANTS
          </h3>
          <div className="space-y-2">
            {variants.map((variant) => (
              <motion.button
                key={variant.id}
                onClick={() => setActiveVariant(variant.id)}
                                 className={`w-full p-2 lg:p-3 rounded-xl text-left text-xs mobile:text-mobile-xs transition-all touch-target ${
                  activeVariant === variant.id
                    ? 'bg-purple-500/20 border-purple-400/50 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                } border`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                animate={activeVariant === variant.id ? {
                  boxShadow: [
                    "0 0 0 rgba(168,85,247,0)",
                    "0 0 20px rgba(168,85,247,0.4)",
                    "0 0 0 rgba(168,85,247,0)"
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-medium ${variant.color}`}>
                    {variant.name}
                  </span>
                  {activeVariant === variant.id && (
                                         <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                   )}
                 </div>
                 <p className="text-xs mobile:text-mobile-xs opacity-70 leading-tight mobile:hidden lg:block">
                   {variant.description}
                 </p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Controls */}
                 <div className="space-y-2 lg:space-y-3">
           <Button
             onClick={() => setIsImmersive(!isImmersive)}
             className={`w-full text-xs lg:text-sm touch-target ${isImmersive ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            <Brain className="w-4 h-4 mr-2" />
            {isImmersive ? 'IMMERSIVE MODE ON' : 'IMMERSIVE MODE OFF'}
          </Button>

          {activeComponent === "navigation" && (
                         <Button
               onClick={() => setShowNavigation(true)}
               className="w-full text-xs lg:text-sm touch-target bg-purple-600 hover:bg-purple-700"
            >
              <Eye className="w-4 h-4 mr-2" />
              OPEN NAVIGATION
            </Button>
          )}
        </div>

        {/* Status Indicators */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-400">Neural Link Active</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {isImmersive ? 'AUTO' : 'MANUAL'}
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Component Display Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeComponent}-${activeVariant}`}
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          {renderActiveComponent()}
        </motion.div>
      </AnimatePresence>

               {/* Floating Info Panel */}
       <motion.div
         className="fixed bottom-4 right-4 z-50 p-3 lg:p-4 rounded-2xl max-w-xs lg:max-w-sm mobile:hidden"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(15,23,42,0.9) 100%)",
          backdropFilter: "blur(40px) saturate(180%)",
          border: "1px solid rgba(34,197,94,0.3)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="text-center">
          <h3 className="text-sm font-semibold text-white mb-2">
            Current Configuration
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Component:</span>
              <span className="text-blue-400 font-medium">
                {components.find(c => c.id === activeComponent)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Variant:</span>
              <span className="text-purple-400 font-medium">
                {variants.find(v => v.id === activeVariant)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Mode:</span>
              <span className={`font-medium ${isImmersive ? 'text-green-400' : 'text-gray-400'}`}>
                {isImmersive ? 'Immersive' : 'Manual'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Holographic Overlay Effects */}
      <div className="fixed inset-0 pointer-events-none z-30">
        {/* Corner UI Elements */}
        <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-blue-400/30" />
        <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-blue-400/30" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-blue-400/30" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-blue-400/30" />

        {/* Scanning Lines */}
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
} 