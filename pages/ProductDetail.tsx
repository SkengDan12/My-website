import React from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronLeft, Download, Check, Star, BookOpen, Activity, Sparkles, ArrowRight, LifeBuoy, ShieldCheck, Thermometer, Droplets, Zap, Settings, PaintBucket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductViewer3D from "@/components/ProductViewer3D";
import AIAssistant from "@/components/AIAssistant";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Define product database
const productDatabase = {
  'spray-foam': {
    id: 'spray-foam',
    name: 'ProFoam Insulation',
    subtitle: 'High-Performance Spray Polyurethane Foam',
    description: 'ProFoam is our flagship closed-cell spray polyurethane foam insulation system, designed for superior thermal performance, air sealing, and moisture control in residential and commercial applications.',
    longDescription: "ProFoam insulation sets the industry standard for energy efficiency and building envelope performance. This advanced closed-cell spray polyurethane foam creates a seamless, airtight barrier that drastically reduces energy consumption while improving indoor comfort and air quality. With an impressive R-value of 6.5 per inch, ProFoam delivers maximum thermal resistance with minimal material thickness. The rigid structure and excellent adhesion properties ensure long-term performance and durability across a wide range of applications from residential attics to commercial building envelopes.",
    features: [
      'Superior thermal performance (R-value 6.5 per inch)',
      'Excellent air barrier properties',
      'Structural enhancement for walls and roofs',
      'Moisture resistance and water barrier',
      'Reduces noise transmission',
      'Low VOC emissions for improved indoor air quality',
      'Class II vapor retarder at 2" thickness',
      'GREENGUARD Gold certified'
    ],
    applications: [
      'Residential wall insulation and air sealing',
      'Commercial building envelope systems',
      'Roof insulation (attics, cathedral ceilings)',
      'Rim and band joist sealing',
      'Crawlspace and basement insulation',
      'Cold storage facilities and freezers',
      'Metal building insulation'
    ],
    technicalDetails: [
      { name: 'R-Value', value: '6.5', unit: 'per inch', icon: <Thermometer className="w-5 h-5" /> },
      { name: 'Density', value: '2.0', unit: 'lb/ft³', icon: <Settings className="w-5 h-5" /> },
      { name: 'Compressive Strength', value: '25', unit: 'psi', icon: <ShieldCheck className="w-5 h-5" /> },
      { name: 'Closed Cell Content', value: '>90', unit: '%', icon: <LifeBuoy className="w-5 h-5" /> },
      { name: 'Water Absorption', value: '<2', unit: '%', icon: <Droplets className="w-5 h-5" /> },
      { name: 'Air Permeance', value: '0.002', unit: 'L/s·m²', icon: <Zap className="w-5 h-5" /> }
    ],
    documents: [
      { name: 'Technical Data Sheet', size: '1.2 MB' },
      { name: 'Safety Data Sheet (SDS)', size: '850 KB' },
      { name: 'Installation Guide', size: '3.5 MB' },
      { name: 'Energy Performance Report', size: '1.8 MB' }
    ],
    image: '/images/product-spray-foam.svg',
    pricing: 'Contact sales team for customized pricing based on project size and specifications.',
    colors: ['Natural Cream', 'Light Gray', 'Blue Tint (Custom)'],
    certifications: [
      'GREENGUARD Gold Certified',
      'ICC-ES Evaluation Report',
      'ABAA Evaluated',
      'Fire Rating: ASTM E84 Class I'
    ],
    primaryColor: '#ff9a00',
    secondaryColor: '#fff2e0',
    viewerType: 'molecular',
    relatedProducts: ['rigid-foam', 'waterproofing']
  },
  'rigid-foam': {
    id: 'rigid-foam',
    name: 'RigidCore Foam',
    subtitle: 'Structural Rigid Polyurethane Foam Systems',
    description: 'RigidCore is our high-density rigid polyurethane foam system, engineered for structural applications requiring exceptional strength-to-weight ratio and thermal performance.',
    longDescription: "RigidCore foam systems represent the pinnacle of structural polyurethane technology, offering unparalleled strength-to-weight ratio for applications where performance is critical. These high-density, closed-cell rigid foams are formulated to provide exceptional dimensional stability and compressive strength while maintaining excellent thermal insulation properties. RigidCore can be poured, sprayed, or injected and forms a rigid, lightweight core material ideal for composite panels, marine applications, and high-load structural components. The unique cell structure creates a water-resistant material that won't rot, mold, or deteriorate over time.",
    features: [
      'Exceptional compressive and tensile strength',
      'Superior dimensional stability',
      'Excellent thermal insulation properties',
      'Low water absorption and permeability',
      'Custom density formulations (2-50 lb/ft³)',
      'Can be machined, sanded, and finished',
      'Chemical and corrosion resistant',
      'UV-stable formulations available'
    ],
    applications: [
      'Structural composite panels for construction',
      'Aerospace and transportation components',
      'Marine flotation and buoyancy applications',
      'Architectural elements and decorative features',
      'Industrial tooling and prototyping',
      'Cold storage panel cores',
      'Vacuum forming and tooling'
    ],
    technicalDetails: [
      { name: 'Density Range', value: '2-50', unit: 'lb/ft³', icon: <Settings className="w-5 h-5" /> },
      { name: 'Compressive Strength', value: '40-900', unit: 'psi', icon: <ShieldCheck className="w-5 h-5" /> },
      { name: 'Tensile Strength', value: '60-450', unit: 'psi', icon: <Activity className="w-5 h-5" /> },
      { name: 'R-Value', value: '5.0-6.0', unit: 'per inch', icon: <Thermometer className="w-5 h-5" /> },
      { name: 'Water Absorption', value: '<0.1', unit: '%', icon: <Droplets className="w-5 h-5" /> },
      { name: 'Service Temperature', value: '-100 to +250', unit: '°F', icon: <Thermometer className="w-5 h-5" /> }
    ],
    documents: [
      { name: 'Technical Data Sheets (by density)', size: '2.5 MB' },
      { name: 'Safety Data Sheet (SDS)', size: '900 KB' },
      { name: 'Processing Guidelines', size: '1.7 MB' },
      { name: 'Structural Engineering Properties', size: '3.2 MB' }
    ],
    image: '/images/product-rigid-foam.svg',
    pricing: 'Customized pricing based on formulation, volume, and application requirements. Contact our technical sales team.',
    colors: ['Natural Tan', 'Gray', 'Black', 'Custom Colors Available'],
    certifications: [
      'UL 94 Flame Rating',
      'USDA Compliant Formulations Available',
      'DNV-GL Maritime Certified',
      'ISO 9001:2015 Manufacturing'
    ],
    primaryColor: '#1e88e5',
    secondaryColor: '#e3f2fd',
    viewerType: '3d-model',
    relatedProducts: ['spray-foam', 'prepolymers']
  },
  'waterproofing': {
    id: 'waterproofing',
    name: 'FlexCoat Membrane',
    subtitle: 'Seamless Polyurethane Waterproofing Solution',
    description: 'FlexCoat is a premium liquid-applied polyurethane waterproofing membrane system that creates a seamless, durable barrier against water intrusion for roofs, foundations, and critical applications.',
    longDescription: "FlexCoat represents the latest advancement in polyurethane waterproofing technology, offering superior protection against water intrusion in even the most demanding environments. This liquid-applied membrane cures to form a seamless, highly elastic barrier that accommodates structural movement while maintaining watertight integrity. The unique formulation provides exceptional adhesion to concrete, metal, wood, and existing roofing systems, eliminating the need for mechanical fasteners and reducing potential leak points. FlexCoat's rapid cure time and user-friendly application process minimize downtime while delivering long-term performance backed by our 25-year warranty program.",
    features: [
      'Seamless membrane eliminates joints and seams',
      'Exceptional elongation and crack-bridging ability',
      'UV-stable for exposed applications',
      'Chemical and root resistant',
      'Fast curing, even at low temperatures',
      'Excellent adhesion to various substrates',
      'Can be applied over existing membranes',
      'Low odor, low VOC formulations available'
    ],
    applications: [
      'Commercial and residential roofing',
      'Foundation and below-grade waterproofing',
      'Plaza decks and balconies',
      'Mechanical room and wet area protection',
      'Secondary containment and tank linings',
      'Green roof systems',
      'Stadium and parking structure waterproofing'
    ],
    technicalDetails: [
      { name: 'Elongation', value: '850', unit: '%', icon: <Activity className="w-5 h-5" /> },
      { name: 'Tensile Strength', value: '1,200', unit: 'psi', icon: <ShieldCheck className="w-5 h-5" /> },
      { name: 'Water Vapor Transmission', value: '0.03', unit: 'perms', icon: <Droplets className="w-5 h-5" /> },
      { name: 'Shore A Hardness', value: '65-70', unit: '', icon: <Settings className="w-5 h-5" /> },
      { name: 'Solids Content', value: '>95', unit: '%', icon: <PaintBucket className="w-5 h-5" /> },
      { name: 'Cure Time', value: '6-12', unit: 'hours', icon: <Zap className="w-5 h-5" /> }
    ],
    documents: [
      { name: 'Technical Data Sheet', size: '1.5 MB' },
      { name: 'Safety Data Sheet (SDS)', size: '780 KB' },
      { name: 'Application Guide', size: '4.2 MB' },
      { name: 'Warranty Information', size: '950 KB' }
    ],
    image: '/images/product-waterproofing.svg',
    pricing: 'Pricing based on project scope, substrate conditions, and warranty requirements. Contact our waterproofing specialists.',
    colors: ['Gray', 'White', 'Tan', 'Custom Colors (minimum order quantities apply)'],
    certifications: [
      'ASTM C836 Compliant',
      'Miami-Dade County Approved',
      'FM 4470 Approved',
      'ICC-ES Evaluation Report'
    ],
    primaryColor: '#2e7d32',
    secondaryColor: '#e8f5e9',
    viewerType: 'molecular',
    relatedProducts: ['spray-foam', 'prepolymers']
  },
  'prepolymers': {
    id: 'prepolymers',
    name: 'PolyFlex Prepolymers',
    subtitle: 'Custom Polyurethane Prepolymer Systems',
    description: 'PolyFlex is our line of customizable polyurethane prepolymer systems designed for specialized CASE (Coatings, Adhesives, Sealants, Elastomers) applications requiring precise performance characteristics.',
    longDescription: "PolyFlex prepolymer systems represent the most versatile segment of our polyurethane technology portfolio, offering virtually unlimited customization potential for specialized applications. These carefully formulated prepolymers serve as the foundation for high-performance coatings, adhesives, sealants, and elastomers where standard products simply won't suffice. Our in-house polymer scientists work directly with customers to develop proprietary formulations that precisely match application requirements - from ultra-flexible potting compounds to chemical-resistant industrial coatings. With PolyFlex, manufacturers can achieve the exact hardness, elongation, and processing characteristics needed while maintaining batch-to-batch consistency for critical applications.",
    features: [
      'Tailored formulations for specific applications',
      'Wide range of hardness options (Shore 00 to Shore D)',
      'Adjustable cure profiles and pot life',
      'Excellent hydrolytic stability',
      'Superior adhesion to difficult substrates',
      'Low temperature flexibility',
      'Optical clarity options available',
      'Biocompatible formulations possible'
    ],
    applications: [
      'Industrial protective coatings',
      'Flexible and rigid adhesives',
      'Potting and encapsulation compounds',
      'Shoe soles and technical footwear',
      'Vibration dampening and isolation',
      'Seals, gaskets, and o-rings',
      'Medical device components'
    ],
    technicalDetails: [
      { name: 'Hardness Range', value: 'Shore 00-10 to Shore D-80', unit: '', icon: <Settings className="w-5 h-5" /> },
      { name: 'Elongation', value: '50-800', unit: '%', icon: <Activity className="w-5 h-5" /> },
      { name: 'Tensile Strength', value: '300-7,500', unit: 'psi', icon: <ShieldCheck className="w-5 h-5" /> },
      { name: 'Tear Strength', value: '20-750', unit: 'pli', icon: <Zap className="w-5 h-5" /> },
      { name: 'Viscosity', value: '500-25,000', unit: 'cps', icon: <Droplets className="w-5 h-5" /> },
      { name: 'NCO Content', value: '1.8-19', unit: '%', icon: <PaintBucket className="w-5 h-5" /> }
    ],
    documents: [
      { name: 'Technical Catalog', size: '5.8 MB' },
      { name: 'Safety Data Sheets (SDS)', size: '1.2 MB' },
      { name: 'Custom Formulation Request Form', size: '620 KB' },
      { name: 'Processing Guidelines', size: '3.1 MB' }
    ],
    image: '/images/product-prepolymers.svg',
    pricing: 'Custom quote based on formulation specifications, performance requirements, and volume. Minimum order quantities apply.',
    colors: ['Amber (Natural)', 'Clear/Transparent', 'Pigmentable'],
    certifications: [
      'ISO 10993 Biocompatible Formulations Available',
      'UL Listed Formulations Available',
      'REACH Compliant',
      'RoHS Compliant Formulations'
    ],
    primaryColor: '#6a1b9a',
    secondaryColor: '#f3e5f5',
    viewerType: 'molecular',
    relatedProducts: ['rigid-foam', 'waterproofing']
  }
};

