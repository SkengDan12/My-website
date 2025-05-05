import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('visual');

  const products = [
    {
      id: 'spray-foam',
      name: 'Spray Foam Insulation',
      description: 'Used for roofing, walls, and industrial insulation applications.',
      details: 'Our spray foam insulation provides superior thermal performance with closed-cell structure that prevents air and moisture infiltration. Perfect for energy-efficient buildings, it offers exceptional R-value per inch and creates a seamless air barrier that enhances building envelope performance.',
      features: ['High R-value (6.5-7 per inch)', 'Air barrier properties', 'Moisture resistance', 'Reduces energy costs', 'Lifetime warranty'],
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      category: 'insulation'
    },
    {
      id: 'rigid-foam',
      name: 'Rigid Polyurethane Foam',
      description: 'Ideal for marine applications, buoyancy aids, and structural reinforcement.',
      details: 'Danny\'s Rigid Polyurethane Foam systems are engineered for marine flotation, cold storage insulation, and structural applications requiring high-density support. Our proprietary formulations offer exceptional compressive strength while maintaining low water absorption rates, making them perfect for demanding environments.',
      features: ['High compressive strength (35-300 psi)', 'Excellent buoyancy', 'Low water absorption (<2%)', 'CFC/HCFC-free formulations', 'Custom density options (2-50 lb/ft³)'],
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      category: 'marine'
    },
    {
      id: 'waterproofing',
      name: 'Waterproofing Solutions',
      description: 'Seamless coatings for asbestos roofs, bridges, and industrial surfaces.',
      details: 'Our premium waterproofing systems provide long-lasting protection against moisture intrusion with excellent elongation properties and UV stability. These seamless membranes form a continuous barrier that withstands harsh weather conditions while maintaining flexibility through thermal cycling.',
      features: ['UV stable options (15+ year protection)', 'Crack-bridging ability (up to 400%)', 'Chemical resistance', 'Fast cure times (2-24 hours)', 'Low VOC formulations available'],
      image: 'https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      category: 'coatings'
    },
    {
      id: 'prepolymers',
      name: 'Pre-Polymers & CASE',
      description: 'Advanced urethane chemistry for custom manufacturing applications.',
      details: 'Danny\'s Chemicals offers specialized prepolymer systems for coatings, adhesives, sealants, and elastomers (CASE). Our technical team provides custom formulation services to meet specific performance requirements, with precise control of reactivity, viscosity, and mechanical properties to optimize your manufacturing processes.',
      features: ['Customizable properties', 'Process optimization consulting', 'Technical formulation support', 'Low exotherm options', 'Rapid prototype development'],
      image: 'https://images.unsplash.com/photo-1616113364365-01bc57593f51?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      category: 'specialty'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'insulation', name: 'Insulation' },
    { id: 'marine', name: 'Marine & Structural' },
    { id: 'coatings', name: 'Coatings & Waterproofing' },
    { id: 'specialty', name: 'Specialty & Custom' }
  ];

  const performanceMetrics = [
    {
      name: 'Thermal Efficiency',
      dannys: 92,
      industry: 75
    },
    {
      name: 'Longevity',
      dannys: 95,
      industry: 70
    },
    {
      name: 'Eco-Friendliness',
      dannys: 88,
      industry: 65
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section id="products" className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Product Range
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our comprehensive range of polyurethane technologies engineered for superior performance across diverse applications.
          </p>
          
          {/* Product Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className="rounded-full px-4 py-2 mb-2"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ position: 'relative' }}>
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
        
        {/* No products message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12" style={{ position: 'relative' }}>
            <h3 className="text-xl text-gray-600">No products found in this category</h3>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setActiveCategory('all')}
            >
              View All Products
            </Button>
          </div>
        )}
        
        {/* Product Comparison Section */}
        <div className="mt-20" style={{ position: 'relative' }}>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">See the Difference</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Compare Danny's Chemicals solutions with standard industry offerings to understand our competitive advantage.</p>
          </div>
          
          {/* Simple tabs implementation */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ position: 'relative' }}>
            <div className="p-3 sm:p-4 border-b" style={{ position: 'relative' }}>
              <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-2 sm:space-y-0" style={{ position: 'relative' }}>
                <button 
                  className={`px-4 sm:px-6 py-2 rounded-md transition w-full sm:w-auto ${activeTab === 'visual' 
                    ? 'bg-primary text-white font-medium' 
                    : 'bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => setActiveTab('visual')}
                >
                  Visual Comparison
                </button>
                <button 
                  className={`px-4 sm:px-6 py-2 rounded-md transition w-full sm:w-auto ${activeTab === 'performance' 
                    ? 'bg-primary text-white font-medium' 
                    : 'bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => setActiveTab('performance')}
                >
                  Performance Data
                </button>
              </div>
            </div>
            
            <div className="p-3 sm:p-6" style={{ position: 'relative' }}>
              {/* Visual Comparison */}
              {activeTab === 'visual' && (
                <div style={{ position: 'relative' }}>
                  <div className="flex flex-col md:flex-row gap-4 mb-8" style={{ position: 'relative' }}>
                    <div className="w-full md:w-1/2 bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <div className="relative h-52 sm:h-64 md:h-80 rounded overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                          alt="Danny's Solution" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full bg-primary/80 text-white py-2 px-4 text-center">
                          Danny's Solution
                        </div>
                      </div>
                      <div className="mt-4">
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary mr-2">✓</span>
                            <span>Superior finish quality</span>
                          </li>
                          <li className="flex items-center">
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary mr-2">✓</span>
                            <span>Consistent application</span>
                          </li>
                          <li className="flex items-center">
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary mr-2">✓</span>
                            <span>Even color distribution</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <div className="relative h-52 sm:h-64 md:h-80 rounded overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1590856029620-81df6a6c329e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                          alt="Competitor" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full bg-gray-700/80 text-white py-2 px-4 text-center">
                          Competitor Product
                        </div>
                      </div>
                      <div className="mt-4">
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-center">
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-600 mr-2">✗</span>
                            <span>Inconsistent texture</span>
                          </li>
                          <li className="flex items-center">
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-600 mr-2">✗</span>
                            <span>Application issues</span>
                          </li>
                          <li className="flex items-center">
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-600 mr-2">✗</span>
                            <span>Color inconsistency</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Visual Quality Difference</h4>
                    <p className="text-gray-600 max-w-3xl mx-auto mb-6">Compare the finish and application quality of Danny's solutions versus standard products. Our proprietary formulation ensures consistent results and superior performance in all conditions.</p>
                    
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
                      <Button 
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => window.alert("High-resolution comparison images will download shortly.")}
                      >
                        Download High-Res Images
                      </Button>
                      <Button 
                        className="w-full sm:w-auto"
                        onClick={() => window.alert("Thank you for your interest! A sales representative will contact you to arrange a live demonstration.")}
                      >
                        Request Live Demo
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Performance Data */}
              {activeTab === 'performance' && (
                <div style={{ position: 'relative' }}>
                  <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">Performance Comparison</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ position: 'relative' }}>
                    {performanceMetrics.map((metric, index) => (
                      <div key={index} className="bg-gray-50 p-3 sm:p-5 rounded-lg">
                        <h5 className="font-semibold text-gray-700 mb-3 text-center">{metric.name}</h5>
                        <div className="pt-6 pb-4 relative">
                          <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
                            <div 
                              className="bg-primary h-6 rounded-full flex items-center justify-end pr-2 text-white font-medium text-sm"
                              style={{ width: `${metric.dannys}%` }}
                            >
                              {metric.dannys}%
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-6">
                            <div 
                              className="bg-gray-500 h-6 rounded-full flex items-center justify-end pr-2 text-white font-medium text-sm"
                              style={{ width: `${metric.industry}%` }}
                            >
                              {metric.industry}%
                            </div>
                          </div>
                          <div className="flex justify-between text-sm mt-3">
                            <span className="font-medium">Danny's</span>
                            <span className="font-medium">Industry Average</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center flex flex-col sm:flex-row flex-wrap justify-center gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => window.alert("Comparison chart PDF is being generated. Download will start shortly.")}
                      className="w-full sm:w-auto px-4 sm:px-6"
                    >
                      Download Comparison Chart
                    </Button>
                    <Button 
                      onClick={() => window.alert("Thank you for your interest! A detailed specification sheet will be sent to your email shortly.")}
                      className="w-full sm:w-auto px-4 sm:px-6"
                    >
                      Request Detailed Spec Sheet
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
