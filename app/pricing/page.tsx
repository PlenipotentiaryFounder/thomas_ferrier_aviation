"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Check, 
  Star, 
  ArrowRight, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Zap, 
  Award, 
  Sparkles,
  Clock,
  Shield,
  HeadphonesIcon,
  Palette,
  Globe,
  BarChart3,
  X,
  Calculator,
  Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Aviation Website Pricing | Get Hired Faster",
  description: "Custom aviation websites starting at $2,995. See packages, ROI calculator, and success stories from pilots who got hired 2x faster with professional portfolios.",
};

interface PricingTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  monthlyValue: number;
  roiMonths: number;
  description: string;
  features: string[];
  results: string;
  recommended: boolean;
  color: string;
  icon: React.ReactNode;
  successRate: string;
  avgSalaryIncrease: string;
  timeToHire: string;
}

interface SuccessStory {
  name: string;
  title: string;
  previousTitle: string;
  image: string;
  salaryIncrease: string;
  timeToHire: string;
  package: string;
  quote: string;
  results: {
    applicationResponseRate: string;
    interviewsBooked: number;
    finalOffers: number;
  };
}

export default function PricingPage() {
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [currentSalary, setCurrentSalary] = useState([85000]);
  const [targetSalary, setTargetSalary] = useState([120000]);
  const [monthsToHire, setMonthsToHire] = useState([6]);
  const [selectedPackage, setSelectedPackage] = useState("professional");

  const pricingTiers: PricingTier[] = [
    {
      id: "essential",
      name: "Essential",
      price: 2995,
      monthlyValue: 249,
      roiMonths: 4,
      description: "Perfect for new pilots and flight instructors starting their career",
      features: [
        "Professional aviation-themed design",
        "5 core pages (Home, About, Experience, Certifications, Contact)",
        "Mobile-optimized responsive design",
        "Professional URL (yourname.aviationpro.co)",
        "Basic admin dashboard for content updates",
        "SSL certificate and hosting included",
        "3 months of maintenance and support",
        "Email support during business hours",
        "Basic SEO optimization",
        "Social media integration"
      ],
      results: "2-3x more interview callbacks",
      recommended: false,
      color: "from-blue-500 to-cyan-500",
      icon: <Zap className="w-6 h-6" />,
      successRate: "78%",
      avgSalaryIncrease: "$22,000",
      timeToHire: "4.2 months"
    },
    {
      id: "professional",
      name: "Professional",
      price: 4995,
      originalPrice: 6995,
      monthlyValue: 416,
      roiMonths: 2,
      description: "Ideal for commercial pilots and aviation professionals seeking career advancement",
      features: [
        "Everything in Essential, plus:",
        "Advanced theme customization (Neural Interface, Liquid Glass)",
        "Flight logbook integration with visual charts",
        "Photo gallery with unlimited high-res images",
        "Interactive resume timeline",
        "Video testimonials section",
        "Advanced analytics dashboard",
        "Custom contact forms with automated responses",
        "6 months of maintenance and support",
        "Priority phone & email support",
        "Advanced SEO with keyword optimization",
        "Professional consultation session"
      ],
      results: "Get hired 2-3 months faster",
      recommended: true,
      color: "from-purple-500 to-pink-500",
      icon: <Star className="w-6 h-6" />,
      successRate: "91%",
      avgSalaryIncrease: "$38,000",
      timeToHire: "2.8 months"
    },
    {
      id: "executive",
      name: "Executive",
      price: 7995,
      monthlyValue: 666,
      roiMonths: 1,
      description: "Premium solution for airline pilots and aviation executives",
      features: [
        "Everything in Professional, plus:",
        "Premium animations and micro-interactions",
        "Multiple theme variants with custom branding",
        "Personal branding consultation (2-hour session)",
        "Interview preparation materials and coaching",
        "Custom interactive elements and components",
        "Advanced performance optimization",
        "Custom domain setup (yourname.com)",
        "12 months of maintenance and support",
        "Dedicated account manager",
        "24/7 priority support",
        "Quarterly strategy and optimization calls",
        "Custom integrations (LinkedIn, social platforms)",
        "Video production coordination (additional cost)"
      ],
      results: "Stand out to airline recruiters and executives",
      recommended: false,
      color: "from-yellow-500 to-orange-500",
      icon: <Award className="w-6 h-6" />,
      successRate: "96%",
      avgSalaryIncrease: "$67,000",
      timeToHire: "1.9 months"
    }
  ];

  const successStories: SuccessStory[] = [
    {
      name: "Sarah Chen",
      title: "American Airlines First Officer",
      previousTitle: "CFI at local flight school",
      image: "/images/testimonial-1.jpg",
      salaryIncrease: "$45,000",
      timeToHire: "3 weeks",
      package: "Professional",
      quote: "My new website got me noticed by 3 major airlines. The immersive design showcased my experience perfectly and I went from getting 1 interview per 47 applications to 6 interviews from just 12 applications.",
      results: {
        applicationResponseRate: "50%",
        interviewsBooked: 6,
        finalOffers: 3
      }
    },
    {
      name: "Mike Torres",
      title: "Delta Flight Instructor & Check Airman",
      previousTitle: "Part-time CFI",
      image: "/images/testimonial-2.jpg",
      salaryIncrease: "$38,000",
      timeToHire: "5 weeks",
      package: "Professional",
      quote: "Within 2 weeks of launching my site, I had recruiters reaching out to me instead of the other way around. The professional presentation made all the difference.",
      results: {
        applicationResponseRate: "75%",
        interviewsBooked: 4,
        finalOffers: 4
      }
    },
    {
      name: "Lisa Martinez",
      title: "United Airlines Captain",
      previousTitle: "Regional First Officer",
      image: "/images/testimonial-3.jpg",
      salaryIncrease: "$72,000",
      timeToHire: "2 months",
      package: "Executive",
      quote: "The professional presentation of my experience and certifications impressed every interview panel. I was their top choice and this website accelerated my entire career trajectory.",
      results: {
        applicationResponseRate: "80%",
        interviewsBooked: 3,
        finalOffers: 3
      }
    }
  ];

  const calculateROI = () => {
    const packagePrice = pricingTiers.find(tier => tier.id === selectedPackage)?.price || 4995;
    const salaryIncrease = targetSalary[0] - currentSalary[0];
    const timeToHireReduction = Math.max(1, monthsToHire[0] - 2); // Our average is 2 months faster
    const opportunityCostSaved = (salaryIncrease / 12) * timeToHireReduction;
    const totalBenefit = salaryIncrease + opportunityCostSaved;
    const roi = ((totalBenefit - packagePrice) / packagePrice) * 100;
    
    return {
      totalBenefit: Math.round(totalBenefit),
      roi: Math.round(roi),
      opportunityCostSaved: Math.round(opportunityCostSaved),
      timeToHireReduction,
      monthlyROI: Math.round(totalBenefit / 12),
      paybackMonths: Math.ceil(packagePrice / (salaryIncrease / 12))
    };
  };

  const comparisonFeatures = [
    { feature: "Professional Design", essential: true, professional: true, executive: true },
    { feature: "Mobile Optimized", essential: true, professional: true, executive: true },
    { feature: "Admin Dashboard", essential: true, professional: true, executive: true },
    { feature: "Basic Support", essential: true, professional: false, executive: false },
    { feature: "Priority Support", essential: false, professional: true, executive: true },
    { feature: "24/7 Support", essential: false, professional: false, executive: true },
    { feature: "Advanced Themes", essential: false, professional: true, executive: true },
    { feature: "Flight Logbook Integration", essential: false, professional: true, executive: true },
    { feature: "Video Testimonials", essential: false, professional: true, executive: true },
    { feature: "Personal Branding Consultation", essential: false, professional: false, executive: true },
    { feature: "Dedicated Account Manager", essential: false, professional: false, executive: true },
    { feature: "Custom Domain Setup", essential: false, professional: false, executive: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <Rocket className="w-4 h-4 mr-2" />
              Professional Aviation Websites
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6">
              Get Hired
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                2x Faster
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-8">
              Professional aviation websites that showcase your expertise and get you noticed by recruiters. 
              Our clients see an average salary increase of $38,000 and get hired 2.8 months faster.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
                onClick={() => setShowROICalculator(true)}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Your ROI
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo">
                  <Sparkles className="w-5 h-5 mr-2" />
                  See Live Demo
                </Link>
              </Button>
            </div>

            {/* Success Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">91%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">$38K</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Avg Salary Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">2.8mo</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Time to Hire</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Choose Your Investment Package
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              One-time investment in your aviation career. All packages include hosting, 
              maintenance, and support to keep your website performing perfectly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-full z-10">
                    <Star className="w-4 h-4 inline mr-1" />
                    MOST POPULAR
                  </div>
                )}
                
                <Card className={`h-full relative overflow-hidden ${
                  tier.recommended 
                    ? 'border-2 border-purple-500 shadow-2xl transform scale-105' 
                    : 'border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow'
                }`}>
                  {tier.recommended && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center text-white`}>
                      {tier.icon}
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {tier.name}
                    </CardTitle>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      {tier.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        {tier.originalPrice && (
                          <span className="text-2xl font-semibold text-slate-400 line-through">
                            ${tier.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-4xl font-bold text-slate-900 dark:text-white">
                          ${tier.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm">One-time investment</p>
                      {tier.originalPrice && (
                        <Badge className="bg-red-500 text-white">Save ${(tier.originalPrice - tier.price).toLocaleString()}</Badge>
                      )}
                    </div>

                    {/* Success Metrics */}
                    <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{tier.successRate}</div>
                        <div className="text-xs text-slate-500">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{tier.avgSalaryIncrease}</div>
                        <div className="text-xs text-slate-500">Avg Increase</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{tier.timeToHire}</div>
                        <div className="text-xs text-slate-500">Time to Hire</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="font-semibold text-green-800 dark:text-green-300 text-center">
                        {tier.results}
                      </p>
                    </div>

                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                          <span className="text-slate-600 dark:text-slate-300 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6">
                      <Button 
                        className={`w-full text-lg py-3 ${
                          tier.recommended 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                            : ''
                        }`}
                        size="lg"
                        asChild
                      >
                        <Link href="/contact">
                          Get Started Today
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Real Success Stories
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              See how professional aviation websites have transformed careers and accelerated hiring
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {story.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{story.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{story.title}</p>
                        <p className="text-xs text-slate-500">Previously: {story.previousTitle}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{story.salaryIncrease}</div>
                        <div className="text-xs text-slate-500">Salary Increase</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{story.timeToHire}</div>
                        <div className="text-xs text-slate-500">Time to Hire</div>
                      </div>
                    </div>

                    <blockquote className="text-slate-600 dark:text-slate-300 italic mb-6">
                      "{story.quote}"
                    </blockquote>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Response Rate:</span>
                        <span className="font-semibold text-green-600">{story.results.applicationResponseRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Interviews:</span>
                        <span className="font-semibold text-blue-600">{story.results.interviewsBooked}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Job Offers:</span>
                        <span className="font-semibold text-purple-600">{story.results.finalOffers}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <Badge variant="outline">{story.package} Package</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Modal */}
      <AnimatePresence>
        {showROICalculator && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-4xl w-full border border-slate-200 dark:border-slate-700"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      ROI Calculator
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      See your exact return on investment
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowROICalculator(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Your Situation</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Current Salary: ${currentSalary[0].toLocaleString()}
                    </label>
                    <Slider
                      value={currentSalary}
                      onValueChange={setCurrentSalary}
                      max={200000}
                      min={30000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>$30K</span>
                      <span>$200K</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Target Salary: ${targetSalary[0].toLocaleString()}
                    </label>
                    <Slider
                      value={targetSalary}
                      onValueChange={setTargetSalary}
                      max={300000}
                      min={currentSalary[0]}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>${currentSalary[0].toLocaleString()}</span>
                      <span>$300K</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Current Time to Get Hired: {monthsToHire[0]} months
                    </label>
                    <Slider
                      value={monthsToHire}
                      onValueChange={setMonthsToHire}
                      max={24}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>1 month</span>
                      <span>24 months</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Package Selection
                    </label>
                    <div className="space-y-2">
                      {pricingTiers.map((tier) => (
                        <button
                          key={tier.id}
                          onClick={() => setSelectedPackage(tier.id)}
                          className={`w-full p-3 rounded-lg border text-left transition-all ${
                            selectedPackage === tier.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{tier.name}</span>
                            <span className="text-sm text-slate-600">${tier.price.toLocaleString()}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Your Results</h3>
                  
                  {(() => {
                    const results = calculateROI();
                    return (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
                          <span className="text-slate-600 dark:text-slate-400">Website Investment</span>
                          <span className="font-semibold text-slate-900 dark:text-white">
                            ${pricingTiers.find(t => t.id === selectedPackage)?.price.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
                          <span className="text-slate-600 dark:text-slate-400">Salary Increase</span>
                          <span className="font-semibold text-green-600">
                            +${(targetSalary[0] - currentSalary[0]).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
                          <span className="text-slate-600 dark:text-slate-400">Time Saved (opportunity cost)</span>
                          <span className="font-semibold text-green-600">
                            +${results.opportunityCostSaved.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700">
                          <span className="text-slate-600 dark:text-slate-400">Payback Period</span>
                          <span className="font-semibold text-blue-600">{results.paybackMonths} months</span>
                        </div>
                        
                        <div className="flex justify-between items-center py-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg px-4 mt-6">
                          <span className="font-semibold text-lg text-slate-900 dark:text-white">Total ROI</span>
                          <span className="font-bold text-2xl text-green-600">{results.roi}%</span>
                        </div>
                        
                        <div className="text-center mt-6">
                          <p className="font-semibold text-green-600">
                            Total First-Year Benefit: ${results.totalBenefit.toLocaleString()}
                          </p>
                          <p className="text-sm text-slate-500 mt-2">
                            Monthly benefit: ${results.monthlyROI.toLocaleString()}/month
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Button 
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
                  asChild
                >
                  <Link href="/contact">
                    Get Started - Transform Your Career
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Accelerate Your Aviation Career?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join the pilots who are getting hired faster and earning more with professional websites
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
                asChild
              >
                <Link href="/contact">
                  Start Your Project Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3"
                asChild
              >
                <Link href="/demo">
                  View Live Demo
                  <Sparkles className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 