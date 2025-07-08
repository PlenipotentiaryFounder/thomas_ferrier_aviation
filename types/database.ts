export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          billing_email: string | null
          created_at: string | null
          domain: string | null
          id: string
          logo_url: string | null
          name: string
          primary_color: string | null
          secondary_color: string | null
          slug: string
          subscription_status: string | null
          subscription_tier: string | null
          trial_ends_at: string | null
          updated_at: string | null
        }
        Insert: {
          billing_email?: string | null
          created_at?: string | null
          domain?: string | null
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string | null
          secondary_color?: string | null
          slug: string
          subscription_status?: string | null
          subscription_tier?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Update: {
          billing_email?: string | null
          created_at?: string | null
          domain?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          secondary_color?: string | null
          slug?: string
          subscription_status?: string | null
          subscription_tier?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          email_notifications: boolean | null
          first_name: string | null
          id: string
          last_name: string | null
          linkedin_url: string | null
          location: string | null
          organization_id: string | null
          phone: string | null
          profile_visibility: string | null
          role: string
          timezone: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email_notifications?: boolean | null
          first_name?: string | null
          id: string
          last_name?: string | null
          linkedin_url?: string | null
          location?: string | null
          organization_id?: string | null
          phone?: string | null
          profile_visibility?: string | null
          role?: string
          timezone?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email_notifications?: boolean | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          linkedin_url?: string | null
          location?: string | null
          organization_id?: string | null
          phone?: string | null
          profile_visibility?: string | null
          role?: string
          timezone?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      pages: {
        Row: {
          created_at: string | null
          custom_css: string | null
          id: string
          is_published: boolean | null
          is_visible_in_nav: boolean | null
          meta_description: string | null
          meta_keywords: string[] | null
          nav_order: number | null
          organization_id: string
          slug: string
          template_type: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          custom_css?: string | null
          id?: string
          is_published?: boolean | null
          is_visible_in_nav?: boolean | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          nav_order?: number | null
          organization_id: string
          slug: string
          template_type?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          custom_css?: string | null
          id?: string
          is_published?: boolean | null
          is_visible_in_nav?: boolean | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          nav_order?: number | null
          organization_id?: string
          slug?: string
          template_type?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      page_sections: {
        Row: {
          background_color: string | null
          content: Json | null
          created_at: string | null
          display_order: number | null
          id: string
          is_visible: boolean | null
          organization_id: string
          page_id: string
          section_type: string
          subtitle: string | null
          text_color: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          background_color?: string | null
          content?: Json | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
          organization_id: string
          page_id: string
          section_type: string
          subtitle?: string | null
          text_color?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          background_color?: string | null
          content?: Json | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
          organization_id?: string
          page_id?: string
          section_type?: string
          subtitle?: string | null
          text_color?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "page_sections_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_sections_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          }
        ]
      }
      media_assets: {
        Row: {
          alt_text: string | null
          created_at: string | null
          description: string | null
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string
          id: string
          is_featured: boolean | null
          mime_type: string | null
          organization_id: string
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          description?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          file_type: string
          id?: string
          is_featured?: boolean | null
          mime_type?: string | null
          organization_id: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string
          id?: string
          is_featured?: boolean | null
          mime_type?: string | null
          organization_id?: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_assets_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      aviation_certifications: {
        Row: {
          certificate_number: string | null
          certification_type: string
          created_at: string | null
          description: string | null
          expiration_date: string | null
          id: string
          is_current: boolean | null
          issue_date: string | null
          issuing_authority: string | null
          organization_id: string
          title: string
          updated_at: string | null
          verification_url: string | null
        }
        Insert: {
          certificate_number?: string | null
          certification_type: string
          created_at?: string | null
          description?: string | null
          expiration_date?: string | null
          id?: string
          is_current?: boolean | null
          issue_date?: string | null
          issuing_authority?: string | null
          organization_id: string
          title: string
          updated_at?: string | null
          verification_url?: string | null
        }
        Update: {
          certificate_number?: string | null
          certification_type?: string
          created_at?: string | null
          description?: string | null
          expiration_date?: string | null
          id?: string
          is_current?: boolean | null
          issue_date?: string | null
          issuing_authority?: string | null
          organization_id?: string
          title?: string
          updated_at?: string | null
          verification_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "aviation_certifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      flight_entries: {
        Row: {
          aircraft_tail_number: string | null
          aircraft_type: string | null
          approaches: number | null
          arrival_airport: string | null
          cfi_time: number | null
          created_at: string | null
          cross_country_time: number | null
          departure_airport: string | null
          dual_time: number | null
          flight_date: string
          flight_time_decimal: number | null
          id: string
          instrument_time: number | null
          landings_day: number | null
          landings_night: number | null
          night_time: number | null
          organization_id: string
          pic_time: number | null
          remarks: string | null
          updated_at: string | null
        }
        Insert: {
          aircraft_tail_number?: string | null
          aircraft_type?: string | null
          approaches?: number | null
          arrival_airport?: string | null
          cfi_time?: number | null
          created_at?: string | null
          cross_country_time?: number | null
          departure_airport?: string | null
          dual_time?: number | null
          flight_date: string
          flight_time_decimal?: number | null
          id?: string
          instrument_time?: number | null
          landings_day?: number | null
          landings_night?: number | null
          night_time?: number | null
          organization_id: string
          pic_time?: number | null
          remarks?: string | null
          updated_at?: string | null
        }
        Update: {
          aircraft_tail_number?: string | null
          aircraft_type?: string | null
          approaches?: number | null
          arrival_airport?: string | null
          cfi_time?: number | null
          created_at?: string | null
          cross_country_time?: number | null
          departure_airport?: string | null
          dual_time?: number | null
          flight_date?: string
          flight_time_decimal?: number | null
          id?: string
          instrument_time?: number | null
          landings_day?: number | null
          landings_night?: number | null
          night_time?: number | null
          organization_id?: string
          pic_time?: number | null
          remarks?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flight_entries_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      page_templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_premium: boolean | null
          name: string
          preview_image_url: string | null
          sections_config: Json
          template_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name: string
          preview_image_url?: string | null
          sections_config: Json
          template_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name?: string
          preview_image_url?: string | null
          sections_config?: Json
          template_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string
          setting_key: string
          setting_value: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id: string
          setting_key: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string
          setting_key?: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "site_settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      component_definitions: {
        Row: {
          id: string
          component_key: string
          component_name: string
          component_category: string
          description: string | null
          default_config: Json
          configurable_fields: Json
          required_fields: Json
          is_premium: boolean | null
          version: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          component_key: string
          component_name: string
          component_category: string
          description?: string | null
          default_config?: Json
          configurable_fields?: Json
          required_fields?: Json
          is_premium?: boolean | null
          version?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          component_key?: string
          component_name?: string
          component_category?: string
          description?: string | null
          default_config?: Json
          configurable_fields?: Json
          required_fields?: Json
          is_premium?: boolean | null
          version?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      component_instances: {
        Row: {
          id: string
          organization_id: string
          page_id: string | null
          component_definition_id: string
          instance_key: string
          configuration: Json
          display_order: number | null
          is_visible: boolean | null
          is_enabled: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          organization_id: string
          page_id?: string | null
          component_definition_id: string
          instance_key: string
          configuration?: Json
          display_order?: number | null
          is_visible?: boolean | null
          is_enabled?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          organization_id?: string
          page_id?: string | null
          component_definition_id?: string
          instance_key?: string
          configuration?: Json
          display_order?: number | null
          is_visible?: boolean | null
          is_enabled?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "component_instances_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_instances_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "component_instances_component_definition_id_fkey"
            columns: ["component_definition_id"]
            isOneToOne: false
            referencedRelation: "component_definitions"
            referencedColumns: ["id"]
          }
        ]
      }
      navigation_menus: {
        Row: {
          id: string
          organization_id: string
          menu_type: string | null
          menu_items: Json
          style_config: Json | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          organization_id: string
          menu_type?: string | null
          menu_items?: Json
          style_config?: Json | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          organization_id?: string
          menu_type?: string | null
          menu_items?: Json
          style_config?: Json | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "navigation_menus_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      organization_themes: {
        Row: {
          id: string
          organization_id: string
          theme_name: string | null
          color_palette: Json
          typography: Json
          layout_config: Json
          custom_css: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          organization_id: string
          theme_name?: string | null
          color_palette?: Json
          typography?: Json
          layout_config?: Json
          custom_css?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          organization_id?: string
          theme_name?: string | null
          color_palette?: Json
          typography?: Json
          layout_config?: Json
          custom_css?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_themes_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      content_templates: {
        Row: {
          id: string
          template_key: string
          template_name: string
          template_category: string
          content_structure: Json
          is_premium: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          template_key: string
          template_name: string
          template_category: string
          content_structure: Json
          is_premium?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          template_key?: string
          template_name?: string
          template_category?: string
          content_structure?: Json
          is_premium?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      organization_content: {
        Row: {
          id: string
          organization_id: string
          content_template_id: string | null
          content_key: string
          content_data: Json
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          organization_id: string
          content_template_id?: string | null
          content_key: string
          content_data?: Json
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          organization_id?: string
          content_template_id?: string | null
          content_key?: string
          content_data?: Json
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_content_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_content_content_template_id_fkey"
            columns: ["content_template_id"]
            isOneToOne: false
            referencedRelation: "content_templates"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      user_profiles_with_org: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          email_notifications: boolean | null
          first_name: string | null
          id: string | null
          last_name: string | null
          linkedin_url: string | null
          location: string | null
          organization_domain: string | null
          organization_id: string | null
          organization_name: string | null
          organization_slug: string | null
          phone: string | null
          profile_visibility: string | null
          role: string | null
          subscription_status: string | null
          subscription_tier: string | null
          timezone: string | null
          updated_at: string | null
          website_url: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      published_pages_with_content: {
        Row: {
          created_at: string | null
          custom_css: string | null
          id: string | null
          is_published: boolean | null
          is_visible_in_nav: boolean | null
          meta_description: string | null
          meta_keywords: string[] | null
          nav_order: number | null
          organization_id: string | null
          organization_name: string | null
          organization_slug: string | null
          sections: Json | null
          slug: string | null
          template_type: string | null
          title: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      get_user_organization_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      get_organization_by_slug: {
        Args: { org_slug: string }
        Returns: {
          id: string
          name: string
          slug: string
          domain: string
          logo_url: string
          primary_color: string
          secondary_color: string
          subscription_tier: string
          subscription_status: string
        }[]
      }
      create_aviation_professional: {
        Args: {
          user_id: string
          first_name: string
          last_name: string
          org_name: string
          org_slug: string
          email: string
        }
        Returns: string
      }
      get_flight_statistics: {
        Args: { org_id: string }
        Returns: {
          total_flights: number
          total_flight_time: number
          total_pic_time: number
          total_cfi_time: number
          total_landings: number
          aircraft_types_count: number
          last_flight_date: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Common types
export type Organization = Tables<'organizations'>
export type UserProfile = Tables<'user_profiles'>
export type Page = Tables<'pages'>
export type PageSection = Tables<'page_sections'>
export type MediaAsset = Tables<'media_assets'>
export type AviationCertification = Tables<'aviation_certifications'>
export type FlightEntry = Tables<'flight_entries'>
export type PageTemplate = Tables<'page_templates'>
export type SiteSetting = Tables<'site_settings'>

// Component system types
export type ComponentDefinition = Tables<'component_definitions'>
export type ComponentInstance = Tables<'component_instances'>
export type NavigationMenu = Tables<'navigation_menus'>
export type OrganizationTheme = Tables<'organization_themes'>
export type ContentTemplate = Tables<'content_templates'>
export type OrganizationContent = Tables<'organization_content'>

// User roles for type safety
export type UserRole = 'admin' | 'professional' | 'guest'

// Subscription tiers
export type SubscriptionTier = 'basic' | 'professional' | 'enterprise'

// Page template types
export type PageTemplateType = 'home' | 'about' | 'experience' | 'certifications' | 'logbook' | 'gallery' | 'projects' | 'consulting' | 'contact' | 'custom'

// Section types for page building
export type SectionType = 'hero' | 'about' | 'services' | 'gallery' | 'contact' | 'testimonials' | 'skills' | 'experience' | 'certifications' | 'logbook' | 'projects' | 'custom'

// Component categories
export type ComponentCategory = 'navigation' | 'hero' | 'content' | 'aviation' | 'media' | 'form' | 'contact' | 'social_proof' | 'footer'

// Menu types
export type MenuType = 'primary' | 'footer' | 'mobile'

// Component configuration interface
export interface ComponentConfig {
  [key: string]: any
}

// Navigation menu item interface
export interface NavigationMenuItem {
  label: string
  slug: string
  order: number
  isExternal?: boolean
  url?: string
  children?: NavigationMenuItem[]
}

// Theme configuration interfaces
export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
}

export interface Typography {
  fontFamily: string
  headingFont?: string
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
  }
  fontWeight: {
    normal: number
    medium: number
    semibold: number
    bold: number
  }
}

export interface LayoutConfig {
  maxWidth: string
  padding: string
  margin: string
  borderRadius: string
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
} 