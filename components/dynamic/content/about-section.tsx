'use client'

import React from 'react'
import Image from 'next/image'
import type { DynamicComponentProps } from '../component-registry'

interface AboutSectionConfig {
  title: string
  content: string
  profileImage?: string
  imagePosition?: 'left' | 'right' | 'top' | 'none'
  showImage?: boolean
  backgroundColor?: string
  textAlignment?: 'left' | 'center' | 'right'
  containerMaxWidth?: string
  showBorder?: boolean
}

export const AboutSectionComponent: React.FC<DynamicComponentProps> = ({
  config,
  organizationId,
  isEditable = false,
  onUpdate,
  className = ''
}) => {
  const {
    title = 'About',
    content = 'Your story goes here...',
    profileImage,
    imagePosition = 'right',
    showImage = true,
    backgroundColor = 'transparent',
    textAlignment = 'left',
    containerMaxWidth = '1200px',
    showBorder = false
  } = config as AboutSectionConfig

  const handleContentEdit = (field: string, value: any) => {
    if (onUpdate) {
      onUpdate({
        ...config,
        [field]: value
      })
    }
  }

  const sectionStyles: React.CSSProperties = {
    backgroundColor,
    textAlign: textAlignment as any
  }

  const containerStyles: React.CSSProperties = {
    maxWidth: containerMaxWidth
  }

  const getLayoutClasses = () => {
    if (!showImage || !profileImage || imagePosition === 'none') {
      return 'single-column'
    }

    switch (imagePosition) {
      case 'left':
        return 'md:grid-cols-2 md:gap-8 items-center'
      case 'right':
        return 'md:grid-cols-2 md:gap-8 items-center'
      case 'top':
        return 'space-y-8'
      default:
        return 'md:grid-cols-2 md:gap-8 items-center'
    }
  }

  const ContentSection = () => (
    <div className={`about-content ${imagePosition === 'left' ? 'md:order-2' : ''}`}>
      <h2 
        className="text-3xl md:text-4xl font-bold mb-6"
        contentEditable={isEditable}
        suppressContentEditableWarning
        onBlur={(e) => handleContentEdit('title', e.target.textContent)}
      >
        {title}
      </h2>
      
      <div 
        className="prose prose-lg max-w-none"
        contentEditable={isEditable}
        suppressContentEditableWarning
        onBlur={(e) => handleContentEdit('content', e.target.innerHTML)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )

  const ImageSection = () => {
    if (!showImage || !profileImage) return null

    return (
      <div className={`about-image ${imagePosition === 'left' ? 'md:order-1' : ''}`}>
        <div className="relative">
          <Image
            src={profileImage}
            alt="Profile"
            width={400}
            height={400}
            className="rounded-lg shadow-lg object-cover w-full"
          />
          {isEditable && (
            <div className="absolute top-2 right-2">
              <button 
                className="bg-white/80 hover:bg-white px-2 py-1 rounded text-xs"
                onClick={() => {
                  // This would open an image picker
                  console.log('Change image')
                }}
              >
                Change Image
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <section 
      style={sectionStyles}
      className={`about-section py-16 ${showBorder ? 'border-t border-b border-gray-200' : ''} ${className}`}
    >
      <div className="container mx-auto px-4" style={containerStyles}>
        {imagePosition === 'top' ? (
          <div className="space-y-8">
            <ImageSection />
            <ContentSection />
          </div>
        ) : (
          <div className={`grid ${getLayoutClasses()}`}>
            <ContentSection />
            <ImageSection />
          </div>
        )}
      </div>

      {/* Edit overlay for admin mode */}
      {isEditable && (
        <div className="absolute top-4 right-4 z-10">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
            onClick={() => {
              // This would open a component editor modal
              console.log('Edit about section', config)
            }}
          >
            Edit About
          </button>
        </div>
      )}
    </section>
  )
}

export default AboutSectionComponent 