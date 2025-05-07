# Admin Interface Development Plan

## A. Goal

To create a dynamic and user-friendly admin interface within the Next.js application that allows for easy management of website content stored in the Supabase database. This system will enable updates to page content, shared components, and site settings without requiring code changes.

## B. Guiding Principles

1.  **Schema-Driven UI:** The admin forms and editing capabilities will be dynamically generated based on a defined schema or configuration for each manageable page/entity. This enhances maintainability and extensibility.
2.  **API-First Approach:** A clear and well-defined set of backend APIs will handle fetching and updating content, ensuring a clean separation between frontend and backend logic.
3.  **Iterative Development:** Implement core functionality first and progressively enhance features, starting with simpler pages/content types.
4.  **Leverage Existing Infrastructure:** Utilize Supabase's capabilities (Auth, RLS, Storage) and the existing `page_metadata` table as much as possible.
5.  **Simplicity and Best Practices:** Adhere to Next.js and Supabase best practices, keeping the solution as straightforward as possible while meeting requirements.

## C. Core Components

### 1. Enhanced `page_metadata` for UI Schema Definition

The existing `public.page_metadata` table is central. It identifies pages using `page_identifier`. We will enhance its role or link it to a UI schema definition.

*   **Proposal:** Add a new JSONB column, `admin_ui_schema_definition`, to the `public.page_metadata` table (or a new related table if schemas become very large and shared).
    *   This JSONB column will store the definition of what makes up the editable content of that page.
    *   **Structure of `admin_ui_schema_definition`:**
        ```json
        {
          "sections": [
            {
              "id": "hero_content", // Unique ID for this section within the page
              "title": "Hero Section", // User-friendly title for the admin UI
              "sourceTable": "about_page_hero_content", // The main DB table for this section's config
              "recordSelector": {"user_id": "current_user"}, // How to find the single record (if not a list)
              "fields": [
                { "name": "main_heading_snippet_id", "label": "Main Heading", "type": "snippet", "snippetPrefix": "about_hero_main_heading" },
                { "name": "sub_heading_paragraph_markdown_snippet_id", "label": "Sub-Heading Paragraph", "type": "snippet_markdown", "snippetPrefix": "about_hero_sub_heading" },
                { "name": "hero_image_url", "label": "Hero Image URL", "type": "image_storage", "storagePath": "about/hero/" },
                // ... other direct fields or snippet links
              ]
            },
            {
              "id": "core_values",
              "title": "Core Values",
              "sourceTable": "core_values_items", // A table storing a list of items
              "parentLinkField": "values_section_id", // FK in core_values_items linking to about_page_values_section_main.id
              "orderByField": "display_order",
              "itemSchema": { // Schema for each item in the list
                 "fields": [
                    { "name": "title_snippet_id", "label": "Value Title", "type": "snippet", "snippetPrefix": "core_value_title" },
                    { "name": "description_markdown_snippet_id", "label": "Value Description", "type": "snippet_markdown", "snippetPrefix": "core_value_desc" },
                    { "name": "icon_name", "label": "Icon Name (e.g., 'lucide:check-circle')", "type": "text" }
                 ]
              }
            }
            // ... other sections for the page
          ]
        }
        ```
    *   **Field Types:** `text`, `textarea`, `number`, `boolean`, `image_url` (direct URL), `image_storage` (integrates with Supabase storage), `snippet` (plain text snippet), `snippet_markdown` (Markdown snippet), `cta_selector` (dropdown to link to `call_to_actions.id`), etc.
    *   `snippetPrefix` would help in auto-generating unique `snippet_key`s if new snippets are created.

### 2. Backend API Endpoints (Next.js API Routes)

*   **`GET /api/admin/page-structure/{page_identifier}` (Potentially combined or part of `page-content`)**
    *   **Input:** `page_identifier`.
    *   **Action:** Fetches the `page_metadata` record, specifically the `admin_ui_schema_definition` JSON.
    *   **Output:** The `admin_ui_schema_definition` JSON.

*   **`GET /api/admin/page-content/{page_identifier}`**
    *   **Input:** `page_identifier`.
    *   **Action:**
        1.  Retrieves the `admin_ui_schema_definition` for the page (as above).
        2.  Based on this schema, queries the Supabase database to fetch all current data for the defined `sourceTable`s and `fields`, including dereferencing `snippet_id`s to get their `value_markdown`, and fetching data for lists of items.
    *   **Output:** A JSON payload containing both the UI schema and the current content values, ready for the frontend to render.

*   **`POST /api/admin/page-content/{page_identifier}`**
    *   **Input:** `page_identifier` and a JSON payload of the updated content, structured according to the page's schema.
    *   **Action:**
        1.  Retrieves the `admin_ui_schema_definition`.
        2.  Validates the incoming data against the schema.
        3.  Iterates through the submitted data:
            *   Updates direct fields in their respective `sourceTable`s.
            *   For snippets: If a `snippet_id` is provided, updates `content_snippets.value_markdown`. If it's new content (or `snippet_id` is null), creates a new snippet (potentially using `snippetPrefix` from schema to generate a key) and then links its ID.
            *   Handles create/update/delete operations for list items (e.g., `core_values_items`).
            *   Ensures all operations are scoped to the authenticated `user_id`.
    *   **Output:** Success or error message.

### 3. Frontend Dynamic Editor (`app/admin/edit/[pageIdentifier]/page.tsx`)

