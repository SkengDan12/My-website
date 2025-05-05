import { Link } from 'wouter';

const Footer = () => {
  const productLinks = [
    { name: 'Spray Foam Insulation', href: '#spray-foam' },
    { name: 'Rigid Polyurethane Foam', href: '#rigid-foam' },
    { name: 'Waterproofing Solutions', href: '#waterproofing' },
    { name: 'Pre-Polymers & CASE', href: '#prepolymers' },
    { name: 'Product Documentation', href: '#' },
    { name: 'Safety Data Sheets', href: '#' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Sustainability', href: '#sustainability' },
    { name: 'Careers', href: '#' },
    { name: 'News & Events', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact Us', href: '#contact' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">Danny's <span className="text-secondary">Chemicals</span></h3>
            <p className="text-gray-400 mb-6">Leading provider of advanced polyurethane technology solutions for diverse industrial applications.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for industry insights and product updates.</p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-gray-900"
                />
                <button 
                  type="submit" 
                  className="bg-secondary hover:bg-secondary-dark px-4 py-2 rounded-r-md transition duration-300 ease-in-out"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
            <p className="text-gray-400 text-sm">By subscribing, you agree to our Privacy Policy.</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Danny's Chemicals Ltd. All rights reserved.</p>
            <div className="flex space-x-6">
              {legalLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
