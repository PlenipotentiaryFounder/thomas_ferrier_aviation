'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import type { NavigationMenu, Organization, OrganizationTheme } from "@/types/database"

interface DynamicNavigationProps {
  organization: Organization
  navigation?: NavigationMenu | null
  theme?: OrganizationTheme | null
  currentPage?: string
  isEditable?: boolean
}

interface NavLink {
  name: string
  href: string
  isExternal?: boolean
  order?: number
}

export function DynamicNavigation({ 
  organization, 
  navigation, 
  theme,
  currentPage,
  isEditable = false 
}: DynamicNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Generate navigation links from database configuration or fallback
  const defaultNavItems = [
    { label: 'Home', slug: 'home', order: 1 },
    { label: 'About', slug: 'about', order: 2 },
    { label: 'Experience', slug: 'experience', order: 3 },
    { label: 'Certifications', slug: 'certifications', order: 4 },
    { label: 'Contact', slug: 'contact', order: 5 }
  ]

  const navItems = navigation?.menu_items || defaultNavItems
  
  const navLinks: NavLink[] = navItems.map((item: any) => ({
    name: item.label,
    href: item.isExternal ? item.url : (item.slug === 'home' ? `/u/${organization.slug}` : `/u/${organization.slug}/${item.slug}`),
    isExternal: item.isExternal || false,
    order: item.order || 0
  })).sort((a, b) => (a.order || 0) - (b.order || 0))

  // Get logo URL from organization or navigation config
  const logoUrl = organization.logo_url
  const showLogo = true

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Apply theme styles if available
  const themeStyles = theme?.color_palette ? {
    '--color-primary': (theme.color_palette as any).primary,
    '--color-secondary': (theme.color_palette as any).secondary,
  } as React.CSSProperties : {}

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled ? "bg-background/80 backdrop-blur-xl shadow-lg py-3" : "bg-transparent py-6",
      )}
      style={themeStyles}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link href={`/u/${organization.slug}`} className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center">
            {showLogo && logoUrl ? (
              <img 
                src={logoUrl} 
                alt={`${organization.name} logo`}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-primary/20 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                <Plane className="h-6 w-6 text-primary z-10 group-hover:rotate-12 transition-transform duration-300" />
              </>
            )}
          </div>
          <span className="font-bold text-xl tracking-tight">
            {organization.name}
          </span>
        </Link>

        {/* Mobile Menu Button & ModeToggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-panel"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu Panel */}
        <div className="md:hidden">
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-menu-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full left-0 right-0 bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md border-t border-b border-border/50 shadow-lg"
                role="menu"
              >
                <nav className="flex flex-col py-4 container mx-auto">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className={cn(
                        "px-4 py-4 transition-colors flex items-center space-x-2",
                        pathname === link.href ? "text-primary font-medium" : "hover:text-primary",
                      )}
                      onClick={() => setIsMenuOpen(false)}
                      role="menuitem"
                    >
                      <span>{link.name}</span>
                      {pathname === link.href && (
                        <motion.div
                          layoutId="activeIndicatorMobile"
                          className="h-1 w-1 rounded-full bg-primary"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Navigation & ModeToggle */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-8">
          <nav className="flex flex-wrap space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className={cn(
                  "px-3 lg:px-4 py-2 relative rounded-full transition-colors whitespace-nowrap",
                  pathname === link.href ? "text-primary font-medium" : "hover:text-primary",
                )}
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </nav>
          <ModeToggle />
        </div>

        {/* Edit navigation overlay for admins */}
        {isEditable && (
          <div className="absolute top-full right-4 mt-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm shadow-lg"
              onClick={() => {
                console.log('Edit navigation', navigation)
                // This would open navigation editor
              }}
            >
              Edit Navigation
            </button>
          </div>
        )}
      </div>
    </header>
  )
} 