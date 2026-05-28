# Aviation Professional Portfolio Platform - System Architecture (Updated)

## Overview
The Aviation Professional Portfolio Platform is a modular SaaS solution enabling aviation professionals to create, manage, and share their professional online presence. The system is designed for multi-tenancy, security, and extensibility, leveraging Supabase Auth and best practices for user data isolation.

---

## Core Components

### 1. Professional Portfolio Sites (`/u/[username]`)
- **Purpose:** Public-facing, shareable portfolio for each aviation professional
- **Features:**
  - Custom subdomain/URL for each user
  - Themed, modular pages (about, experience, certifications, logbook, gallery, projects, testimonials, contact, etc.)
  - Dynamic content powered by user-managed data
  - SEO and analytics support

### 2. Professional Dashboard (`/dashboard`)
- **Purpose:** Secure portal for professionals to manage their portfolio
- **Features:**
  - Authentication via Supabase Auth
  - Content management for all portfolio sections
  - Theme and layout selection
  - Media uploads and management
  - Analytics dashboard for personal site
  - Modular, extensible UI (add/remove/reorder pages, components)

### 3. Admin Portal (`/admin`)
- **Purpose:** Internal tool for company staff to manage the platform
- **Features:**
  - User onboarding and management
  - Platform-wide analytics and reporting
  - Content moderation and approval
  - System settings and configuration
  - Support and troubleshooting tools

---

## Data Flow & Security

- **User Authentication:**
  - All users are managed via Supabase Auth (`auth.users`)
  - All user-owned data references `auth.users(id)` via `user_id`

- **Row Level Security (RLS):**
  - Enabled on all user data tables
  - Policies ensure users can only access and modify their own data
  - Admins have elevated access via special policies or roles

- **Multi-Tenancy:**
  - All queries and mutations are scoped to the authenticated user's `user_id`
  - No custom `users` table; all identity is managed by Supabase Auth

---

## Database Schema (Summary)

- **profiles, experience, certifications, projects, flights, gallery_photos, videos, testimonials, media, pages, themes, analytics**
  - All have a `user_id` column referencing `auth.users(id)`
  - RLS and policies restrict access to the owner
  - See `docs/database-schema.md` for full details

---

## Modularity & Extensibility

- **Component System:**
  - All portfolio pages are built from modular, reusable components
  - New components and page types can be added without schema changes
  - Themes and layouts are user-selectable and stored in the `themes` table

- **Content Management:**
  - Users manage their content via the dashboard
  - All changes are immediately reflected on their public portfolio
  - Media uploads are managed via the `media` table and Supabase Storage

- **Analytics:**
  - User-specific analytics are tracked in the `analytics` table
  - Admins have access to platform-wide analytics

---

## Best Practices
- Use Supabase Auth for all authentication and user management
- Reference `auth.users(id)` in all user-owned tables
- Enable RLS and write policies for all user data
- Use UUIDs for primary keys where possible
- Store flexible content/configuration in JSONB fields
- Use timestamps with time zone (`timestamptz`) for all date/time fields

---

## Data Flow Example

1. **User signs up via Supabase Auth**
2. **User logs in and accesses their dashboard**
3. **User creates/edits content (profile, experience, etc.)**
   - Data is stored in tables with `user_id` referencing `auth.users(id)`
   - RLS ensures only the owner can access/modify their data
4. **User customizes their site (themes, pages, media)**
5. **User shares their public portfolio (`/u/[username]`)**
6. **Admin accesses the admin portal for platform management**

---

## Notes
- All supporting tables (categories, tags, etc.) should reference `user_id` if user-specific
- The system is designed for easy onboarding, extensibility, and robust security
- Documentation and schema should be kept up to date as the platform evolves 