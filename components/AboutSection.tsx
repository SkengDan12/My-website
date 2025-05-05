import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';

const AboutSection = () => {
  const stats = [
    { value: '25+', label: 'Years of Experience' },
    { value: '500+', label: 'Projects Completed' },
    { value: '18', label: 'Patents Held' },
    { value: '42', label: 'Countries Served' }
  ];

  const teamMembers = [
    {
      name: 'Daniel Reynolds',
      role: 'Founder & CEO',
      bio: 'With 30+ years in polyurethane chemistry, Daniel leads our innovation strategy.',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Research Officer',
      bio: 'Sarah leads our R&D team, specializing in sustainable polyurethane formulations.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Marcus Johnson',
      role: 'Technical Director',
      bio: 'Marcus oversees product development and quality control processes.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Jessica Martinez',
      role: 'Sustainability Director',
      bio: 'Jessica leads our initiatives to reduce environmental impact across operations.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50" style={{ position: 'relative' }}>
      <div className="container-custom" style={{ position: 'relative' }}>
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ position: 'relative' }}
        >
          <motion.div
            variants={fadeIn('right', 'tween', 0.2, 1)}
          >
            <img 
              src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Danny's Chemicals facility" 
              className="rounded-lg shadow-xl"
            />
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div 
              variants={fadeIn('left', 'tween', 0.2, 1)}
              className="inline-block p-2 px-4 bg-primary/10 rounded-full text-primary font-medium mb-4"
            >
              Our Story
            </motion.div>
            <motion.h2 
              variants={fadeIn('left', 'tween', 0.3, 1)}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
            >
              Leading Innovation in Polyurethane Technology
            </motion.h2>
            
            <motion.p 
              variants={fadeIn('left', 'tween', 0.4, 1)}
              className="text-gray-600 mb-6"
            >
              Danny's Chemicals was founded on a simple principle: to engineer polyurethane solutions that push the boundaries of performance while prioritizing sustainability. For over two decades, we've been at the forefront of polyurethane innovation.
            </motion.p>
            
            <motion.p 
              variants={fadeIn('left', 'tween', 0.5, 1)}
              className="text-gray-600 mb-6"
            >
              Our team of industry-leading chemists and engineers work tirelessly to develop formulations that solve our customers' most challenging problems, from extreme weather protection to specialized industrial applications.
            </motion.p>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn('up', 'tween', 0.6 + (index * 0.1), 1)}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <p className="text-gray-700 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Team Section */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <motion.h3 
              variants={fadeIn('up', 'tween', 0.2, 1)}
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
            >
              Meet Our Leadership Team
            </motion.h3>
            <motion.p 
              variants={fadeIn('up', 'tween', 0.3, 1)}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              The experts behind our innovative polyurethane solutions.
            </motion.p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={fadeIn('up', 'tween', 0.3 + (index * 0.1), 1)}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg overflow-hidden shadow-md text-center group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800">{member.name}</h4>
                  <p className="text-primary mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
