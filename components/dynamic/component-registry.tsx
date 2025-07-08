import React from 'react'
import type { ComponentDefinition, ComponentInstance } from '@/types/database'

// Import your existing components
import Hero from '@/components/hero'
import About from '@/components/about'
import Experience from '@/components/experience'
import Certifications from '@/components/certifications'
import Gallery from '@/components/gallery'
import Projects from '@/components/projects'
import Contact from '@/components/contact'
import FlightLogbook from '@/components/flight-logbook'

// Import specific sub-components from your home folder
import HeroSection from '@/components/home/hero'
import CallToAction from '@/components/home/call-to-action'
import TestimonialsSection from '@/components/home/testimonials-section'
import FeaturedSection from '@/components/home/featured-section'
import ConsultingSection from '@/components/home/consulting-section'
import LatestFlights from '@/components/home/latest-flights'

// Import certifications components
import CertificationsHero from '@/components/certifications/certifications-hero'
import CertificationsList from '@/components/certifications/certifications-list'
import EndorsementsSection from '@/components/certifications/endorsements-section'
import Timeline from '@/components/certifications/timeline'

// Import new aviation-themed variants
import HeroSleek from './variants/hero-sleek'
import HeroProfessional from './variants/hero-professional'
import HeroModern from './variants/hero-modern'

// Import next-generation 2025 components
import CockpitDashboard from './variants/cockpit-dashboard'
import ImmersiveNavigation from './variants/immersive-navigation'
import LiquidGlassStats from './variants/liquid-glass-stats'

// Component interface that all dynamic components must implement
export interface DynamicComponentProps {
  config: any
  organizationId: string
  isEditable?: boolean
  onUpdate?: (newConfig: any) => void
  className?: string
}

// Component adapter that wraps existing components to work with dynamic configuration
function createComponentAdapter(
  ExistingComponent: React.ComponentType<any>, 
  configMapper?: (config: any) => any
) {
  return function AdaptedComponent({ config, organizationId, isEditable, onUpdate, className }: DynamicComponentProps) {
    // Apply config transformations if needed
    const props = configMapper ? configMapper(config) : config

    return (
      <div className={`dynamic-component ${className || ''} ${isEditable ? 'editable-mode' : ''}`}>
        {/* Edit overlay for admin mode */}
        {isEditable && (
          <div className="absolute top-4 right-4 z-10 opacity-0 hover:opacity-100 transition-opacity">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm shadow-lg"
              onClick={() => {
                console.log('Edit component', config)
                // This would open a component editor modal
              }}
            >
              Edit
            </button>
          </div>
        )}
        
        <ExistingComponent {...props} />
      </div>
    )
  }
}

