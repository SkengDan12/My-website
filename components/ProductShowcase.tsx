import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { 
  Thermometer, 
  Droplets, 
  BarChart4, 
  ShieldCheck, 
  Gauge, 
  Sprout, 
  Globe, 
  FileText,
  ZoomIn,
  Download,
  Share2,
  Settings,
  Heart,
  Info,
  Award
} from 'lucide-react';

// Import SVG assets
import sprayFoamSvg from '@/assets/products/spray-foam.svg';
import rigidFoamSvg from '@/assets/products/rigid-foam.svg';
import liquidSystemSvg from '@/assets/products/liquid-system.svg';
import commercialRoofingSvg from '@/assets/products/commercial-roofing.svg';
import residentialWallsSvg from '@/assets/products/residential-walls.svg';
import industrialFacilitySvg from '@/assets/products/industrial-facility.svg';
import coldStorageSvg from '@/assets/products/cold-storage.svg';
import marineApplicationSvg from '@/assets/products/marine-application.svg';
import waterproofingSvg from '@/assets/products/waterproofing.svg';
import secondaryContainmentSvg from '@/assets/products/secondary-containment.svg';
import roofRestorationSvg from '@/assets/products/roof-restoration.svg';

// Types
interface ProductSpec {
  name: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
}

interface ProductApplication {
  name: string;
  image: string;
  description: string;
}

interface ProductFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  specs: ProductSpec[];
  applications: ProductApplication[];
  technicalDocUrl: string;
  primaryColor: string;
  secondaryColor: string;
}

