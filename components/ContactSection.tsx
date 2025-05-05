import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import ContactForm from './ContactForm';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: 'fa-map-marker-alt',
      title: 'Our Location',
      details: ['123 Innovation Drive,', 'Industrial Park,', 'Manchester, M12 3AB']
    },
    {
      icon: 'fa-phone-alt',
      title: 'Call Us',
      details: ['+44 (0)161 123 4567', 'Mon-Fri: 8:30AM - 5:30PM']
    },
    {
      icon: 'fa-envelope',
      title: 'Email Us',
      details: ['info@dannyschemicals.com', 'sales@dannyschemicals.com']
    }
  ];

  const socialLinks = [
    { icon: 'fa-linkedin-in', url: '#' },
    { icon: 'fa-twitter', url: '#' },
    { icon: 'fa-facebook-f', url: '#' },
    { icon: 'fa-youtube', url: '#' }
  ];

  return (
    <section id="contact" className="py-10 sm:py-16 md:py-24 bg-gray-900 text-white" style={{ position: 'relative' }}>
      <div className="container-custom px-4 sm:px-6" style={{ position: 'relative' }}>
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start"
          style={{ position: 'relative' }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div 
              variants={fadeIn('right', 'tween', 0.1, 1)}
              className="inline-block p-1 px-3 sm:p-2 sm:px-4 bg-white/10 rounded-full text-white text-xs sm:text-sm font-medium mb-3 sm:mb-4"
              style={{ position: 'relative' }}
            >
              Get In Touch
            </motion.div>
            <motion.h2 
              variants={fadeIn('right', 'tween', 0.2, 1)}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
              style={{ position: 'relative' }}
            >
              Ready to Transform Your Projects?
            </motion.h2>
            
            <motion.p 
              variants={fadeIn('right', 'tween', 0.3, 1)}
              className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8"
              style={{ position: 'relative' }}
            >
              Contact our expert team to discuss how Danny's Chemicals can provide the ideal polyurethane solution for your specific requirements.
            </motion.p>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="space-y-4 sm:space-y-6"
              style={{ position: 'relative' }}
            >
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn('right', 'tween', 0.4 + (index * 0.1), 1)}
                  className="flex items-start"
                  style={{ position: 'relative' }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-md bg-primary text-white text-xs sm:text-base">
                      <i className={`fas ${info.icon}`}></i>
                    </div>
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-0.5 sm:mb-1">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-xs sm:text-sm text-gray-300">{detail}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              variants={fadeIn('right', 'tween', 0.7, 1)}
              className="mt-6 sm:mt-8"
              style={{ position: 'relative' }}
            >
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-4">Follow Us</h3>
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a 
                    key={index}
                    href={link.url}
                    whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary))' }}
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors duration-300 text-xs sm:text-base"
                    style={{ position: 'relative' }}
                  >
                    <i className={`fab ${link.icon}`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={fadeIn('left', 'tween', 0.5, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            style={{ position: 'relative' }}
          >
            <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-xl text-gray-800" style={{ position: 'relative' }}>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Send Us a Message</h3>
              
              <ContactForm />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
