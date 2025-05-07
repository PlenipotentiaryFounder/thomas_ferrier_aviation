# Supabase Content Seeding Checklist

This document tracks the initial content seeding status for all tables in the database.
The goal is to populate the database with initial data extracted from the existing Next.js application or sensible defaults to make the site fully dynamic.

User ID for seeding: `6ea7ba36-e922-4344-af0a-46507ba55e24`
Supabase Project ID: `berbjemzontaepiunifw`

## Phase 2: Content Seeding

**Legend:**
- `[ ]` - Pending
- `[X]` - Completed
- `[P]` - Partially Completed / In Progress
- `(S)` - Requires creating `content_snippets`
- `(D)` - Direct data entry (no snippets involved for primary content)
- `(J)` - Junction table, populated when related entities are seeded

---

### I. Core Shared Tables

These tables are foundational and reused across multiple pages or globally.

- **`user_site_settings`** `[X]` (D)
  - `default_theme_preference`
  - `allow_visitor_theme_override`
  - `primary_color_hex`
  - `toast_default_duration_ms`
  - `pagination_default_items_per_page`
  - `display_projects_page`
  - `display_consulting_page`
  - `display_gallery_page`
  - `display_logbook_page`
- **`site_branding`** `[X]` (D)
  - `brand_name`
  - `logo_url`
  - `favicon_url`
  - `footer_description`
- **`navigation_links`** `[X]` (D) - For groups: `navbar_main`, `footer_primary`, `footer_secondary`, `footer_legal`, etc.
- **`social_media_links`** `[X]` (D)
- **`contact_details`** `[X]` (D)
- **`content_snippets`** `[P]` (D) - This table is populated on-demand as other tables require snippets. (Branding snippets created, but `site_branding` uses direct values).
- **`call_to_actions`** `[X]` (S) - For reusable CTAs.
- **`page_metadata`** `[P]` (S) - Initial entries for each main page.
- **`page_section_headers`** `[P]` (S) - For common section headers if any are globally defined.
- **`testimonials`** `[P]` (S) - Pool of general testimonials.
- **`aircraft`** `[P]` (S) - Initial aircraft profiles (separate from full ForeFlight import).
- **`flight_logbook_entries`** `[P]` (S) - Manual sample entries (separate from full ForeFlight import).
- **`timeline_events`** `[P]` (S) - General chronological events.

---

### II. Page-Specific Content & Configuration Tables

#### A. Home Page (`app/page.tsx`)

- `homepage_hero_settings` `[X]` (S)
- `homepage_featured_section_main` `[X]` (S)
- `homepage_feature_cards` `[P]` (S) - Linked to `homepage_featured_section_main`.
- `homepage_consulting_section_main` `[X]` (S)
- `homepage_consulting_service_cards` `[P]` (S) - Linked to `homepage_consulting_section_main`.
- `homepage_testimonials_section_main` `[X]` (S)
- `homepage_latest_flights_main` `[X]` (S)
- `homepage_newsletter_cta_config` `[X]` (S)
- `newsletter_subscribers` `[X]` (D) - Technically not page-specific but often linked from homepage CTA.

#### B. About Page (`app/about/page.tsx`)

- `about_page_hero_content` `[X]` (S)
- `about_page_main_content` `[X]` (S)
- `about_page_values_section_main` `[X]` (S)
- `core_values_items` `[P]` (S) - Linked to `about_page_values_section_main`.
- `about_page_stats_section_main` `[X]` (S)
- `stat_items` `[P]` (S) - Linked to `about_page_stats_section_main`.

#### C. Certifications Page (`app/certifications/page.tsx`)

- `certifications_page_list_section_main` `[X]` (S)
- `user_certifications_and_ratings` `[P]` (S) - Individual certifications.
- `certifications_page_endorsements_section_main` `[X]` (S)
- `endorsement_categories` `[P]` (S)
- `endorsement_items` `[P]` (S) - Linked to `endorsement_categories`.
- `general_qualification_badges` `[P]` (S)
- `certifications_page_timeline_section_main` `[X]` (S) - Configures display of `timeline_events` for this page.

#### D. Consulting Page (`app/consulting/page.tsx`)

- `consulting_page_hero_content` `[X]` (S)
- `consulting_page_services_section_main` `[X]` (S)
- `consulting_service_items` `[P]` (S) - Linked to `consulting_page_services_section_main`.
- `consulting_page_process_section_main` `[X]` (S)
- `consulting_process_steps` `[P]` (S) - Linked to `consulting_page_process_section_main`.
- `consulting_page_case_studies_section_main` `[X]` (S)
- `consulting_case_study_items` `[P]` (S) - Linked to `consulting_page_case_studies_section_main`.
- `consulting_page_final_cta_config` `[X]` (S)

#### E. Contact Page (`app/contact/page.tsx`)

- `office_hours_schedule_items` `[P]` (S)
- `contact_form_submissions` `[X]` (D) - Will be populated by user actions, not initial seeding.
- `contact_page_faq_section_main` `[X]` (S)
- `faq_items` `[P]` (S) - Linked to `contact_page_faq_section_main`.

#### F. Experience Page (`app/experience/page.tsx`)

- `experience_page_work_experience_section_main` `[ ]` (S)
- `work_experience_items` `[ ]` (S) - Linked to `experience_page_work_experience_section_main`.
- `experience_page_education_section_main` `[ ]` (S)
- `education_items` `[ ]` (S) - Linked to `experience_page_education_section_main`.
- `experience_page_skills_section_main` `[ ]` (S)
- `skill_categories` `[ ]` (S) - Linked to `experience_page_skills_section_main`.
- `skill_items` `[ ]` (S) - Linked to `skill_categories`.

#### G. Gallery Page (`app/gallery/page.tsx`)

- `gallery_page_photo_section_main` `[ ]` (S)
- `photo_gallery_items` `[ ]` (S) - Linked to `gallery_page_photo_section_main`.
- `gallery_page_video_section_main` `[ ]` (S)
- `video_gallery_items` `[ ]` (S) - Linked to `gallery_page_video_section_main`.
- `gallery_page_aircraft_showcase_section_main` `[ ]` (S)
- `aircraft_showcase_items` `[ ]` (S) - Linked to `gallery_page_aircraft_showcase_section_main` and `aircraft`.

#### H. Logbook Page (`app/logbook/page.tsx`)

- `logbook_page_flight_stats_main_config` `[ ]` (S)
- `logbook_displayed_stat_items` `[ ]` (S) - Linked to `logbook_page_flight_stats_main_config`.
- `logbook_page_recent_flights_config` `[ ]` (S)
- `logbook_page_aircraft_experience_config` `[ ]` (S)
- `logbook_page_main_charts_config` `[ ]` (S)
- `logbook_chart_definitions` `[ ]` (S) - Linked to `logbook_page_main_charts_config`.
  _(Note: `flight_logbook_entries` and `flight_approaches` are in Core and will be bulk-imported later, but sample manual entries can be added via Core checklist)_

#### I. Projects Page (`app/projects/page.tsx`)

- `projects_page_featured_section_main` `[ ]` (S)
- `project_items` `[ ]` (S) - Individual projects.
- `technology_stack_items` `[ ]` (S) - Pool of technologies.
- `projects_page_tech_stack_section_main` `[ ]` (S)
- `projects_page_research_section_main` `[ ]` (S)
- `research_items` `[ ]` (S)