// Main component
const ProductShowcase = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerControls = useAnimation();
  
  // Product data
  const products: ProductFeature[] = [
    {
      id: 'spray-foam',
      title: 'ProFoam™ Spray System',
      subtitle: 'High-Performance Spray Polyurethane Foam Insulation',
      description: 'Our advanced closed-cell spray foam insulation provides superior thermal resistance and creates an air-tight seal. ProFoam™ significantly reduces energy costs, minimizes air infiltration, and improves indoor air quality for commercial and residential buildings.',
      image: sprayFoamSvg,
      specs: [
        { name: 'R-Value', value: 6.9, unit: 'per inch', icon: <Thermometer className="h-5 w-5 text-primary" /> },
        { name: 'Density', value: 2.0, unit: 'lb/ft³', icon: <Gauge className="h-5 w-5 text-primary" /> },
        { name: 'Closed Cell Content', value: '>90', unit: '%', icon: <Droplets className="h-5 w-5 text-primary" /> },
        { name: 'Compressive Strength', value: 25, unit: 'psi', icon: <BarChart4 className="h-5 w-5 text-primary" /> },
        { name: 'Water Vapor Permeance', value: 1.0, unit: 'perm', icon: <Droplets className="h-5 w-5 text-primary" /> },
        { name: 'Air Leakage', value: '<0.003', unit: 'L/s/m²', icon: <ShieldCheck className="h-5 w-5 text-primary" /> }
      ],
      applications: [
        {
          name: 'Commercial Roofing',
          image: commercialRoofingSvg,
          description: 'Provides excellent insulation and waterproofing for flat and low-slope commercial roofs.'
        },
        {
          name: 'Residential Walls',
          image: residentialWallsSvg,
          description: 'Creates an energy-efficient thermal envelope in residential wall cavities.'
        },
        {
          name: 'Industrial Facilities',
          image: industrialFacilitySvg,
          description: 'Helps maintain temperature control in manufacturing and storage facilities.'
        }
      ],
      technicalDocUrl: '#',
      primaryColor: '#ff9a00',
      secondaryColor: '#ffb74d'
    },
    {
      id: 'rigid-foam',
      title: 'RigidCore™ Board System',
      subtitle: 'High-Density Polyurethane Rigid Foam Panels',
      description: 'RigidCore™ combines exceptional thermal insulation with superior structural strength. These high-density panels are ideal for continuous insulation applications and feature facers specifically engineered for various applications including commercial roofing, wall systems, and cold storage facilities.',
      image: rigidFoamSvg,
      specs: [
        { name: 'R-Value', value: 7.2, unit: 'per inch', icon: <Thermometer className="h-5 w-5 text-primary" /> },
        { name: 'Density', value: 2.5, unit: 'lb/ft³', icon: <Gauge className="h-5 w-5 text-primary" /> },
        { name: 'Compressive Strength', value: 40, unit: 'psi', icon: <BarChart4 className="h-5 w-5 text-primary" /> },
        { name: 'Water Absorption', value: '<0.5', unit: '%', icon: <Droplets className="h-5 w-5 text-primary" /> },
        { name: 'Dimensional Stability', value: '<0.2', unit: '%', icon: <ShieldCheck className="h-5 w-5 text-primary" /> },
        { name: 'Flame Spread Index', value: '<25', unit: '', icon: <ShieldCheck className="h-5 w-5 text-primary" /> }
      ],
      applications: [
        {
          name: 'Cold Storage',
          image: coldStorageSvg,
          description: 'Maintains critical temperature control for food storage and pharmaceutical facilities.'
        },
        {
          name: 'Continuous Insulation',
          image: commercialRoofingSvg,
          description: 'Eliminates thermal bridging in commercial wall assemblies.'
        },
        {
          name: 'Marine Applications',
          image: marineApplicationSvg,
          description: 'Provides lightweight, water-resistant insulation for boat manufacturing.'
        }
      ],
      technicalDocUrl: '#',
      primaryColor: '#1565c0',
      secondaryColor: '#64b5f6'
    },
    {
      id: 'liquid-systems',
      title: 'FlexCoat™ Elastomeric System',
      subtitle: 'Flexible Polyurethane Coating System',
      description: 'Our FlexCoat™ system delivers exceptional waterproofing and UV protection with industry-leading elongation properties. This seamless membrane system is designed for demanding applications requiring durability, substrate movement accommodation, and long-term protection from environmental stressors.',
      image: liquidSystemSvg,
      specs: [
        { name: 'Tensile Strength', value: 3000, unit: 'psi', icon: <BarChart4 className="h-5 w-5 text-primary" /> },
        { name: 'Elongation', value: 600, unit: '%', icon: <Gauge className="h-5 w-5 text-primary" /> },
        { name: 'Hardness', value: 75, unit: 'Shore A', icon: <BarChart4 className="h-5 w-5 text-primary" /> },
        { name: 'Tear Resistance', value: 400, unit: 'pli', icon: <ShieldCheck className="h-5 w-5 text-primary" /> },
        { name: 'UV Stability', value: 'Excellent', unit: '', icon: <Globe className="h-5 w-5 text-primary" /> },
        { name: 'VOC Content', value: '<50', unit: 'g/L', icon: <Sprout className="h-5 w-5 text-primary" /> }
      ],
      applications: [
        {
          name: 'Roof Restoration',
          image: roofRestorationSvg,
          description: 'Extends roof life with seamless, waterproof membrane that reflects UV radiation.'
        },
        {
          name: 'Waterproofing',
          image: waterproofingSvg,
          description: 'Creates impermeable barriers for foundations, decks, and below-grade structures.'
        },
        {
          name: 'Secondary Containment',
          image: secondaryContainmentSvg, 
          description: 'Chemical-resistant lining for industrial containment areas and tank farms.'
        }
      ],
      technicalDocUrl: '#',
      primaryColor: '#388e3c',
      secondaryColor: '#81c784'
    }
  ];

  // Handle mouse move for zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  // Animation for product change
  useEffect(() => {
    containerControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    });
  }, [activeProduct, containerControls]);

  const handleProductChange = (index: number) => {
    containerControls.start({
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 }
    }).then(() => {
      setActiveProduct(index);
    });
  };

  const product = products[activeProduct];

  return (
    <section id="product-showcase" className="py-24 bg-gray-50" style={{ position: 'relative' }}>
      <div className="container-custom" style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            Product Lineup
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Our Advanced Polyurethane Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Engineered for exceptional performance across diverse applications, from construction to industrial uses.
          </p>
        </motion.div>

        {/* Product Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {products.map((prod, index) => (
            <Button
              key={prod.id}
              variant={activeProduct === index ? "default" : "outline"}
              className={`px-6 py-3 ${
                activeProduct === index 
                  ? "bg-primary hover:bg-primary-dark text-white" 
                  : "hover:border-primary/50 hover:text-primary"
              }`}
              onClick={() => handleProductChange(index)}
            >
              {prod.title.split(' ')[0]}
            </Button>
          ))}
        </div>

        {/* Product Details */}
        <motion.div
          animate={containerControls}
          initial={{ opacity: 0, y: 20 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative"
        >
          {/* Product Image with Enhanced Zoom */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-xl">
            <div 
              className="w-full h-[400px] overflow-hidden rounded-xl shadow-lg transition-all bg-white relative group before:absolute before:inset-0 before:p-[2px] before:rounded-xl before:bg-gradient-to-r before:from-primary/40 before:via-primary before:to-primary/40 before:animate-gradient-x before:content-[''] before:-z-10"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: isZoomed ? 0.05 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.img 
                ref={imageRef}
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-contain bg-white p-4 transition-all duration-200"
                style={
                  isZoomed 
                    ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                    : undefined
                }
                initial={{ scale: 1 }}
                animate={{ 
                  scale: isZoomed ? 1.25 : 1,
                  filter: isZoomed ? 'contrast(1.05) brightness(1.05)' : 'contrast(1) brightness(1)'
                }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              />
              
              {/* Magnifying glass icon overlay */}
              <motion.div 
                className="absolute right-4 top-4 bg-white/80 rounded-full p-2 shadow-md z-20 cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
              >
                <ZoomIn className="h-5 w-5 text-primary" />
              </motion.div>
              
              {/* Floating action buttons */}
              <motion.div className="absolute bottom-4 right-4 flex gap-2 z-20">
                <AnimatePresence>
                  {isZoomed && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-full bg-white/90 p-2 shadow-md cursor-pointer hover:bg-white"
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Download className="h-5 w-5 text-primary" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download Specification</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-full bg-white/90 p-2 shadow-md cursor-pointer hover:bg-white"
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Share2 className="h-5 w-5 text-primary" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Share Product</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-full bg-white/90 p-2 shadow-md cursor-pointer hover:bg-white"
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Heart className="h-5 w-5 text-primary" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Save to Favorites</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
            
            <div className="absolute top-4 left-4 z-20">
              <div className="flex flex-col gap-2">
                <Badge 
                  className="px-3 py-1 text-sm font-medium shadow-md"
                  style={{ backgroundColor: product.primaryColor }}
                >
                  <motion.span
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Award className="w-4 h-4 inline-block mr-1" />
                    Premium Product
                  </motion.span>
                </Badge>
                
                {product.id === 'rigid-foam' && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <Badge 
                      className="px-3 py-1 text-sm bg-red-500 shadow-md"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        New Product
                      </motion.span>
                    </Badge>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          
          {/* Product Info - Enhanced with visual elements */}
          <div className="lg:col-span-7">
            <div className="relative">
              {/* Floating decoration elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-primary/5 hidden md:block" 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-10 right-20 w-16 h-16 rounded-full bg-primary/10 hidden md:block" 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -5, 0],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              {/* Product title with animated highlight */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-bold mb-2 text-gray-800 relative inline-block">
                  {product.title}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-[3px] bg-primary rounded"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </h3>
              </motion.div>
              
              <motion.p 
                className="text-xl text-primary mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {product.subtitle}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-gray-600 mb-6 leading-relaxed relative">
                  {product.description}
                  <span className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-primary/30 to-transparent rounded hidden md:block"></span>
                </p>
              </motion.div>
              
              {/* Product tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <motion.span 
                  className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  High Performance
                </motion.span>
                <motion.span 
                  className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  Energy Efficient
                </motion.span>
                <motion.span 
                  className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  Easy Installation
                </motion.span>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Technical Specifications */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Technical Specifications
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.specs.map((spec, index) => (
                  <Card 
                    key={index} 
                    className="bg-gray-50 hover:shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-2 text-primary transition-transform duration-300 transform hover:scale-110">{spec.icon}</div>
                        <p className="text-sm text-gray-500">{spec.name}</p>
                        <p className="text-lg font-semibold">
                          {spec.value} <span className="text-xs">{spec.unit}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Applications */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold mb-4 text-gray-800">Applications</h4>
              <Tabs defaultValue={product.applications[0].name.toLowerCase().replace(/\s+/g, '-')}>
                <TabsList className="w-full grid grid-cols-3">
                  {product.applications.map((app, index) => (
                    <TabsTrigger 
                      key={index} 
                      value={app.name.toLowerCase().replace(/\s+/g, '-')}
                    >
                      {app.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {product.applications.map((app, index) => (
                  <TabsContent 
                    key={index} 
                    value={app.name.toLowerCase().replace(/\s+/g, '-')}
                    className="mt-4 relative"
                  >
                    <Card className="relative">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 relative">
                          <motion.div 
                            className="relative h-64 overflow-hidden group bg-gradient-to-br from-gray-50 to-gray-100"
                            whileHover={{ 
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                            initial={{ backgroundPosition: "0% 0%" }}
                            whileInView={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                          >
                            {/* Background gradient animation */}
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500"
                              animate={{ 
                                background: [
                                  "linear-gradient(to bottom right, rgba(255,154,0,0.05), transparent, rgba(255,154,0,0.1))",
                                  "linear-gradient(to bottom right, rgba(255,154,0,0.1), transparent, rgba(255,154,0,0.05))",
                                  "linear-gradient(to bottom right, rgba(255,154,0,0.05), transparent, rgba(255,154,0,0.1))"
                                ]
                              }}
                              transition={{ duration: 10, repeat: Infinity }}
                            />
                            
                            {/* Top and bottom accent lines */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-transparent to-primary opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            
                            {/* Application image with enhanced hover effects */}
                            <motion.div
                              className="relative w-full h-full flex items-center justify-center p-4"
                              whileHover={{ scale: 1.05, rotate: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <motion.img 
                                src={app.image} 
                                alt={app.name} 
                                className="h-48 w-full object-contain drop-shadow-md group-hover:drop-shadow-xl"
                                whileHover={{ filter: "drop-shadow(0 8px 8px rgba(0, 0, 0, 0.15))" }}
                                initial={{ opacity: 0.9, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                              />
                              
                              {/* Floating label for application name */}
                              <motion.div 
                                className="absolute -bottom-1 left-0 right-0 mx-auto text-center opacity-0 group-hover:opacity-100 bg-white/80 backdrop-blur-sm py-1 px-3 rounded-full shadow-md w-max"
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 0 }}
                                whileHover={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <span className="text-sm font-medium text-primary inline-flex items-center">
                                  <Info className="w-3 h-3 mr-1" /> {app.name}
                                </span>
                              </motion.div>
                            </motion.div>
                          </motion.div>
                          <motion.div 
                            className="p-6 flex items-center bg-gradient-to-br from-white to-gray-50 h-full overflow-hidden relative"
                            initial={{ backgroundPosition: "0% 0%" }}
                            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                            transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
                          >
                            {/* Decorative elements */}
                            <motion.div 
                              className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/5 -z-10"
                              initial={{ scale: 1, x: 30, y: -30 }}
                              animate={{ scale: [1, 1.1, 1], x: [30, 40, 30], y: [-30, -40, -30] }}
                              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            />
                            
                            <motion.div 
                              className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-primary/5 -z-10"
                              initial={{ scale: 1, x: -20, y: 20 }}
                              animate={{ scale: [1, 1.2, 1], x: [-20, -30, -20], y: [20, 30, 20] }}
                              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            />
                            
                            <div className="w-full relative z-10">
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                              >
                                <h5 className="text-xl font-semibold mb-3 text-gray-800 flex items-center relative">
                                  <span className="absolute -left-6 h-8 w-1.5 bg-gradient-to-b from-primary to-primary/50 rounded-full"></span>
                                  <motion.span 
                                    className="relative inline-block"
                                    whileHover={{ color: product.primaryColor }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {app.name}
                                    <motion.span 
                                      className="absolute -bottom-1 left-0 h-[2px] bg-primary/70 rounded"
                                      initial={{ width: 0 }}
                                      whileInView={{ width: "100%" }}
                                      transition={{ duration: 0.8, delay: 0.5 }}
                                      viewport={{ once: true }}
                                    />
                                  </motion.span>
                                </h5>
                              </motion.div>
                              
                              <motion.p 
                                className="text-gray-600 leading-relaxed mb-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                              >
                                {app.description}
                              </motion.p>
                              
                              {/* Feature bullets */}
                              <motion.div 
                                className="mb-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                              >
                                <ul className="space-y-2">
                                  <li className="flex items-center text-sm">
                                    <motion.span 
                                      className="w-2 h-2 rounded-full bg-primary mr-2"
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                                    />
                                    Premium-grade materials
                                  </li>
                                  <li className="flex items-center text-sm">
                                    <motion.span 
                                      className="w-2 h-2 rounded-full bg-green-500 mr-2"
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, delay: 0.5 }}
                                    />
                                    Industry-leading performance
                                  </li>
                                  <li className="flex items-center text-sm">
                                    <motion.span 
                                      className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, delay: 1 }}
                                    />
                                    Advanced technical support
                                  </li>
                                </ul>
                              </motion.div>
                              
                              <motion.div 
                                className="mt-5 pt-4 border-t border-gray-100"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                              >
                                <Button 
                                  variant="ghost" 
                                  className="px-0 text-sm font-medium text-primary hover:text-primary-dark hover:bg-transparent"
                                  onClick={() => {
                                    alert(`Detailed specifications for ${app.name} application will open`);
                                  }}
                                >
                                  <motion.span 
                                    className="flex items-center"
                                    whileHover={{ x: 3 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                  >
                                    View detailed specifications
                                    <motion.svg 
                                      xmlns="http://www.w3.org/2000/svg" 
                                      className="h-4 w-4 ml-1" 
                                      fill="none" 
                                      viewBox="0 0 24 24" 
                                      stroke="currentColor"
                                      whileHover={{ x: 2 }}
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </motion.svg>
                                  </motion.span>
                                </Button>
                              </motion.div>
                            </div>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            {/* Premium Configurator Feature */}
            <motion.div 
              className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-inner relative overflow-hidden"
              style={{ position: 'relative' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
                  className="p-2 rounded-full bg-primary/10 text-primary"
                >
                  <Gauge className="w-5 h-5" />
                </motion.div>
                <h4 className="text-lg font-semibold text-gray-800">Product Configurator</h4>
                <span className="text-xs font-medium text-white bg-gradient-to-r from-primary to-primary-dark px-2 py-0.5 rounded-full">
                  PREMIUM
                </span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <motion.div 
                  className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Application Type</h5>
                  <div className="space-y-2">
                    <div 
                      className="relative p-3 rounded-md border-2 border-primary cursor-pointer flex items-center"
                      onClick={() => alert("Selected: New Construction")}
                    >
                      <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                      <span>New Construction</span>
                    </div>
                    <div 
                      className="relative p-3 rounded-md border border-gray-200 cursor-pointer flex items-center"
                      onClick={() => alert("Selected: Retrofit")}
                    >
                      <div className="w-4 h-4 rounded-full bg-gray-200 mr-2"></div>
                      <span>Retrofit</span>
                    </div>
                    <div 
                      className="relative p-3 rounded-md border border-gray-200 cursor-pointer flex items-center"
                      onClick={() => alert("Selected: Industrial")}
                    >
                      <div className="w-4 h-4 rounded-full bg-gray-200 mr-2"></div>
                      <span>Industrial</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Climate Zone</h5>
                  <div className="space-y-2">
                    <div 
                      className="relative p-3 rounded-md border border-gray-200 cursor-pointer flex items-center"
                      onClick={() => alert("Selected: Tropical")}
                    >
                      <div className="w-4 h-4 rounded-full bg-gray-200 mr-2"></div>
                      <span>Tropical</span>
                    </div>
                    <div 
                      className="relative p-3 rounded-md border-2 border-primary cursor-pointer flex items-center"
                      onClick={() => alert("Selected: Temperate")}
                    >
                      <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                      <span>Temperate</span>
                    </div>
                    <div 
                      className="relative p-3 rounded-md border border-gray-200 cursor-pointer flex items-center"
                      onClick={() => alert("Selected: Polar")}
                    >
                      <div className="w-4 h-4 rounded-full bg-gray-200 mr-2"></div>
                      <span>Polar</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Special Requirements</h5>
                  <div className="space-y-2">
                    <div 
                      className="relative p-3 rounded-md border border-gray-200 cursor-pointer flex items-center"
                      onClick={() => alert("Selected: Fire Resistant")}
                    >
                      <div className="w-4 h-4 rounded-full bg-gray-200 mr-2"></div>
                      <span>Fire Resistant</span>
                    </div>
                    <div 
                      className="relative p-3 rounded-md border border-gray-200 cursor-pointer flex items-center"
                      onClick={() => alert("Selected: Water Resistant")}
                    >
                      <div className="w-4 h-4 rounded-full bg-gray-200 mr-2"></div>
                      <span>Water Resistant</span>
                    </div>
                    <div 
                      className="relative p-3 rounded-md border-2 border-primary cursor-pointer flex items-center"
                      onClick={() => alert("Selected: High R-Value")}
                    >
                      <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                      <span>High R-Value</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-4 flex justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Recommended product:</span> {product.title} with Enhanced Thermal Properties
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => alert("Custom quote will be prepared and sent to your email")}
                >
                  Get Custom Quote
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  size="lg" 
                  className="relative overflow-hidden bg-primary text-white shadow-md group"
                  onClick={() => {
                    alert("Sample request submitted for " + product.title);
                  }}
                >
                  {/* Animated background effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ 
                      background: [
                        "linear-gradient(to right, #e67e00, #ff9a00)",
                        "linear-gradient(to right, #ff9a00, #ffb74d)",
                        "linear-gradient(to right, #ffb74d, #e67e00)",
                        "linear-gradient(to right, #e67e00, #ff9a00)"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear", repeatDelay: 0.5 }}
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                    }}
                  />
                  
                  <span className="flex items-center relative z-10">
                    <motion.span 
                      className="w-6 h-6 mr-2 text-white bg-white/20 rounded-full flex items-center justify-center"
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      🔬
                    </motion.span> 
                    Request Sample
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="relative overflow-hidden border-gray-300 text-gray-800 shadow-md group"
                  onClick={() => {
                    window.open(product.technicalDocUrl || "#", "_blank");
                    alert("Technical Data Sheet for " + product.title + " downloaded");
                  }}
                >
                  {/* Gradient border effect */}
                  <motion.span 
                    className="absolute inset-0 border-2 border-transparent opacity-0 group-hover:opacity-100 rounded-md"
                    style={{ 
                      background: "linear-gradient(white, white) padding-box, linear-gradient(90deg, #ff9a00, #ffb74d, #ff9a00) border-box" 
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.span 
                    className="flex items-center relative z-10 group"
                    whileHover={{ color: product.primaryColor }}
                  >
                    <motion.span 
                      className="mr-2 text-gray-500 group-hover:text-primary transition-colors duration-300"
                      whileHover={{ rotate: [0, -10, 0, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <FileText className="h-5 w-5" />
                    </motion.span> 
                    Technical Data Sheet
                  </motion.span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="hidden md:block"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="secondary"
                        size="lg"
                        className="relative overflow-hidden bg-gray-100 border-gray-200 text-gray-800 shadow-md group"
                        onClick={() => {
                          alert("Product comparison tool will open for " + product.title + " and other Danny's Chemicals products");
                        }}
                      >
                        <span className="flex items-center relative z-10">
                          <span className="mr-2">
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                              }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              <Globe className="h-5 w-5 text-primary" />
                            </motion.div>
                          </span>
                          Compare Products
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Compare all Danny's polyurethane products</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;