# Supabase Database Integration Plan

This document outlines the proposed database schema to make the Thomas Ferrier Aviation website dynamic using Supabase. The goal is to allow content for each section and component to be managed via Supabase, with a long-term vision for a multi-tenant SaaS platform.

## I. Core Shared Tables

This section defines tables that are foundational and reused across multiple pages or globally for site configuration and content management.

1.  **`users` (Provided by Supabase Auth)**
    *   Implicitly used via `user_id` UUID references in other tables, linking data to a specific tenant/administrator.
    *   Contains user authentication details (email, password hash, etc.).

2.  **`user_site_settings`** (Global settings per tenant/site instance. Combines original `user_site_settings` from Theme and UI Elements)
    *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
    *   `default_theme_preference`: `text` (values: "light", "dark", "system", default: "system")
    *   `allow_visitor_theme_override`: `boolean` (default: `true`)
    *   `primary_color_hex`: `text` (Optional, e.g., "#RRGGBB")
    *   `toast_default_duration_ms`: `integer` (Optional)
    *   `pagination_default_items_per_page`: `integer` (Optional)
    *   `display_projects_page`: `boolean` (Default: `true`) - Example for page visibility control
    *   `display_consulting_page`: `boolean` (Default: `true`) - Example
    *   `display_gallery_page`: `boolean` (Default: `true`) - Example
    *   `display_logbook_page`: `boolean` (Default: `true`) - Example
    *   *(Add more flags here as needed for page/feature toggling for tenants)*
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `updated_at`: `timestamp with time zone` (default: `now()`)

3.  **`site_branding`** (Site-wide branding elements. Merges definitions from Navbar and Footer)
    *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique (one branding config per user/tenant).
    *   `brand_name`: `text` (e.g., "Thomas Ferrier Aviation")
    *   `logo_url`: `text` (URL to a logo image)
    *   `favicon_url`: `text`
    *   `footer_description`: `text` (Optional, for a short blurb in the footer)
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `updated_at`: `timestamp with time zone` (default: `now()`)

4.  **`navigation_links`** (For primary navigation, footer links, etc. Merges definitions from Navbar and Footer)
    *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null.
    *   `text`: `text` (e.g., "About", "Certifications") - Not null
    *   `href`: `text` (e.g., "/about", "/certifications") - Not null
    *   `display_order`: `integer` (For controlling the sequence) - Not null, default: 0
    *   `is_active`: `boolean` (To enable/disable links) - Not null, default: `true`
    *   `link_group`: `text` (e.g., 'navbar_main', 'footer_navigation', 'footer_legal', 'homepage_newsletter_cta') - Helps differentiate link sets. Not null.
    *   `target_blank`: `boolean` (Open in new tab) - Not null, default: `false`
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   *Constraint: Unique (`user_id`, `link_group`, `href`)*
    *   *Constraint: Unique (`user_id`, `link_group`, `text`)*

