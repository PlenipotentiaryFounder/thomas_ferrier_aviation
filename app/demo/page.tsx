"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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
  Globe,
  Play,
  ArrowRight,
  Star,
  X,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Users,
  Award
} from "lucide-react";

type ComponentType = "hero" | "dashboard" | "navigation" | "stats";
type VariantType = "liquid-glass" | "neural-interface" | "holographic" | "bio-symbiotic" | "volumetric" | "tangible";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  target: string;
  action?: string;
}

export default function DemoPage() {
  const [activeComponent, setActiveComponent] = useState<ComponentType>("hero");
  const [activeVariant, setActiveVariant] = useState<VariantType>("neural-interface");
  const [showNavigation, setShowNavigation] = useState(false);
  const [isImmersive, setIsImmersive] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showPricing, setShowPricing] = useState(false);
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 0,
      title: "Welcome to the Future of Aviation Websites",
      description: "You're about to experience cutting-edge UI components that will revolutionize your professional presence. Ready to get hired faster?",
      target: "welcome"
    },
    {
      id: 1,
      title: "Choose Your Component",
      description: "Select different aviation-specific components. Each one showcases different aspects of your professional portfolio.",
      target: "components",
      action: "Try selecting 'Cockpit Dashboard'"
    },
    {
      id: 2,
      title: "Experience Theme Variants",
      description: "Switch between Neural Interface, Liquid Glass, and other advanced themes. Watch your content transform instantly.",
      target: "variants",
      action: "Click 'Liquid Glass' to see the difference"
    },
    {
      id: 3,
      title: "Activate Immersive Mode",
      description: "Enable auto-cycling to see all variants in action. This is how your site adapts to different viewing contexts.",
      target: "controls",
      action: "Turn on Immersive Mode"
    },
    {
      id: 4,
      title: "See Real Client Examples",
      description: "Check out actual pilot websites we've built. These are live examples of pilots who got hired faster.",
      target: "examples"
    },
    {
      id: 5,
      title: "Ready to Get Started?",
      description: "Your custom aviation website can be live in just 2 weeks. Let's discuss your project!",
      target: "cta"
    }
  ];

  const clientExamples = [
    {
      id: "sarah-chen",
      name: "Sarah Chen",
      title: "American Airlines First Officer",
      theme: "Neural Interface",
      results: "Hired in 3 weeks",
      rating: 5,
      image: "/images/testimonial-1.jpg",
      quote: "My new website got me noticed by 3 major airlines. The immersive design showcased my experience perfectly."
    },
    {
      id: "mike-torres",
      name: "Mike Torres", 
      title: "Delta Flight Instructor",
      theme: "Liquid Glass",
      results: "4 job offers",
      rating: 5,
      image: "/images/testimonial-2.jpg",
      quote: "The holographic portfolio made me stand out from hundreds of other applications."
    },
    {
      id: "lisa-martinez",
      name: "Lisa Martinez",
      title: "United Airlines Captain",
      theme: "Holographic",
      results: "Promoted in 6 months",
      rating: 5,
      image: "/images/testimonial-3.jpg",
      quote: "This website didn't just get me hired - it accelerated my entire career trajectory."
    }
  ];

  const pricingTiers = [
    {
      name: "Essential",
      price: 2995,
      features: ["Professional Design", "Mobile Optimized", "Basic Analytics", "SSL Certificate"],
      recommended: false
    },
    {
      name: "Professional",
      price: 4995,
      features: ["Everything in Essential", "Advanced Themes", "Custom Components", "SEO Optimization", "6 Months Support"],
      recommended: true
    },
    {
      name: "Executive", 
      price: 7995,
      features: ["Everything in Professional", "Premium Animations", "Neural Interface Themes", "Priority Support", "Unlimited Revisions"],
      recommended: false
    }
  ];

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

  const nextOnboardingStep = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setShowOnboarding(false);
    }
  };

  const prevOnboardingStep = () => {
    if (onboardingStep > 0) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

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

      {/* Guided Onboarding Overlay */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-center min-h-screen p-4">
              <motion.div
                className="bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 rounded-3xl p-8 max-w-2xl w-full border border-blue-400/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                style={{
                  backdropFilter: "blur(40px) saturate(180%)",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)"
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {onboardingSteps[onboardingStep].title}
                      </h2>
                      <p className="text-sm text-gray-400">
                        Step {onboardingStep + 1} of {onboardingSteps.length}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowOnboarding(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-8">
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    {onboardingSteps[onboardingStep].description}
                  </p>
                  {onboardingSteps[onboardingStep].action && (
                    <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-4">
                      <p className="text-blue-300 font-medium flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        {onboardingSteps[onboardingStep].action}
                      </p>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm text-blue-400">
                      {Math.round(((onboardingStep + 1) / onboardingSteps.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((onboardingStep + 1) / onboardingSteps.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={prevOnboardingStep}
                    disabled={onboardingStep === 0}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={nextOnboardingStep}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  >
                    {onboardingStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Panel */}
      <motion.div
        id="components"
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
        <div id="variants" className="mb-6">
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
        <div id="controls" className="space-y-2 lg:space-y-3">
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

          <Button
            onClick={() => setShowPricing(true)}
            className="w-full text-xs lg:text-sm touch-target bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            GET PRICING
          </Button>
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

      {/* Client Examples Panel */}
      <motion.div
        id="examples"
        className="fixed top-4 right-4 z-40 p-4 rounded-2xl max-w-sm mobile:hidden"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(15,23,42,0.9) 100%)",
          backdropFilter: "blur(40px) saturate(180%)",
          border: "1px solid rgba(34,197,94,0.3)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
        }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            SUCCESS STORIES
          </h3>
          <p className="text-xs text-gray-400">
            Real pilots who got hired faster
          </p>
        </div>

        <div className="space-y-3">
          {clientExamples.map((client) => (
            <motion.div
              key={client.id}
              className="bg-white/5 border border-white/10 rounded-xl p-3 cursor-pointer hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedExample(client.id)}
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white">{client.name}</h4>
                  <p className="text-xs text-gray-400">{client.title}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(client.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Badge variant="outline" className="text-xs">
                  {client.results}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/10">
          <Link href="/u/thomas-ferrier" className="block">
            <Button className="w-full text-xs bg-blue-600 hover:bg-blue-700">
              <Eye className="w-4 h-4 mr-2" />
              VIEW LIVE EXAMPLE
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Pricing Modal */}
      <AnimatePresence>
        {showPricing && (
          <motion.div
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPricing(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 rounded-3xl p-8 max-w-4xl w-full border border-blue-400/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backdropFilter: "blur(40px) saturate(180%)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)"
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Get Your Custom Aviation Website
                  </h2>
                  <p className="text-gray-300">
                    Professional websites that get pilots hired faster
                  </p>
                </div>
                <button
                  onClick={() => setShowPricing(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingTiers.map((tier) => (
                  <motion.div
                    key={tier.name}
                    className={`relative bg-white/5 border rounded-2xl p-6 ${
                      tier.recommended 
                        ? 'border-blue-400 bg-blue-500/10' 
                        : 'border-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {tier.recommended && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-blue-600 text-white">
                          <Award className="w-3 h-3 mr-1" />
                          MOST POPULAR
                        </Badge>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                      <div className="text-3xl font-bold text-white mb-1">
                        ${tier.price.toLocaleString()}
                      </div>
                      <p className="text-gray-400 text-sm">One-time investment</p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm text-gray-300">
                          <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full ${
                        tier.recommended 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400 mb-4">
                  Ready to accelerate your aviation career?
                </p>
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg px-8 py-3">
                    Start Your Project Today
                    <Rocket className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <div id="cta" className="mt-4 pt-4 border-t border-white/10">
            <Link href="/contact">
              <Button className="w-full text-xs bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Rocket className="w-4 h-4 mr-2" />
                BUILD MY WEBSITE
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick Action Button */}
      <motion.div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Button
          onClick={() => setShowOnboarding(true)}
          className="bg-purple-600 hover:bg-purple-700 shadow-2xl"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Show Tour Again
        </Button>
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