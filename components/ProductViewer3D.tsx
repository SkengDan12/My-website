import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ProductViewer3DProps {
  productType?: '3d-model' | 'molecular';
}

const ProductViewer3D: React.FC<ProductViewer3DProps> = ({ productType = '3d-model' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Simple camera rotation instead of OrbitControls
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    // Handle mouse movement with smooth interpolation
    const onDocumentMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX - window.innerWidth / 2) * 0.01;
      targetMouseY = (event.clientY - window.innerHeight / 2) * 0.01;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create geometry based on product type
    let geometry, material, mesh;
    
    if (productType === 'molecular') {
      // Create molecular structure (simplified representation)
      const group = new THREE.Group();
      
      // Create atoms
      const atomMaterial = new THREE.MeshPhongMaterial({ color: 0x0088ff });
      const atomGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      
      // Create bonds
      const bondMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
      const bondGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 16);
      
      // Position atoms in a pattern resembling a molecule
      const positions = [
        [0, 0, 0],
        [1.2, 0, 0],
        [-0.6, 1.0, 0.5],
        [-0.6, -1.0, 0.5],
        [1.8, 1.0, 0.5],
        [1.8, -1.0, 0.5]
      ];
      
      // Add atoms
      const atoms: THREE.Mesh[] = [];
      positions.forEach(pos => {
        const atom = new THREE.Mesh(atomGeometry, atomMaterial);
        atom.position.set(pos[0], pos[1], pos[2]);
        group.add(atom);
        atoms.push(atom);
      });
      
      // Connect atoms with bonds
      // Central atom to all others
      for (let i = 1; i < atoms.length; i++) {
        const start = atoms[0].position;
        const end = atoms[i].position;
        
        const bond = new THREE.Mesh(bondGeometry, bondMaterial);
        // Position bond
        bond.position.copy(new THREE.Vector3(
          (start.x + end.x) / 2,
          (start.y + end.y) / 2,
          (start.z + end.z) / 2
        ));
        
        // Orient bond
        bond.lookAt(end);
        bond.rotateX(Math.PI / 2);
        
        // Scale bond to fit between atoms
        const distance = start.distanceTo(end);
        bond.scale.y = distance;
        
        group.add(bond);
      }
      
      // Center the group
      scene.add(group);
      group.position.set(0, 0, 0);
      
      // Rotate slightly for better initial view
      group.rotation.x = 0.2;
      group.rotation.y = 0.4;
      
      // Animate the molecular structure
      const animate = () => {
        requestAnimationFrame(animate);
        
        group.rotation.y += 0.001;
        
        // Smooth interpolation for mouse movement
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
        
        // Update camera position based on smoothed mouse values
        camera.position.x += (mouseX - camera.position.x) * 0.1;
        camera.position.y += (-mouseY - camera.position.y) * 0.1;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
      };
      
      animate();
    } else {
      // Create 3D foam/panel model
      const panelGeometry = new THREE.BoxGeometry(3, 2, 0.3);
      const edges = new THREE.EdgesGeometry(panelGeometry);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x666666 }));
      scene.add(line);
      
      // Create foam texture
      const foamGroup = new THREE.Group();
      
      // Create the main panel
      const panelMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff9a00,
        transparent: true,
        opacity: 0.8,
        specular: 0x222222,
        shininess: 100
      });
      const panel = new THREE.Mesh(panelGeometry, panelMaterial);
      foamGroup.add(panel);
      
      // Add foam cell pattern
      const cellCount = 100;
      const cellGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const cellMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.3
      });
      
      for (let i = 0; i < cellCount; i++) {
        const cell = new THREE.Mesh(cellGeometry, cellMaterial);
        // Position cells randomly within the panel
        cell.position.set(
          (Math.random() - 0.5) * 2.5,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 0.2
        );
        foamGroup.add(cell);
      }
      
      scene.add(foamGroup);
      foamGroup.position.set(0, 0, 0);
      
      // Animate the foam structure
      const animate = () => {
        requestAnimationFrame(animate);
        
        foamGroup.rotation.y += 0.0015;
        
        // Smooth interpolation for mouse movement
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
        
        // Update camera position based on smoothed mouse values
        camera.position.x += (mouseX - camera.position.x) * 0.1;
        camera.position.y += (-mouseY - camera.position.y) * 0.1;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
      };
      
      animate();
    }
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [productType]);
  
  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default ProductViewer3D;