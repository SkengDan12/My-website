import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasLoaded, setCanvasLoaded] = useState(false);

  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create a molecular structure
    const geometry = new THREE.IcosahedronGeometry(15, 1);
    const material = new THREE.MeshStandardMaterial({ 
      color: '#ff9a00',
      metalness: 0.7,
      roughness: 0.2,
      wireframe: true 
    });
    
    const molecule = new THREE.Mesh(geometry, material);
    scene.add(molecule);
    
    // Add particles for chemical atoms
    const particlesCount = 2000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      particlesPositions[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: '#ffffff',
      transparent: true,
      opacity: 0.8
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Set camera position
    camera.position.z = 50;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xff9a00, 2);
    pointLight.position.set(25, 25, 25);
    scene.add(pointLight);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      molecule.rotation.x += 0.002;
      molecule.rotation.y += 0.003;
      
      particles.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    animate();
    setCanvasLoaded(true);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      scene.remove(molecule);
      scene.remove(particles);
      renderer.dispose();
    };
  }, []);

  return (
    <motion.section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800"
      style={{ position: 'relative' }}
    >
      {/* 3D Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent z-10"></div>
      
      {/* Animated Noise Texture */}
      <div className="absolute inset-0 opacity-10 z-10 mix-blend-overlay">
        <div className="noise-animation"></div>
      </div>
      
      {/* Hero Content */}
      <motion.div 
        className="container-custom relative z-20"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="max-w-4xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-block bg-gradient-to-r from-primary to-primary/80 px-6 py-2 mb-4 rounded-sm" style={{ fontFamily: "var(--font-logo-primary)" }}>
              <span className="text-base text-white tracking-widest uppercase font-bold">Danny's Chemicals</span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Advanced Polyurethane <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Technology
              </span>
            </h1>
            <div className="h-1 w-20 bg-primary mt-4 sm:mt-6 mb-4 sm:mb-6"></div>
          </motion.div>
          
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-10 leading-relaxed max-w-3xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Cutting-edge polyurethane solutions engineered for performance, 
            sustainability, and innovation across industries.
          </motion.p>
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Button 
              size="lg" 
              className="relative bg-primary hover:bg-primary-dark text-white text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-[0_0_20px_rgba(255,154,0,0.5)] hover:shadow-[0_0_30px_rgba(255,154,0,0.7)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group w-full sm:w-auto"
              asChild
            >
              <a href="#products" style={{ fontFamily: "var(--font-sans)" }}>
                <span className="relative z-10">Explore Products</span>
                <div className="absolute inset-0 bg-white/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="relative border-2 border-white/30 bg-transparent hover:bg-gray-800/50 text-white text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group w-full sm:w-auto"
              asChild
            >
              <a href="#contact" style={{ fontFamily: "var(--font-sans)" }}>
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-primary/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </a>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center mt-12"
          >
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-white"></div>
            </div>
            <p className="ml-4 text-white/80">Trusted by 500+ businesses worldwide</p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <a href="#featured" className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </a>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
