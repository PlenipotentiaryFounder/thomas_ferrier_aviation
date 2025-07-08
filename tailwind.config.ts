import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Ultra-responsive breakpoints for 2025 mobile optimization
      screens: {
        'xs': '375px',      // Ultra-small phones
        'sm': '640px',      // Small tablets
        'md': '768px',      // Tablets
        'lg': '1024px',     // Laptops
        'xl': '1280px',     // Desktops
        '2xl': '1536px',    // Large screens
        '3xl': '1920px',    // Ultra-wide screens
        '4k': '2560px',     // 4K displays
        // Device-specific breakpoints
        'mobile': { 'max': '767px' },
        'tablet': { 'min': '768px', 'max': '1023px' },
        'desktop': { 'min': '1024px' },
        // Orientation-based
        'portrait': { 'raw': '(orientation: portrait)' },
        'landscape': { 'raw': '(orientation: landscape)' },
        // High DPI displays
        'retina': { 'raw': '(-webkit-min-device-pixel-ratio: 2)' },
      },
      
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // 2025 Aviation Color Palette
        aviation: {
          blue: "#0ea5e9",
          cyan: "#06b6d4", 
          sky: "#0284c7",
          indigo: "#6366f1",
          purple: "#8b5cf6",
          pink: "#ec4899",
          emerald: "#10b981",
          green: "#22c55e",
          yellow: "#eab308",
          orange: "#f97316",
          red: "#ef4444",
          gray: "#6b7280",
          slate: "#64748b",
          zinc: "#71717a",
          neutral: "#737373",
          stone: "#78716c",
        },
        // Neural interface colors
        neural: {
          100: "#e0f2fe",
          200: "#bae6fd", 
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        // Liquid glass colors
        glass: {
          100: "rgba(255, 255, 255, 0.1)",
          200: "rgba(255, 255, 255, 0.2)",
          300: "rgba(255, 255, 255, 0.3)",
          400: "rgba(255, 255, 255, 0.4)",
          500: "rgba(255, 255, 255, 0.5)",
        }
      },
      
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // 2025 curved interfaces
        'ultra': '2rem',
        'mega': '3rem',
        'sphere': '50%',
      },
      
      // 2025 Aviation Animations
      keyframes: {
        // Enhanced radar sweep with mobile optimization
        "radar-sweep": {
          "0%": { 
            transform: "rotate(0deg) scale(1)",
            opacity: "1"
          },
          "50%": { 
            transform: "rotate(180deg) scale(1.1)",
            opacity: "0.8"
          },
          "100%": { 
            transform: "rotate(360deg) scale(1)",
            opacity: "1"
          },
        },
        
        // Liquid glass flow animation
        "liquid-flow": {
          "0%": { 
            transform: "translateX(-100%) scale(1)",
            opacity: "0"
          },
          "50%": { 
            transform: "translateX(0%) scale(1.2)",
            opacity: "1"
          },
          "100%": { 
            transform: "translateX(100%) scale(1)",
            opacity: "0"
          },
        },
        
        // Neural pulse with mobile responsiveness
        "neural-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 0 0 rgba(59, 130, 246, 0.7)",
            transform: "scale(1)"
          },
          "50%": { 
            boxShadow: "0 0 0 10px rgba(59, 130, 246, 0)",
            transform: "scale(1.05)"
          },
        },
        
        // Holographic glitch effect
        "holo-glitch": {
          "0%, 100%": { 
            transform: "translateX(0) skew(0deg)",
            filter: "hue-rotate(0deg)"
          },
          "10%": { 
            transform: "translateX(-2px) skew(-2deg)",
            filter: "hue-rotate(90deg)"
          },
          "20%": { 
            transform: "translateX(2px) skew(2deg)",
            filter: "hue-rotate(180deg)"
          },
          "30%": { 
            transform: "translateX(-1px) skew(-1deg)",
            filter: "hue-rotate(270deg)"
          },
        },
        
        // Volumetric depth animation
        "volumetric-depth": {
          "0%": { 
            transform: "perspective(1000px) rotateY(0deg) translateZ(0px)",
          },
          "50%": { 
            transform: "perspective(1000px) rotateY(180deg) translateZ(50px)",
          },
          "100%": { 
            transform: "perspective(1000px) rotateY(360deg) translateZ(0px)",
          },
        },
        
        // Bio-symbiotic breathing
        "bio-breathe": {
          "0%, 100%": { 
            transform: "scale(1)",
            filter: "brightness(1) contrast(1)"
          },
          "50%": { 
            transform: "scale(1.03)",
            filter: "brightness(1.1) contrast(1.1)"
          },
        },
        
        // Quantum field fluctuation
        "quantum-flux": {
          "0%": { 
            filter: "blur(0px) saturate(100%)",
            transform: "translateY(0px)"
          },
          "25%": { 
            filter: "blur(1px) saturate(120%)",
            transform: "translateY(-2px)"
          },
          "50%": { 
            filter: "blur(0px) saturate(110%)",
            transform: "translateY(0px)"
          },
          "75%": { 
            filter: "blur(1px) saturate(130%)",
            transform: "translateY(2px)"
          },
          "100%": { 
            filter: "blur(0px) saturate(100%)",
            transform: "translateY(0px)"
          },
        },
        
        // Mobile touch ripple
        "touch-ripple": {
          "0%": { 
            transform: "scale(0)",
            opacity: "1"
          },
          "100%": { 
            transform: "scale(4)",
            opacity: "0"
          },
        },
        
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        
        // Aviation animations with mobile optimization
        "radar-sweep": "radar-sweep 4s linear infinite",
        "radar-sweep-fast": "radar-sweep 2s linear infinite",
        "liquid-flow": "liquid-flow 3s ease-in-out infinite",
        "neural-pulse": "neural-pulse 2s ease-in-out infinite",
        "holo-glitch": "holo-glitch 3s ease-in-out infinite",
        "volumetric-depth": "volumetric-depth 8s ease-in-out infinite",
        "bio-breathe": "bio-breathe 4s ease-in-out infinite",
        "quantum-flux": "quantum-flux 5s ease-in-out infinite",
        "touch-ripple": "touch-ripple 0.6s ease-out",
        
        // Mobile-specific slower animations for better performance
        "radar-mobile": "radar-sweep 6s linear infinite",
        "pulse-mobile": "neural-pulse 3s ease-in-out infinite",
        "breathe-mobile": "bio-breathe 6s ease-in-out infinite",
      },
      
      // Enhanced spacing for mobile touch targets
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
        '224': '56rem',
        '256': '64rem',
        // Mobile-optimized touch targets
        'touch': '44px',    // Minimum touch target size
        'touch-lg': '48px', // Large touch target
        'touch-xl': '56px', // Extra large touch target
      },
      
      // 2025 Typography Scale with mobile optimization
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], 
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        // Mobile-optimized sizes
        'mobile-xs': ['0.65rem', { lineHeight: '0.9rem' }],
        'mobile-sm': ['0.8rem', { lineHeight: '1.1rem' }],
        'mobile-base': ['0.9rem', { lineHeight: '1.3rem' }],
        'mobile-lg': ['1rem', { lineHeight: '1.4rem' }],
        'mobile-xl': ['1.1rem', { lineHeight: '1.5rem' }],
        'mobile-2xl': ['1.3rem', { lineHeight: '1.7rem' }],
        'mobile-3xl': ['1.6rem', { lineHeight: '2rem' }],
        'mobile-4xl': ['2rem', { lineHeight: '2.2rem' }],
        'mobile-5xl': ['2.5rem', { lineHeight: '1.1' }],
        // Kinetic typography
        'kinetic-sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.05em' }],
        'kinetic-base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.025em' }],
        'kinetic-lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.01em' }],
        'kinetic-xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.005em' }],
      },
      
      // Enhanced backdrop blur for liquid glass effects
      backdropBlur: {
        'ultra': '80px',
        'mega': '120px',
        'extreme': '200px',
      },
      
      // Enhanced box shadows for depth and mobile visibility
      boxShadow: {
        // Liquid glass shadows
        'glass-sm': '0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-lg': '0 16px 64px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
        'glass-xl': '0 32px 128px rgba(0, 0, 0, 0.25), inset 0 4px 8px rgba(255, 255, 255, 0.2)',
        
        // Neural glow shadows
        'neural': '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)',
        'neural-lg': '0 0 40px rgba(59, 130, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.2)',
        'neural-xl': '0 0 60px rgba(59, 130, 246, 0.5), 0 0 120px rgba(59, 130, 246, 0.3)',
        
        // Holographic shadows
        'holo': '0 0 30px rgba(168, 85, 247, 0.3), 0 0 60px rgba(236, 72, 153, 0.2)',
        'holo-lg': '0 0 50px rgba(168, 85, 247, 0.4), 0 0 100px rgba(236, 72, 153, 0.3)',
        
        // Bio-symbiotic shadows
        'bio': '0 0 25px rgba(34, 197, 94, 0.3), 0 0 50px rgba(34, 197, 94, 0.15)',
        'bio-lg': '0 0 45px rgba(34, 197, 94, 0.4), 0 0 90px rgba(34, 197, 94, 0.2)',
        
        // Mobile-optimized shadows (lighter for performance)
        'mobile': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'mobile-lg': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'mobile-xl': '0 8px 32px rgba(0, 0, 0, 0.2)',
      },
      
      // Enhanced blur effects
      blur: {
        'ultra': '80px',
        'mega': '120px',
        'extreme': '200px',
      },
      
      // Font families for 2025 design
      fontFamily: {
        'sans': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'space-grotesk': ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        'inter': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom utilities for 2025 aviation design
    function({ addUtilities, theme }: { addUtilities: any, theme: any }) {
      const newUtilities = {
        // Liquid glass morphism utilities
        '.liquid-glass': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          backdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        },
        
        '.liquid-glass-mobile': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
          backdropFilter: 'blur(20px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        },
        
        // Neural interface utilities
        '.neural-interface': {
          background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 100%)',
          backdropFilter: 'blur(32px) brightness(120%)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 0 40px rgba(59, 130, 246, 0.2), inset 0 2px 4px rgba(59, 130, 246, 0.1)',
        },
        
        '.neural-interface-mobile': {
          background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 100%)',
          backdropFilter: 'blur(16px) brightness(115%)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.15), inset 0 1px 2px rgba(59, 130, 246, 0.1)',
        },
        
        // Holographic effects
        '.holographic': {
          background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)',
          backdropFilter: 'blur(36px) hue-rotate(15deg) saturate(140%)',
          border: '2px solid rgba(168, 85, 247, 0.3)',
          boxShadow: '0 0 60px rgba(168, 85, 247, 0.3), 0 0 0 1px rgba(236, 72, 153, 0.2)',
        },
        
        '.holographic-mobile': {
          background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.08) 0%, rgba(236, 72, 153, 0.08) 50%, rgba(59, 130, 246, 0.08) 100%)',
          backdropFilter: 'blur(18px) hue-rotate(10deg) saturate(130%)',
          border: '1px solid rgba(168, 85, 247, 0.25)',
          boxShadow: '0 0 30px rgba(168, 85, 247, 0.2), 0 0 0 1px rgba(236, 72, 153, 0.15)',
        },
        
        // Bio-symbiotic utilities
        '.bio-symbiotic': {
          background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.1) 0%, transparent 60%)',
          backdropFilter: 'blur(28px) contrast(120%)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          boxShadow: '0 0 50px rgba(34, 197, 94, 0.2), inset 0 3px 6px rgba(34, 197, 94, 0.1)',
        },
        
        '.bio-symbiotic-mobile': {
          background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.08) 0%, transparent 60%)',
          backdropFilter: 'blur(14px) contrast(115%)',
          border: '1px solid rgba(34, 197, 94, 0.25)',
          boxShadow: '0 0 25px rgba(34, 197, 94, 0.15), inset 0 2px 4px rgba(34, 197, 94, 0.1)',
        },
        
        // Touch-optimized interactive elements
        '.touch-target': {
          minWidth: '44px',
          minHeight: '44px',
          cursor: 'pointer',
        },
        
        '.touch-target-lg': {
          minWidth: '48px',
          minHeight: '48px',
          cursor: 'pointer',
        },
        
        '.touch-target-xl': {
          minWidth: '56px',
          minHeight: '56px',
          cursor: 'pointer',
        },
        
        // Kinetic typography
        '.kinetic-text': {
          background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'quantum-flux 5s ease-in-out infinite',
        },
        
        // Mobile performance optimizations
        '.mobile-optimized': {
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        },
        
        // Volumetric depth
        '.volumetric-depth': {
          transform: 'perspective(1000px) translateZ(0)',
          transformStyle: 'preserve-3d',
        },
        
        // Cockpit panel styling
        '.cockpit-panel': {
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
          backdropFilter: 'blur(20px) saturate(120%)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        },
        
        '.cockpit-panel-mobile': {
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.75) 100%)',
          backdropFilter: 'blur(10px) saturate(110%)',
          border: '1px solid rgba(59, 130, 246, 0.15)',
          borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        },
      }
      
      addUtilities(newUtilities)
    },
  ],
}

export default config;
