import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 bg-primary" style={{ position: 'relative' }}>
      <div className="container-custom text-center" style={{ position: 'relative' }}>
        <motion.h2 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn('up', 'tween', 0.1, 1)}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          Ready to Elevate Your Projects with Advanced Polyurethane Technology?
        </motion.h2>
        <motion.p 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="text-xl text-white/90 max-w-3xl mx-auto mb-8"
        >
          Join hundreds of satisfied companies who trust Danny's Chemicals for their polyurethane needs.
        </motion.p>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn('up', 'tween', 0.3, 1)}
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-accent hover:text-white text-lg font-bold"
            asChild
          >
            <a href="#contact">Contact Our Team</a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg font-bold"
            asChild
          >
            <a href="#products">Explore Products</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
