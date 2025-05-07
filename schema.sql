-- Enable UUID generation
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Section I: Core Shared Tables

CREATE TABLE public.user_site_settings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    default_theme_preference text DEFAULT 'system' CHECK (default_theme_preference IN ('light', 'dark', 'system')),
    allow_visitor_theme_override boolean DEFAULT true,
    primary_color_hex text,
    toast_default_duration_ms integer,
    pagination_default_items_per_page integer,
    display_projects_page boolean DEFAULT true,
    display_consulting_page boolean DEFAULT true,
    display_gallery_page boolean DEFAULT true,
    display_logbook_page boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.site_branding (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    brand_name text,
    logo_url text,
    favicon_url text,
    footer_description text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.navigation_links (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    text text NOT NULL,
    href text NOT NULL,
    display_order integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    link_group text NOT NULL,
    target_blank boolean NOT NULL DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_user_link_group_href UNIQUE (user_id, link_group, href),
    CONSTRAINT unique_user_link_group_text UNIQUE (user_id, link_group, text)
);

CREATE TABLE public.social_media_links (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    platform_name text NOT NULL,
    url text NOT NULL,
    icon_name text,
    display_order integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_user_platform UNIQUE (user_id, platform_name)
);

CREATE TABLE public.contact_details (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email_address text,
    phone_number text,
    address_line1 text,
    address_line2 text,
    map_embed_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.content_snippets (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    snippet_key text NOT NULL,
    value_markdown text NOT NULL,
    description text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_user_snippet_key UNIQUE (user_id, snippet_key)
);

CREATE TABLE public.call_to_actions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    identifier text NOT NULL,
    title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    description_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    primary_action_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    primary_action_link text,
    secondary_action_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    secondary_action_link text,
    background_color_theme text DEFAULT 'secondary',
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_user_cta_identifier UNIQUE (user_id, identifier)
);

CREATE TABLE public.page_metadata (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    page_identifier text NOT NULL,
    admin_display_title text NOT NULL,
    admin_page_description text,
    custom_path_segment text,
    nav_title_override_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    meta_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    meta_description_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    open_graph_title_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    open_graph_description_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    open_graph_image_url text,
    is_published boolean NOT NULL DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_user_page_identifier UNIQUE (user_id, page_identifier)
);

CREATE TABLE public.page_metadata_keyword_links (
    page_metadata_id uuid NOT NULL REFERENCES public.page_metadata(id) ON DELETE CASCADE,
    content_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    PRIMARY KEY (page_metadata_id, content_snippet_id)
);

CREATE TABLE public.page_section_headers (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    section_identifier text NOT NULL,
    icon_name text,
    icon_color_class text,
    main_heading_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    sub_heading_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_user_section_identifier UNIQUE (user_id, section_identifier)
);

CREATE TABLE public.testimonials (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    quote_text_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    author_name_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    author_role_title_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    author_company_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    avatar_image_url text,
    source_platform_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    testimonial_date date,
    is_published boolean NOT NULL DEFAULT true,
    display_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.aircraft (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    aircraft_identifier text NOT NULL,
    type_code text,
    year_manufactured integer,
    make_name text,
    model_name text,
    gear_type_description_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    engine_type_description_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    faa_equipment_type_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    faa_aircraft_class_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    is_complex_aircraft boolean,
    is_taa_aircraft boolean,
    is_high_performance_aircraft boolean,
    is_pressurized_aircraft boolean,
    custom_notes_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_user_aircraft_identifier UNIQUE (user_id, aircraft_identifier)
);

CREATE TABLE public.flight_logbook_entries (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    aircraft_profile_id uuid NOT NULL REFERENCES public.aircraft(id) ON DELETE RESTRICT,
    flight_date date NOT NULL,
    route_from_icao text,
    route_to_icao text,
    route_full_text text,
    time_out_utc time,
    time_off_utc time,
    time_on_utc time,
    time_in_utc time,
    on_duty_utc time,
    off_duty_utc time,
    total_duration_hours numeric(5,1) NOT NULL,
    pic_hours numeric(5,1),
    sic_hours numeric(5,1),
    night_hours numeric(5,1),
    solo_hours numeric(5,1),
    cross_country_hours numeric(5,1),
    pic_us_hours numeric(5,1),
    is_multi_pilot_ops boolean,
    ifr_hours_total numeric(5,1),
    is_examiner_flight boolean,
    is_nvg_flight boolean,
    nvg_operations_count integer,
    distance_nm integer,
    actual_instrument_hours numeric(5,1),
    simulated_instrument_hours numeric(5,1),
    hobbs_start_hours numeric(7,1),
    hobbs_end_hours numeric(7,1),
    tach_start_hours numeric(7,1),
    tach_end_hours numeric(7,1),
    holds_instrument_count integer,
    dual_given_hours numeric(5,1),
    dual_received_hours numeric(5,1),
    simulated_flight_hours numeric(5,1),
    ground_training_hours numeric(5,1),
    ground_training_given_hours numeric(5,1),
    instructor_name_text text,
    instructor_comments_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    person_1_name text,
    person_2_name text,
    person_3_name text,
    person_4_name text,
    person_5_name text,
    person_6_name text,
    pilot_comments_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    is_flight_review boolean,
    is_instrument_proficiency_check boolean,
    is_checkride boolean,
    is_faa_61_58_pic_check boolean,
    is_nvg_proficiency_check boolean,
    day_takeoffs_count integer,
    day_landings_full_stop_count integer,
    night_takeoffs_count integer,
    night_landings_full_stop_count integer,
    all_landings_count integer,
    atp_cross_country_hours numeric(5,1),
    csv_import_source_notes text,
    summary_for_homepage_card_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    homepage_card_image_url text,
    homepage_card_badge_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    homepage_card_badge_color_class text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.flight_approaches (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    flight_log_entry_id uuid NOT NULL REFERENCES public.flight_logbook_entries(id) ON DELETE CASCADE,
    approach_index_in_flight integer NOT NULL,
    approach_type_text text,
    runway_designator text,
    airport_icao_code text,
    was_circle_to_land boolean,
    was_missed_approach boolean,
    custom_approach_notes_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_flight_approach_index UNIQUE (flight_log_entry_id, approach_index_in_flight)
);

CREATE TABLE public.timeline_events (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    event_date date NOT NULL,
    title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    icon_name text,
    icon_color_class text,
    category_tag_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    related_item_url text,
    display_order integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Section III: Page-Specific Content Tables

-- A. Home Page
CREATE TABLE public.homepage_hero_settings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    background_image_url text,
    background_image_alt_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    main_heading_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    sub_heading_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    description_paragraph_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    primary_button_cta_id uuid REFERENCES public.call_to_actions(id) ON DELETE SET NULL,
    secondary_button_cta_id uuid REFERENCES public.call_to_actions(id) ON DELETE SET NULL,
    scroll_indicator_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    icon_image_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.homepage_featured_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_super_title_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.homepage_feature_cards (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    featured_section_id uuid NOT NULL REFERENCES public.homepage_featured_section_main(id) ON DELETE CASCADE,
    display_order integer NOT NULL DEFAULT 0,
    image_url text,
    image_alt_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    badge_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    badge_color_class text,
    icon_name text,
    icon_color_class text,
    card_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    card_description_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    link_cta_id uuid REFERENCES public.call_to_actions(id) ON DELETE SET NULL,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.homepage_consulting_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    description_paragraph1_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    description_paragraph2_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    button_cta_id uuid REFERENCES public.call_to_actions(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.homepage_consulting_service_cards (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    consulting_section_id uuid NOT NULL REFERENCES public.homepage_consulting_section_main(id) ON DELETE CASCADE,
    display_order integer NOT NULL DEFAULT 0,
    icon_name text,
    icon_color_class text,
    card_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    card_description_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.homepage_testimonials_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    max_testimonials_to_show integer DEFAULT 3,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.homepage_latest_flights_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    button_cta_id uuid REFERENCES public.call_to_actions(id) ON DELETE SET NULL,
    number_of_flights_to_display integer NOT NULL DEFAULT 3,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.homepage_newsletter_cta_config (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    icon_name text,
    icon_color_class text,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    email_input_placeholder_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    submit_button_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    submitting_button_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    success_message_title_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    success_message_body_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    privacy_intro_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    privacy_link_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    privacy_link_url text,
    footer_link1_nav_id uuid REFERENCES public.navigation_links(id) ON DELETE SET NULL,
    footer_link2_nav_id uuid REFERENCES public.navigation_links(id) ON DELETE SET NULL,
    footer_link3_nav_id uuid REFERENCES public.navigation_links(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.newsletter_subscribers (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL,
    subscribed_at timestamptz DEFAULT now(),
    is_active boolean NOT NULL DEFAULT true,
    source_tag text,
    opt_in_confirmed_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_user_subscriber_email UNIQUE (user_id, email)
);

-- B. About Page
CREATE TABLE public.about_page_hero_content (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    icon_name text,
    icon_color_class text,
    main_heading_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    sub_heading_paragraph_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    hero_image_url text,
    hero_image_alt_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    image_overlay_status_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    image_overlay_name_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    image_overlay_location_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.about_page_main_content (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    journey_content_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    accompanying_image_url text,
    accompanying_image_alt_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    philosophy_section_title_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    philosophy_quote_text_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.about_page_values_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.core_values_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    values_section_id uuid NOT NULL REFERENCES public.about_page_values_section_main(id) ON DELETE CASCADE,
    title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    description_markdown_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    icon_name text,
    icon_color_class text,
    display_order integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.about_page_stats_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.stat_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    stats_section_id uuid NOT NULL REFERENCES public.about_page_stats_section_main(id) ON DELETE CASCADE,
    stat_value_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    stat_label_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    icon_name text,
    icon_color_class text,
    display_order integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    data_source_note_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- C. Certifications Page
CREATE TABLE public.certifications_page_list_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    download_all_button_cta_id uuid REFERENCES public.call_to_actions(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.user_certifications_and_ratings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    type_abbreviation_badge_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    short_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    date_issued date NOT NULL,
    issuing_authority_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    certificate_number text,
    expiration_date date,
    ui_color_theme_key text,
    view_details_link_url text,
    scanned_document_url text,
    display_order integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    notes_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.user_certification_endorsements (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_certification_id uuid NOT NULL REFERENCES public.user_certifications_and_ratings(id) ON DELETE CASCADE,
    endorsement_text_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    display_order integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.certifications_page_endorsements_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.endorsement_categories (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    category_name_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    icon_name text,
    icon_color_class text,
    display_order integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_user_endorsement_category_name UNIQUE (user_id, category_name_snippet_id)
);

CREATE TABLE public.endorsement_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    category_id uuid NOT NULL REFERENCES public.endorsement_categories(id) ON DELETE CASCADE,
    item_name_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    item_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    display_order_within_category integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.general_qualification_badges (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    badge_text_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    ui_color_theme_key text,
    display_order integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.certifications_page_timeline_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- D. Consulting Page
CREATE TABLE public.consulting_page_hero_content (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    background_image_url text,
    icon_identifier_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    main_heading_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    sub_heading_paragraph_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    primary_button_cta_id uuid REFERENCES public.call_to_actions(id) ON DELETE SET NULL,
    secondary_button_cta_id uuid REFERENCES public.call_to_actions(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.consulting_page_services_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.consulting_service_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    services_section_id uuid NOT NULL REFERENCES public.consulting_page_services_section_main(id) ON DELETE CASCADE,
    title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    description_markdown_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    icon_name text,
    icon_color_class text,
    display_order integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    details_page_slug_or_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.consulting_page_process_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.consulting_process_steps (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    process_section_id uuid NOT NULL REFERENCES public.consulting_page_process_section_main(id) ON DELETE CASCADE,
    step_number_label_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    description_markdown_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    display_order integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.consulting_page_case_studies_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.consulting_case_study_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    case_studies_section_id uuid NOT NULL REFERENCES public.consulting_page_case_studies_section_main(id) ON DELETE CASCADE,
    title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    short_description_markdown_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    image_url text,
    image_alt_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    tags_list text[],
    full_case_study_link_url text,
    full_case_study_content_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    display_order integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    is_featured boolean DEFAULT false,
    client_name_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    project_date date,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.consulting_page_final_cta_config (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    main_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    description_paragraph_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    primary_button_cta_id uuid REFERENCES public.call_to_actions(id) ON DELETE SET NULL,
    secondary_button_cta_id uuid REFERENCES public.call_to_actions(id) ON DELETE SET NULL,
    expectations_section_title_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.consulting_cta_expectation_links (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    cta_config_id uuid NOT NULL REFERENCES public.consulting_page_final_cta_config(id) ON DELETE CASCADE,
    content_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    display_order integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_cta_expectation_order UNIQUE (cta_config_id, display_order),
    CONSTRAINT unique_cta_expectation_snippet UNIQUE (cta_config_id, content_snippet_id)
);

-- E. Contact Page
CREATE TABLE public.office_hours_schedule_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    day_label_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    hours_or_status_text_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    display_order integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.contact_form_submissions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    sender_name text NOT NULL,
    sender_email text NOT NULL,
    subject text NOT NULL,
    message_body text NOT NULL,
    submission_timestamp timestamptz DEFAULT now(),
    submission_status text DEFAULT 'new',
    sender_ip_address text,
    sender_user_agent text,
    notes_for_admin_markdown text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.contact_page_faq_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.faq_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    faq_section_id uuid NOT NULL REFERENCES public.contact_page_faq_section_main(id) ON DELETE CASCADE,
    question_text_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    answer_markdown_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    display_order integer NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true,
    tags text[],
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- F. Experience Page
CREATE TABLE public.experience_page_work_experience_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.work_experience_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    work_experience_section_id uuid NOT NULL REFERENCES public.experience_page_work_experience_section_main(id) ON DELETE CASCADE,
    job_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    company_name_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    company_logo_url text,
    location_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    start_date date NOT NULL,
    end_date date,
    is_current boolean DEFAULT false,
    responsibilities_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    achievements_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    display_order integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.experience_page_education_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.education_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    education_section_id uuid NOT NULL REFERENCES public.experience_page_education_section_main(id) ON DELETE CASCADE,
    institution_name_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    institution_logo_url text,
    degree_or_certification_name_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    field_of_study_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    start_date date,
    graduation_date date,
    description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    gpa text,
    display_order integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.experience_page_skills_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.skill_categories (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    skills_section_id uuid NOT NULL REFERENCES public.experience_page_skills_section_main(id) ON DELETE CASCADE,
    category_name_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    category_icon text,
    display_order integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.skill_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    skill_category_id uuid NOT NULL REFERENCES public.skill_categories(id) ON DELETE CASCADE,
    skill_name_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    proficiency_level integer,
    skill_icon text,
    description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    display_order integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- G. Gallery Page
CREATE TABLE public.gallery_page_photo_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    display_style text DEFAULT 'grid',
    items_per_page integer DEFAULT 12,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.photo_gallery_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    photo_section_id uuid NOT NULL REFERENCES public.gallery_page_photo_section_main(id) ON DELETE CASCADE,
    image_url text NOT NULL,
    thumbnail_url text,
    alt_text_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    title_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    tags text[],
    upload_date timestamptz DEFAULT now(),
    capture_date date,
    location_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    camera_details_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    display_order integer NOT NULL DEFAULT 0,
    is_featured boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.gallery_page_video_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.video_gallery_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    video_section_id uuid NOT NULL REFERENCES public.gallery_page_video_section_main(id) ON DELETE CASCADE,
    video_url text NOT NULL,
    platform text,
    video_id_on_platform text,
    title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    thumbnail_url text,
    duration_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    upload_date timestamptz DEFAULT now(),
    tags text[],
    display_order integer NOT NULL DEFAULT 0,
    is_featured boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.gallery_page_aircraft_showcase_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.aircraft_showcase_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    aircraft_showcase_section_id uuid NOT NULL REFERENCES public.gallery_page_aircraft_showcase_section_main(id) ON DELETE CASCADE,
    aircraft_id uuid NOT NULL REFERENCES public.aircraft(id) ON DELETE RESTRICT,
    showcase_title_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    showcase_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    cover_image_url text,
    key_specifications_jsonb jsonb,
    story_or_notes_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    display_order integer NOT NULL DEFAULT 0,
    is_featured_on_gallery_page boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.aircraft_showcase_photos_link (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    aircraft_showcase_item_id uuid NOT NULL REFERENCES public.aircraft_showcase_items(id) ON DELETE CASCADE,
    photo_gallery_item_id uuid NOT NULL REFERENCES public.photo_gallery_items(id) ON DELETE CASCADE,
    display_order integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_showcase_photo_link UNIQUE (aircraft_showcase_item_id, photo_gallery_item_id),
    CONSTRAINT unique_showcase_photo_order UNIQUE (aircraft_showcase_item_id, display_order)
);

CREATE TABLE public.aircraft_showcase_videos_link (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    aircraft_showcase_item_id uuid NOT NULL REFERENCES public.aircraft_showcase_items(id) ON DELETE CASCADE,
    video_gallery_item_id uuid NOT NULL REFERENCES public.video_gallery_items(id) ON DELETE CASCADE,
    display_order integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_showcase_video_link UNIQUE (aircraft_showcase_item_id, video_gallery_item_id),
    CONSTRAINT unique_showcase_video_order UNIQUE (aircraft_showcase_item_id, display_order)
);

-- H. Logbook Page
CREATE TABLE public.logbook_page_flight_stats_main_config (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    display_format text DEFAULT 'grid',
    columns_per_row_on_grid integer DEFAULT 3,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.logbook_displayed_stat_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    main_config_id uuid NOT NULL REFERENCES public.logbook_page_flight_stats_main_config(id) ON DELETE CASCADE,
    label_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    value_source_definition_jsonb jsonb NOT NULL,
    value_prefix_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    value_suffix_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    icon_name text,
    tooltip_text_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    display_order integer NOT NULL DEFAULT 0,
    is_visible boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.logbook_page_recent_flights_config (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    number_to_display_initially integer DEFAULT 10,
    default_sort_column text DEFAULT 'flight_date',
    default_sort_direction text DEFAULT 'DESC' CHECK (default_sort_direction IN ('ASC', 'DESC')),
    visible_columns_jsonb jsonb,
    allow_user_sorting_and_filtering boolean DEFAULT true,
    enable_search_bar boolean DEFAULT true,
    pagination_items_per_page integer DEFAULT 25,
    link_to_full_logbook_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.logbook_page_aircraft_experience_config (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    group_by_field text NOT NULL,
    displayed_metrics_jsonb jsonb NOT NULL,
    chart_type_preference text DEFAULT 'table_view',
    minimum_hours_for_display numeric,
    order_by_metric text,
    order_direction text CHECK (order_direction IN ('ASC', 'DESC')),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.logbook_page_main_charts_config (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    default_chart_layout_columns integer DEFAULT 1,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.logbook_chart_definitions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    main_charts_config_id uuid NOT NULL REFERENCES public.logbook_page_main_charts_config(id) ON DELETE CASCADE,
    chart_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    chart_type text NOT NULL,
    data_query_definition_jsonb jsonb NOT NULL,
    x_axis_label_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    y_axis_label_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    color_palette_name_or_custom_hex text,
    order_in_layout integer NOT NULL DEFAULT 0,
    is_visible_by_default boolean DEFAULT true,
    chart_height text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- I. Projects Page
CREATE TABLE public.projects_page_featured_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    layout_style text DEFAULT 'grid_cards',
    default_items_to_show integer,
    link_to_full_portfolio_text_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    link_to_full_portfolio_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.project_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    slug text NOT NULL UNIQUE,
    short_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    long_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    cover_image_url text,
    banner_image_url text,
    video_url text,
    project_live_url text,
    source_code_repository_url text,
    status_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    start_date date,
    completion_date date,
    tags_or_keywords text[],
    client_name_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    role_in_project_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    is_featured_on_projects_page boolean DEFAULT false,
    order_in_featured integer,
    overall_order integer,
    last_updated timestamptz DEFAULT now(),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.project_photo_links (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    project_item_id uuid NOT NULL REFERENCES public.project_items(id) ON DELETE CASCADE,
    photo_gallery_item_id uuid NOT NULL REFERENCES public.photo_gallery_items(id) ON DELETE CASCADE,
    display_order integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_project_photo_link UNIQUE (project_item_id, photo_gallery_item_id),
    CONSTRAINT unique_project_photo_order UNIQUE (project_item_id, display_order)
);

CREATE TABLE public.technology_stack_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    logo_url text,
    website_url text,
    category_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    proficiency_level integer,
    display_order integer NOT NULL DEFAULT 0,
    is_highlighted_on_projects_page boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_user_tech_name UNIQUE (user_id, name)
);

CREATE TABLE public.project_technology_links (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    project_item_id uuid NOT NULL REFERENCES public.project_items(id) ON DELETE CASCADE,
    technology_stack_item_id uuid NOT NULL REFERENCES public.technology_stack_items(id) ON DELETE RESTRICT,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT unique_project_tech_link UNIQUE (project_item_id, technology_stack_item_id)
);

CREATE TABLE public.projects_page_tech_stack_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    display_type text DEFAULT 'logo_grid',
    max_items_to_show integer,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.projects_page_research_section_main (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    section_title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    section_description_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    display_style text DEFAULT 'list',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.research_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    research_section_id uuid NOT NULL REFERENCES public.projects_page_research_section_main(id) ON DELETE CASCADE,
    title_snippet_id uuid NOT NULL REFERENCES public.content_snippets(id) ON DELETE RESTRICT,
    authors text[],
    publication_venue_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    publication_date date,
    abstract_markdown_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    full_text_url_or_doi text,
    pdf_document_url text,
    keywords text[],
    linked_project_id uuid REFERENCES public.project_items(id) ON DELETE SET NULL,
    status_snippet_id uuid REFERENCES public.content_snippets(id) ON DELETE SET NULL,
    citation_details_jsonb jsonb,
    research_area_tags text[],
    display_order integer NOT NULL DEFAULT 0,
    is_featured boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
); 