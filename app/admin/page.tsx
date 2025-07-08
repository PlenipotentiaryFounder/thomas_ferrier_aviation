"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  FileText, 
  Palette, 
  BarChart3, 
  Upload, 
  Settings, 
  Eye, 
  Edit3,
  Image,
  Users,
  Calendar,
  TrendingUp,
  Globe,
  Zap,
  Star,
  ChevronRight,
  Plus,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PageInfo {
  page_identifier: string;
  admin_display_title: string;
  last_updated: string;
  status: 'published' | 'draft' | 'scheduled';
  views: number;
}

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  averageSessionDuration: string;
  topPages: Array<{ page: string; views: number; change: number }>;
  recentVisitors: Array<{ location: string; time: string; page: string }>;
  performanceMetrics: {
    loadTime: number;
    mobileScore: number;
    desktopScore: number;
  };
}

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: string;
  isPremium: boolean;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("neural-interface");

  // Mock data - would come from API/database
  const editablePages: PageInfo[] = [
    {
      page_identifier: 'home',
      admin_display_title: 'Homepage',
      last_updated: '2024-01-15',
      status: 'published',
      views: 1247
    },
    {
      page_identifier: 'about',
      admin_display_title: 'About Page',
      last_updated: '2024-01-14',
      status: 'published',
      views: 823
    },
    {
      page_identifier: 'experience',
      admin_display_title: 'Flight Experience',
      last_updated: '2024-01-13',
      status: 'published',
      views: 692
    },
    {
      page_identifier: 'certifications',
      admin_display_title: 'Certifications & Ratings',
      last_updated: '2024-01-12',
      status: 'draft',
      views: 456
    },
    {
      page_identifier: 'gallery',
      admin_display_title: 'Photo Gallery',
      last_updated: '2024-01-11',
      status: 'published',
      views: 334
    }
  ];

  const analyticsData: AnalyticsData = {
    totalViews: 4892,
    uniqueVisitors: 3247,
    averageSessionDuration: "3:42",
    topPages: [
      { page: "Homepage", views: 1247, change: 12 },
      { page: "About", views: 823, change: -3 },
      { page: "Experience", views: 692, change: 8 },
      { page: "Certifications", views: 456, change: 15 },
      { page: "Gallery", views: 334, change: -1 }
    ],
    recentVisitors: [
      { location: "Phoenix, AZ", time: "2 mins ago", page: "Homepage" },
      { location: "Dallas, TX", time: "5 mins ago", page: "Experience" },
      { location: "Denver, CO", time: "8 mins ago", page: "About" },
      { location: "Atlanta, GA", time: "12 mins ago", page: "Certifications" },
      { location: "Los Angeles, CA", time: "15 mins ago", page: "Gallery" }
    ],
    performanceMetrics: {
      loadTime: 1.2,
      mobileScore: 96,
      desktopScore: 98
    }
  };

  const themeOptions: ThemeOption[] = [
    {
      id: "neural-interface",
      name: "Neural Interface",
      description: "Brain-computer interface aesthetics with blue accents",
      preview: "bg-gradient-to-br from-blue-900 to-slate-900",
      category: "Premium",
      isPremium: true
    },
    {
      id: "liquid-glass",
      name: "Liquid Glass",
      description: "Apple's revolutionary interface material",
      preview: "bg-gradient-to-br from-cyan-900 to-blue-900",
      category: "Premium",
      isPremium: true
    },
    {
      id: "holographic",
      name: "Holographic",
      description: "Volumetric holographic displays",
      preview: "bg-gradient-to-br from-purple-900 to-pink-900",
      category: "Premium",
      isPremium: true
    },
    {
      id: "professional",
      name: "Professional",
      description: "Clean, modern business design",
      preview: "bg-gradient-to-br from-slate-800 to-gray-900",
      category: "Standard",
      isPremium: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'scheduled': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredPages = editablePages.filter(page =>
    page.admin_display_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome back, Captain! ✈️
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Manage your professional aviation portfolio
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview Site
              </Button>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4" />
                Add Content
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Views</p>
                  <p className="text-2xl font-bold">{analyticsData.totalViews.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Unique Visitors</p>
                  <p className="text-2xl font-bold">{analyticsData.uniqueVisitors.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Avg. Session</p>
                  <p className="text-2xl font-bold">{analyticsData.averageSessionDuration}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Performance</p>
                  <p className="text-2xl font-bold">{analyticsData.performanceMetrics.mobileScore}/100</p>
                </div>
                <Zap className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="themes" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Themes
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Media
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Analytics Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Page Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.topPages.map((page, index) => (
                        <div key={page.page} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                              {index + 1}
                            </div>
                            <span className="font-medium">{page.page}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {page.views} views
                            </span>
                            <Badge variant={page.change > 0 ? "default" : "secondary"} className="text-xs">
                              {page.change > 0 ? '+' : ''}{page.change}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Visitors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Recent Visitors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analyticsData.recentVisitors.map((visitor, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{visitor.location}</p>
                            <p className="text-xs text-slate-500">{visitor.page}</p>
                          </div>
                          <p className="text-xs text-slate-400">{visitor.time}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Content Management Tab */}
            <TabsContent value="content" className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search pages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Page
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPages.map((page) => (
                  <motion.div
                    key={page.page_identifier}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card className="cursor-pointer transition-all duration-200 group-hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white">
                                {page.admin_display_title}
                              </h3>
                              <p className="text-sm text-slate-500">
                                {page.views} views
                              </p>
                            </div>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(page.status)}`} />
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className="text-xs">
                            {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                          </Badge>
                          <span className="text-xs text-slate-400">
                            Updated {page.last_updated}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Theme Customization Tab */}
            <TabsContent value="themes" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Current Theme</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Choose the perfect theme that represents your professional brand
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themeOptions.map((theme) => (
                  <motion.div
                    key={theme.id}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card className={`cursor-pointer transition-all duration-200 ${
                      selectedTheme === theme.id 
                        ? 'border-blue-500 shadow-lg' 
                        : 'hover:shadow-md'
                    }`}>
                      <CardContent className="p-6">
                        <div className={`w-full h-32 rounded-lg mb-4 ${theme.preview} relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <span className="text-white font-medium">{theme.name}</span>
                          </div>
                          {theme.isPremium && (
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-yellow-500 text-black">
                                <Star className="w-3 h-3 mr-1" />
                                Premium
                              </Badge>
                            </div>
                          )}
                          {selectedTheme === theme.id && (
                            <div className="absolute bottom-2 left-2">
                              <Badge className="bg-green-500">Active</Badge>
                            </div>
                          )}
                        </div>
                        
                        <h4 className="font-semibold mb-2">{theme.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          {theme.description}
                        </p>
                        
                        <Button 
                          className="w-full" 
                          variant={selectedTheme === theme.id ? "default" : "outline"}
                          onClick={() => setSelectedTheme(theme.id)}
                        >
                          {selectedTheme === theme.id ? 'Active Theme' : 'Select Theme'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Media Management Tab */}
            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Media Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-12 text-center">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload Your Media</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Drag and drop your photos, videos, and documents here
                    </p>
                    <Button>Choose Files</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Website Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Domain Settings</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Your website is currently accessible at:
                    </p>
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                      <code className="text-sm">https://yourname.aviationpro.co</code>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">SEO Settings</h4>
                    <Button variant="outline">Configure SEO</Button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Analytics</h4>
                    <Button variant="outline">View Full Analytics</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </motion.div>
      </div>
    </div>
  );
} 