// Component registry mapping database keys to your existing React components
export const COMPONENT_REGISTRY: Record<string, React.ComponentType<DynamicComponentProps>> = {
  // Main page components (full sections)
  'hero_banner': createComponentAdapter(Hero, (config) => ({
    title: config.title || 'THOMAS FERRIER',
    subtitle: config.subtitle || 'CERTIFIED FLIGHT INSTRUCTOR & AVIATION INNOVATOR',
    backgroundImage: config.backgroundImage,
    ...config
  })),
  
  // Aviation hero variants for user pages
  'hero_aviation': createComponentAdapter(Hero, (config) => ({
    title: config.title,
    subtitle: config.subtitle,
    description: config.description,
    backgroundImage: config.backgroundImage || '/images/hero-poster.jpg',
    ctaText: config.ctaText,
    ctaLink: config.ctaLink,
    ...config
  })),
  
  'hero_simple': createComponentAdapter(HeroSection, (config) => ({
    title: config.title,
    subtitle: config.subtitle,
    description: config.description,
    ...config
  })),
  
  // About section variants
  'about_professional': createComponentAdapter(About, (config) => ({
    title: config.title,
    content: config.content,
    stats: config.stats,
    ...config
  })),
  
  // Aviation-themed hero variants
  'hero_banner_sleek': createComponentAdapter(HeroSleek),
  'hero_banner_professional': createComponentAdapter(HeroProfessional),
  'hero_banner_modern': createComponentAdapter(HeroModern),

  // Next-generation 2025 components with cutting-edge design
  'cockpit_dashboard': createComponentAdapter(CockpitDashboard),
  'immersive_navigation': createComponentAdapter(ImmersiveNavigation),
  'liquid_glass_stats': createComponentAdapter(LiquidGlassStats),
  
  'about_section': createComponentAdapter(About),
  'experience_section': createComponentAdapter(Experience),
  'certifications_section': createComponentAdapter(Certifications),
  'gallery_section': createComponentAdapter(Gallery),
  'projects_section': createComponentAdapter(Projects),
  'contact_section': createComponentAdapter(Contact),
  'logbook_section': createComponentAdapter(FlightLogbook),

  // Home page sub-components
  'home_hero': createComponentAdapter(HeroSection),
  'call_to_action': createComponentAdapter(CallToAction),
  'testimonials_slider': createComponentAdapter(TestimonialsSection),
  'featured_section': createComponentAdapter(FeaturedSection),
  'consulting_section': createComponentAdapter(ConsultingSection),
  'latest_flights': createComponentAdapter(LatestFlights),

  // Aviation-specific components
  'certifications_hero': createComponentAdapter(CertificationsHero),
  'certifications_list': createComponentAdapter(CertificationsList),
  'endorsements_section': createComponentAdapter(EndorsementsSection),
  'certifications_timeline': createComponentAdapter(Timeline),

  // Navigation components (these will use dynamic config)
  'primary_navigation': createComponentAdapter(() => null, () => ({})), // Will be handled by layout
  'footer_basic': createComponentAdapter(() => null, () => ({})), // Will be handled by layout
}

// Fallback component for unknown component types
const UnknownComponent: React.FC<DynamicComponentProps> = ({ config }) => (
  <div className="border-2 border-dashed border-red-300 bg-red-50 p-4 rounded-lg">
    <p className="text-red-600 font-medium">Unknown Component</p>
    <p className="text-red-500 text-sm">Component type not found in registry</p>
    <pre className="text-xs text-red-400 mt-2">{JSON.stringify(config, null, 2)}</pre>
  </div>
)

/**
 * Render a dynamic component based on its database configuration
 */
export function renderDynamicComponent(
  instance: ComponentInstance & { definition: ComponentDefinition },
  organizationId: string,
  isEditable: boolean = false,
  onUpdate?: (instanceId: string, newConfig: any) => void
): React.ReactElement {
  const componentKey = instance.definition.component_key
  const Component = COMPONENT_REGISTRY[componentKey] || UnknownComponent
  
  const handleUpdate = onUpdate ? (newConfig: any) => onUpdate(instance.id, newConfig) : undefined
  
  return (
    <Component
      key={instance.instance_key}
      config={instance.configuration}
      organizationId={organizationId}
      isEditable={isEditable}
      onUpdate={handleUpdate}
      className={`component-${componentKey} ${!instance.is_visible ? 'opacity-50' : ''}`}
    />
  )
}

/**
 * Check if a component should be rendered based on subscription and visibility
 */
export function shouldRenderComponent(
  instance: ComponentInstance & { definition: ComponentDefinition },
  subscriptionTier: string,
  userRole?: string
): boolean {
  // Check if component is enabled and visible
  if (!instance.is_enabled || !instance.is_visible) {
    return false
  }
  
  // Check premium component access
  if (instance.definition.is_premium && subscriptionTier === 'basic') {
    return false
  }
  
  return true
}

/**
 * Get component definition by key
 */
export function getComponentDefinition(componentKey: string): ComponentDefinition | null {
  // This would typically fetch from database
  return null
}

/**
 * Validate component configuration against its definition
 */
export function validateComponentConfig(
  config: any,
  definition: ComponentDefinition
): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  const requiredFields = definition.required_fields as string[] || []
  
  // Check required fields
  for (const field of requiredFields) {
    if (config[field] === undefined || config[field] === null || config[field] === '') {
      errors.push(`Required field '${field}' is missing`)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Get default configuration for a component
 */
export function getDefaultComponentConfig(definition: ComponentDefinition): any {
  return {
    ...definition.default_config,
    // Add any runtime defaults here
  }
}

export { COMPONENT_REGISTRY } 