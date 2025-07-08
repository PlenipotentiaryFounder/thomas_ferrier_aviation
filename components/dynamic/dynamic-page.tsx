'use client'

import React from 'react'
import { renderDynamicComponent, shouldRenderComponent } from './component-registry'
import { getThemeVariables } from '@/lib/dynamic-page'
import type { PageConfiguration } from '@/lib/dynamic-page'

interface DynamicPageProps {
  pageConfig: PageConfiguration
  isEditable?: boolean
  onComponentUpdate?: (instanceId: string, newConfig: any) => void
}

export function DynamicPage({ 
  pageConfig, 
  isEditable = false, 
  onComponentUpdate 
}: DynamicPageProps) {
  const { page, organization, theme } = pageConfig
  
  // Apply theme variables
  const themeVars = getThemeVariables(theme)
  
  // Filter visible components based on subscription and settings
  const visibleComponents = page.components.filter(component => 
    shouldRenderComponent(component, organization.subscription_tier || 'basic')
  )

  return (
    <div 
      className="dynamic-page"
      style={themeVars}
    >
      {/* Page metadata */}
      <head>
        <title>{page.title} - {organization.name}</title>
        {page.meta_description && (
          <meta name="description" content={page.meta_description} />
        )}
      </head>

      {/* Custom CSS for this page */}
      {page.custom_css && (
        <style dangerouslySetInnerHTML={{ __html: page.custom_css }} />
      )}

      {/* Render all components in order */}
      <div className="page-components">
        {visibleComponents.map((componentInstance) => 
          renderDynamicComponent(
            componentInstance,
            organization.id,
            isEditable,
            onComponentUpdate
          )
        )}
      </div>

      {/* Page editing overlay for admins */}
      {isEditable && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 border">
            <h3 className="font-semibold mb-2">Page Editor</h3>
            <div className="flex gap-2">
              <button 
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                onClick={() => {
                  console.log('Add component to page')
                  // This would open component library
                }}
              >
                Add Component
              </button>
              <button 
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                onClick={() => {
                  console.log('Page settings')
                  // This would open page settings
                }}
              >
                Page Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DynamicPage 