// TODO: Fetch and display list of editable pages from page_metadata
// TODO: Implement authentication and authorization for this page

import Link from 'next/link';
import { createClient } from '@/utils/supabase/server'; // Server-side client

export const dynamic = 'force-dynamic'; // Force dynamic rendering

// Define a type for the items we expect from page_metadata
interface EditablePageInfo {
  page_identifier: string;
  admin_display_title: string;
  // We might also want to fetch the page's actual site path if available for display
}

async function getEditablePages(): Promise<EditablePageInfo[]> {
  const supabase = await createClient();
  // TODO: Get current authenticated user_id dynamically if RLS is user-specific for page_metadata visibility
  const userId = '6ea7ba36-e922-4344-af0a-46507ba55e24'; // Hardcoded for now

  const { data, error } = await supabase
    .from('page_metadata')
    .select('page_identifier, admin_display_title')
    .eq('user_id', userId)
    .not('admin_ui_schema_definition', 'is', null); // Only pages with an admin schema

  if (error) {
    console.error("Error fetching editable pages:", error);
    return [];
  }
  return data || [];
}

export default async function AdminDashboardPage() {
  const editablePages = await getEditablePages();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-300">Admin Dashboard</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Welcome to the admin panel. Select a page below to manage its content.
      </p>
      
      {editablePages.length > 0 ? (
        <div className="space-y-4">
          {editablePages.map((page) => {
            // Determine the URL slug for the edit page.
            // If page_identifier is 'about_page', the link should be to '/admin/edit/about'.
            // This might need a more robust mapping if identifiers vary more.
            const editSlug = page.page_identifier === 'about_page' ? 'about' : page.page_identifier;
            return (
              <div key={page.page_identifier} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700">
                <Link href={`/admin/edit/${editSlug}`} className="group">
                  <h3 className="text-xl font-medium text-blue-600 group-hover:text-blue-800 dark:text-blue-400 dark:group-hover:text-blue-300">
                    {page.admin_display_title || page.page_identifier}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Edit content for: {page.page_identifier} (URL: /admin/edit/{editSlug})
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No pages are currently configured for editing. Please set up the <code>admin_ui_schema_definition</code> in the <code>page_metadata</code> table.
        </p>
      )}
    </div>
  );
} 