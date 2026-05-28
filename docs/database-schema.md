# Database Schema Documentation (Updated)

## User Authentication
- **Supabase Auth**: All user data references `auth.users(id)` as the source of truth for user identity.

---

## Core Tables

### profiles
- `id`: uuid PRIMARY KEY
- `user_id`: uuid REFERENCES auth.users(id) ON DELETE CASCADE
- `name`: text NOT NULL
- `title`: text NOT NULL
- `bio`: text
- `location`: text
- `email`: text
- `phone`: text
- `created_at`: timestamptz DEFAULT now()

### experience
- `id`: integer PRIMARY KEY
- `user_id`: uuid REFERENCES auth.users(id) ON DELETE CASCADE
- `title`: text NOT NULL
- `company`: text NOT NULL
- `location`: text NOT NULL
- `period`: text NOT NULL
- `description`: text
- `type`: text NOT NULL
- `created_at`: timestamptz DEFAULT now()

### certifications
- `id`: integer PRIMARY KEY
- `user_id`: uuid REFERENCES auth.users(id) ON DELETE CASCADE
- `title`: text NOT NULL
- `type`: text NOT NULL
- `description`: text
- `date`: date NOT NULL
- `color`: text DEFAULT 'blue'
- `created_at`: timestamptz DEFAULT now()

### projects
- `id`: integer PRIMARY KEY
- `user_id`: uuid REFERENCES auth.users(id) ON DELETE CASCADE
- `title`: text NOT NULL
- `description`: text NOT NULL
- `image`: text
- `demo_url`: text
- `github_url`: text
- `date`: date NOT NULL
- `created_at`: timestamptz DEFAULT now()

### flights
- `id`: integer PRIMARY KEY
- `user_id`: uuid REFERENCES auth.users(id) ON DELETE CASCADE
- `date`: date NOT NULL
- `aircraft`: text NOT NULL
- `route`: text NOT NULL
- `duration`: numeric NOT NULL
- `type`: text NOT NULL
- `notes`: text
- `image`: text
- `created_at`: timestamptz DEFAULT now()

### gallery_photos
- `id`: integer PRIMARY KEY
- `user_id`: uuid REFERENCES auth.users(id) ON DELETE CASCADE
- `category_id`: integer REFERENCES gallery_categories(id)
- `src`: text NOT NULL
- `alt`: text NOT NULL
- `caption`: text
- `created_at`: timestamptz DEFAULT now()

### videos
- `id`: integer PRIMARY KEY
- `user_id`: uuid REFERENCES auth.users(id) ON DELETE CASCADE
- `title`: text NOT NULL
- `description`: text NOT NULL
- `thumbnail`: text NOT NULL
- `duration`: text NOT NULL
- `date`: date NOT NULL
- `embed_url`: text NOT NULL
- `created_at`: timestamptz DEFAULT now()

### testimonials
- `id`: integer PRIMARY KEY
- `user_id`: uuid REFERENCES auth.users(id) ON DELETE CASCADE
- `quote`: text NOT NULL
- `author`: text NOT NULL
- `role`: text NOT NULL
- `avatar`: text
- `created_at`: timestamptz DEFAULT now()

---

## New Tables

### themes
- `id`: uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `user_id`: uuid REFERENCES auth.users(id) ON DELETE CASCADE
- `name`: text NOT NULL
- `description`: text
- `config`: jsonb
- `is_default`: boolean DEFAULT false
- `created_at`: timestamptz DEFAULT now()

### pages
- `id`: uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `user_id`: uuid REFERENCES auth.users(id) ON DELETE CASCADE
- `title`: text NOT NULL
- `slug`: text NOT NULL
- `content`: jsonb
- `is_published`: boolean DEFAULT false
- `order_index`: integer DEFAULT 0
- `created_at`: timestamptz DEFAULT now()
- `updated_at`: timestamptz DEFAULT now()

### media
- `id`: uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `user_id`: uuid REFERENCES auth.users(id) ON DELETE CASCADE
- `url`: text NOT NULL
- `type`: text
- `size`: integer
- `metadata`: jsonb
- `created_at`: timestamptz DEFAULT now()

### analytics
- `id`: uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `user_id`: uuid REFERENCES auth.users(id) ON DELETE CASCADE
- `event_type`: text NOT NULL
- `event_data`: jsonb
- `page_id`: uuid REFERENCES pages(id) ON DELETE SET NULL
- `created_at`: timestamptz DEFAULT now()

---

## Best Practices
- All user-owned tables reference `auth.users(id)` via `user_id`.
- Row Level Security (RLS) is enabled on all user data tables.
- Policies ensure users can only access and modify their own data.
- Use Supabase Auth for all authentication and user management.
- Use UUIDs for primary keys where possible for scalability and security.

---

## Notes
- Additional supporting tables (categories, tags, etc.) should also reference `user_id` if user-specific.
- All timestamps use `timestamptz` for timezone safety.
- JSONB fields allow for flexible, extensible content and configuration storage. 