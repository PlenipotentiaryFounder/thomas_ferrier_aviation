import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'; // Ensure this path is correct

export async function GET(
  request: NextRequest,
  { params }: { params: { pageIdentifier: string } }
) {
  const supabase = await createClient();
  const { pageIdentifier } = params;

  // TODO: Get current authenticated user_id dynamically
  // For now, using the one we've used throughout seeding
  const userId = '6ea7ba36-e922-4344-af0a-46507ba55e24'; 

  try {
    // 1. Fetch page_metadata and its admin_ui_schema_definition
    // The page_identifier in the URL (e.g., 'about') might be slightly different from
    // the one stored in page_metadata (e.g., 'about_page'). 
    // We'll need a mapping or convention if they differ. For now, assume 'about_page' for 'about'.
    const dbPageIdentifier = pageIdentifier === 'about' ? 'about_page' : pageIdentifier;

    const { data: pageMeta, error: metaError } = await supabase
      .from('page_metadata')
      .select('admin_ui_schema_definition, admin_display_title')
      .eq('user_id', userId)
      .eq('page_identifier', dbPageIdentifier)
      .single();

    if (metaError) {
      console.error('Error fetching page metadata:', metaError);
      return NextResponse.json({ error: `Page metadata not found for identifier: ${dbPageIdentifier}. Detail: ${metaError.message}` }, { status: 404 });
    }
    if (!pageMeta) {
      return NextResponse.json({ error: `Page metadata not found for identifier: ${dbPageIdentifier}. No data.` }, { status: 404 });
    }
    if (!pageMeta.admin_ui_schema_definition) {
      return NextResponse.json({ error: `Admin UI schema not defined for page: ${dbPageIdentifier}` }, { status: 404 });
    }

    const schema = pageMeta.admin_ui_schema_definition as any; // Cast to any for easier access
    const pageAdminTitle = pageMeta.admin_display_title || `Edit ${pageIdentifier}`;
    
    const populatedSections = [];

    for (const sectionSchema of schema.sections) {
      // For now, we only implement for single-record sections (not lists)
      // and for the 'about_hero' section as defined in the 'about_page' metadata.
      if (sectionSchema.sourceTable && !sectionSchema.isList && sectionSchema.id === 'about_hero') { 
        const { data: sectionData, error: sectionError } = await supabase
          .from(sectionSchema.sourceTable)
          .select('*')
          .eq('user_id', userId) 
          .single();

        if (sectionError && sectionError.code !== 'PGRST116') { // PGRST116: single row not found, which is acceptable for new sections
          console.warn(`Error fetching data for section ${sectionSchema.id} (table ${sectionSchema.sourceTable}): ${sectionError.message}`);
        }

        const populatedFields = [];
        if (sectionSchema.fields && Array.isArray(sectionSchema.fields)) {
          for (const fieldSchema of sectionSchema.fields) {
            let value = sectionData ? sectionData[fieldSchema.name] : null;
            let snippetKey = null; 
            let originalSnippetId = sectionData ? sectionData[fieldSchema.name] : null;

            if ((fieldSchema.type === 'snippet' || fieldSchema.type === 'snippet_markdown') && originalSnippetId) {
              const { data: snippet, error: snippetError } = await supabase
                .from('content_snippets')
                .select('value_markdown, snippet_key')
                .eq('id', originalSnippetId)
                .eq('user_id', userId)
                .single();
              
              if (snippet) {
                value = snippet.value_markdown;
                snippetKey = snippet.snippet_key;
              } else {
                value = ''; 
                console.warn(`Snippet not found for ID: ${originalSnippetId} (field: ${fieldSchema.name})`);
              }
            }
            populatedFields.push({ ...fieldSchema, value, snippetKey, originalSnippetId });
          }
        }
        populatedSections.push({ ...sectionSchema, fields: populatedFields, _debug_sectionData: sectionData }); // Added debug data
      } else {
        // For now, just pass through schema for unhandled section types or non-matching IDs
        // console.log(`Skipping section (not 'about_hero' or isList/no sourceTable): ${sectionSchema.id}`);
        populatedSections.push(sectionSchema); 
      }
    }

    return NextResponse.json({ 
      pageIdentifier: pageIdentifier,
      pageAdminTitle: pageAdminTitle,
      // Return the schema definition augmented with the actual content values.
      schema: { ...schema, sections: populatedSections } 
    });

  } catch (error: any) {
    console.error('Generic error in page-content API:', error);
    return NextResponse.json({ error: 'Failed to fetch page content.', details: error.message }, { status: 500 });
  }
} 