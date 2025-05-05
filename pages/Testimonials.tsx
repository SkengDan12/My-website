import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialsSection from '@/components/TestimonialsSection';
import AIAssistant from '@/components/AIAssistant';

const Testimonials = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 mb-16"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Clients Say</h1>
            <p className="text-xl text-gray-700">
              Trusted by industry leaders around the world for our quality, innovation, and exceptional customer service.
            </p>
          </div>
        </motion.div>
        
        <TestimonialsSection />
        
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Featured Case Studies</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="mb-4">
                    <img src="https://via.placeholder.com/120x40" alt="Company Logo" className="h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Industrial Energy Savings</h3>
                  <p className="text-gray-700 mb-4">
                    A major manufacturing facility reduced energy costs by 42% after implementing our ProFoam insulation system throughout their processing plant.
                  </p>
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Industrial Manufacturing</span>
                      <button className="text-primary font-medium text-sm hover:underline">Read Case Study</button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="mb-4">
                    <img src="https://via.placeholder.com/120x40" alt="Company Logo" className="h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Cold Storage Innovation</h3>
                  <p className="text-gray-700 mb-4">
                    A food distribution company utilized our RigidCore foam to create more efficient cold storage facilities, reducing cooling costs by 35%.
                  </p>
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Food Distribution</span>
                      <button className="text-primary font-medium text-sm hover:underline">Read Case Study</button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="mb-4">
                    <img src="https://via.placeholder.com/120x40" alt="Company Logo" className="h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Waterproofing Challenge</h3>
                  <p className="text-gray-700 mb-4">
                    An architectural firm used our FlexCoat membrane system to successfully waterproof a complex green roof design with zero leaks over 5 years.
                  </p>
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Architecture & Construction</span>
                      <button className="text-primary font-medium text-sm hover:underline">Read Case Study</button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="mb-4">
                    <img src="https://via.placeholder.com/120x40" alt="Company Logo" className="h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Elastomer Solution</h3>
                  <p className="text-gray-700 mb-4">
                    A medical device manufacturer partnered with us to develop a custom polyurethane elastomer that met stringent biocompatibility requirements.
                  </p>
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Medical Technology</span>
                      <button className="text-primary font-medium text-sm hover:underline">Read Case Study</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Industry Recognition</h2>
              <p className="text-lg text-gray-700 mb-12">
                Danny's Chemicals has been recognized for excellence in innovation, sustainability, and product performance.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Innovation Award</h3>
                  <p className="text-gray-600 text-sm">Polyurethane Manufacturers Association</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Sustainability Excellence</h3>
                  <p className="text-gray-600 text-sm">Global Green Chemistry Council</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Customer Service</h3>
                  <p className="text-gray-600 text-sm">Industrial Excellence Awards</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Product Quality</h3>
                  <p className="text-gray-600 text-sm">American Chemistry Council</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Testimonials;