import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import AIAssistant from '@/components/AIAssistant';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 mb-16"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-700">
              Have questions about our products or services? Our team is ready to help you find the perfect polyurethane solution for your needs.
            </p>
          </div>
        </motion.div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-700">Sales: +1 (800) 555-1234</p>
                    <p className="text-gray-700">Support: +1 (800) 555-5678</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-700">Sales: sales@dannyschemicals.com</p>
                    <p className="text-gray-700">Support: support@dannyschemicals.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Headquarters</h3>
                    <p className="text-gray-700">1234 Innovation Drive</p>
                    <p className="text-gray-700">Houston, TX 77001</p>
                    <p className="text-gray-700">United States</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-700">Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                    <p className="text-gray-700">Saturday: 9:00 AM - 1:00 PM EST</p>
                    <p className="text-gray-700">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Global Locations</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">North America</h3>
                    <p className="text-gray-700 mb-1">Houston, TX (HQ)</p>
                    <p className="text-gray-700 mb-1">Chicago, IL</p>
                    <p className="text-gray-700">Toronto, Canada</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Europe</h3>
                    <p className="text-gray-700 mb-1">Manchester, UK</p>
                    <p className="text-gray-700 mb-1">Frankfurt, Germany</p>
                    <p className="text-gray-700">Milan, Italy</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Asia Pacific</h3>
                    <p className="text-gray-700 mb-1">Shanghai, China</p>
                    <p className="text-gray-700 mb-1">Singapore</p>
                    <p className="text-gray-700">Melbourne, Australia</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Latin America</h3>
                    <p className="text-gray-700 mb-1">Mexico City, Mexico</p>
                    <p className="text-gray-700 mb-1">São Paulo, Brazil</p>
                    <p className="text-gray-700">Bogotá, Colombia</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <ContactForm />
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Visit Our Headquarters</h2>
            <div className="h-96 bg-gray-200 rounded-xl overflow-hidden">
              {/* Replace with actual map implementation if needed */}
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center p-8">
                  <MapPin className="w-12 h-12 text-primary/50 mx-auto mb-4" />
                  <p className="text-lg font-bold text-gray-900">Map Placeholder</p>
                  <p className="text-gray-600">1234 Innovation Drive, Houston, TX 77001</p>
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

export default Contact;