5.  **`social_media_links`** (User's social media profiles)
    *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null.
    *   `platform_name`: `text` (e.g., "LinkedIn", "GitHub", "Instagram") - Not null
    *   `url`: `text` (Full URL to the profile) - Not null
    *   `icon_name`: `text` (Key for Lucide icon or similar mapping, e.g., "Linkedin", "Github") - Nullable
    *   `display_order`: `integer` - Not null, default: 0
    *   `is_active`: `boolean` - Not null, default: `true`
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   *Constraint: Unique (`user_id`, `platform_name`)*

6.  **`contact_details`** (Primary contact information for the user/tenant)
    *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
    *   `email_address`: `text`
    *   `phone_number`: `text` (Optional)
    *   `address_line1`: `text` (e.g., "City, State" or "Region")
    *   `address_line2`: `text` (e.g., "Specific availability like KFFZ, KCHD, KSDL" or "Remote")
    *   `map_embed_url`: `text` (Optional, for an embedded map, e.g., Google Maps iframe URL)
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `updated_at`: `timestamp with time zone` (default: `now()`)

7.  **`content_snippets`** (General key-value store for various text snippets, labels, and UI strings that need to be dynamic per tenant. Replaces original `site_content_snippets`, `page_localized_strings`, `ui_string_overrides`.)
    *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null.
    *   `snippet_key`: `text` (A unique key identifying the snippet, e.g., `footer.copyright_suffix`, `contact_form.title`, `dialog.button.close_default`) - Not null.
    *   `value_markdown`: `text` (The content of the snippet, supports Markdown for rich text if needed) - Not null.
    *   `description`: `text` (Optional: Admin-facing description of where this snippet is used or what it controls) - Nullable.
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   *Constraint: Unique (`user_id`, `snippet_key`)*

8.  **`call_to_actions`** (Reusable Call-to-Action blocks)
    *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null.
    *   `identifier`: `text` (A unique string key to query a specific CTA, e.g., "shared_contact_cta", "about_page_bottom_cta") - Not null.
    *   `title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
    *   `description_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `primary_action_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `primary_action_link`: `text` (URL or path for the primary button) - Nullable
    *   `secondary_action_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `secondary_action_link`: `text` (URL or path for the secondary button) - Nullable
    *   `background_color_theme`: `text` (e.g., "primary", "secondary", "accent", "none", maps to UI theme) - Nullable, default: "secondary"
    *   `is_active`: `boolean` - Not null, default: `true`
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   *Constraint: Unique (`user_id`, `identifier`)*

9.  **`page_metadata`** (SEO and page-level settings for each main page)
    *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null.
    *   `page_identifier`: `text` (A unique machine-readable key for the page, e.g., "home", "about", "logbook", "projects", "contact_form_thank_you") - Not null.
    *   `admin_display_title`: `text` (Title used for display in the admin dashboard, e.g., "Homepage Settings") - Not null.
    *   `admin_page_description`: `text` (Optional longer description of the page for admin context) - Nullable.
    *   `custom_path_segment`: `text` (Optional: if tenant wants to customize part of the URL, e.g. "my-projects" instead of "projects". Base path remains controlled by app logic based on `page_identifier`.) - Nullable.
    *   `nav_title_override_snippet_id`: `uuid` (Optional: FK to `content_snippets(id) ON DELETE SET NULL` if the navigation title for this page needs to be different from `meta_title` and managed via snippets) - Nullable.
    *   `meta_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
    *   `meta_description_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `open_graph_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `open_graph_description_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `open_graph_image_url`: `text` - Nullable
    *   `is_published`: `boolean` (Controls if the page is accessible, can be overridden by global `user_site_settings` flags for specific pages) - Not null, default: `true`.
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   *Constraint: Unique (`user_id`, `page_identifier`)*

10. **`page_metadata_keyword_links`** (Junction table for many-to-many relationship between page metadata and keyword snippets)
    *   `page_metadata_id`: `uuid` (FK to `page_metadata(id) ON DELETE CASCADE`) - Not null
    *   `content_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE CASCADE`) - Not null (Keywords are in `content_snippets`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null (For RLS consistency)
    *   PRIMARY KEY (`page_metadata_id`, `content_snippet_id`)
    *   `created_at`: `timestamp with time zone` (default: `now()`)

11. **`page_section_headers`** (Generic content for simple page/section headers: icon, title, subtitle - Renumbered from 10)
    *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null.
    *   `section_identifier`: `text` (A unique key to fetch the header content, e.g., "certifications_hero", "projects_hero", "logbook_overview_header") - Not null.
    *   `icon_name`: `text` (Key for Lucide icon or similar) - Nullable
    *   `icon_color_class`: `text` (Tailwind class for icon color) - Nullable
    *   `main_heading_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
    *   `sub_heading_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   *Constraint: Unique (`user_id`, `section_identifier`)*

12. **`testimonials`** (General pool of testimonials)
    *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null.
    *   `quote_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
    *   `author_name_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
    *   `author_role_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `author_company_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `avatar_image_url`: `text` - Nullable
    *   `source_platform_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `testimonial_date`: `date` - Nullable
    *   `is_published`: `boolean` (Overall visibility) - Not null, default: `true`
    *   `display_order`: `integer` (For manual sorting if needed) - Nullable, default: 0
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `updated_at`: `timestamp with time zone` (default: `now()`)

13. **`aircraft`** (Aircraft/simulator details, essential for Logbook and Gallery)
    *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null.
    *   `aircraft_identifier`: `text` (Tail number or sim ID) - Not null
    *   `type_code`: `text` (e.g., "P28A") - Nullable
    *   `year_manufactured`: `integer` - Nullable
    *   `make_name`: `text` - Nullable
    *   `model_name`: `text` - Nullable
    *   `gear_type_description_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `engine_type_description_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `faa_equipment_type_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `faa_aircraft_class_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `is_complex_aircraft`: `boolean` - Nullable
    *   `is_taa_aircraft`: `boolean` - Nullable
    *   `is_high_performance_aircraft`: `boolean` - Nullable
    *   `is_pressurized_aircraft`: `boolean` - Nullable
    *   `custom_notes_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   *Constraint: Unique (`user_id`, `aircraft_identifier`)*

14. **`flight_logbook_entries`** (Primary logbook entries)
    *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null.
    *   `aircraft_profile_id`: `uuid` (FK to `aircraft(id) ON DELETE RESTRICT`) - Not null
    *   `flight_date`: `date` - Not null
    *   `route_from_icao`: `text` - Nullable
    *   `route_to_icao`: `text` - Nullable
    *   `route_full_text`: `text` - Nullable
    *   `time_out_utc`: `time` - Nullable
    *   `time_off_utc`: `time` - Nullable
    *   `time_on_utc`: `time` - Nullable
    *   `time_in_utc`: `time` - Nullable
    *   `on_duty_utc`: `time` - Nullable
    *   `off_duty_utc`: `time` - Nullable
    *   `total_duration_hours`: `decimal(5,1)` - Not null
    *   `pic_hours`: `decimal(5,1)` - Nullable
    *   `sic_hours`: `decimal(5,1)` - Nullable
    *   `night_hours`: `decimal(5,1)` - Nullable
    *   `solo_hours`: `decimal(5,1)` - Nullable
    *   `cross_country_hours`: `decimal(5,1)` - Nullable
    *   `pic_us_hours`: `decimal(5,1)` - Nullable
    *   `is_multi_pilot_ops`: `boolean` - Nullable
    *   `ifr_hours_total`: `decimal(5,1)` - Nullable
    *   `is_examiner_flight`: `boolean` - Nullable
    *   `is_nvg_flight`: `boolean` - Nullable
    *   `nvg_operations_count`: `integer` - Nullable
    *   `distance_nm`: `integer` - Nullable
    *   `actual_instrument_hours`: `decimal(5,1)` - Nullable
    *   `simulated_instrument_hours`: `decimal(5,1)` - Nullable
    *   `hobbs_start_hours`: `decimal(7,1)` - Nullable
    *   `hobbs_end_hours`: `decimal(7,1)` - Nullable
    *   `tach_start_hours`: `decimal(7,1)` - Nullable
    *   `tach_end_hours`: `decimal(7,1)` - Nullable
    *   `holds_instrument_count`: `integer` - Nullable
    *   `dual_given_hours`: `decimal(5,1)` - Nullable
    *   `dual_received_hours`: `decimal(5,1)` - Nullable
    *   `simulated_flight_hours`: `decimal(5,1)` - Nullable
    *   `ground_training_hours`: `decimal(5,1)` - Nullable
    *   `ground_training_given_hours`: `decimal(5,1)` - Nullable
    *   `instructor_name_text`: `text` - Nullable
    *   `instructor_comments_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `person_1_name`: `text` - Nullable
    *   `person_2_name`: `text` - Nullable
    *   `person_3_name`: `text` - Nullable
    *   `person_4_name`: `text` - Nullable
    *   `person_5_name`: `text` - Nullable
    *   `person_6_name`: `text` - Nullable
    *   `pilot_comments_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `is_flight_review`: `boolean` - Nullable
    *   `is_instrument_proficiency_check`: `boolean` - Nullable
    *   `is_checkride`: `boolean` - Nullable
    *   `is_faa_61_58_pic_check`: `boolean` - Nullable
    *   `is_nvg_proficiency_check`: `boolean` - Nullable
    *   `day_takeoffs_count`: `integer` - Nullable
    *   `day_landings_full_stop_count`: `integer` - Nullable
    *   `night_takeoffs_count`: `integer` - Nullable
    *   `night_landings_full_stop_count`: `integer` - Nullable
    *   `all_landings_count`: `integer` - Nullable
    *   `atp_cross_country_hours`: `decimal(5,1)` - Nullable
    *   `csv_import_source_notes`: `text` - Nullable
    *   `summary_for_homepage_card_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL` for homepage card summary) - Nullable
    *   `homepage_card_image_url`: `text` - Nullable
    *   `homepage_card_badge_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL` for badge text) - Nullable
    *   `homepage_card_badge_color_class`: `text` (e.g., "bg-green-500 text-white") - Nullable
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `updated_at`: `timestamp with time zone` (default: `now()`)

15. **`flight_approaches`** (Instrument approaches linked to logbook entries)
    *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null (denormalized for easier RLS).
    *   `flight_log_entry_id`: `uuid` (FK to `flight_logbook_entries(id) ON DELETE CASCADE`) - Not null.
    *   `approach_index_in_flight`: `integer` (1 through N) - Not null
    *   `approach_type_text`: `text` (e.g., "ILS OR LOC RWY 05") - Nullable
    *   `runway_designator`: `text` - Nullable
    *   `airport_icao_code`: `text` - Nullable
    *   `was_circle_to_land`: `boolean` - Nullable
    *   `was_missed_approach`: `boolean` - Nullable
    *   `custom_approach_notes_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   *Constraint: Unique (`flight_log_entry_id`, `approach_index_in_flight`)*

16. **`timeline_events`** (Generic chronological events for display across the site)
    *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
    *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
    *   `event_date`: `date` - Not null
    *   `title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
    *   `description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
    *   `icon_name`: `text` (Lucide icon name) - Nullable
    *   `icon_color_class`: `text` (Tailwind CSS class for icon color) - Nullable
    *   `category_tag_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable (e.g., for a snippet like "Certification", "Work", "Education")
    *   `related_item_url`: `text` (A direct URL to a relevant page or external resource if applicable) - Nullable
    *   `display_order`: `integer` - Not null, default: 0 (For ordering events on the same date)
    *   `created_at`: `timestamp with time zone` (default: `now()`)
    *   `updated_at`: `timestamp with time zone` (default: `now()`)

