'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getDesignThemes, generateThemeCSS, type DesignTheme } from '@/lib/theme-system'
import HeroSleek from '@/components/dynamic/variants/hero-sleek'
import HeroProfessional from '@/components/dynamic/variants/hero-professional'
import { Plane, Palette, Eye, Settings, Sparkles } from 'lucide-react'

export default function ThemePreviewPage() {
  const [themes, setThemes] = useState<DesignTheme[]>([])
  const [selectedTheme, setSelectedTheme] = useState<DesignTheme | null>(null)
  const [currentVariant, setCurrentVariant] = useState<'sleek' | 'professional'>('sleek')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    async function loadThemes() {
      const themesData = await getDesignThemes()
      setThemes(themesData)
      if (themesData.length > 0) {
        setSelectedTheme(themesData[0])
      }
    }
    loadThemes()
  }, [])

  useEffect(() => {
    if (!selectedTheme) return

    const themeCSS = generateThemeCSS(selectedTheme, isDarkMode)
    
    const existingThemeStyle = document.getElementById('preview-theme-styles')
    if (existingThemeStyle) {
      existingThemeStyle.remove()
    }

    const styleElement = document.createElement('style')
    styleElement.id = 'preview-theme-styles'
    styleElement.textContent = themeCSS
    document.head.appendChild(styleElement)

    return () => {
      const themeStyle = document.getElementById('preview-theme-styles')
      if (themeStyle) {
        themeStyle.remove()
      }
    }
  }, [selectedTheme, isDarkMode])

  const sampleHeroConfig = {
    headline: "ELITE AVIATION",
    subheadline: "Professional Flight Training",
    description: "Transform your aviation dreams into reality with our world-class flight training programs. From private pilot certification to commercial operations, we provide the expertise and modern aircraft you need to soar.",
    primaryAction: { text: "Start Training", href: "/training" },
    secondaryAction: { text: "Learn More", href: "/about" },
    backgroundMedia: {
      type: "image" as const,
      url: "/images/aircraft-sunset.jpg"
    },
    stats: [
      { value: "500+", label: "Students Trained" },
      { value: "98%", label: "Pass Rate" },
      { value: "15", label: "Aircraft Fleet" },
      { value: "25", label: "Years Experience" }
    ]
  }

  const sampleVariant = {
    responsive_config: {
      mobile_text_size: "responsive",
      mobile_spacing: "compressed", 
      mobile_layout: "stacked",
      breakpoints: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" }
    },
    animation_config: {
      entrance: "slide_up_fade",
      hover_effects: "scale_glow",
      parallax: true,
      stagger_children: true
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Aviation Theme System</h1>
                <p className="text-sm text-muted-foreground">Professional aviation website themes</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant={isDarkMode ? "default" : "outline"}
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? "Light" : "Dark"} Mode
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Theme Selector */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span>Design Theme</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedTheme?.theme_key || ''}
                  onValueChange={(value) => {
                    const theme = themes.find(t => t.theme_key === value)
                    if (theme) setSelectedTheme(theme)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((theme) => (
                      <SelectItem key={theme.id} value={theme.theme_key}>
                        <div className="flex items-center space-x-2">
                          <span>{theme.theme_name}</span>
                          {theme.is_premium && (
                            <Badge variant="secondary" className="text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Pro
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedTheme && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {selectedTheme.description}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Component Variant */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Component Variant</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={currentVariant}
                  onValueChange={(value: 'sleek' | 'professional') => setCurrentVariant(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sleek">Sleek Modern</SelectItem>
                    <SelectItem value="professional">Professional Classic</SelectItem>
                  </SelectContent>
                </Select>
                
                <p className="text-xs text-muted-foreground mt-2">
                  {currentVariant === 'sleek' 
                    ? 'Ultra-modern with aerospace elements'
                    : 'Trustworthy and authoritative design'
                  }
                </p>
              </CardContent>
            </Card>

            {/* Theme Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Theme Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTheme && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Category:</span>
                      <Badge variant="outline">{selectedTheme.theme_category}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Typography:</span>
                      <span className="font-medium text-xs">
                        {selectedTheme.typography_schemes.primary.split(',')[0]}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Animation:</span>
                      <span className="text-xs">{selectedTheme.animation_schemes.speed}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1">
        <Tabs defaultValue="hero" className="w-full">
          <div className="border-b">
            <div className="container mx-auto px-6">
              <TabsList className="h-auto p-0 bg-transparent">
                <TabsTrigger value="hero" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Hero Components
                </TabsTrigger>
                <TabsTrigger value="features" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Feature Sections
                </TabsTrigger>
                <TabsTrigger value="testimonials" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Testimonials
                </TabsTrigger>
                <TabsTrigger value="contact" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
                  Contact Forms
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="hero" className="mt-0">
            <div className="min-h-screen">
              {currentVariant === 'sleek' ? (
                <HeroSleek 
                  config={{ content: sampleHeroConfig }}
                  variant={sampleVariant}
                  themeConfig={selectedTheme}
                />
              ) : (
                <HeroProfessional
                  config={{ content: sampleHeroConfig }}
                  variant={sampleVariant}
                  themeConfig={selectedTheme}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-0">
            <div className="container mx-auto px-6 py-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Feature Component Previews</h2>
                <p className="text-muted-foreground">Coming soon - Multiple feature section variants</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plane className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Feature {i}</h3>
                      <p className="text-sm text-muted-foreground">Sample feature description</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="testimonials" className="mt-0">
            <div className="container mx-auto px-6 py-20">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Testimonial Component Previews</h2>
                <p className="text-muted-foreground">Coming soon - Aviation-themed testimonial layouts</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-0">
            <div className="container mx-auto px-6 py-20">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Contact Form Previews</h2>
                <p className="text-muted-foreground">Coming soon - Professional contact form variants</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 