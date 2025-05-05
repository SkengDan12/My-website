import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import ProductsSection from '@/components/ProductsSection';
import ProductShowcase from '@/components/ProductShowcase';
import InteractiveProductChart from '@/components/InteractiveProductChart';
import SustainabilitySection from '@/components/SustainabilitySection';
import SustainabilityCalculator from '@/components/SustainabilityCalculator';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AIAssistant from '@/components/AIAssistant';

const Home = () => {
  // Set page title and description
  useEffect(() => {
    document.title = "Danny's Chemicals - Innovative Polyurethane Technology";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Danny's Chemicals delivers cutting-edge polyurethane solutions engineered for performance, sustainability, and innovation.");
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Navbar />
      <HeroSection />
      <FeaturedSection />
      <ProductShowcase />
      <div className="container mx-auto px-4 py-16 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Product Performance Analysis</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare our polyurethane product lines across key performance metrics and calculate project costs with our interactive tools.
          </p>
        </div>
        <InteractiveProductChart />
      </div>
      <SustainabilitySection />
      <SustainabilityCalculator />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <CTASection />
      <Footer />
      <BackToTop />
      <AIAssistant />
    </div>
  );
};

export default Home;
