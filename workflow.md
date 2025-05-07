# Website Content Dynamification & Admin Dashboard Workflow

This document tracks the progress of making the website content dynamic via Supabase and building an admin dashboard for content management.

## Phase 1: Database Schema Finalization & Setup

1.  **[COMPLETED]** Define core shared tables (`db_integration.md` - Section I).
2.  **[COMPLETED]** Define global & shared component configuration tables (`db_integration.md` - Section II).
3.  **[COMPLETED]** Define page-specific content tables (`db_integration.md` - Section III).
4.  **[COMPLETED]** Review and refine table structures, foreign keys, `ON DELETE` actions, and snippet usage across all tables.
5.  **[COMPLETED]** Add `user_id` to junction tables (`page_metadata_keyword_links`, `project_technology_links`, etc.) for RLS consistency.
6.  **[COMPLETED]** Add `timeline_events` table to Core Shared Tables.
7.  **[COMPLETED]** Refactor `project_items.gallery_image_urls` to use `project_photo_links` junction table.
8.  **[COMPLETED]** Define RLS and Security Access Control strategy (`db_integration.md` - Section V).
9.  **[COMPLETED]** Define Data Migration Strategy for ForeFlight CSV (`db_integration.md` - Section III.Next Steps).
10. **[COMPLETED]** Augment `page_metadata` table:
    *   Add `admin_display_title` (text, NOT NULL).
    *   Add `admin_page_description` (text, NULLABLE).
    *   Ensure all relevant page-specific "main" configuration tables have a FK to `page_metadata(id)`.
11. **[COMPLETED]** Generate SQL DDL for all defined tables.
12. **[COMPLETED]** Apply SQL DDL to Supabase project (`berbjemzontaepiunifw`).

## Phase 2: Content Seeding

1.  **[PENDING]** Systematically extract all hardcoded content from the live Next.js application components.
    *   Home Page
    *   About Page
    *   Certifications Page
    *   Consulting Page
    *   Contact Page
    *   Experience Page
    *   Gallery Page
    *   Logbook Page (Initial entries if any, separate from ForeFlight bulk import)
    *   Projects Page
2.  **[PENDING]** Create `content_snippets` for all reusable text strings identified during extraction.
3.  **[PENDING]** Populate Supabase tables with extracted content, linking to appropriate `user_id`, `page_metadata_id`, and `content_snippet_id` values.

## Phase 3: Admin Dashboard Development

1.  **[PENDING]** Set up basic admin section routing in Next.js (e.g., `/admin/*`).
2.  **[PENDING]** Implement authentication for the admin section.
3.  **[PENDING]** Create main admin layout (sidebar for page navigation, main content area).
4.  **[PENDING]** Develop `/admin/dashboard` overview page.
5.  **[PENDING]** For each page defined in `page_metadata`:
    *   Create corresponding admin route (e.g., `/admin/about`).
    *   Display `admin_display_title` from `page_metadata`.
    *   For each component/section associated with the page:
        *   Fetch data from its Supabase table(s) (filtered by `user_id` and `page_metadata_id`).
        *   Render a form reflecting the table schema, pre-filled with fetched data.
        *   Implement "Save" functionality (Supabase `update`/`insert`).
        *   Implement "Preview" button linking to the live public page.
    *   Target Pages for Admin Forms:
        *   Home
        *   About
        *   Certifications
        *   Consulting
        *   Contact
        *   Experience
        *   Gallery
        *   Logbook
        *   Projects
        *   Core Shared Data (Site Branding, Navigation, Contact Details, User Settings etc.)

## Phase 4: Frontend Integration

1.  **[PENDING]** For each public page and component:
    *   Replace hardcoded content with data fetched from Supabase using the Next.js Supabase client.
    *   Ensure UI renders correctly with dynamic data.

## Phase 5: Advanced Features & Refinements

1.  **[PENDING]** Develop and implement ForeFlight CSV import script.
2.  **[PENDING]** Develop automation for emailed ForeFlight CSV processing (Supabase Edge Function).
3.  **[PENDING]** Further UI/UX refinements for admin dashboard and public site. 