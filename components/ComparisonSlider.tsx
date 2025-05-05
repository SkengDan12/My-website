import { useState, useRef, useEffect } from 'react';
import './comparison-slider.css';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const ComparisonSlider = ({ 
  beforeImage, 
  afterImage, 
  beforeLabel = 'Before', 
  afterLabel = 'After' 
}: ComparisonSliderProps) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    // Prevent default behavior to avoid text selection during drag
    e.preventDefault();
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pos = (x / rect.width) * 100;
    
    // Clamp position between 0 and 100
    if (pos < 0) setPosition(0);
    else if (pos > 100) setPosition(100);
    else setPosition(pos);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    // Prevent scrolling while dragging on touch devices
    e.preventDefault();
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const pos = (x / rect.width) * 100;
    
    // Clamp position between 0 and 100
    if (pos < 0) setPosition(0);
    else if (pos > 100) setPosition(100);
    else setPosition(pos);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove as any);
    document.addEventListener('touchend', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove as any);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="comparison-slider-wrapper" style={{ position: 'relative' }}>
      <div 
        className="comparison-slider-container" 
        ref={containerRef} 
        style={{ position: 'relative', height: '400px' }}
      >
        {/* After Image (Background) */}
        <div 
          className="comparison-image after-image" 
          style={{ 
            backgroundImage: `url(${afterImage})`,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="comparison-label after-label">
            {afterLabel}
          </div>
        </div>
        
        {/* Before Image (Foreground with clip) */}
        <div 
          className="comparison-image before-image" 
          style={{ 
            backgroundImage: `url(${beforeImage})`,
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${position}%`,
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRight: '3px solid #fff'
          }}
        >
          <div className="comparison-label before-label">
            {beforeLabel}
          </div>
        </div>
        
        {/* Slider Handle */}
        <div 
          className="comparison-handle"
          style={{ 
            position: 'absolute',
            top: '50%',
            left: `${position}%`,
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            cursor: 'ew-resize',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8L22 12L18 16"></path>
            <path d="M6 8L2 12L6 16"></path>
            <line x1="2" y1="12" x2="22" y2="12"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
