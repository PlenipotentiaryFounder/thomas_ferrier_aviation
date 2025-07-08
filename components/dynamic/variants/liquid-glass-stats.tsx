"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Award, 
  Plane, 
  Clock, 
  Target, 
  BarChart3,
  Activity,
  Zap,
  Brain,
  Eye,
  Radio,
  Satellite
} from "lucide-react";

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  description: string;
  trend?: number;
}

interface LiquidGlassStatsProps {
  title?: string;
  subtitle?: string;
  variant?: "liquid-glass" | "bio-symbiotic" | "volumetric" | "quantum-field";
  stats?: StatItem[];
}

export default function LiquidGlassStats({
  title = "AVIATION ANALYTICS",
  subtitle = "Real-time performance metrics with neural integration",
  variant = "liquid-glass",
  stats: customStats
}: LiquidGlassStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const [bioActivity, setBioActivity] = useState(0.7);

  const defaultStats: StatItem[] = [
    {
      id: "flight_hours",
      label: "Total Flight Hours",
      value: 12847,
      suffix: "hrs",
      icon: <Clock className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-400",
      glowColor: "rgba(59,130,246,0.6)",
      description: "Cumulative flying experience",
      trend: 5.2
    },
    {
      id: "students_trained",
      label: "Students Trained",
      value: 324,
      suffix: "",
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-pink-400",
      glowColor: "rgba(168,85,247,0.6)",
      description: "Certified pilots graduated",
      trend: 12.8
    },
    {
      id: "aircraft_types",
      label: "Aircraft Types",
      value: 47,
      suffix: "",
      icon: <Plane className="w-6 h-6" />,
      color: "from-green-500 to-emerald-400",
      glowColor: "rgba(34,197,94,0.6)",
      description: "Different aircraft operated",
      trend: 3.1
    },
    {
      id: "safety_score",
      label: "Safety Rating",
      value: 99.97,
      suffix: "%",
      icon: <Target className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-400",
      glowColor: "rgba(245,158,11,0.6)",
      description: "Perfect safety record",
      trend: 0.1
    },
    {
      id: "countries",
      label: "Countries Flown",
      value: 28,
      suffix: "",
      icon: <Globe className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-400",
      glowColor: "rgba(99,102,241,0.6)",
      description: "International experience",
      trend: 8.7
    },
    {
      id: "certifications",
      label: "Active Certifications",
      value: 15,
      suffix: "",
      icon: <Award className="w-6 h-6" />,
      color: "from-teal-500 to-cyan-400",
      glowColor: "rgba(20,184,166,0.6)",
      description: "Professional credentials",
      trend: 2.3
    }
  ];

  const stats = customStats || defaultStats;

  // Bio-activity and real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBioActivity(0.5 + Math.sin(Date.now() * 0.002) * 0.3);
      
      // Animate stat values with micro-variations
      setAnimatedValues(prev => {
        const newValues: { [key: string]: number } = {};
        stats.forEach(stat => {
          const baseValue = stat.value;
          const variation = baseValue * 0.001 * Math.sin(Date.now() * 0.0015 + stat.id.length);
          newValues[stat.id] = baseValue + variation;
        });
        return newValues;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [stats]);

  // Mouse tracking for liquid glass effects
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
      case "liquid-glass":
        return {
          background: `
            linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%),
            radial-gradient(ellipse at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(59,130,246,0.1) 0%, transparent 50%
            )
          `,
          backdropFilter: "blur(60px) saturate(180%) brightness(110%)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)"
        };
      case "bio-symbiotic":
        return {
          background: `
            radial-gradient(ellipse at center, rgba(34,197,94,${bioActivity * 0.15}) 0%, transparent 60%),
            linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(15,23,42,0.9) 100%)
          `,
          backdropFilter: "blur(40px) contrast(120%) brightness(110%)",
          border: "1px solid rgba(34,197,94,0.4)",
          boxShadow: `0 40px 80px rgba(34,197,94,${bioActivity * 0.3}), inset 0 2px 4px rgba(34,197,94,0.2)`
        };
      case "volumetric":
        return {
          background: `
            linear-gradient(45deg, rgba(168,85,247,0.1) 0%, rgba(236,72,153,0.1) 50%, rgba(59,130,246,0.1) 100%),
            linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(15,23,42,0.95) 100%)
          `,
          backdropFilter: "blur(50px) hue-rotate(15deg) saturate(140%)",
          border: "2px solid rgba(168,85,247,0.4)",
          boxShadow: "0 48px 96px rgba(168,85,247,0.4), 0 0 0 1px rgba(236,72,153,0.2)"
        };
      case "quantum-field":
        return {
          background: `
            radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(14,165,233,0.2) 0%, 
              rgba(99,102,241,0.1) 40%, 
              rgba(168,85,247,0.05) 80%,
              transparent 100%
            ),
            linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(15,23,42,0.95) 100%)
          `,
          backdropFilter: "blur(45px) brightness(120%) contrast(110%)",
          border: "1px solid rgba(14,165,233,0.4)",
          boxShadow: `0 0 120px rgba(14,165,233,${bioActivity * 0.5}), inset 0 3px 6px rgba(14,165,233,0.3)`
        };
      default:
        return {};
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-20 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(14,165,233,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(168,85,247,0.08) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(34,197,94,0.08) 0%, transparent 50%),
          linear-gradient(135deg, #000000 0%, #0f172a 100%)
        `
      }}
    >
      {/* Quantum Field Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(150)].map((_, i) => (
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
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Holographic Grid Lines */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: `perspective(1000px) rotateX(${mousePosition.y * 5 - 2.5}deg) rotateY(${mousePosition.x * 5 - 2.5}deg)`
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl lg:text-7xl font-black text-white mb-6"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                animate={{ 
                  y: [0, -15, 0],
                  textShadow: [
                    "0 0 0px rgba(59,130,246,0)",
                    "0 0 40px rgba(59,130,246,0.8)",
                    "0 0 0px rgba(59,130,246,0)"
                  ]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Stats Container */}
        <motion.div
          className="max-w-7xl mx-auto p-8 rounded-3xl"
          style={getContainerStyles()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                className="group relative"
                initial={{ opacity: 0, y: 40, rotateY: -20 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  delay: 0.1 * index, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200 
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Liquid Glass Stat Card */}
                <motion.div
                  className="relative p-8 rounded-2xl h-full overflow-hidden"
                  style={{
                    background: `
                      linear-gradient(135deg, ${stat.color.replace('from-', 'rgba(').replace('to-', '').replace('-500', ',0.15)').replace('-400', '0.1)')}) 0%, 
                      rgba(0,0,0,0.4) 100%
                    )`,
                    backdropFilter: "blur(30px) saturate(180%)",
                    border: `1px solid ${stat.glowColor.replace('0.6', '0.3')}`,
                    boxShadow: `0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)`,
                    transform: `perspective(600px) rotateY(${(mousePosition.x - 0.5) * 8}deg) rotateX(${(mousePosition.y - 0.5) * 4}deg)`
                  }}
                  animate={{
                    boxShadow: [
                      `0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)`,
                      `0 20px 40px ${stat.glowColor.replace('0.6', '0.2')}, inset 0 1px 0 rgba(255,255,255,0.2)`,
                      `0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  
                  {/* Volumetric Glow Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at center, ${stat.glowColor} 0%, transparent 70%)`
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="relative z-10 mb-6"
                    animate={{
                      rotateY: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="text-white drop-shadow-lg">
                      {stat.icon}
                    </div>
                  </motion.div>

                  {/* Value with Kinetic Typography */}
                  <motion.div
                    className="relative z-10 mb-4"
                    animate={{
                      textShadow: [
                        "0 0 0px currentColor",
                        `0 0 30px ${stat.glowColor}`,
                        "0 0 0px currentColor"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <motion.div
                      className="text-4xl lg:text-5xl font-black text-white mb-2"
                      style={{
                        background: `linear-gradient(135deg, ${stat.color} 0%, #ffffff 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      <CountingNumber 
                        value={animatedValues[stat.id] || stat.value} 
                        suffix={stat.suffix}
                        decimals={stat.suffix === '%' ? 2 : 0}
                      />
                    </motion.div>

                    {/* Trend Indicator */}
                    {stat.trend && (
                      <motion.div
                        className="flex items-center gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-semibold">+{stat.trend}%</span>
                        <span className="text-gray-400">this month</span>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Label and Description */}
                  <div className="relative z-10">
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-shadow-lg">
                      {stat.label}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  {/* Liquid Flow Animation */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    style={{ width: "200%" }}
                    animate={{
                      left: ["-100%", "100%"]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      delay: index * 0.5,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Holographic Scan Line */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"
                    style={{ 
                      height: "4px",
                      top: "0%"
                    }}
                    animate={{
                      top: ["0%", "100%", "0%"]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bio-Activity Visualization */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-400" />
                <span>Neural Sync: </span>
                <span className="text-blue-400 font-mono">
                  {Math.round(bioActivity * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span>Data Stream: </span>
                <span className="text-green-400 font-mono">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-purple-400" />
                <span>Quantum Link: </span>
                <span className="text-purple-400 font-mono">Stable</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Animated counter component
const CountingNumber: React.FC<{ 
  value: number; 
  suffix: string; 
  decimals: number;
}> = ({ value, suffix, decimals }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const duration = 1000;
    const startTime = Date.now();
    const startValue = displayValue;
    const endValue = value;

    const updateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      
      const currentValue = startValue + (endValue - startValue) * easeProgress;
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  }, [value, displayValue]);

  return (
    <span>
      {displayValue.toFixed(decimals)}{suffix}
    </span>
  );
}; 