const ProductDetail = () => {
  const [location] = useLocation();
  const productId = location.split('/')[2] || '';
  
  // Get product data from our database
  const product = productDatabase[productId as keyof typeof productDatabase];

  // If product not found
  if (!product) {
    return (
      <div className="container mx-auto py-32 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you are looking for could not be found.</p>
        <Button asChild>
          <Link href="/">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className="pt-32 pb-20" style={{ background: `linear-gradient(180deg, ${product.secondaryColor} 0%, rgba(255,255,255,0) 100%)` }}>
        <div className="container-custom">
          
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#products" className="hover:text-primary transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-primary">{product.name}</span>
          </div>
          
          {/* Product Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 font-medium">
                  Premium Quality
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">{product.name}</h1>
                <p className="text-xl text-gray-600 mb-6">{product.subtitle}</p>
                <p className="text-gray-700 mb-8 leading-relaxed">{product.longDescription}</p>
                
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-primary hover:bg-primary-dark text-white" size="lg" asChild>
                    <a href="#request-quote">Request Quote</a>
                  </Button>
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
                    <Download className="w-4 h-4 mr-2" />
                    Technical Data
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg w-full aspect-square flex items-center justify-center overflow-hidden relative">
                <ProductViewer3D productType={product.viewerType as '3d-model' | 'molecular'} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto mb-8 bg-gray-100 p-1">
              <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
              <TabsTrigger value="technical" className="flex-1">Technical Details</TabsTrigger>
              <TabsTrigger value="applications" className="flex-1">Applications</TabsTrigger>
              <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Sparkles className="w-6 h-6 mr-2 text-primary" />
                    Key Benefits
                  </h3>
                  <ul className="space-y-4">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mt-1 mr-3 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Product Certifications</h3>
                  <ul className="space-y-3">
                    {product.certifications.map((cert, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Star className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-gray-700">{cert}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Available Colors</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color, index) => (
                      <Badge key={index} variant="outline" className="bg-white border-gray-200 py-1.5">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </div>
            </TabsContent>
            
            <TabsContent value="technical" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Settings className="w-6 h-6 mr-2 text-primary" />
                  Technical Specifications
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.technicalDetails.map((detail, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary hover:shadow-md transition-all"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <div className="text-primary">
                          {detail.icon}
                        </div>
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-1">{detail.name}</h4>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-primary">{detail.value}</span>
                        {detail.unit && (
                          <span className="ml-1 text-gray-500">{detail.unit}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 bg-gray-50 border border-gray-100 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Testing Methodologies</h4>
                  <p className="text-gray-700 mb-4">
                    All technical specifications are determined through rigorous testing using industry-standard ASTM, ISO, and DIN test methods. Complete test reports are available upon request.
                  </p>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Request Detailed Test Reports
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="applications" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Settings className="w-6 h-6 mr-2 text-primary" />
                  Key Applications
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.applications.map((app, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">{app}</h4>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 bg-gray-50 border border-gray-100 rounded-xl p-8 flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Not sure if this product is right for your application?</h3>
                    <p className="text-gray-700">
                      Our technical team can help you determine the best solution for your specific requirements. Contact us for a personalized consultation.
                    </p>
                  </div>
                  <div className="md:w-1/3 flex justify-center md:justify-end">
                    <Button className="bg-primary hover:bg-primary-dark text-white">
                      Request Consultation
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="documents" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-primary" />
                  Technical Documents
                </h3>
                
                <div className="space-y-4">
                  {product.documents.map((doc, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-xl p-5 border border-gray-200 hover:border-primary hover:shadow-md transition-all flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{doc.name}</h4>
                          <p className="text-sm text-gray-500">PDF • {doc.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/5">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 bg-gray-50 border border-gray-100 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Need Custom Documentation?</h3>
                  <p className="text-gray-700 mb-4">
                    We can prepare specialized documentation for your project's specific requirements, including custom specifications, BIM objects, or compliance documentation.
                  </p>
                  <Button className="bg-primary hover:bg-primary-dark text-white">
                    Request Custom Documentation
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Request Quote Section */}
      <div id="request-quote" className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started with {product.name}?</h2>
              <p className="text-lg text-gray-700">
                Contact our team to request a quote, sample, or more information about how {product.name} can benefit your project.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Request a Quote</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    placeholder="Tell us about your project requirements..."
                  ></textarea>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white">
                  Submit Request
                </Button>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-primary/5 p-8 rounded-xl border border-primary/20 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing Information</h3>
                <p className="text-gray-700 mb-4">{product.pricing}</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>Volume discounts available for larger projects</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>Detailed quotes typically provided within 24-48 hours</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>Custom formulations available for specialized needs</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Our Team Directly</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">sales@dannyschemicals.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">(800) 555-POLY (7659)</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hours</p>
                      <p className="font-medium">Monday-Friday: 8am-5pm EST</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Products</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Explore other Danny's Chemicals products that complement or provide alternatives to {product.name}.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.relatedProducts.map((relatedId) => {
              const relatedProduct = productDatabase[relatedId as keyof typeof productDatabase];
              if (!relatedProduct) return null;
              
              return (
                <motion.div
                  key={relatedId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-primary hover:shadow-lg transition-all"
                >
                  <div 
                    className="h-48 bg-gray-100 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${relatedProduct.secondaryColor} 0%, ${relatedProduct.secondaryColor}88 100%)` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img src={`/images/product-${relatedProduct.id}.svg`} alt={relatedProduct.name} className="h-full w-full object-contain" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{relatedProduct.description}</p>
                    <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                      <Link href={`/product/${relatedProduct.id}`}>
                        View Product Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <AIAssistant />
    </div>
  );
};

export default ProductDetail;