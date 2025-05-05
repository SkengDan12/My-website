import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  avatar: string;
  rating: number;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

const TestimonialSlider = ({ testimonials }: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  // Determine how many slides to show based on viewport width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(prev => 
      prev === 0 ? Math.max(0, testimonials.length - slidesPerView) : prev - 1
    );
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex(prev => 
      prev >= Math.max(0, testimonials.length - slidesPerView) ? 0 : prev + 1
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Render full stars based on rating
  const renderRating = (rating: number) => {
    return [...Array(5)].map((_, index) => {
      let starClass = 'fas fa-star';
      if (index >= Math.floor(rating) && index < Math.ceil(rating)) {
        starClass = 'fas fa-star-half-alt';
      } else if (index >= rating) {
        starClass = 'far fa-star';
      }
      return <i key={index} className={`${starClass} mr-1`}></i>;
    });
  };

  return (
    <div className="testimonial-slider relative max-w-5xl mx-auto" style={{ position: 'relative' }}>
      <div className="overflow-hidden" style={{ position: 'relative' }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div 
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.5 }}
            className="flex"
            style={{ position: 'relative' }}
          >
            {testimonials.slice(currentIndex, currentIndex + slidesPerView).map((testimonial, index) => (
              <div 
                key={index} 
                className={`w-full px-4 ${slidesPerView > 1 ? `md:w-1/${slidesPerView}` : ''}`}
                style={{ position: 'relative' }}
              >
                <div className="bg-gray-50 rounded-lg p-6 shadow-md h-full flex flex-col" style={{ position: 'relative' }}>
                  <div className="text-accent mb-4">
                    {renderRating(testimonial.rating)}
                  </div>
                  <p className="text-gray-600 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.author} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.author}</h4>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Slider Controls */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 text-primary hover:text-secondary transition-colors"
        style={{ position: 'absolute' }}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 text-primary hover:text-secondary transition-colors"
        style={{ position: 'absolute' }}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
      
      {/* Slider Indicators */}
      <div className="flex justify-center mt-8 space-x-2" style={{ position: 'relative' }}>
        {[...Array(Math.ceil(testimonials.length / slidesPerView))].map((_, index) => (
          <button 
            key={index}
            onClick={() => goToSlide(index * slidesPerView)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === Math.floor(currentIndex / slidesPerView) 
                ? 'bg-primary opacity-100' 
                : 'bg-gray-300 opacity-50'
            }`}
            style={{ position: 'relative' }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
