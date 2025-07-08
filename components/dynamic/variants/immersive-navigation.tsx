"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Home, 
  User, 
  Briefcase, 
  Award, 
  Camera, 
  BookOpen, 
  Mail, 
  Plane,
  Target,
  Globe,
  Zap,
  Eye,
  Brain,
  Radio,
  Menu,
  X
} from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  description: string;
  color: string;
  glowColor: string;
}

interface ImmersiveNavigationProps {
  variant?: "volumetric" | "liquid-glass" | "neural-interface" | "bio-responsive";
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function ImmersiveNavigation({
  variant = "volumetric",
  isOpen = false,
  onToggle
}: ImmersiveNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [bioActivity, setBioActivity] = useState(0.6);
  const [neuralSync, setNeuralSync] = useState(87);

  const navigationItems: NavigationItem[] = [
    {
      id: "home",
      label: "Command Center",
      icon: <Home className="w-6 h-6" />,
      href: "/",
      description: "Mission Control Hub",
      color: "from-blue-500 to-cyan-400",
      glowColor: "rgba(59,130,246,0.6)"
    },
    {
      id: "about",
      label: "Pilot Profile",
      icon: <User className="w-6 h-6" />,
      href: "/about",
      description: "Commander Biography",
      color: "from-purple-500 to-pink-400",
      glowColor: "rgba(168,85,247,0.6)"
    },
    {
      id: "experience",
      label: "Flight History",
      icon: <Plane className="w-6 h-6" />,
      href: "/experience",
      description: "Mission Archive",
      color: "from-green-500 to-emerald-400",
      glowColor: "rgba(34,197,94,0.6)"
    },
    {
      id: "certifications",
      label: "Credentials",
      icon: <Award className="w-6 h-6" />,
      href: "/certifications",
      description: "Certification Matrix",
      color: "from-yellow-500 to-orange-400",
      glowColor: "rgba(245,158,11,0.6)"
    },
    {
      id: "logbook",
      label: "Flight Logs",
      icon: <BookOpen className="w-6 h-6" />,
      href: "/logbook",
      description: "Digital Logbook",
      color: "from-indigo-500 to-purple-400",
      glowColor: "rgba(99,102,241,0.6)"
    },
    {
      id: "gallery",
      label: "Visual Archive",
      icon: <Camera className="w-6 h-6" />,
      href: "/gallery",
      description: "Photo Gallery",
      color: "from-pink-500 to-rose-400",
      glowColor: "rgba(236,72,153,0.6)"
    },
    {
      id: "consulting",
      label: "Advisory Services",
      icon: <Briefcase className="w-6 h-6" />,
      href: "/consulting",
      description: "Professional Services",
      color: "from-teal-500 to-cyan-400",
      glowColor: "rgba(20,184,166,0.6)"
    },
    {
      id: "contact",
      label: "Communications",
      icon: <Mail className="w-6 h-6" />,
      href: "/contact",
      description: "Contact Protocols",
      color: "from-red-500 to-pink-400",
      glowColor: "rgba(239,68,68,0.6)"
    }
  ];

  // Bio-activity simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBioActivity(0.4 + Math.sin(Date.now() * 0.002) * 0.3);
      setNeuralSync(85 + Math.sin(Date.now() * 0.0018) * 10);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for volumetric effects
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

  // Variant-specific container styles
  const getContainerStyles = () => {
    switch (variant) {
      case "volumetric":
        return {
          background: `
            radial-gradient(ellipse at center, rgba(14,165,233,0.15) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(15,23,42,0.95) 100%)
          `,
          backdropFilter: "blur(60px) saturate(180%) brightness(120%)",
          border: "1px solid rgba(59,130,246,0.3)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
        };
      case "liquid-glass":
        return {
          background: `
            linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%),
            linear-gradient(225deg, rgba(0,0,0,0.8) 0%, rgba(15,23,42,0.9) 100%)
          `,
          backdropFilter: "blur(80px) saturate(200%) brightness(110%)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 48px 96px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)"
        };
      case "neural-interface":
        return {
          background: `
            radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(14,165,233,0.2) 0%, 
              rgba(99,102,241,0.1) 50%, 
              transparent 70%
            ),
            linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(15,23,42,0.95) 100%)
          `,
          backdropFilter: "blur(40px) brightness(120%) contrast(110%)",
          border: "1px solid rgba(14,165,233,0.4)",
          boxShadow: `0 0 100px rgba(14,165,233,${bioActivity * 0.5}), inset 0 2px 4px rgba(14,165,233,0.3)`
        };
      case "bio-responsive":
        return {
          background: `
            radial-gradient(ellipse at center, rgba(34,197,94,${bioActivity * 0.15}) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(15,23,42,0.95) 100%)
          `,
          backdropFilter: "blur(50px) contrast(120%) brightness(110%)",
          border: "1px solid rgba(34,197,94,0.4)",
          boxShadow: `0 60px 120px rgba(34,197,94,${bioActivity * 0.3}), inset 0 3px 6px rgba(34,197,94,0.2)`
        };
      default:
        return {};
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={onToggle}
        className="fixed top-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(14,165,233,0.2) 0%, rgba(99,102,241,0.2) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 8px 32px rgba(0,0,0,0.3)",
            "0 8px 32px rgba(14,165,233,0.4)",
            "0 8px 32px rgba(0,0,0,0.3)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </motion.div>
      </motion.button>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={containerRef}
            className="fixed inset-0 z-40 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
            />

            {/* Neural Network Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(100)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-blue-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 2, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Main Navigation Container */}
            <motion.div
              className="relative max-w-4xl w-full rounded-3xl p-8"
              style={getContainerStyles()}
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
            >
              
              {/* Header */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h1
                  className="text-4xl lg:text-6xl font-black text-white mb-4"
                  style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {"NAVIGATION MATRIX".split('').map((char, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      animate={{ 
                        y: [0, -10, 0],
                        textShadow: [
                          "0 0 0px rgba(14,165,233,0)",
                          "0 0 30px rgba(14,165,233,0.8)",
                          "0 0 0px rgba(14,165,233,0)"
                        ]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: i * 0.1,
                        ease: "easeInOut"
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.h1>

                {/* Bio-Status Indicators */}
                <div className="flex justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Neural Sync: </span>
                    <span className="text-blue-400 font-mono">{Math.round(neuralSync)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Bio-Activity: </span>
                    <span className="text-green-400 font-mono">{Math.round(bioActivity * 100)}%</span>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    className="group relative block"
                    initial={{ opacity: 0, y: 30, rotateY: -15 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ 
                      delay: 0.1 * index, 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 200 
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{ 
                      scale: 1.05,
                      y: -10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Volumetric Card */}
                    <motion.div
                      className="relative p-6 rounded-2xl h-32 flex flex-col justify-between overflow-hidden"
                      style={{
                        background: `
                          linear-gradient(135deg, ${item.color.replace('from-', 'rgba(').replace('to-', '').replace('-500', ',0.1)').replace('-400', '0.05)')}) 0%, 
                          rgba(0,0,0,0.3) 100%
                        )`,
                        backdropFilter: "blur(20px) saturate(150%)",
                        border: `1px solid ${item.glowColor.replace('0.6', '0.3')}`,
                        boxShadow: hoveredItem === item.id 
                          ? `0 20px 40px ${item.glowColor}, inset 0 1px 0 rgba(255,255,255,0.2)`
                          : "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                        transform: `perspective(500px) rotateY(${(mousePosition.x - 0.5) * 10}deg) rotateX(${(mousePosition.y - 0.5) * 5}deg)`
                      }}
                    >
                      
                      {/* Holographic Glow Effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        style={{
                          background: `radial-gradient(circle at center, ${item.glowColor} 0%, transparent 70%)`
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Icon */}
                      <motion.div
                        className="relative z-10 mb-2"
                        animate={{
                          rotateY: hoveredItem === item.id ? [0, 360] : 0,
                          scale: hoveredItem === item.id ? [1, 1.2, 1] : 1
                        }}
                        transition={{ duration: 1, repeat: hoveredItem === item.id ? Infinity : 0 }}
                      >
                        <div className="text-white group-hover:drop-shadow-lg">
                          {item.icon}
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div className="relative z-10">
                        <motion.h3
                          className="text-white font-semibold text-sm mb-1 group-hover:text-shadow-lg"
                          animate={{
                            textShadow: hoveredItem === item.id 
                              ? `0 0 20px ${item.glowColor}`
                              : "none"
                          }}
                        >
                          {item.label}
                        </motion.h3>
                        <p className="text-gray-400 text-xs leading-tight">
                          {item.description}
                        </p>
                      </div>

                      {/* Kinetic Typography Overlay */}
                      <AnimatePresence>
                        {hoveredItem === item.id && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          >
                            <motion.div
                              className="text-6xl font-black text-white/20"
                              animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {item.icon}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Scanning Line Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        style={{ 
                          width: "200%",
                          height: "2px",
                          top: "50%",
                          left: "-100%"
                        }}
                        animate={hoveredItem === item.id ? {
                          left: ["100%", "-100%"]
                        } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                  </motion.a>
                ))}
              </div>

              {/* Footer Status */}
              <motion.div
                className="mt-12 text-center text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex justify-center items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>System Operational</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span>Navigation Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-purple-400" />
                    <span>Quantum Link Stable</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 