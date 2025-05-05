import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import AIAssistant from '@/components/AIAssistant';

const AboutUs = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Danny's Chemicals</h1>
            <p className="text-xl text-gray-700">
              A global leader in innovative polyurethane technology with over 30 years of expertise in developing high-performance chemical solutions.
            </p>
          </div>
        </motion.div>
        
        <AboutSection />
        
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Leadership Team</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-48 h-48 rounded-full bg-gray-200 overflow-hidden mx-auto mb-4">
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-24 h-24 text-primary/30" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Daniel Johnson</h3>
                  <p className="text-primary font-medium mb-3">Founder & CEO</p>
                  <p className="text-gray-600">
                    With over 30 years of experience in polyurethane chemistry, Daniel leads our vision of sustainable chemical innovation.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-48 h-48 rounded-full bg-gray-200 overflow-hidden mx-auto mb-4">
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-24 h-24 text-primary/30" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Dr. Sarah Chen</h3>
                  <p className="text-primary font-medium mb-3">Chief Technology Officer</p>
                  <p className="text-gray-600">
                    Leading our R&D department with a Ph.D. in Polymer Science and numerous patents in sustainable polyurethane applications.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-48 h-48 rounded-full bg-gray-200 overflow-hidden mx-auto mb-4">
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-24 h-24 text-primary/30" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Michael Rodriguez</h3>
                  <p className="text-primary font-medium mb-3">VP of Operations</p>
                  <p className="text-gray-600">
                    Overseeing global manufacturing with a focus on sustainable production methods and supply chain optimization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <span className="text-primary font-bold">1990</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Company Founded</h4>
                        <p className="text-gray-700">Danny's Chemicals was established with a focus on specialty polyurethane formulations for industrial applications.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <span className="text-primary font-bold">2003</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Global Expansion</h4>
                        <p className="text-gray-700">Opened manufacturing facilities in Europe and Asia to serve our growing international customer base.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <span className="text-primary font-bold">2010</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Sustainability Initiative</h4>
                        <p className="text-gray-700">Launched our GreenChem initiative focused on developing bio-based and environmentally friendly polyurethane systems.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <span className="text-primary font-bold">2022</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">Innovation Center</h4>
                        <p className="text-gray-700">Opened our state-of-the-art R&D and customer innovation center dedicated to next-generation polyurethane technology.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-xl p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                  <p className="text-gray-700 mb-6">
                    To provide innovative, sustainable polyurethane solutions that help our customers create better products while reducing environmental impact.
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Core Values</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700"><strong className="text-gray-900">Innovation:</strong> Continuously pushing the boundaries of polyurethane chemistry.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700"><strong className="text-gray-900">Sustainability:</strong> Developing products with minimal environmental impact.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700"><strong className="text-gray-900">Integrity:</strong> Operating with transparency and honesty in all relationships.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700"><strong className="text-gray-900">Excellence:</strong> Striving for the highest quality in everything we do.</span>
                    </li>
                  </ul>
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

export default AboutUs;