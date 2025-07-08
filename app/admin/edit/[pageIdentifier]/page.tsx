"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // To get [pageIdentifier]

// Define a basic type for the expected API response structure
// This should evolve as the API response gets more defined
interface PageContentData {
  pageIdentifier: string;
  pageAdminTitle: string;
  schema: {
    sections: Array<{
      id: string;
      title: string;
      fields?: Array<{
        name: string;
        label: string;
        type: string;
        value: any;
        snippetKey?: string | null;
        originalSnippetId?: string | null;
        // ... other schema props
      }>;
      // ... other section props
    }>;
    // ... other schema props
  };
}

export default function AdminEditPage() {
  const params = useParams();
  const pageIdentifier = params.pageIdentifier as string; // e.g., "about"

  const [pageData, setPageData] = useState<PageContentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pageIdentifier) {
      setIsLoading(true);
      setError(null);
      fetch(`/api/admin/page-content/${pageIdentifier}`)
        .then((res) => {
          if (!res.ok) {
            return res.json().then(errData => {
              throw new Error(errData.error || `HTTP error! status: ${res.status}`);
            });
          }
          return res.json();
        })
        .then((data: PageContentData) => {
          setPageData(data);
        })
        .catch((err) => {
          console.error("Failed to fetch page content:", err);
          setError(err.message || "Failed to load page data.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [pageIdentifier]);

  if (!pageIdentifier) {
    return <p>Page identifier not found in URL.</p>;
  }

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Edit: {isLoading ? pageIdentifier : (pageData?.pageAdminTitle || pageIdentifier)}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Editing content for page: <span className="font-medium">{pageIdentifier}</span>
        </p>
      </header>

      {isLoading && (
        <div className="flex justify-center items-center h-32">
          <p className="text-lg text-gray-500 dark:text-gray-400">Loading page editor...</p>
          {/* You can add a spinner component here */}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {!isLoading && !error && pageData && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-200">
            Page Data & Schema (Raw JSON Output for Debugging):
          </h3>
          <pre className="bg-white dark:bg-gray-700 p-3 rounded text-xs overflow-x-auto">
            {JSON.stringify(pageData, null, 2)}
          </pre>
        </div>
      )}
      
      {/* 
        The dynamic form renderer component will go here in the next step.
        It will take pageData.schema as a prop.
      */}
    </div>
  );
} 