import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import TestimonialSlider from './TestimonialSlider';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Danny's Chemicals' spray foam insulation has dramatically improved our building's energy efficiency. We've seen a 40% reduction in heating and cooling costs since installation.",
      author: "Robert Thompson",
      position: "Facility Manager, GreenBuild Construction",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5
    },
    {
      quote: "We've been using Danny's rigid foam for our marine applications for over 5 years. The durability and performance in harsh saltwater environments is unmatched in the industry.",
      author: "Michelle Davis",
      position: "Production Director, OceanTech Marine",
      avatar: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5
    },
    {
      quote: "Their waterproofing solution has extended the life of our industrial roofing by at least 15 years. The technical support team was exceptional throughout the entire project.",
      author: "James Wilson",
      position: "Operations Manager, Industrial Solutions Inc.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      rating: 4.5
    },
    {
      quote: "Danny's pre-polymer systems have allowed us to create custom products that exactly meet our specifications. Their R&D team's expertise has been invaluable to our manufacturing process.",
      author: "Samantha Lee",
      position: "Product Development, TechForm Industries",
      avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
      rating: 5
    }
  ];

  // Industry leaders
  const industryLeaders = [
    { name: 'Isothane', color: '#ff9a00' },
    { name: 'BASF', color: '#1D428A' },
    { name: 'Dow Chemical', color: '#E40046' },
    { name: 'Huntsman', color: '#002D74' },
    { name: 'Covestro', color: '#009BAA' },
    { name: 'Evonik', color: '#E30066' }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white" style={{ position: 'relative' }}>
      <div className="container-custom" style={{ position: 'relative' }}>
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-16"
          style={{ position: 'relative' }}
        >
          <motion.div 
            variants={fadeIn('up', 'tween', 0.1, 1)}
            className="inline-block p-2 px-4 bg-primary/10 rounded-full text-primary font-medium mb-4"
          >
            Client Success Stories
          </motion.div>
          <motion.h2 
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            variants={fadeIn('up', 'tween', 0.3, 1)}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Hear from organizations that have transformed their projects with Danny's Chemicals polyurethane solutions.
          </motion.p>
        </motion.div>
        
        {/* Testimonial Slider */}
        <motion.div 
          variants={fadeIn('up', 'tween', 0.4, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-5xl mx-auto"
        >
          <TestimonialSlider testimonials={testimonials} />
        </motion.div>
        
        {/* Brands Section */}
        <motion.div 
          variants={fadeIn('up', 'tween', 0.5, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-20"
          style={{ position: 'relative' }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-8 text-center">
            Trusted by Industry Leaders
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center" style={{ position: 'relative' }}>
            {industryLeaders.map((company, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center p-4 transition-all duration-300"
                style={{ position: 'relative' }}
              >
                <div 
                  className="font-bold text-lg md:text-xl text-center"
                  style={{ 
                    position: 'relative',
                    color: company.color,
                    fontFamily: index === 0 ? 'var(--font-logo-primary)' : 'var(--font-heading)'
                  }}
                >
                  {company.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;