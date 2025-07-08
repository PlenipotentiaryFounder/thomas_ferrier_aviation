# Component System Architecture

## Overview
This document outlines the comprehensive modular component system that allows aviation professionals to fully customize their websites through database-driven configuration.

## System Design Principles

### 1. **Database-Driven Configuration**
- Every component's behavior, content, and styling is controlled by database records
- No hardcoded content - everything is customizable per organization
- Component definitions define what CAN be customized
- Component instances define what IS customized for each organization

### 2. **Hierarchical Component Structure**

```
Organization
├── Theme Configuration (colors, fonts, layout)
├── Navigation Menus (primary, footer, mobile)
├── Pages
│   ├── Page-Level Components (hero, sections, footer)
│   └── Component Instances (specific configurations)
└── Global Components (navigation, footer)
```

### 3. **Component Categories**

#### **Navigation Components**
- `primary_navigation` - Main site navigation
- `mobile_navigation` - Mobile-optimized navigation
- `footer_navigation` - Footer links
- `breadcrumbs` - Page breadcrumb trails

#### **Hero Components**
- `hero_banner` - Standard hero with image/video background
- `hero_video` - Video background hero
- `hero_slider` - Multiple hero slides
- `hero_minimal` - Clean, text-focused hero

#### **Content Components**
- `about_section` - Personal bio and story
- `services_grid` - Aviation services offered
- `text_block` - Rich text content
- `two_column_layout` - Side-by-side content
- `call_to_action` - Action-focused sections

#### **Aviation-Specific Components**
- `certifications_display` - Licenses and ratings
- `flight_stats` - Flight hours and statistics
- `logbook_summary` - Recent flight entries
- `aircraft_gallery` - Aircraft photos and details
- `training_programs` - Course offerings
- `instructor_profile` - CFI-specific information

#### **Media Components**
- `photo_gallery` - Image galleries with lightbox
- `video_gallery` - Video collections
- `document_library` - Downloadable resources
- `interactive_map` - Location/route maps

#### **Social Proof Components**
- `testimonials_slider` - Student/client testimonials
- `reviews_grid` - Review displays
- `achievements_timeline` - Career milestones
- `awards_showcase` - Recognition and awards

#### **Contact Components**
- `contact_form` - Customizable contact forms
- `contact_info` - Contact details display
- `schedule_booking` - Appointment scheduling
- `social_links` - Social media links

## Component Configuration System

### 1. **Component Definitions**
```typescript
interface ComponentDefinition {
  component_key: string          // 'hero_banner'
  component_name: string         // 'Hero Banner'
  component_category: string     // 'hero'
  default_config: object         // Default settings
  configurable_fields: string[] // What users can change
  required_fields: string[]     // What must be provided
  is_premium: boolean           // Subscription requirement
}
```

### 2. **Component Instances**
```typescript
interface ComponentInstance {
  organization_id: string       // Which organization owns this
  page_id: string | null       // Which page (null = global)
  instance_key: string         // Unique identifier
  configuration: object        // User's custom config
  display_order: number        // Position on page
  is_visible: boolean          // Show/hide toggle
}
```

### 3. **Configuration Examples**

#### Hero Banner Configuration
```json
{
  "title": "Captain John Smith",
  "subtitle": "Professional Flight Instructor & Commercial Pilot",
  "backgroundImage": "/uploads/hero-bg.jpg",
  "backgroundColor": "#1a365d",
  "textAlignment": "center",
  "showCTA": true,
  "ctaText": "Schedule Training",
  "ctaLink": "/contact",
  "ctaStyle": "primary"
}
```

#### Navigation Menu Configuration
```json
{
  "menuItems": [
    {"label": "Home", "slug": "home", "order": 1},
    {"label": "About", "slug": "about", "order": 2},
    {"label": "Services", "slug": "services", "order": 3},
    {"label": "Experience", "slug": "experience", "order": 4},
    {"label": "Contact", "slug": "contact", "order": 5}
  ],
  "layout": "horizontal",
  "showLogo": true,
  "sticky": true,
  "logoUrl": "/uploads/logo.png"
}
```

## Dynamic Rendering System

### 1. **Page Rendering Flow**
```typescript
// 1. Get organization by subdomain/slug
const organization = await getOrganizationBySlug(slug)

// 2. Get page configuration with all components
const pageConfig = await getPageConfiguration(organization.id, pageSlug)

// 3. Get navigation configuration
const navigation = await getNavigationConfig(organization.id)

// 4. Get theme configuration
const theme = await getOrganizationTheme(organization.id)

// 5. Render page with components
return <DynamicPage config={pageConfig} navigation={navigation} theme={theme} />
```

