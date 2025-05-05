import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed w-full z-50 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/95'} transition-all duration-300`}>
      <div className="container-custom">
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black text-primary tracking-tight leading-none" style={{ fontFamily: "var(--font-stencil)" }}>DANNY'S</span>
                  <span className="text-sm sm:text-lg font-bold text-secondary tracking-widest leading-none mt-0" style={{ fontFamily: "var(--font-tech)" }}>CHEMICALS</span>
                </div>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </div>
              <div className="h-8 w-0.5 bg-primary rounded-sm mx-3 hidden sm:block"></div>
              <span className="text-xs text-gray-600 ml-1 font-medium hidden sm:block uppercase tracking-wider" style={{ fontFamily: "var(--font-sans)" }}>Polyurethane Technology</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="nav-link">Home</Link>
            <div className="relative group">
              <Link href="/products" className="nav-link flex items-center cursor-pointer">
                Products <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </Link>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md p-2 hidden group-hover:block z-50"
              >
                <Link href="/product/spray-foam" className="block px-4 py-2 hover:bg-gray-100 rounded text-sm">Spray Foam Insulation</Link>
                <Link href="/product/rigid-foam" className="block px-4 py-2 hover:bg-gray-100 rounded text-sm">Rigid Polyurethane Foam</Link>
                <Link href="/product/waterproofing" className="block px-4 py-2 hover:bg-gray-100 rounded text-sm">Waterproofing Solutions</Link>
                <Link href="/product/prepolymers" className="block px-4 py-2 hover:bg-gray-100 rounded text-sm">Pre-Polymers & CASE</Link>
              </motion.div>
            </div>
            <Link href="/sustainability" className="nav-link">Sustainability</Link>
            <Link href="/about" className="nav-link">About Us</Link>
            <Link href="/testimonials" className="nav-link">Testimonials</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </div>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="p-2 h-auto w-auto focus:ring-2 focus:ring-primary/20"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl text-gray-700 hover:text-primary`}></i>
            </Button>
          </div>
          
          <div className="hidden md:block">
            <Button 
              className="bg-secondary hover:bg-secondary-dark text-white font-bold"
              asChild
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-white pb-4 shadow-lg overflow-hidden"
        style={{ position: 'relative' }}
      >
        <div className="px-4 pt-2 pb-3 space-y-2">
          <Link 
            href="/" 
            className="block px-4 py-3 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <div className="relative">
            <Link 
              href="/products"
              className="block px-4 py-3 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <div className="pl-6 space-y-1 mb-2">
              <Link 
                href="/product/spray-foam" 
                className="block px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Spray Foam Insulation
              </Link>
              <Link 
                href="/product/rigid-foam" 
                className="block px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Rigid Polyurethane Foam
              </Link>
              <Link 
                href="/product/waterproofing" 
                className="block px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Waterproofing Solutions
              </Link>
              <Link 
                href="/product/prepolymers" 
                className="block px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pre-Polymers & CASE
              </Link>
            </div>
          </div>
          <Link 
            href="/sustainability" 
            className="block px-4 py-3 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sustainability
          </Link>
          <Link 
            href="/about" 
            className="block px-4 py-3 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            href="/testimonials" 
            className="block px-4 py-3 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Testimonials
          </Link>
          <Link 
            href="/contact" 
            className="block px-4 py-3 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Button 
            className="mt-5 mx-3 w-[calc(100%-1.5rem)] bg-secondary hover:bg-secondary-dark active:bg-secondary/90 text-white py-6 text-base font-bold"
            asChild
          >
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Get a Quote</Link>
          </Button>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