## II. Global & Shared Component Configurations

This section outlines tables that configure shared UI components or global behaviors, often linking to the Core Shared Tables for their content.

### A. Navbar (`components/navbar.tsx`)
   - Navigation Links: See `navigation_links` in Core Shared Tables (filter by `link_group='navbar_main'`).
   - Logo: See `site_branding` in Core Shared Tables.
   *(No new tables specific to Navbar component itself beyond Core Shared Tables)*

   *Original note on `navigation_links.user_id` is now part of the Core Shared Table definition logic.*

### B. Footer (`components/footer.tsx`)
   - Site Branding: See `site_branding` in Core Shared Tables.
   - Social Media Links: See `social_media_links` in Core Shared Tables.
   - Footer Navigation & Legal Links: See `navigation_links` in Core Shared Tables (filter by `link_group`).
   - Contact Details: See `contact_details` in Core Shared Tables.
   - Content Snippets (for copyright, etc.): See `content_snippets` in Core Shared Tables.

### C. Theme (`components/theme-provider.tsx`, `components/mode-toggle.tsx`)
   - Theme settings are managed in `user_site_settings` (See Core Shared Tables).
   *(No new tables specific to Theme components beyond Core Shared Tables)*

### D. UI Elements (`components/ui/`)
   - Generic UI string overrides: See `content_snippets` in Core Shared Tables.
   - Site-wide UI behavior defaults: See `user_site_settings` in Core Shared Tables.

### E. Shared Call To Action (`components/shared/call-to-action.tsx`)
   - Content for reusable Call To Action blocks is managed in the `call_to_actions` table (See Core Shared Tables). Instances are fetched by their unique `identifier`.

## III. Page-Specific Content Tables

This section outlines tables specific to individual pages, often providing context or specialized content that doesn't fit into the Core Shared Tables. These tables usually reference `user_id` for multi-tenancy.

### A. Home Page (`app/page.tsx` & `components/home/`)

*   **Page Metadata:**
    *   Uses `page_metadata` (See Core Shared Tables. `page_identifier`: 'home').
*   **Hero Section (`components/home/hero.tsx`):**
    *   `homepage_hero_settings` (Manages content for the main hero section on the homepage)
        *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `background_image_url`: `text` - Nullable
        *   `background_image_alt_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `main_heading_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `sub_heading_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `description_paragraph_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `primary_button_cta_id`: `uuid` (FK to `call_to_actions(id) ON DELETE SET NULL`) - Nullable
        *   `secondary_button_cta_id`: `uuid` (FK to `call_to_actions(id) ON DELETE SET NULL`) - Nullable
        *   `scroll_indicator_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `icon_image_url`: `text` (Optional static icon override) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Featured Section (`components/home/featured-section.tsx`):**
    *   `homepage_featured_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_super_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `homepage_feature_cards`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `featured_section_id`: `uuid` (FK to `homepage_featured_section_main(id) ON DELETE CASCADE`) - Not Null
        *   `display_order`: `integer` - Not null, default: 0
        *   `image_url`: `text` - Nullable
        *   `image_alt_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `badge_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `badge_color_class`: `text` - Nullable
        *   `icon_name`: `text` (Lucide icon name) - Nullable
        *   `icon_color_class`: `text` - Nullable
        *   `card_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `card_description_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `link_cta_id`: `uuid` (FK to `call_to_actions(id) ON DELETE SET NULL`) - Nullable
        *   `is_active`: `boolean` - Not null, default: `true`
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Consulting Section (`components/home/consulting-section.tsx`):**
    *   `homepage_consulting_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `description_paragraph1_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `description_paragraph2_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `button_cta_id`: `uuid` (FK to `call_to_actions(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `homepage_consulting_service_cards`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `consulting_section_id`: `uuid` (FK to `homepage_consulting_section_main(id) ON DELETE CASCADE`) - Not Null
        *   `display_order`: `integer` - Not null, default: 0
        *   `icon_name`: `text` (Lucide icon name) - Nullable
        *   `icon_color_class`: `text` - Nullable
        *   `card_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `card_description_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `is_active`: `boolean` - Not null, default: `true`
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Testimonials Section (`components/home/testimonials-section.tsx`):**
    *   `homepage_testimonials_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `max_testimonials_to_show`: `integer` (Default: 3) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   Items are sourced from the `testimonials` (See Core Shared Tables), filtered by `user_id` and potentially a flag like `is_featured_on_homepage` (add this to `testimonials` table if needed, or use `display_order` for selection).
*   **Latest Flights Section (`components/home/latest-flights.tsx`):**
    *   `homepage_latest_flights_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `button_cta_id`: `uuid` (FK to `call_to_actions(id) ON DELETE SET NULL` for "View Full Logbook" button) - Nullable
        *   `number_of_flights_to_display`: `integer` - Not null, default: 3
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   Flight data is sourced from `flight_logbook_entries` (See Core Shared Tables), ordered by `flight_date` DESC, limited by `number_of_flights_to_display`.
    *   Aircraft data from `aircraft` (See Core Shared Tables).
    *   Card-specific display fields (`summary_for_homepage_card_key`, `homepage_card_image_url`, etc.) are on the `flight_logbook_entries` table.
*   **Homepage Newsletter CTA (`components/home/call-to-action.tsx` - specific newsletter form):**
    *   `homepage_newsletter_cta_config`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `icon_name`: `text` (Lucide icon) - Nullable
        *   `icon_color_class`: `text` - Nullable
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `email_input_placeholder_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `submit_button_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `submitting_button_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `success_message_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `success_message_body_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `privacy_intro_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `privacy_link_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `privacy_link_url`: `text` - Nullable
        *   `footer_link1_nav_id`: `uuid` (FK to `navigation_links(id) ON DELETE SET NULL` where `link_group='homepage_newsletter_cta'`) - Nullable
        *   `footer_link2_nav_id`: `uuid` (FK to `navigation_links(id) ON DELETE SET NULL` where `link_group='homepage_newsletter_cta'`) - Nullable
        *   `footer_link3_nav_id`: `uuid` (FK to `navigation_links(id) ON DELETE SET NULL` where `link_group='homepage_newsletter_cta'`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `newsletter_subscribers`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE` of the tenant/site owner) - Not null
        *   `email`: `text` - Not null
        *   `subscribed_at`: `timestamp with time zone` (default: `now()`)
        *   `is_active`: `boolean` - Not null, default: `true`
        *   `source_tag`: `text` (e.g., "homepage_cta") - Nullable
        *   `opt_in_confirmed_at`: `timestamp with time zone` - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
        *   *Constraint: Unique (`user_id`, `email`)*

### B. About Page (`app/about/page.tsx` & `components/about/`)

*   **Page Metadata:**
    *   Uses `page_metadata` (See Core Shared Tables. `page_identifier`: 'about').
