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
    }
    Views: {
      [_ in never]: never
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
export type ComponentDefinition = Tables<'component_definitions'>

// User roles for type safety
export type UserRole = 'admin' | 'professional' | 'guest'

// Subscription tiers
export type SubscriptionTier = 'basic' | 'professional' | 'enterprise'

// Component categories
export type ComponentCategory = 'navigation' | 'hero' | 'content' | 'aviation' | 'media' | 'form' | 'contact' | 'social_proof' | 'footer'