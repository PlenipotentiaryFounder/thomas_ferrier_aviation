"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Plane, 
  Radar, 
  Zap, 
  Brain, 
  Globe, 
  Target, 
  Navigation, 
  Gauge, 
  Activity, 
  Radio, 
  Satellite,
  Eye,
  Cpu,
  Waves,
  BarChart3,
  AlertTriangle,
  CircuitBoard
} from "lucide-react";

interface CockpitDashboardProps {
  pilotName?: string;
  aircraftModel?: string;
  flightLevel?: string;
  speed?: string;
  heading?: string;
  altitude?: string;
  variant?: "neural-interface" | "liquid-glass" | "holographic" | "tangible";
}

export default function CockpitDashboard({
  pilotName = "Commander Sarah Chen",
  aircraftModel = "Boeing 797-X Neural",
  flightLevel = "FL420",
  speed = "Mach 2.4",
  heading = "287°",
  altitude = "42,000 ft",
  variant = "neural-interface"
}: CockpitDashboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [neuralActivity, setNeuralActivity] = useState(0.7);
  const [bioMetrics, setBioMetrics] = useState({
    heartRate: 72,
    brainActivity: 85,
    stressLevel: 23,
    focus: 94
  });
  const [systemStatus, setSystemStatus] = useState({
    engines: 100,
    navigation: 98,
    communication: 96,
    autopilot: 100,
    weather: 89,
    fuel: 67
  });

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralActivity(0.5 + Math.sin(Date.now() * 0.002) * 0.3);
      setBioMetrics(prev => ({
        heartRate: 72 + Math.sin(Date.now() * 0.001) * 8,
        brainActivity: 85 + Math.sin(Date.now() * 0.0015) * 10,
        stressLevel: 23 + Math.sin(Date.now() * 0.0008) * 15,
        focus: 94 + Math.sin(Date.now() * 0.0012) * 6
      }));
    }, 100);
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

  // Variant-specific panel styles
  const getPanelStyles = (opacity = 0.1) => {
    switch (variant) {
      case "liquid-glass":
        return {
          background: `linear-gradient(135deg, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,${opacity * 0.5}) 100%)`,
          backdropFilter: "blur(40px) saturate(180%) brightness(110%)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)"
        };
      case "neural-interface":
        return {
          background: `radial-gradient(ellipse at center, rgba(14,165,233,${opacity * 1.5}) 0%, rgba(59,130,246,${opacity}) 45%, rgba(99,102,241,${opacity * 0.8}) 100%)`,
          backdropFilter: "blur(32px) brightness(120%) contrast(110%)",
          border: "1px solid rgba(14,165,233,0.4)",
          boxShadow: `0 0 80px rgba(14,165,233,${neuralActivity * 0.4}), inset 0 2px 4px rgba(14,165,233,0.3)`
        };
      case "holographic":
        return {
          background: `linear-gradient(45deg, rgba(168,85,247,${opacity}) 0%, rgba(236,72,153,${opacity}) 50%, rgba(59,130,246,${opacity}) 100%)`,
          backdropFilter: "blur(36px) hue-rotate(15deg) saturate(140%)",
          border: "2px solid rgba(168,85,247,0.5)",
          boxShadow: "0 32px 64px rgba(168,85,247,0.3), 0 0 0 1px rgba(236,72,153,0.2)"
        };
      case "tangible":
        return {
          background: `linear-gradient(135deg, rgba(34,197,94,${opacity}) 0%, rgba(16,185,129,${opacity * 0.8}) 50%, rgba(6,182,212,${opacity}) 100%)`,
          backdropFilter: "blur(28px) contrast(130%) brightness(105%)",
          border: "1px solid rgba(34,197,94,0.4)",
          boxShadow: "0 40px 80px rgba(34,197,94,0.2), inset 0 3px 6px rgba(34,197,94,0.25)"
        };
      default:
        return {};
    }
  };

  const primaryFlightData = [
    { label: "Speed", value: speed, icon: <Zap className="w-5 h-5" />, color: "text-cyan-400" },
    { label: "Altitude", value: altitude, icon: <Navigation className="w-5 h-5" />, color: "text-green-400" },
    { label: "Heading", value: heading, icon: <Target className="w-5 h-5" />, color: "text-yellow-400" },
    { label: "Flight Level", value: flightLevel, icon: <Plane className="w-5 h-5" />, color: "text-blue-400" }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-black text-white overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(14,165,233,0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(168,85,247,0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(34,197,94,0.1) 0%, transparent 50%)
        `
      }}
    >
      {/* Holographic Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14,165,233,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14,165,233,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: `perspective(1200px) rotateX(${mousePosition.y * 8 - 4}deg) rotateY(${mousePosition.x * 8 - 4}deg)`,
          }}
        />
      </div>

      {/* Neural Network Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 2, 0.5],
              opacity: [0.3, 1, 0.3],
              x: [0, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6 h-screen">
        {/* Top Header Bar */}
        <motion.div
          className="flex justify-between items-center mb-6 p-4 rounded-2xl"
          style={getPanelStyles(0.15)}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white">{pilotName}</h1>
              <p className="text-sm text-blue-300">{aircraftModel}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/30"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(34,197,94,0.3)",
                  "0 0 40px rgba(34,197,94,0.6)",
                  "0 0 20px rgba(34,197,94,0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-300">NEURAL LINK ACTIVE</span>
            </motion.div>

            <div className="text-right text-sm">
              <p className="text-gray-300">Local Time</p>
              <p className="text-white font-mono">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          
          {/* Primary Flight Display */}
          <motion.div
            className="col-span-8 p-6 rounded-3xl"
            style={getPanelStyles(0.12)}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Gauge className="w-5 h-5 text-blue-400" />
              Primary Flight Display
            </h2>

            {/* Main Flight Data Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {primaryFlightData.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-2xl bg-black/30 border border-white/10"
                  style={{
                    transform: `perspective(600px) rotateY(${(mousePosition.x - 0.5) * 8}deg) rotateX(${(mousePosition.y - 0.5) * 4}deg)`
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400 uppercase tracking-wider">{item.label}</span>
                    <div className={item.color}>{item.icon}</div>
                  </div>
                  <motion.div
                    className={`text-3xl font-black ${item.color}`}
                    animate={{ 
                      textShadow: [
                        "0 0 0px currentColor",
                        "0 0 20px currentColor",
                        "0 0 0px currentColor"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {item.value}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Artificial Horizon */}
            <div className="relative">
              <h3 className="text-sm font-medium text-gray-300 mb-4">Artificial Horizon</h3>
              <div className="relative w-full h-32 bg-gradient-to-b from-blue-900/50 to-amber-900/50 rounded-2xl overflow-hidden border border-white/20">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    rotateZ: Math.sin(Date.now() * 0.001) * 5
                  }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="w-32 h-0.5 bg-white shadow-lg" />
                  <div className="absolute w-4 h-4 border-2 border-white rounded-full bg-yellow-400" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Right Side Panels */}
          <div className="col-span-4 space-y-6">
            
            {/* Bio-Metrics Panel */}
            <motion.div
              className="p-6 rounded-3xl"
              style={getPanelStyles(0.12)}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Bio-Metrics
              </h3>
              
              <div className="space-y-4">
                {Object.entries(bioMetrics).map(([key, value], index) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-white font-medium">
                        {typeof value === 'number' ? Math.round(value) : value}
                        {key === 'heartRate' ? ' BPM' : '%'}
                      </span>
                    </div>
                    <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                        style={{ width: `${typeof value === 'number' ? (value / 100) * 100 : 0}%` }}
                        animate={{ width: `${typeof value === 'number' ? (value / 100) * 100 : 0}%` }}
                        transition={{ type: "spring", stiffness: 100 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* System Status Panel */}
            <motion.div
              className="p-6 rounded-3xl"
              style={getPanelStyles(0.12)}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CircuitBoard className="w-5 h-5 text-purple-400" />
                System Status
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(systemStatus).map(([system, status], index) => (
                  <motion.div
                    key={system}
                    className="p-3 rounded-xl bg-black/40 border border-white/10"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400 uppercase">{system}</span>
                      <div 
                        className={`w-2 h-2 rounded-full ${
                          status > 95 ? 'bg-green-400' : 
                          status > 80 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                      />
                    </div>
                    <div className="text-lg font-bold text-white">{status}%</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Neural Interface Control */}
            <motion.div
              className="p-6 rounded-3xl"
              style={getPanelStyles(0.12)}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-400" />
                Neural Interface
              </h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-400">
                      {Math.round(neuralActivity * 100)}%
                    </div>
                    <div className="text-sm text-gray-300">Neural Coherence</div>
                  </div>
                  
                  <motion.div
                    className="w-24 h-24 mx-auto rounded-full border-4 border-blue-400/30 flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(14,165,233,0.3)",
                        `0 0 ${neuralActivity * 60}px rgba(14,165,233,0.8)`,
                        "0 0 20px rgba(14,165,233,0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"
                      animate={{
                        scale: [1, 1 + neuralActivity * 0.3, 1]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-gray-400">Sync Rate</div>
                  <div className="text-white">99.97%</div>
                  <div className="text-gray-400">Latency</div>
                  <div className="text-white">0.002ms</div>
                  <div className="text-gray-400">Bandwidth</div>
                  <div className="text-white">2.4 THz</div>
                  <div className="text-gray-400">Quantum State</div>
                  <div className="text-green-400">Stable</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Holographic HUD Overlay */}
      <AnimatePresence>
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
        >
          {/* Radar Sweep */}
          <motion.div
            className="absolute top-8 right-8 w-32 h-32 border border-green-400/50 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent origin-left"
              style={{ transform: "translate(-50%, -50%)" }}
            />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-400 rounded-full" style={{ transform: "translate(-50%, -50%)" }} />
          </motion.div>

          {/* Corner UI Elements */}
          <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-blue-400/50" />
          <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-blue-400/50" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-blue-400/50" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-blue-400/50" />

          {/* Crosshair */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-0.5 bg-red-400 mb-2" />
            <div className="w-0.5 h-8 bg-red-400 mx-auto" />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
} 