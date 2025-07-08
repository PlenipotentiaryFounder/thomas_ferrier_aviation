"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MobileOptimizedContainerProps {
  children: React.ReactNode;
  variant?: "liquid-glass" | "neural-interface" | "holographic" | "bio-symbiotic";
  enableTouchRipple?: boolean;
  className?: string;
}

export default function MobileOptimizedContainer({
  children,
  variant = "neural-interface",
  enableTouchRipple = true,
  className = ""
}: MobileOptimizedContainerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [showRipple, setShowRipple] = useState(false);
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);

  useEffect(() => {
    // Detect mobile devices and device pixel ratio
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setDevicePixelRatio(window.devicePixelRatio || 1);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTouch = (e: React.TouchEvent) => {
    if (!enableTouchRipple || !isMobile) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    
    setTouchPosition({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
    
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
  };

  // Mobile-optimized variant styles
  const getContainerStyles = () => {
    const baseStyles = {
      position: "relative" as const,
      willChange: "transform",
      transform: "translateZ(0)",
      backfaceVisibility: "hidden" as const,
    };

    if (!isMobile) return baseStyles;

    // Mobile-specific optimizations
    const mobileStyles = {
      ...baseStyles,
      // Reduce visual complexity for better performance
      filter: devicePixelRatio > 2 ? "none" : undefined,
    };

    switch (variant) {
      case "liquid-glass":
        return {
          ...mobileStyles,
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
          backdropFilter: "blur(20px) saturate(150%)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.15)",
        };
      case "neural-interface":
        return {
          ...mobileStyles,
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, rgba(99,102,241,0.04) 50%, transparent 100%)",
          backdropFilter: "blur(16px) brightness(115%)",
          border: "1px solid rgba(59,130,246,0.25)",
          boxShadow: "0 0 20px rgba(59,130,246,0.15), inset 0 1px 2px rgba(59,130,246,0.1)",
        };
      case "holographic":
        return {
          ...mobileStyles,
          background: "linear-gradient(45deg, rgba(168,85,247,0.08) 0%, rgba(236,72,153,0.08) 50%, rgba(59,130,246,0.08) 100%)",
          backdropFilter: "blur(18px) hue-rotate(10deg) saturate(130%)",
          border: "1px solid rgba(168,85,247,0.25)",
          boxShadow: "0 0 30px rgba(168,85,247,0.2), 0 0 0 1px rgba(236,72,153,0.15)",
        };
      case "bio-symbiotic":
        return {
          ...mobileStyles,
          background: "radial-gradient(ellipse at center, rgba(34,197,94,0.08) 0%, transparent 60%)",
          backdropFilter: "blur(14px) contrast(115%)",
          border: "1px solid rgba(34,197,94,0.25)",
          boxShadow: "0 0 25px rgba(34,197,94,0.15), inset 0 2px 4px rgba(34,197,94,0.1)",
        };
      default:
        return mobileStyles;
    }
  };

  return (
    <motion.div
      className={`mobile-optimized ${className}`}
      style={getContainerStyles()}
      onTouchStart={handleTouch}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: isMobile ? 0.3 : 0.5,
        type: "spring",
        stiffness: isMobile ? 200 : 100
      }}
    >
      {children}
      
      {/* Touch Ripple Effect */}
      {showRipple && enableTouchRipple && isMobile && (
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: touchPosition.x - 20,
            top: touchPosition.y - 20,
            width: 40,
            height: 40,
            background: "rgba(255,255,255,0.3)",
            zIndex: 1000,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
      
      {/* Mobile Performance Indicator */}
      {isMobile && process.env.NODE_ENV === "development" && (
        <div className="absolute top-2 right-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded z-50">
          Mobile Mode {devicePixelRatio > 1 && `${devicePixelRatio}x`}
        </div>
      )}
    </motion.div>
  );
} 