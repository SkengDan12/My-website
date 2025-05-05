import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface ProductFeature {
  id: string;
  name: string;
  description: string;
  details: string;
  features: string[];
  image: string;
  category?: string;
}

interface ProductCardProps {
  product: ProductFeature;
  index: number;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer active:scale-[0.99] touch-manipulation"
        onClick={() => setIsDetailOpen(true)}
        style={{ position: 'relative' }}
      >
        {/* Product Image */}
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <img 
            src={product.image}
            alt={product.name} 
            className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <h3 className="text-white text-lg sm:text-xl font-bold p-3 sm:p-4">{product.name}</h3>
          </div>
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
            Tap for details
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-3 sm:p-4">
          <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">{product.description}</p>
          
          {/* Feature Tags */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
            {product.features.slice(0, 2).map((feature, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-md flex items-center">
                <span className="text-primary mr-1">✓</span>
                {feature.split(' ')[0]}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-md">
                +{product.features.length - 2} more
              </span>
            )}
          </div>
          
          <Button 
            variant="default"
            size="sm"
            className="w-full text-xs sm:text-sm py-1.5 sm:py-2 hover:bg-primary/90 active:scale-[0.98]"
            onClick={(e) => {
              e.stopPropagation();
              setIsDetailOpen(true);
            }}
          >
            View Details
          </Button>
        </div>
      </div>

      {/* Product Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl p-4 sm:p-6 w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-white z-10 pb-2">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-primary mb-2">{product.name}</DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-gray-700">
              {product.details}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="rounded-lg overflow-hidden h-56 sm:h-64">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            {/* Product Features */}
            <div>
              <h4 className="text-md sm:text-lg font-semibold mb-2 sm:mb-3">Key Features</h4>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm sm:text-base">
                    <span className="inline-flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary/10 text-primary mr-2 mt-0.5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-3 mt-5 sm:mt-6 sticky bottom-0 pt-3 pb-1 bg-white border-t border-gray-100">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full sm:w-auto order-2 sm:order-1 text-xs sm:text-sm py-2 sm:py-2"
              onClick={() => {
                window.alert(`Technical data sheet for ${product.name} will download shortly.`);
              }}
            >
              Download Data Sheet
            </Button>
            <Button 
              variant="outline"
              size="sm" 
              className="w-full sm:w-auto order-3 sm:order-2 text-xs sm:text-sm py-2 sm:py-2"
              onClick={() => setIsDetailOpen(false)}
            >
              Close
            </Button>
            <Button 
              size="sm"
              className="w-full sm:w-auto order-1 sm:order-3 mb-2 sm:mb-0 text-xs sm:text-sm py-2 sm:py-2"
              onClick={() => {
                window.alert(`Thank you for your interest in ${product.name}! A sales representative will contact you shortly.`);
                setIsDetailOpen(false);
              }}
            >
              Request Quote
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
