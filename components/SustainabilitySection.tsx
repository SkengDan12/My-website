import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, feature } from '@/lib/animations';

const SustainabilitySection = () => {
  const sustainabilityFeatures = [
    {
      icon: 'fa-recycle',
      title: 'Recyclable Materials',
      description: 'Our products are designed with end-of-life considerations, incorporating recyclable and recoverable materials wherever possible.'
    },
    {
      icon: 'fa-leaf',
      title: 'Bio-Based Content',
      description: 'We incorporate renewable, bio-based raw materials that reduce dependence on fossil fuels while maintaining product performance.'
    },
    {
      icon: 'fa-industry',
      title: 'Reduced Carbon Footprint',
      description: 'Our manufacturing processes are optimized to minimize energy consumption and greenhouse gas emissions.'
    },
    {
      icon: 'fa-certificate',
      title: 'Environmental Certifications',
      description: 'Our products meet or exceed industry environmental standards and certifications for sustainable building materials.'
    }
  ];

  const sustainabilityMetrics = [
    {
      value: '45%',
      label: 'Recycled Content',
      description: 'Average across our product line'
    },
    {
      value: '32%',
      label: 'Bio-Based Materials',
      description: 'Derived from renewable sources'
    },
    {
      value: '12K+',
      label: 'Tons CO₂ Avoided',
      description: 'Through sustainable practices yearly'
    }
  ];

  return (
    <section id="sustainability" className="py-16 md:py-24 bg-white" style={{ position: 'relative' }}>
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
            Eco-Friendly Innovation
          </motion.div>
          <motion.h2 
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Our Commitment to Sustainability
          </motion.h2>
          <motion.p 
            variants={fadeIn('up', 'tween', 0.3, 1)}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Danny's Chemicals is pioneering sustainable polyurethane technologies that deliver performance without compromising our planet's future.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-8">
              {sustainabilityFeatures.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn('right', 'tween', 0.2 + index * 0.1, 1)}
                  className="flex"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <i className={`fas ${feature.icon}`}></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeIn('left', 'tween', 0.3, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Sustainable chemical manufacturing" 
                className="rounded-lg shadow-xl"
              />
              
              {/* Carbon Footprint Reduction Infographic */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-lg shadow-lg border-l-4 border-accent hidden md:block">
                <h4 className="text-lg font-bold text-gray-800 mb-2">Carbon Footprint Reduction</h4>
                <div className="flex items-center space-x-3">
                  <div className="relative w-24 h-24">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path 
                        className="circle-bg" 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        fill="none" 
                        stroke="#eee" 
                        strokeWidth="2"
                      />
                      <path 
                        className="circle" 
                        strokeDasharray="75, 100" 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        fill="none" 
                        stroke="#28a745" 
                        strokeWidth="2"
                      />
                      <text x="18" y="20.5" className="percentage" textAnchor="middle" fontSize="8" fill="#666">75%</text>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Our next-gen products reduce carbon emissions by up to <span className="font-bold text-accent">75%</span> compared to traditional options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Sustainability Metrics */}
        <motion.div 
          variants={fadeIn('up', 'tween', 0.4, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-20 bg-gray-50 rounded-xl p-8 shadow-md"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Sustainability Impact</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sustainabilityMetrics.map((metric, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                <p className="text-lg font-medium text-gray-700 mb-1">{metric.label}</p>
                <p className="text-gray-600 text-sm">{metric.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
