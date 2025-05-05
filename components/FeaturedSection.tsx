import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, feature } from '@/lib/animations';
import ProductViewer3D from './ProductViewer3D';

const FeaturedSection = () => {
  return (
    <section id="featured" className="py-16 md:py-24 bg-white" style={{ position: 'relative' }}>
      <div className="container-custom" style={{ position: 'relative' }}>
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-16"
          style={{ position: 'relative' }}
        >
          <motion.h2 
            variants={fadeIn('up', 'tween', 0.1, 1)}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Industry-Leading Polyurethane Solutions
          </motion.h2>
          <motion.p 
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Our technologically advanced products deliver exceptional performance across diverse applications, from insulation to marine buoyancy.
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div 
            variants={feature}
            whileHover={{ y: -10 }}
            className="bg-gray-50 rounded-lg p-8 text-center shadow-md transition-all duration-300"
          >
            <div className="bg-primary/10 inline-flex p-4 rounded-full mb-6">
              <i className="fas fa-flask text-4xl text-primary"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Advanced Formulations</h3>
            <p className="text-gray-600">Custom-engineered chemistry delivering superior performance in the most demanding applications.</p>
          </motion.div>
          
          <motion.div 
            variants={feature}
            whileHover={{ y: -10 }}
            className="bg-gray-50 rounded-lg p-8 text-center shadow-md transition-all duration-300"
          >
            <div className="bg-primary/10 inline-flex p-4 rounded-full mb-6">
              <i className="fas fa-leaf text-4xl text-primary"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Eco-Friendly Solutions</h3>
            <p className="text-gray-600">Innovative products designed with sustainability in mind, reducing environmental impact.</p>
          </motion.div>
          
          <motion.div 
            variants={feature}
            whileHover={{ y: -10 }}
            className="bg-gray-50 rounded-lg p-8 text-center shadow-md transition-all duration-300"
          >
            <div className="bg-primary/10 inline-flex p-4 rounded-full mb-6">
              <i className="fas fa-cogs text-4xl text-primary"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Technical Expertise</h3>
            <p className="text-gray-600">Supported by industry experts to help you select and implement the right polyurethane technology.</p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={fadeIn('up', 'tween', 0.3, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-16 flex justify-center"
        >
          <div className="bg-gray-100 rounded-lg p-6 md:p-10 max-w-5xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Danny's Chemicals?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 mr-2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-gray-700">Industry-leading product performance</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 mr-2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-gray-700">Comprehensive technical support</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 mr-2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-gray-700">Innovation-driven research & development</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 mr-2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-gray-700">Sustainable product options</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 mr-2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="text-gray-700">Global production and distribution</span>
                  </li>
                </ul>
                
                <div className="mt-6 flex space-x-4">
                  <button className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    Learn More
                  </button>
                  <button className="border border-gray-300 hover:border-primary text-gray-800 font-medium py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    Contact Us
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 h-64 md:h-72">
                <div className="h-full w-full bg-white rounded-lg shadow-md overflow-hidden">
                  <ProductViewer3D productType="molecular" />
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">
                  Interactive 3D molecular structure visualization
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;