*   A Next.js dynamic route component.
*   Fetches both page structure (schema) and current content from the backend API.
*   Dynamically renders form sections and fields based on the received schema:
    *   Uses appropriate input controls (text fields, Markdown editors, image uploaders, checkboxes, dropdowns for relations like CTAs).
    *   Supports editing lists of items (add, delete, reorder).
*   Handles state management for form data.
*   On save, sends the updated content payload to the backend API.

## D. Phased Implementation & New Checklist

This checklist focuses on building the admin interface. It assumes `migration_checklist1.md` items are sufficiently seeded for development.

**Phase 0: Preparation & Foundation**
*   `[ ]` **(DB Schema)** Add `admin_ui_schema_definition JSONB` column to `public.page_metadata` table.
    *   *Why:* To store the dynamic UI structure definition for each page directly with its metadata.
*   `[ ]` **(Admin UI)** Create basic admin layout (navigation, protected routes).
    *   *Why:* Essential framework for all admin pages.
*   `[ ]` **(Admin UI)** Create an admin dashboard page (`/admin`) that lists editable pages derived from `public.page_metadata` (using `page_identifier` and `admin_display_title`).
    *   *Why:* Provides navigation to the page editors.
*   `[ ]` **(Documentation)** Create an initial `admin_ui_schema_definition.json` for one simple page (e.g., "About Page" - focusing on `about_page_hero_content`). Populate this into the DB for that page's `page_metadata` record.
    *   *Why:* Provides a concrete example schema to build against.

**Phase 1: Read-Only Page Content Viewer**
*   `[ ]` **(Backend)** Develop `GET /api/admin/page-content/{page_identifier}` to fetch and combine schema + content for a single, non-list section (e.g., `about_page_hero_content` based on its schema).
    *   *Why:* To validate the schema-driven data retrieval.
*   `[ ]` **(Frontend)** Implement `app/admin/edit/[pageIdentifier]/page.tsx` to fetch data from the API.
*   `[ ]` **(Frontend)** Create a dynamic renderer that displays the fetched content in a structured, read-only format (mimicking form fields but disabled).
    *   *Why:* To visualize the data and schema interpretation before adding editing complexity.

**Phase 2: Basic Content Editing (Direct Fields & Snippets)**
*   `[ ]` **(Backend)** Implement `POST /api/admin/page-content/{page_identifier}` to handle updates for direct fields and snippet links (for a single, non-list section).
    *   *Why:* Enables basic content saving.
*   `[ ]` **(Frontend)** Enable editing in the dynamic renderer for:
    *   Simple text inputs.
    *   Boolean checkboxes.
    *   Markdown editor for snippet fields (e.g., using `react-markdown-editor-lite` or Tiptap).
    *   *Why:* Introduces core editing functionality.
*   `[ ]` **(Frontend)** Implement "Save Changes" button and logic.
*   `[ ]` **(Testing)** Thoroughly test with the initial simple page (e.g., "About Page Hero").

**Phase 3: List Management & Complex Fields**
*   `[ ]` **(Schema)** Define `admin_ui_schema_definition.json` for a page section that includes a list of items (e.g., "Core Values" on About Page, or "Feature Cards" on Home Page).
*   `[ ]` **(Backend)** Extend API GET/POST endpoints to handle fetching and updating lists of items (create, update, delete, reorder).
    *   *Why:* Supports more complex page structures.
*   `[ ]` **(Frontend)** Enhance dynamic renderer to:
    *   Display lists of editable items.
    *   Allow adding new items to a list (based on `itemSchema`).
    *   Allow deleting items from a list.
    *   Allow reordering items in a list (e.g., drag-and-drop or up/down buttons to update `display_order`).
    *   *Why:* Provides full CRUD for list-based content.
*   `[ ]` **(Frontend)** Implement an image uploader component (for `image_storage` type fields) that uploads to Supabase Storage and saves the URL.
    *   *Why:* Enables easy image management.
*   `[ ]` **(Frontend)** Implement a selector for linked entities (e.g., `cta_selector` to choose a `call_to_actions` item).
    *   *Why:* Manages relationships in a user-friendly way.

**Phase 4: Broader Page Coverage & Refinements**
*   `[ ]` **(Schema/DB)** Create and populate `admin_ui_schema_definition.json` for all other manageable pages defined in `page_metadata`.
*   `[ ]` **(Testing & Iteration)** Extend admin editing capabilities to all these pages, ensuring the dynamic system handles their varied structures.
*   `[ ]` **(UX)** Implement user feedback (toasts for save success/failure), loading states, improved error handling.
    *   *Why:* Enhances usability.

**Phase 5: Global Site Settings Management**
*   `[ ]` **(Admin UI)** Design and implement separate, dedicated UI sections (not driven by `page_metadata`'s page-specific schema) for managing global entities:
    *   `navigation_links` (add, edit, delete, reorder links for different groups).
    *   `social_media_links`.
    *   `call_to_actions` (global/reusable ones).
    *   `site_branding`.
    *   `user_site_settings`.
    *   `testimonials` (global pool).
    *   *Why:* These are not tied to a single page's content structure and need their own management interfaces.

This plan is a roadmap. We will tackle it phase by phase, step by step.

I am now ready to proceed. Please let me know if you agree with this plan or would like any adjustments. We can then start with **Phase 0, Step 1: Modifying the `page_metadata` table.**
