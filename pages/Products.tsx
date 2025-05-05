import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Products = () => {
  // Product database
  const products = [
    {
      id: 'spray-foam',
      name: 'ProFoam Insulation',
      description: 'High-performance spray polyurethane foam insulation system designed for superior thermal performance.',
      image: '/images/product-spray-foam.svg',
      category: 'Insulation',
      viewerType: 'molecular' as '3d-model' | 'molecular',
      primaryColor: '#ff9a00',
      secondaryColor: '#fff2e0'
    },
    {
      id: 'rigid-foam',
      name: 'RigidCore Foam',
      description: 'Structural rigid polyurethane foam systems engineered for exceptional strength-to-weight ratio.',
      image: '/images/product-rigid-foam.svg',
      category: 'Structural Materials',
      viewerType: '3d-model' as '3d-model' | 'molecular',
      primaryColor: '#1e88e5',
      secondaryColor: '#e3f2fd'
    },
    {
      id: 'waterproofing',
      name: 'FlexCoat Membrane',
      description: 'Seamless polyurethane waterproofing membrane system for long-lasting water protection.',
      image: '/images/product-waterproofing.svg',
      category: 'Waterproofing',
      viewerType: 'molecular' as '3d-model' | 'molecular',
      primaryColor: '#2e7d32',
      secondaryColor: '#e8f5e9'
    },
    {
      id: 'prepolymers',
      name: 'PolyFlex Prepolymers',
      description: 'Custom polyurethane prepolymer systems for specialized CASE applications.',
      image: '/images/product-prepolymers.svg',
      category: 'Specialty Chemicals',
      viewerType: 'molecular' as '3d-model' | 'molecular',
      primaryColor: '#6a1b9a',
      secondaryColor: '#f3e5f5'
    }
  ];

  // Categories for filtering
  const categories = ['All', 'Insulation', 'Structural Materials', 'Waterproofing', 'Specialty Chemicals'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  // Filter products based on active category
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div>
      <Navbar />
      <div className="pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 mb-16"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Products</h1>
            <p className="text-xl text-gray-700">
              Explore our innovative polyurethane solutions designed to meet the most demanding performance requirements across industries.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
              >
                <div 
                  className="h-48 bg-gray-100 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${product.secondaryColor} 0%, ${product.secondaryColor}88 100%)` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                    <Link href={`/product/${product.id}`}>
                      View Product Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 bg-gray-50 rounded-xl p-8 border border-gray-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Need a Custom Solution?</h2>
              <p className="text-center text-gray-700 mb-8">
                Our technical team can develop customized polyurethane formulations to meet your specific performance requirements.
              </p>
              <div className="flex justify-center">
                <Button asChild className="bg-primary hover:bg-primary-dark text-white">
                  <Link href="/contact">
                    Request Custom Formulation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Products;