*   **About Hero (`components/about/about-hero.tsx`):**
    *   `about_page_hero_content`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `icon_name`: `text` (Lucide icon) - Nullable
        *   `icon_color_class`: `text` - Nullable
        *   `main_heading_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `sub_heading_paragraph_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `hero_image_url`: `text` - Nullable
        *   `hero_image_alt_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `image_overlay_status_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `image_overlay_name_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `image_overlay_location_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Shared Call To Action:**
    *   Uses `call_to_actions` (See Core Shared Tables. Fetch using `identifier`: 'about_page_cta').
*   **Main Content (`components/about/about-content.tsx`):**
    *   `about_page_main_content`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `journey_content_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `accompanying_image_url`: `text` - Nullable
        *   `accompanying_image_alt_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `philosophy_section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `philosophy_quote_text_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Values Section (`components/about/values.tsx`):**
    *   `about_page_values_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `core_values_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `values_section_id`: `uuid` (FK to `about_page_values_section_main(id) ON DELETE CASCADE`) - Not Null
        *   `title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `icon_name`: `text` (Lucide icon) - Nullable
        *   `icon_color_class`: `text` - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_active`: `boolean` - Not null, default: `true`
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Stats Section (`components/about/stats.tsx`):**
    *   `about_page_stats_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `stat_items` (Could be general if stats are reused, or specific to this section)
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `stats_section_id`: `uuid` (FK to `about_page_stats_section_main(id) ON DELETE CASCADE`) - Not Null
        *   `stat_value_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `stat_label_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `icon_name`: `text` (Lucide icon) - Nullable
        *   `icon_color_class`: `text` - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_active`: `boolean` - Not null, default: `true`
        *   `data_source_note_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)

### C. Certifications Page (`app/certifications/page.tsx` & `components/certifications/`)

*   **Page Metadata:**
    *   Uses `page_metadata` (See Core Shared Tables. `page_identifier`: 'certifications').
*   **Certifications Hero (`components/certifications/certifications-hero.tsx`):**
    *   Uses `page_section_headers` (See Core Shared Tables. `section_identifier`: 'certifications_hero').
*   **Shared Call To Action:**
    *   Uses `call_to_actions` (See Core Shared Tables. Fetch using `identifier`: 'certifications_page_cta').
*   **Certifications List (`components/certifications/certifications-list.tsx`):**
    *   `certifications_page_list_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `download_all_button_cta_id`: `uuid` (FK to `call_to_actions(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `user_certifications_and_ratings`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `type_abbreviation_badge_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `short_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `date_issued`: `date` - Not null
        *   `issuing_authority_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `certificate_number`: `text` - Nullable
        *   `expiration_date`: `date` - Nullable
        *   `ui_color_theme_key`: `text` (e.g., "blue", "green") - Nullable
        *   `view_details_link_url`: `text` - Nullable
        *   `scanned_document_url`: `text` (URL to Supabase Storage) - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_active`: `boolean` - Not null, default: `true`
        *   `notes_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `user_certification_endorsements`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_certification_id`: `uuid` (FK to `user_certifications_and_ratings.id`) ON DELETE CASCADE - Not null
        *   `endorsement_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `display_order`: `integer` - Not null, default: 0
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Endorsements Section (`components/certifications/endorsements-section.tsx`):**
    *   `certifications_page_endorsements_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `endorsement_categories`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `category_name_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `icon_name`: `text` (Lucide icon) - Nullable
        *   `icon_color_class`: `text` - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_active`: `boolean` - Not null, default: `true`
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
        *   *Constraint: Unique (`user_id`, `category_name_snippet_id`)*
    *   `endorsement_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `category_id`: `uuid` (FK to `endorsement_categories.id`) ON DELETE CASCADE - Not null
        *   `item_name_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `item_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `display_order_within_category`: `integer` - Not null, default: 0
        *   `is_active`: `boolean` - Not null, default: `true`
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `general_qualification_badges`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `badge_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `ui_color_theme_key`: `text` - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_active`: `boolean` - Not null, default: `true`
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Timeline Section (`components/certifications/timeline.tsx`):**
    *   `certifications_page_timeline_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `timeline_events` (Reuses the definition from Core Shared Tables, potentially filtered by a category or tag if needed for this specific timeline instance, or all timeline events for the user are shown here.)
        *   To link to this section: Add `timeline_section_id` FK to `certifications_page_timeline_section_main.id` on `timeline_events` if events can belong to multiple timeline instances. Or, this section just displays all `timeline_events` for the `user_id`. Assuming the latter for now.
        *   If events are distinct per timeline instance:
            *   `timeline_events` table (as defined in Core Shared, but perhaps without `related_user_certification_id` if that's too specific for a "core" table, or make it generic like `related_item_id` and `related_item_type`)
            *   This Certifications Timeline section would filter/fetch `timeline_events` relevant to certifications.

### D. Consulting Page (`app/consulting/page.tsx` & `components/consulting/`)

*   **Page Metadata:**
    *   Uses `page_metadata` (See Core Shared Tables. `page_identifier`: 'consulting').
*   **Consulting Hero (`components/consulting/consulting-hero.tsx`):**
    *   `consulting_page_hero_content`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `background_image_url`: `text` - Nullable
        *   `icon_identifier_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `main_heading_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `sub_heading_paragraph_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `primary_button_cta_id`: `uuid` (FK to `call_to_actions(id) ON DELETE SET NULL`) - Nullable
        *   `secondary_button_cta_id`: `uuid` (FK to `call_to_actions(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Services Offered (`components/consulting/services-offered.tsx`):**
    *   `consulting_page_services_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `consulting_service_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `services_section_id`: `uuid` (FK to `consulting_page_services_section_main(id) ON DELETE CASCADE`) - Not null
        *   `title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `icon_name`: `text` (Lucide icon) - Nullable
        *   `icon_color_class`: `text` - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_active`: `boolean` - Not null, default: `true`
        *   `details_page_slug_or_url`: `text` - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Process Section (`components/consulting/process-section.tsx`):**
    *   `consulting_page_process_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `consulting_process_steps`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `process_section_id`: `uuid` (FK to `consulting_page_process_section_main(id) ON DELETE CASCADE`) - Not null
        *   `step_number_label_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_active`: `boolean` - Not null, default: `true`
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Case Studies (`components/consulting/case-studies.tsx`):**
    *   `consulting_page_case_studies_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `consulting_case_study_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `case_studies_section_id`: `uuid` (FK to `consulting_page_case_studies_section_main(id) ON DELETE CASCADE`) - Not null
        *   `title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `short_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `image_url`: `text` - Nullable
        *   `image_alt_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `tags_list`: `text[]` (Array of tag strings, or consider linking to a global `tags` table) - Nullable
        *   `full_case_study_link_url`: `text` - Nullable
        *   `full_case_study_content_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_active`: `boolean` - Not null, default: `true`
        *   `is_featured`: `boolean` - Nullable, default: `false`
        *   `client_name_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `project_date`: `date` - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Consulting CTA (`components/consulting/consulting-cta.tsx`):**
    *   `consulting_page_final_cta_config`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `main_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `description_paragraph_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `primary_button_cta_id`: `uuid` (FK to `call_to_actions(id) ON DELETE SET NULL`) - Nullable
        *   `secondary_button_cta_id`: `uuid` (FK to `call_to_actions(id) ON DELETE SET NULL`) - Nullable
        *   `expectations_section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `consulting_cta_expectation_links` (New junction table for bullet points/expectations)
        *   `id`: `uuid` (Primary Key, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null.
        *   `cta_config_id`: `uuid` (FK to `consulting_page_final_cta_config(id) ON DELETE CASCADE`) - Not null.
        *   `content_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null.
        *   `display_order`: `integer` - Not null, default: 0.
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
        *   *Constraint: Unique (`cta_config_id`, `display_order`)*
        *   *Constraint: Unique (`cta_config_id`, `content_snippet_id`)*

### E. Contact Page (`app/contact/page.tsx` & `components/contact/`)

*   **Page Metadata:**
    *   Uses `page_metadata` (See Core Shared Tables. `page_identifier`: 'contact').
*   **Contact Hero (`components/contact/contact-hero.tsx`):**
    *   Uses `page_section_headers` (See Core Shared Tables. `section_identifier`: 'contact_hero').
*   **Contact Info (`components/contact/contact-info.tsx`):**
    *   Main details from `contact_details` (Core Shared Table).
    *   Social links from `social_media_links` (Core Shared Table).
    *   Section titles (e.g., "Contact Information", "Connect with me", "Office Hours") from `content_snippets` table.
    *   `office_hours_schedule_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `day_label_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `hours_or_status_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_active`: `boolean` - Not null, default: `true`
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Contact Form (`components/contact/contact-form.tsx`):**
    *   UI text (card title, labels, button texts, success messages) from `content_snippets` (Core Shared Table).
    *   `contact_form_submissions`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `tenant_user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `sender_name`: `text` - Not null
        *   `sender_email`: `text` - Not null
        *   `subject`: `text` - Not null
        *   `message_body`: `text` - Not null
        *   `submission_timestamp`: `timestamp with time zone` (default: `now()`)
        *   `submission_status`: `text` (e.g., "new", "read", "archived", "replied") - Default: "new"
        *   `sender_ip_address`: `text` - Nullable
        *   `sender_user_agent`: `text` - Nullable
        *   `notes_for_admin_markdown`: `text` (Markdown, internal notes) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **FAQ Section (`components/contact/faq.tsx` - Assuming this was planned or exists):**
    *   `contact_page_faq_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null.
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable.
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `faq_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null.
        *   `faq_section_id`: `uuid` (FK to `contact_page_faq_section_main(id) ON DELETE CASCADE`) - Not null.
        *   `question_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null.
        *   `answer_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null.
        *   `display_order`: `integer` - Not null, default: 0.
        *   `is_active`: `boolean` - Not null, default: `true`.
        *   `tags`: `text[]` (Optional, for categorization).
        *   `created_at`: `timestamp with time zone` (default: `now()`).
        *   `updated_at`: `timestamp with time zone` (default: `now()`).

### F. Experience Page (`app/experience/page.tsx` & `components/experience/`)

*   **Page Metadata:**
    *   Uses `page_metadata` (See Core Shared Tables. `page_identifier`: 'experience').
*   **Experience Hero (`components/experience/experience-hero.tsx`):**
    *   Uses `page_section_headers` (See Core Shared Tables. `section_identifier`: 'experience_hero').
*   **Work Experience (`components/experience/work-experience.tsx`):**
    *   `experience_page_work_experience_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `work_experience_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `work_experience_section_id`: `uuid` (FK to `experience_page_work_experience_section_main(id) ON DELETE CASCADE`) - Not null
        *   `job_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `company_name_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `company_logo_url`: `text` - Nullable
        *   `location_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `start_date`: `date` - Not null
        *   `end_date`: `date` (NULL if current) - Nullable
        *   `is_current`: `boolean` - Default: `false`
        *   `responsibilities_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `achievements_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Education (`components/experience/education.tsx`):**
    *   `experience_page_education_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `education_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `education_section_id`: `uuid` (FK to `experience_page_education_section_main(id) ON DELETE CASCADE`) - Not null
        *   `institution_name_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `institution_logo_url`: `text` - Nullable
        *   `degree_or_certification_name_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `field_of_study_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `start_date`: `date` - Nullable
        *   `graduation_date`: `date` (Or expected date) - Nullable
        *   `description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `gpa`: `text` - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Skills (`components/experience/skills.tsx`):**
    *   `experience_page_skills_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `skill_categories`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `skills_section_id`: `uuid` (FK to `experience_page_skills_section_main(id) ON DELETE CASCADE`) - Not null
        *   `category_name_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `category_icon`: `text` (Lucide icon name) - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `skill_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `skill_category_id`: `uuid` (FK to `skill_categories(id) ON DELETE CASCADE`) - Not null
        *   `skill_name_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `proficiency_level`: `integer` (Optional, 1-5 or 1-100) - Nullable
        *   `skill_icon`: `text` (Lucide icon name) - Nullable
        *   `description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)

### G. Gallery Page (`app/gallery/page.tsx` & `components/gallery/`)

*   **Page Metadata:**
    *   Uses `page_metadata` (See Core Shared Tables. `page_identifier`: 'gallery').
*   **Gallery Hero (`components/gallery/gallery-hero.tsx`):**
    *   Uses `page_section_headers` (See Core Shared Tables. `section_identifier`: 'gallery_hero').
*   **Photo Gallery (`components/gallery/photo-gallery.tsx`):**
    *   `gallery_page_photo_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `display_style`: `text` (e.g., 'grid', 'masonry') - Default: 'grid'
        *   `items_per_page`: `integer` - Default: 12
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `photo_gallery_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `photo_section_id`: `uuid` (FK to `gallery_page_photo_section_main(id) ON DELETE CASCADE`) - Not null
        *   `image_url`: `text` (URL to Supabase Storage) - Not null
        *   `thumbnail_url`: `text` (Optional, auto-generated or manual) - Nullable
        *   `alt_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `tags`: `text[]` - Nullable
        *   `upload_date`: `timestamp with time zone` (default: `now()`)
        *   `capture_date`: `date` - Nullable
        *   `location_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `camera_details_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_featured`: `boolean` - Default: `false`
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Video Showcase (`components/gallery/video-showcase.tsx`):**
    *   `gallery_page_video_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `video_gallery_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `video_section_id`: `uuid` (FK to `gallery_page_video_section_main(id) ON DELETE CASCADE`) - Not null
        *   `video_url`: `text` (YouTube, Vimeo, or Supabase Storage path) - Not null
        *   `platform`: `text` (e.g., 'youtube', 'vimeo', 'self_hosted') - Nullable
        *   `video_id_on_platform`: `text` - Nullable
        *   `title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `thumbnail_url`: `text` - Nullable
        *   `duration_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `upload_date`: `timestamp with time zone` (default: `now()`)
        *   `tags`: `text[]` - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_featured`: `boolean` - Default: `false`
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Aircraft Showcase (`components/gallery/aircraft-showcase.tsx`):**
    *   `gallery_page_aircraft_showcase_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `aircraft_showcase_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `aircraft_showcase_section_id`: `uuid` (FK to `gallery_page_aircraft_showcase_section_main(id) ON DELETE CASCADE`) - Not null
        *   `aircraft_id`: `uuid` (FK to `aircraft(id) ON DELETE RESTRICT`) - Not null
        *   `showcase_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `showcase_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `cover_image_url`: `text` - Nullable
        *   `key_specifications_jsonb`: `jsonb` (Key-value pairs, e.g., {"Max Speed": "200 kts"}) - Nullable
        *   `story_or_notes_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_featured_on_gallery_page`: `boolean` - Default: `true`
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `aircraft_showcase_photos_link` (New junction table)
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `aircraft_showcase_item_id`: `uuid` (FK to `aircraft_showcase_items(id) ON DELETE CASCADE`) - Not Null
        *   `photo_gallery_item_id`: `uuid` (FK to `photo_gallery_items(id) ON DELETE CASCADE`) - Not Null
        *   `display_order`: `integer` - Not null, default: 0
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
        *   *Constraint: Unique (`aircraft_showcase_item_id`, `photo_gallery_item_id`)*
        *   *Constraint: Unique (`aircraft_showcase_item_id`, `display_order`)*
    *   `aircraft_showcase_videos_link` (New junction table)
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `aircraft_showcase_item_id`: `uuid` (FK to `aircraft_showcase_items(id) ON DELETE CASCADE`) - Not Null
        *   `video_gallery_item_id`: `uuid` (FK to `video_gallery_items(id) ON DELETE CASCADE`) - Not Null
        *   `display_order`: `integer` - Not null, default: 0
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
        *   *Constraint: Unique (`aircraft_showcase_item_id`, `video_gallery_item_id`)*
        *   *Constraint: Unique (`aircraft_showcase_item_id`, `display_order`)*

### H. Logbook Page (`app/logbook/page.tsx` & `components/logbook/`)

*   **Page Metadata:**
    *   Uses `page_metadata` (See Core Shared Tables. `page_identifier`: 'logbook').
*   **Logbook Hero (`components/logbook/logbook-hero.tsx`):**
    *   Uses `page_section_headers` (See Core Shared Tables. `section_identifier`: 'logbook_hero').
*   **Flight Stats (`components/logbook/flight-stats.tsx`):**
    *   `logbook_page_flight_stats_main_config`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `display_format`: `text` (e.g., 'grid', 'list') - Default: 'grid'
        *   `columns_per_row_on_grid`: `integer` - Default: 3
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `logbook_displayed_stat_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `main_config_id`: `uuid` (FK to `logbook_page_flight_stats_main_config(id) ON DELETE CASCADE`) - Not null
        *   `label_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `value_source_definition_jsonb`: `jsonb` (Defines calculation, e.g., `{"type": "SUM", "table": "flight_logbook_entries", "column": "total_duration_hours"}`) - Not null
        *   `value_prefix_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `value_suffix_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `icon_name`: `text` (Lucide icon) - Nullable
        *   `tooltip_text_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_visible`: `boolean` - Default: `true`
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
*   **Recent Flights (`components/logbook/recent-flights.tsx`):**
    *   `logbook_page_recent_flights_config`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `number_to_display_initially`: `integer` - Default: 10
        *   `default_sort_column`: `text` (Column name from `flight_logbook_entries`) - Default: 'flight_date'
        *   `default_sort_direction`: `text` CHECK (`default_sort_direction` IN ('ASC', 'DESC')) - Default: 'DESC'
        *   `visible_columns_jsonb`: `jsonb` (Array of objects defining columns to show from `flight_logbook_entries`) - Nullable
        *   `allow_user_sorting_and_filtering`: `boolean` - Default: `true`
        *   `enable_search_bar`: `boolean` - Default: `true`
        *   `pagination_items_per_page`: `integer` - Default: 25
        *   `link_to_full_logbook_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   Data sourced from `flight_logbook_entries`, `aircraft` (See Core Shared Tables).
*   **Aircraft Experience (`components/logbook/aircraft-experience.tsx`):**
    *   `logbook_page_aircraft_experience_config`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `group_by_field`: `text` (e.g., 'aircraft.type_code', 'aircraft.model_name') - Not null
        *   `displayed_metrics_jsonb`: `jsonb` (Array defining metrics to show, e.g., total hours, PIC hours from `flight_logbook_entries`) - Not null
        *   `chart_type_preference`: `text` (e.g., 'bar_chart', 'table_view') - Default: 'table_view'
        *   `minimum_hours_for_display`: `numeric` - Nullable
        *   `order_by_metric`: `text` (e.g., 'Total Hours') - Nullable
        *   `order_direction`: `text` CHECK (`order_direction` IN ('ASC', 'DESC')) - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   Data sourced from `flight_logbook_entries`, `aircraft` (See Core Shared Tables).
*   **Flight Charts (`components/logbook/flight-charts.tsx`):**
    *   `logbook_page_main_charts_config`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `default_chart_layout_columns`: `integer` - Default: 1
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `logbook_chart_definitions`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `main_charts_config_id`: `uuid` (FK to `logbook_page_main_charts_config(id) ON DELETE CASCADE`) - Not null
        *   `chart_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `chart_type`: `text` (e.g., 'bar', 'line', 'pie') - Not null
        *   `data_query_definition_jsonb`: `jsonb` (Stores query specifics against `flight_logbook_entries` or `flight_approaches`) - Not null
        *   `x_axis_label_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `y_axis_label_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `color_palette_name_or_custom_hex`: `text` - Nullable
        *   `order_in_layout`: `integer` - Not null, default: 0
        *   `is_visible_by_default`: `boolean` - Default: `true`
        *   `chart_height`: `text` (e.g., "300px") - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)

### I. Projects Page (`app/projects/page.tsx` & `components/projects/`)

*   **Page Metadata:**
    *   Uses `page_metadata` (See Core Shared Tables. `page_identifier`: 'projects').
*   **Projects Hero (`components/projects/projects-hero.tsx`):**
    *   Uses `page_section_headers` (See Core Shared Tables. `section_identifier`: 'projects_hero').
*   **Featured Projects (`components/projects/featured-projects.tsx`):**
    *   `projects_page_featured_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `layout_style`: `text` (e.g., 'grid_cards') - Default: 'grid_cards'
        *   `default_items_to_show`: `integer` (Null means show all featured) - Nullable
        *   `link_to_full_portfolio_text_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `link_to_full_portfolio_url`: `text` - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `project_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `slug`: `text` UNIQUE NOT NULL (For URLs, consider auto-generation strategy)
        *   `short_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `long_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `cover_image_url`: `text` - Nullable
        *   `banner_image_url`: `text` - Nullable
        *   `video_url`: `text` - Nullable
        *   `project_live_url`: `text` - Nullable
        *   `source_code_repository_url`: `text` - Nullable
        *   `status_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `start_date`: `date` - Nullable
        *   `completion_date`: `date` - Nullable
        *   `tags_or_keywords`: `text[]` - Nullable
        *   `client_name_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `role_in_project_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `is_featured_on_projects_page`: `boolean` - Default: `false`
        *   `order_in_featured`: `integer` - Nullable
        *   `overall_order`: `integer` - Nullable
        *   `last_updated`: `timestamp with time zone` (default: `now()`)
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `project_photo_links` (New junction table for linking projects to gallery photos)
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `project_item_id`: `uuid` (FK to `project_items(id) ON DELETE CASCADE`) - Not Null
        *   `photo_gallery_item_id`: `uuid` (FK to `photo_gallery_items(id) ON DELETE CASCADE`) - Not Null
        *   `display_order`: `integer` - Not null, default: 0
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
        *   *Constraint: Unique (`project_item_id`, `photo_gallery_item_id`)*
        *   *Constraint: Unique (`project_item_id`, `display_order`)*
    *   `project_technology_links` (New junction table)
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `project_item_id`: `uuid` (FK to `project_items(id) ON DELETE CASCADE`) - Not Null
        *   `technology_stack_item_id`: `uuid` (FK to `technology_stack_items(id) ON DELETE RESTRICT`) - Not Null
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
        *   *Constraint: Unique (`project_item_id`, `technology_stack_item_id`)*
*   **Technology Stack (`components/projects/technology-stack.tsx`):**
    *   `projects_page_tech_stack_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `display_type`: `text` (e.g., 'logo_grid') - Default: 'logo_grid'
        *   `max_items_to_show`: `integer` - Nullable
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `technology_stack_items` (These items are general and can be linked to by projects)
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null (allows tenants to have their own list of techs if not using a global one)
        *   `name`: `text` NOT NULL (e.g., "React", "Python")
        *   `logo_url`: `text` - Nullable
        *   `website_url`: `text` - Nullable
        *   `category_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `proficiency_level`: `integer` - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_highlighted_on_projects_page`: `boolean` - Default: `false`
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
        *   *Constraint: Unique (`user_id`, `name`)*
*   **Research Section (`components/projects/research-section.tsx`):**
    *   `projects_page_research_section_main`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null, Unique.
        *   `section_title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `section_description_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `display_style`: `text` (e.g., 'list', 'cards') - Default: 'list'
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)
    *   `research_items`
        *   `id`: `uuid` (PK, default: `uuid_generate_v4()`)
        *   `user_id`: `uuid` (FK to `auth.users(id) ON DELETE CASCADE`) - Not null
        *   `research_section_id`: `uuid` (FK to `projects_page_research_section_main(id) ON DELETE CASCADE`) - Not null
        *   `title_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE RESTRICT`) - Not null
        *   `authors`: `text[]` (List of author names) - Nullable
        *   `publication_venue_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `publication_date`: `date` - Nullable
        *   `abstract_markdown_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `full_text_url_or_doi`: `text` - Nullable
        *   `pdf_document_url`: `text` - Nullable
        *   `keywords`: `text[]` - Nullable
        *   `linked_project_id`: `uuid` (FK to `project_items(id) ON DELETE SET NULL`) - Nullable
        *   `status_snippet_id`: `uuid` (FK to `content_snippets(id) ON DELETE SET NULL`) - Nullable
        *   `citation_details_jsonb`: `jsonb` - Nullable
        *   `research_area_tags`: `text[]` - Nullable
        *   `display_order`: `integer` - Not null, default: 0
        *   `is_featured`: `boolean` - Default: `false`
        *   `created_at`: `timestamp with time zone` (default: `now()`)
        *   `updated_at`: `timestamp with time zone` (default: `now()`)

## IV. User Management & Site Configuration (Placeholder from original, mostly covered by Core Shared Tables)

This section is largely superseded by the `users` (implicit from Supabase Auth) and `user_site_settings` tables defined in "Core Shared Tables".

---

Next Steps:
1.  Review and refine this restructured schema, focusing on:
    a.  **Relationships and Foreign Keys:** Ensure all `REFERENCES` are correct, define `ON DELETE` behavior (CASCADE, SET NULL, RESTRICT).
    b.  **Data Types and Constraints:** Verify data types (TEXT, VARCHAR, TIMESTAMP, JSONB, etc.), add `NOT NULL` where essential, define `UNIQUE` constraints.
    c.  **Normalization vs. Denormalization:** Evaluate if any fields should be broken into separate tables or if some denormalization is acceptable for easier querying (e.g., `user_id` on `flight_approaches`).
    d.  **Content Snippets Strategy:** Ensure the `content_snippets` table and its `snippet_key` usage is robust and clear. Consider naming conventions for keys.
2.  Plan for RLS (Row Level Security) policies for all tables containing `user_id`.
3.  **Data Migration Strategy (from `ForeFlight_Export_1640_May05_2025.csv`)**

    This section outlines the strategy for migrating existing logbook data from the provided `ForeFlight_Export_1640_May05_2025.csv` file into the new Supabase database structure. Given the complexity of data relationships and the long-term goal of automating future imports (e.g., from emailed CSVs), a **custom script** (e.g., Python or Node.js) is the recommended approach.

    **A. Pre-computation & Setup (within the script):**
        *   The script will require the `user_id` (Supabase `auth.uid()`) of the tenant for whom the data is being imported. This `user_id` will be associated with all imported records.
        *   A mapping will be maintained (e.g., in script memory or a temporary lookup) between CSV `AircraftID` values and the `uuid` primary keys of records created in the Supabase `aircraft` table.
        *   A similar lookup/caching mechanism will be used for `content_snippets` created for aircraft attributes (gear type, engine type, etc.) and flight/approach remarks to avoid duplicate snippet creation for identical text values.

    **B. Phase 1: Aircraft Data Import (`Aircraft Table` section in CSV to `aircraft` table)**
        *   Iterate through each aircraft row in the CSV's "Aircraft Table" section.
        *   For each CSV aircraft:
            *   **Map CSV columns to `aircraft` table columns:**
                *   `AircraftID` (CSV) -> `aircraft_identifier`
                *   `TypeCode` -> `type_code`
                *   `Year` -> `year_manufactured`
                *   `Make` -> `make_name`
                *   `Model` -> `model_name`
                *   `GearType`: Create/lookup `content_snippets` entry for the textual description (e.g., "fixed_tricycle" becomes a snippet "Fixed Tricycle"), store its ID in `gear_type_description_snippet_id`.
                *   `EngineType`: Create/lookup snippet, store ID in `engine_type_description_snippet_id`.
                *   `equipType (FAA)`: Create/lookup snippet, store ID in `faa_equipment_type_snippet_id`.
                *   `aircraftClass (FAA)`: Create/lookup snippet, store ID in `faa_aircraft_class_snippet_id`.
                *   Boolean fields (`complexAircraft (FAA)`, `taa (FAA)`, `highPerformance (FAA)`, `pressurized (FAA)`) to be converted to boolean values for corresponding `is_*_aircraft` columns.
            *   Perform an **UPSERT** operation into the `aircraft` table based on `user_id` and `aircraft_identifier` to avoid duplicates if the script is run multiple times (though for a one-time migration, INSERT might suffice).
            *   Store the generated `aircraft.id` (UUID) in the script's internal mapping against the CSV `AircraftID`.

    **C. Phase 2: Flight Log & Approach Data Import (`Flights Table` section in CSV)**
        *   Iterate through each flight row in the CSV's "Flights Table" section.
        *   For each CSV flight entry:
            *   **Prepare `flight_logbook_entries` record:**
                *   `user_id`: Current tenant's `user_id`.
                *   `aircraft_profile_id`: Retrieve the `aircraft.id` (UUID) from the internal mapping using the flight's CSV `AircraftID`.
                *   Map CSV columns directly to `flight_logbook_entries` columns as detailed in the analysis (e.g., `Date` to `flight_date`, `TotalTime` to `total_duration_hours`, various hour fields, takeoff/landing counts, boolean flags for checkride types, etc.). Ensure correct data type conversions (date, time, numeric, boolean).
                *   `csv_import_source_notes`: Can be populated with a note like "Imported from ForeFlight CSV YYYY-MM-DD".
                *   For `PilotComments` and `InstructorComments`:
                    *   If the CSV field is not empty, create a new `content_snippets` record. The `snippet_key` could be programmatically generated (e.g., `flight_remarks_YYYYMMDD_aircraftID_pilot` or using a hash of the content to attempt deduplication of identical comments). The `value_markdown` will be the comment text.
                    *   Store the new snippet's ID in `pilot_comments_snippet_id` or `instructor_comments_snippet_id`.
            *   **INSERT** the record into `flight_logbook_entries`. Retrieve the newly generated `flight_logbook_entries.id` (UUID).
            *   **Process Approaches (CSV columns `Approach1` to `Approach6`):**
                *   For each non-empty `ApproachX` column:
                    *   Parse the semicolon-delimited string (e.g., "Index;Type;Runway;Airport;Flags...").
                    *   **Prepare `flight_approaches` record:**
                        *   `user_id`: Current tenant's `user_id`.
                        *   `flight_log_entry_id`: The ID of the parent `flight_logbook_entries` record just inserted.
                        *   `approach_index_in_flight`: The numerical index from the approach string.
                        *   `approach_type_text`: The type of approach.
                        *   `runway_designator`: The runway.
                        *   `airport_icao_code`: The airport ICAO.
                        *   `was_circle_to_land`: Boolean based on "CIRCLE" flag in string.
                        *   `was_missed_approach`: Boolean based on "Missed" flag in string.
                        *   `custom_approach_notes_snippet_id`: Initially, this can be left NULL unless specific per-approach notes can be reliably parsed from the CSV (unlikely from standard ForeFlight CSV structure for this field).
                    *   **INSERT** the record into `flight_approaches`.

    **D. Scripting Considerations for Automation:**
        *   The script should be idempotent where possible (e.g., using UPSERT for aircraft, checking if a flight already exists based on date/aircraft/total_time to prevent duplicates if re-run, though this can be complex).
        *   Error handling and logging are crucial.
        *   For the email automation goal: The script will need to be callable by a serverless function (e.g., Supabase Edge Function) that is triggered when a new email with the CSV attachment arrives. This function would parse the email, extract the CSV, and then invoke this core migration logic.
        *   Consider environment variables for Supabase URL, service_role_key (for backend script), and any user-specific parameters if the script is run manually.

    **E. PDF Logbook:**
        *   The PDF version of the logbook mentioned is primarily for visual backup and cross-referencing. Direct data extraction from PDFs is complex and often unreliable for structured data. The CSV should be the primary source for data migration. The PDF can be stored as an artifact if desired (e.g., in Supabase Storage, linked to a general user profile or a specific snapshot date), but not directly parsed for this migration process.

4.  Begin generating SQL DDL statements for the defined tables.

## V. Security and Access Control

This section outlines the approach to Row Level Security (RLS) and general access control for the database to ensure data isolation and proper permissions in a multi-tenant environment.

### A. Row Level Security (RLS) Policies

RLS will be enabled on all tables that contain a `user_id` column (or a similarly named column like `tenant_user_id` that links to an authenticated user). The general RLS strategy for these tables will be:

1.  **Ownership-Based Access:** Authenticated users (`auth.uid()`) will only be able to perform actions (SELECT, INSERT, UPDATE, DELETE) on rows where the `user_id` (or equivalent) in the table matches their own `auth.uid()`.

    *   **SELECT:** Users can read rows they own.
        *   Example: `CREATE POLICY "Users can select their own data" ON table_name FOR SELECT USING (auth.uid() = user_id);`
    *   **INSERT:** Users can insert new rows, automatically setting `user_id` to their `auth.uid()`.
        *   Example: `CREATE POLICY "Users can insert their own data" ON table_name FOR INSERT WITH CHECK (auth.uid() = user_id);`
    *   **UPDATE:** Users can update rows they own.
        *   Example: `CREATE POLICY "Users can update their own data" ON table_name FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);`
    *   **DELETE:** Users can delete rows they own.
        *   Example: `CREATE POLICY "Users can delete their own data" ON table_name FOR DELETE USING (auth.uid() = user_id);`

2.  **Default Deny:** If no policy explicitly grants access, the default behavior is to deny access.

### B. Specific Table Considerations for RLS

*   **`users` (Supabase Auth Table):** This table is managed by Supabase Auth. RLS is typically not directly applied by developers here for standard operations but can be queried (e.g., to get user emails if needed, often via security-definer functions).
*   **`content_snippets`:**
    *   Standard RLS (owner-based CRUD) will apply.
    *   Future Consideration: If a need arises for truly global/default snippets (not tenant-specific), these could be identified by a `NULL` `user_id`. RLS policies would then need to be adjusted to allow all authenticated users to SELECT these `user_id IS NULL` snippets, while INSERT/UPDATE/DELETE of such global snippets would be restricted to an administrative role. For the initial multi-tenant MVP, all snippets will be strictly user-owned.
*   **`contact_form_submissions`:**
    *   RLS will ensure that only the site owner (where `auth.uid() = tenant_user_id`) can SELECT, UPDATE, or DELETE submissions.
    *   Public INSERTs (when a visitor submits the form) will be handled by a Supabase Function (`edge function` or `database function` with `security definer` privileges) that uses a service role key or other elevated privileges to insert into the table, ensuring the `tenant_user_id` is correctly set based on the site the form was submitted from. Public users will not have direct INSERT RLS permissions on this table.
*   **Junction Tables (e.g., `page_metadata_keyword_links`, `project_technology_links`, etc.):**
    *   All junction tables now include a `user_id` column. Standard RLS policies based on this `user_id` matching `auth.uid()` will apply, ensuring users can only interact with their own linkage records.

### C. Public Access

*   For the initial version, all data managed through these tables is considered tenant-specific. There is no global, publicly queryable data intended for unauthenticated users directly from these tables.
*   Public-facing website pages will fetch data via Supabase API calls from the Next.js application, which will operate based on the authenticated user's session (for logged-in users managing their site) or potentially using the `anon` key for very limited, read-only public data if ever explicitly designed (e.g., viewing a published portfolio, which would still be filtered by the specific tenant's `user_id` at the application or API query level, not by RLS allowing broad public access to raw tables).

### D. Role-Based Access Control (RBAC)

*   While RLS handles row-level data access, more complex permission schemes (e.g., different types of administrators for a single tenant account, or super-admin roles for platform management) are not detailed in this initial schema but would be a future consideration if the SaaS platform evolves to require them. This could involve a separate `roles` table and potentially custom claims in JWTs.