# Supabase Content Seeding Checklist (v1)

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
- **`site_branding`** `[X]` (D)
- **`navigation_links`** `[X]` (D)
- **`social_media_links`** `[X]` (D)
- **`contact_details`** `[X]` (D)
- **`content_snippets`** `[P]` (D) - This table is populated on-demand as other tables require snippets.
- **`call_to_actions`** `[P]` (S) - Reusable CTAs (some examples added).
- **`page_metadata`** `[P]` (S) - Initial entries for Home, About, Contact. Others pending.
- **`page_section_headers`** `[P]` (S) - Example added (certifications_hero). Others pending or page-specific.
- **`testimonials`** `[P]` (S) - Pool of general testimonials (one example added).
- **`aircraft`** `[P]` (S) - Table for aircraft details. (CSV available - processed a few examples)
- **`flight_logbook_entries`** `[P]` (S) - Sample entries added. (CSV available - processed a few examples)
- **`flight_approaches`** `[P]` (S) - Details of instrument approaches made during flights. (CSV available - processed one example)
- **`timeline_events`** `[P]` (S) - General chronological events (one example added).

---

### II. Page-Specific Content & Configuration Tables

#### A. Home Page (`app/page.tsx`)

- `homepage_hero_settings` `[X]` (S)
- `homepage_featured_section_main` `[X]` (S)
- `homepage_feature_cards` `[P]` (S) - Linked to `homepage_featured_section_main` (one example added).
- `homepage_consulting_section_main` `[X]` (S)
- `homepage_consulting_service_cards` `[P]` (S) - Linked to `homepage_consulting_section_main` (one example added).
- `homepage_testimonials_section_main` `[X]` (S)
- `homepage_latest_flights_main` `[X]` (S)
- `homepage_newsletter_cta_config` `[X]` (S)
- `newsletter_subscribers` `[X]` (D) - No initial seeding required.

#### B. About Page (`app/about/page.tsx`)

- `about_page_hero_content` `[X]` (S)
- `about_page_main_content` `[X]` (S)
- `about_page_values_section_main` `[X]` (S)
- `core_values_items` `[P]` (S) - Linked to `about_page_values_section_main` (one example added).
- `about_page_stats_section_main` `[X]` (S)
- `stat_items` `[P]` (S) - Linked to `about_page_stats_section_main` (one example added).

#### C. Certifications Page (`app/certifications/page.tsx`)

- `certifications_page_list_section_main` `[X]` (S)
- `user_certifications_and_ratings` `[P]` (S) - Individual certifications (one example added).
- `certifications_page_endorsements_section_main` `[X]` (S)
- `endorsement_categories` `[P]` (S) (one example added).
- `endorsement_items` `[P]` (S) - Linked to `endorsement_categories` (one example added).
- `general_qualification_badges` `[P]` (S) (one example added).
- `certifications_page_timeline_section_main` `[X]` (S) - Configures display of `timeline_events` for this page.

#### D. Consulting Page (`app/consulting/page.tsx`)

- `consulting_page_hero_content` `[X]` (S)
- `consulting_page_services_section_main` `[X]` (S)
- `consulting_service_items` `[P]` (S) - Linked to `consulting_page_services_section_main` (one example added).
- `consulting_page_process_section_main` `[X]` (S)
- `consulting_process_steps` `[P]` (S) - Linked to `consulting_page_process_section_main` (one example added).
- `consulting_page_case_studies_section_main` `[X]` (S)
- `consulting_case_study_items` `[P]` (S) - Linked to `consulting_page_case_studies_section_main` (one example added).
- `consulting_page_final_cta_config` `[X]` (S)

#### E. Contact Page (`app/contact/page.tsx`)

- `office_hours_schedule_items` `[P]` (S) (examples added).
- `contact_form_submissions` `[X]` (D) - No initial seeding required.
- `contact_page_faq_section_main` `[X]` (S)
- `faq_items` `[P]` (S) - Linked to `contact_page_faq_section_main` (one example added).

#### F. Experience Page (`app/experience/page.tsx`)

- `experience_page_work_experience_section_main` `[X]` (S)
- `work_experience_items` `[P]` (S) - Linked to `experience_page_work_experience_section_main` (one example added).
- `experience_page_education_section_main` `[X]` (S)
- `education_items` `[P]` (S) - Linked to `experience_page_education_section_main` (one example added).
- `experience_page_skills_section_main` `[X]` (S)
- `skill_categories` `[P]` (S) - Linked to `experience_page_skills_section_main` (one example added).
- `skill_items` `[P]` (S) - Linked to `skill_categories` (one example added).

#### G. Gallery Page (`app/gallery/page.tsx`)

- `gallery_page_photo_section_main` `[X]` (S)
- `photo_gallery_items` `[P]` (S) - Linked to `gallery_page_photo_section_main`.
- `gallery_page_video_section_main` `[X]` (S)
- `video_gallery_items` `[P]` (S) - Linked to `gallery_page_video_section_main`.
- `gallery_page_aircraft_showcase_section_main` `[X]` (S)
- `aircraft_showcase_items` `[P]` (S) - Linked to `gallery_page_aircraft_showcase_section_main` and `aircraft`.

#### H. Logbook Page (`app/logbook/page.tsx`)

- `logbook_page_flight_stats_main_config` `[X]` (S)
- `logbook_displayed_stat_items` `[P]` (S) - Configuration for specific stats shown (one example: Total Flight Hours).
- `logbook_page_recent_flights_config` `[X]` (S) - Configuration for the recent flights table display.
- `logbook_page_aircraft_experience_config` `[X]` (S) - Configuration for aircraft experience summary.
- `logbook_page_main_charts_config` `[X]` (S) - Configuration for the main charts section on the logbook page.
- `logbook_chart_definitions` `[P]` (S) - Definitions for individual charts (e.g., flight hours per month). (One example added)

#### I. Projects Page (`app/projects/page.tsx`)

- `projects_page_hero_content` `[X]` (S)
- `projects_page_list_section_main` `[X]` (S)
- `project_items` `[P]` (S) - Linked to `projects_page_list_section_main` (one example added, another sample added).
- `projects_page_testimonials_section_main` `[X]` (S)
- `project_testimonials` `[P]` (S) - Linked to `projects_page_testimonials_section_main` (one example added).
- `technology_stack_items` `[P]` (D) - Pool of technologies (examples: Next.js, React, Supabase added).
- `projects_page_tech_stack_section_main` `[X]` (S) - Configuration for displaying tech stack on projects page.
- `project_technology_links` `[P]` (J) - Links projects to technologies (one example link added).