### 2. **Component Registry**
```typescript
// Component registry maps database keys to React components
const COMPONENT_REGISTRY = {
  'hero_banner': HeroBannerComponent,
  'about_section': AboutSectionComponent,
  'services_grid': ServicesGridComponent,
  'contact_form': ContactFormComponent,
  // ... etc
}

// Dynamic component rendering
function renderComponent(instance: ComponentInstance) {
  const Component = COMPONENT_REGISTRY[instance.component_key]
  return <Component config={instance.configuration} />
}
```

### 3. **Conditional Rendering**
Components can be conditionally rendered based on:
- User role (admin, professional, guest)
- Subscription tier (basic, professional, enterprise)
- Organization settings
- Page context
- Device type (mobile, tablet, desktop)

```typescript
function shouldRenderComponent(
  instance: ComponentInstance, 
  user: User, 
  organization: Organization
): boolean {
  // Check subscription requirements
  if (instance.is_premium && organization.subscription_tier === 'basic') {
    return false
  }
  
  // Check user role requirements
  if (instance.requires_auth && !user) {
    return false
  }
  
  // Check visibility settings
  return instance.is_visible && instance.is_enabled
}
```

## Customization Levels

### 1. **Layout Customization**
- Component positioning and ordering
- Grid layouts and responsive behavior
- Spacing and margin controls
- Container width and alignment

### 2. **Content Customization**
- Text content (rich text editing)
- Images and media uploads
- Links and call-to-action buttons
- Form fields and validation

### 3. **Style Customization**
- Colors (background, text, accent)
- Typography (fonts, sizes, weights)
- Borders and shadows
- Animation preferences

### 4. **Functionality Customization**
- Component behavior toggles
- Integration settings (forms, analytics)
- SEO settings (meta tags, schema)
- Performance optimizations

## User Interface for Customization

### 1. **Page Builder Interface**
- Drag-and-drop component ordering
- Live preview of changes
- Component library browser
- Template selection

### 2. **Component Editor**
- Form-based configuration editing
- Rich text editor for content
- Media library integration
- Color picker and font selector

### 3. **Theme Customizer**
- Global style settings
- Brand color palette
- Typography selections
- Layout preferences

## Technical Implementation

### 1. **React Component Structure**
```typescript
interface ComponentProps {
  config: ComponentConfig
  organizationId: string
  isEditable?: boolean
  onUpdate?: (newConfig: ComponentConfig) => void
}

function HeroBannerComponent({ config, organizationId, isEditable }: ComponentProps) {
  return (
    <section 
      style={{
        backgroundColor: config.backgroundColor,
        backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined
      }}
      className={`hero-banner ${config.textAlignment}`}
    >
      <div className="hero-content">
        <h1>{config.title}</h1>
        <p>{config.subtitle}</p>
        {config.showCTA && (
          <Button href={config.ctaLink} variant={config.ctaStyle}>
            {config.ctaText}
          </Button>
        )}
      </div>
    </section>
  )
}
```

### 2. **Database Integration**
```typescript
// Fetch complete page configuration
async function getPageData(organizationSlug: string, pageSlug: string) {
  const supabase = createClient()
  
  // Get organization
  const { data: org } = await supabase
    .rpc('get_organization_by_slug', { org_slug: organizationSlug })
    
  if (!org) throw new Error('Organization not found')
  
  // Get page configuration with all components
  const { data: pageConfig } = await supabase
    .rpc('get_page_configuration', { 
      org_id: org.id, 
      page_slug: pageSlug 
    })
    
  // Get navigation and theme
  const [{ data: navigation }, { data: theme }] = await Promise.all([
    supabase.rpc('get_navigation_config', { org_id: org.id }),
    supabase.from('organization_themes')
      .select('*')
      .eq('organization_id', org.id)
      .eq('is_active', true)
      .single()
  ])
  
  return { organization: org, page: pageConfig, navigation, theme }
}
```

## Security and Performance

### 1. **Row Level Security**
- All component data is isolated by organization
- User role-based access controls
- Read/write permissions by subscription tier

### 2. **Caching Strategy**
- Static page generation for public pages
- Component-level caching
- CDN optimization for media assets

### 3. **Performance Optimization**
- Lazy loading of non-critical components
- Image optimization and responsive loading
- Code splitting by component category

This architecture provides complete flexibility while maintaining performance, security, and ease of use for aviation professionals who want to customize their websites without technical knowledge. 