import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Hello! I'm Danny's Chemicals AI Assistant, your polyurethane technology expert. I can provide detailed information about:\n\n• ProFoam insulation (R-value 6.5 per inch)\n• RigidCore structural foams (2-50 lb/ft³)\n• FlexCoat waterproofing (850% elongation)\n• PolyFlex custom formulations\n\nAsk me about specifications, applications, pricing, sustainability, or any other topic. No sign-up required - I'm here to help!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Ensure component is mounted properly
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current && messages.length > 0) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'end'
          });
        }
      }, 100);
    }
  }, [messages]);

  // Handle form submission
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim() || !isMounted) return;
    
    const userInput = input.trim();
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Get AI response - simulates typing delay
    const timer = setTimeout(() => {
      if (!isMounted) return;
      
      const response = getAIResponse(userInput);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
    
    return () => clearTimeout(timer);
  };

  // Advanced AI response generator that analyzes user input
  const getAIResponse = (query: string): string => {
    console.log("Analyzing query:", query); // Debug log
    
    // Parse the query comprehensively
    const queryLower = query.toLowerCase().trim();
    const words = queryLower.split(/\s+/);
    const queryLength = words.length;
    
    // Extract key information from the query
    const extractedEntities = {
      products: [] as string[],
      topics: [] as string[],
      questionType: "",
      comparisons: [] as string[],
      properties: [] as string[]
    };
    
    // Product detection - more comprehensive
    const productTerms = {
      profoam: ['profoam', 'spray foam', 'insulation', 'spray insulation', 'foam insulation'],
      rigidcore: ['rigidcore', 'rigid', 'foam board', 'board', 'structural foam', 'rigid foam'],
      flexcoat: ['flexcoat', 'coating', 'waterproofing', 'membrane', 'waterproof', 'elastomeric'],
      polyflex: ['polyflex', 'custom', 'formulation', 'prepolymer', 'specialty', 'adhesive', 'sealant']
    };
    
    // Check which products are mentioned in the query
    Object.entries(productTerms).forEach(([product, terms]) => {
      if (terms.some(term => queryLower.includes(term))) {
        extractedEntities.products.push(product);
      }
    });
    
    // Topic detection
    const topicTerms = {
      technical: ['technical', 'spec', 'specification', 'data', 'property', 'properties'],
      application: ['application', 'install', 'installing', 'apply', 'applying', 'use', 'usage'],
      price: ['price', 'cost', 'expensive', 'cheap', 'affordable', 'pricing', 'quote'],
      comparison: ['compare', 'comparison', 'better', 'best', 'alternative', 'difference', 'versus', 'vs'],
      sustainability: ['sustainable', 'green', 'eco', 'environment', 'environmental', 'friendly'],
      availability: ['available', 'availability', 'purchase', 'buy', 'order', 'delivery', 'ship']
    };
    
    // Check which topics are mentioned in the query
    Object.entries(topicTerms).forEach(([topic, terms]) => {
      if (terms.some(term => queryLower.includes(term))) {
        extractedEntities.topics.push(topic);
      }
    });
    
    // Property detection - find specific properties the user is asking about
    const propertyTerms = {
      'r-value': ['r-value', 'r value', 'thermal', 'insulation value', 'insulating'],
      'strength': ['strength', 'strong', 'durable', 'load', 'weight', 'pressure', 'psi', 'compression'],
      'waterproofing': ['waterproof', 'water-resistant', 'moisture', 'leak', 'leakage', 'barrier'],
      'application': ['application', 'apply', 'spray', 'installation', 'install', 'cure', 'curing'],
      'density': ['density', 'dense', 'weight', 'lb/ft3', 'pound', 'light', 'heavy'],
      'elongation': ['elongation', 'stretch', 'flexible', 'flexibility', 'elasticity', 'elastic'],
      'chemical': ['chemical', 'composition', 'formula', 'ingredient', 'polyol', 'isocyanate'],
      'certification': ['certification', 'certified', 'approval', 'approved', 'rating', 'rated', 'code', 'compliance']
    };
    
    // Check which properties are mentioned in the query
    Object.entries(propertyTerms).forEach(([property, terms]) => {
      if (terms.some(term => queryLower.includes(term))) {
        extractedEntities.properties.push(property);
      }
    });
    
    // Question type detection - determine the nature of the question
    if (queryLower.endsWith('?') || 
        queryLower.startsWith('what') || 
        queryLower.startsWith('how') || 
        queryLower.startsWith('why') || 
        queryLower.startsWith('where') || 
        queryLower.startsWith('when') || 
        queryLower.startsWith('can') || 
        queryLower.startsWith('do') || 
        queryLower.startsWith('is') ||
        queryLower.startsWith('are') ||
        queryLower.startsWith('will')) {
      // Common direct questions about products and company
      if (queryLower.includes('what') && queryLower.includes('product')) {
        return "Danny's Chemicals offers four main product lines: ProFoam spray insulation systems with R-value 6.5 per inch, RigidCore structural foam boards for high-strength applications, FlexCoat elastomeric waterproofing membranes, and PolyFlex custom-formulated prepolymers for specialized industrial uses. Which product line would you like to learn more about?";
      }
      
      if (queryLower.includes('how') && queryLower.includes('work')) {
        return "Our polyurethane systems work through a chemical reaction between isocyanates (A-side) and polyols (B-side). When mixed, these components create a polymer matrix that forms either foam or elastomeric materials depending on the formulation. For spray foam, tiny cells form and expand, creating insulation. For elastomeric coatings, the polymer chains cross-link to create flexible waterproof membranes. Would you like details on a specific product?";
      }
      
      if (queryLower.includes('where') && (queryLower.includes('buy') || queryLower.includes('purchase') || queryLower.includes('get'))) {
        return "Our products are available directly through Danny's Chemicals and our network of authorized distributors nationwide. For professional-grade materials like ProFoam, we work with certified contractors who can both supply and install the product. For DIY-friendly products, please contact our sales team at sales@dannyschemicals.com for the nearest retailer. Would you like us to connect you with a distributor?";
      }
      
      if (queryLower.includes('who') && queryLower.includes('use')) {
        return "Our products are used by a diverse range of professionals including commercial and residential builders, insulation contractors, roofers, marine fabricators, industrial manufacturers, and specialty applicators. Our systems are designed for professional application, though we do offer training programs for contractors new to polyurethane technologies. Are you a contractor looking to expand your service offerings?";
      }
      
      if (queryLower.includes('when') && (queryLower.includes('use') || queryLower.includes('apply'))) {
        return "The best application conditions for our products vary slightly. Most spray foam systems perform optimally when ambient temperatures are between 60-90°F (15-32°C) with substrate temperatures at least 5°F above dew point. FlexCoat waterproofing can be applied year-round but curing times may be extended in colder conditions. We offer specialized winter-grade formulations for applications below 40°F (4°C). Is there a specific season you're planning for application?";
      }
      
      if ((queryLower.includes('what') || queryLower.includes('which')) && queryLower.includes('best')) {
        return "The 'best' product depends entirely on your specific application needs. ProFoam excels in thermal performance and air sealing, RigidCore provides exceptional structural strength, FlexCoat offers superior waterproofing and elongation, and PolyFlex can be customized for unique performance requirements. I'd be happy to recommend the optimal product if you can share details about your specific project requirements.";
      }
    }
    
    // Product Information with contextual responses
    if (queryLower.includes('profoam') || (queryLower.includes('spray') && queryLower.includes('foam'))) {
      if (queryLower.includes('price') || queryLower.includes('cost')) {
        return "ProFoam pricing varies based on project specifications and volume. For a typical residential project, the installed cost ranges from $1.25-$1.75 per board foot depending on thickness and complexity. We'd be happy to provide a detailed quote for your specific project needs.";
      } else if (queryLower.includes('installation') || queryLower.includes('apply')) {
        return "ProFoam installation requires specialized equipment and certified applicators. Our nationwide network of trained contractors uses high-pressure equipment to apply the material. The foam expands rapidly to fill cavities and cure time is approximately 24 hours for full strength. Would you like us to connect you with a certified installer in your area?";
      } else {
        return "ProFoam is our flagship closed-cell spray polyurethane foam insulation system with an R-value of 6.5 per inch. It creates a seamless air barrier and vapor retarder while providing superior thermal performance, air sealing, and moisture control in residential and commercial applications. ProFoam is particularly effective for complex geometries, retrofits, and high-performance building envelopes. Would you like specific technical information about its thermal, structural, or moisture-resistance properties?";
      }
    }
    
    if (queryLower.includes('rigidcore') || (queryLower.includes('rigid') && queryLower.includes('foam'))) {
      if (queryLower.includes('marine') || queryLower.includes('boat')) {
        return "RigidCore is excellent for marine applications due to its exceptional water resistance, buoyancy, and dimensional stability. Our marine-grade formulations include additional UV stabilizers and biocides to prevent degradation in harsh marine environments. It's commonly used for flotation, composite hulls, and structural components.";
      } else if (queryLower.includes('strength') || queryLower.includes('load')) {
        return "RigidCore delivers exceptional structural performance with compressive strengths ranging from 40 psi (2 lb/ft³ density) to over 900 psi (50 lb/ft³ density). Its closed-cell structure provides superior resistance to water absorption and dimensional stability under load. This makes it ideal for structural panels and load-bearing applications.";
      } else {
        return "RigidCore is our high-density rigid polyurethane foam system with exceptional strength-to-weight ratio. It's available in various densities (2-50 lb/ft³) and is ideal for structural applications requiring both load-bearing capacity and thermal performance. Common applications include structural insulated panels, marine flotation, architectural components, and core material for composite sandwich structures. What specific performance characteristics are you interested in?";
      }
    }
    
    if (queryLower.includes('flexcoat') || queryLower.includes('waterproofing') || queryLower.includes('membrane')) {
      if (queryLower.includes('roof') || queryLower.includes('roofing')) {
        return "FlexCoat is an excellent solution for both new roof construction and restoration of existing roofing systems. It can be applied over most substrates and provides a seamless, reflective surface that reduces cooling costs and extends roof life. The system includes a base coat, reinforcement for high-stress areas, and a UV-stable top coat.";
      } else if (queryLower.includes('warranty') || queryLower.includes('guarantee')) {
        return "FlexCoat systems are backed by our comprehensive 20-year material warranty when installed by certified applicators. This warranty covers water intrusion, membrane deterioration, and adhesion failure. We also offer extended 25-year warranties for commercial projects with our premium specification.";
      } else {
        return "FlexCoat is our premium liquid-applied polyurethane waterproofing membrane that creates a seamless, monolithic barrier against water intrusion. It features 850% elongation, excellent crack-bridging ability, and industry-leading UV stability. FlexCoat can be applied to virtually any substrate and is ideal for roofs, foundations, plaza decks, balconies, mechanical rooms, and green roof assemblies. What specific waterproofing challenge are you looking to solve?";
      }
    }
    
    if (queryLower.includes('polyflex') || queryLower.includes('prepolymer') || queryLower.includes('custom')) {
      if (queryLower.includes('medical') || queryLower.includes('healthcare')) {
        return "Our PolyFlex Medical series is specially formulated for healthcare applications, with biocompatible grades meeting ISO 10993 standards. These formulations are available in various hardness ranges with options for transparency, antimicrobial additives, and radiopaque fillers.";
      } else if (queryLower.includes('adhesive') || queryLower.includes('bonding')) {
        return "PolyFlex adhesive systems provide exceptional bonding strength on difficult substrates without surface treatments. Our formulations offer customizable cure profiles, viscosities, and flexibility to match your manufacturing processes and performance requirements.";
      } else {
        return "PolyFlex prepolymers are our customizable polyurethane systems for specialized CASE (Coatings, Adhesives, Sealants, Elastomers) applications. Our in-house chemists can develop formulations with precisely tailored characteristics including cure profile, hardness, flexibility, and chemical resistance. We offer both small-batch development services and full-scale production. Would you like to discuss your specific performance requirements with our formulation team?";
      }
    }
    
    if (queryLower.includes('sustainable') || queryLower.includes('green') || queryLower.includes('environment')) {
      // Provide product-specific sustainability information when relevant
      if (extractedEntities.products.includes('profoam')) {
        return "ProFoam's sustainability features include:\n\n• GREENGUARD Gold certified for low VOC emissions\n• 40% average reduction in building energy use\n• Contains recycled and renewable content sources\n• Zero ozone-depleting blowing agents\n• Reduces carbon footprint through lifetime energy savings\n• Contributes to LEED certification points in multiple categories\n\nOur ProFoam systems are manufactured using our proprietary EcoBalance technology that reduces environmental impact while maintaining superior performance.";
      } else if (extractedEntities.products.includes('rigidcore')) {
        return "RigidCore's environmental advantages include:\n\n• Zero waste manufacturing process - all scrap is recycled\n• No formaldehyde or other harmful emissions\n• Exceptional thermal efficiency reduces energy consumption\n• Extended service life minimizes replacement waste\n• Available with bio-based polyol content options\n• Certified EPD (Environmental Product Declaration) documentation\n\nOur RigidCore boards help achieve environmental certifications like LEED, BREEAM, and Living Building Challenge.";
      } else if (extractedEntities.products.includes('flexcoat')) {
        return "FlexCoat's sustainability profile includes:\n\n• Low-VOC formulation (<50 g/L)\n• Reflective white option reduces urban heat island effect\n• Extends existing roof lifespans, reducing landfill waste\n• Waterborne primer options for sensitive environments\n• Rain-ready in 30 minutes, reducing water contamination risk\n• Certified for potable water containment applications\n\nOur FlexCoat systems contribute to several LEED credit categories and environmental certifications.";
      } else {
        return "Sustainability is a core value at Danny's Chemicals. Our products contribute to energy efficiency, reducing carbon footprints in buildings by up to 40%. Our ProFoam insulation is GREENGUARD Gold certified for low emissions, and we're continually working to reduce environmental impact through bio-based content and recycled materials in our formulations. We also maintain ISO 14001 environmental management certification across all our manufacturing facilities. Which specific product's sustainability features would you like to know more about?";
      }
    }
    
    // Use extracted entities to generate a highly specific and personalized response
    console.log("Extracted entities:", extractedEntities);
    
    // If we found specific products the user is asking about
    if (extractedEntities.products.length > 0) {
      const primaryProduct = extractedEntities.products[0];
      
      // If we also found specific topics the user is interested in
      if (extractedEntities.topics.length > 0) {
        const primaryTopic = extractedEntities.topics[0];
        
        if (primaryTopic === 'technical') {
          if (primaryProduct === 'profoam') {
            return `Here are the detailed technical specifications for our ProFoam system:\n\n• R-value: 6.5 per inch (ASTM C518)\n• Density: 2.0 lb/ft³ (ASTM D1622)\n• Compressive Strength: 25 psi (ASTM D1621)\n• Air Permeance: 0.004 L/s/m² @75Pa (ASTM E2178)\n• Water Vapor Permeance: 0.8 perms at 2\" (ASTM E96)\n• Closed Cell Content: >90% (ASTM D6226)\n• VOC Emissions: GREENGUARD Gold Certified\n\nIs there a specific technical aspect of ProFoam you're interested in learning more about?`;
          } else if (primaryProduct === 'rigidcore') {
            return `Here are the detailed technical specifications for our RigidCore system:\n\n• Density Range: 2-50 lb/ft³ (ASTM D1622)\n• Compressive Strength: 40-900 psi (ASTM D1621)\n• Tensile Strength: 60-450 psi (ASTM D1623)\n• Shear Strength: 35-400 psi (ASTM C273)\n• Water Absorption: <0.1% by volume (ASTM D2842)\n• Dimensional Stability: <1% linear change (ASTM D2126)\n• Available Sizes: Custom cuts up to 4'×8' sheets\n\nIs there a specific density grade or application you're considering for your project?`;
          } else if (primaryProduct === 'flexcoat') {
            return `Here are the detailed technical specifications for our FlexCoat waterproofing system:\n\n• Elongation: 850% (ASTM D412)\n• Tensile Strength: 3000 psi (ASTM D412)\n• Adhesion: >400 psi to properly prepared concrete (ASTM D4541)\n• Tear Resistance: 375 lb/in (ASTM D624)\n• Shore A Hardness: 70±5 (ASTM D2240)\n• Permeability: 0.03 perms (ASTM E96)\n• UV Stability: 2000 hrs no significant change (ASTM G154)\n\nAre you looking for information about a specific application or performance characteristic for your waterproofing project?`;
          } else if (primaryProduct === 'polyflex') {
            return `Here are the typical technical parameters for our PolyFlex custom formulation systems, though these are highly customizable based on your specific requirements:\n\n• Hardness Range: Shore 00-10 to Shore D-80 (ASTM D2240)\n• Tensile Strength: 100-7500 psi (ASTM D412)\n• Elongation: 10-1200% (ASTM D412)\n• Tear Strength: 15-750 lb/in (ASTM D624)\n• Gel Time: 5 seconds to 24 hours (adjustable)\n• Viscosity: 250-25,000 cps (adjustable)\n• Mix Ratio: 1:1 to 10:1 (depending on formulation)\n\nWhat specific performance requirements are you looking to achieve with your custom formulation?`;
          }
        } else if (primaryTopic === 'price' || primaryTopic === 'cost') {
          if (primaryProduct === 'profoam') {
            return `ProFoam pricing varies based on project specifications and volume. For a typical residential project, the installed cost ranges from $1.25-$1.75 per board foot depending on thickness and complexity. Commercial projects typically see volume discounts for larger applications. The total cost includes materials, professional installation, and optional warranty upgrades. Would you like a detailed quote based on your specific project requirements?`;
          } else if (primaryProduct === 'rigidcore') {
            return `RigidCore pricing varies by density, thickness, and quantity. Standard 2lb density boards range from $0.75-$1.50 per board foot, while higher density options (6-50lb) range from $2.25-$12.00 per board foot. Custom cutting, facing options, and special fire-rated formulations affect pricing. Volume discounts start at 1,000 board feet. Could you share more details about your project so I can provide more specific pricing information?`;
          } else if (primaryProduct === 'flexcoat') {
            return `FlexCoat system pricing includes primers, base coats, reinforcement, and top coats. Material costs typically range from $1.75-$3.50 per square foot depending on substrate conditions and warranty requirements. Contractor installation adds $2.00-$5.00 per square foot depending on project complexity and surface preparation needs. I'd be happy to connect you with our estimating team for a detailed quote based on your project specifications.`;
          } else if (primaryProduct === 'polyflex') {
            return `PolyFlex custom formulation pricing depends on your specific requirements. Development services for new formulations start at $7,500 including lab testing. Production pricing varies based on chemistry, volume, and packaging. Small production runs (5-50 gallons) typically range from $85-$165 per gallon, with bulk pricing available for larger volumes. Could you share more details about your application requirements so I can provide more targeted pricing information?`;
          }
        } else if (primaryTopic === 'application') {
          if (primaryProduct === 'profoam') {
            return `ProFoam application requires professional equipment and certified installers. The typical process involves:\n\n1. Substrate preparation (clean, dry, <19% moisture)\n2. Masking of areas not to be sprayed\n3. Primer application on certain substrates\n4. Setting equipment parameters (temperature, pressure, ratio)\n5. Application in multiple passes of 1-2 inches\n6. Quality control inspection\n7. Trimming if necessary\n\nWould you like information about finding a certified installer in your area?`;
          } else if (primaryProduct === 'rigidcore') {
            return `RigidCore boards are typically factory fabricated to your specifications, though can also be field-cut. For installation:\n\n1. Boards must be clean and dry before bonding\n2. Use our RigidBond adhesive system for best results\n3. Apply adhesive in a consistent pattern\n4. Press boards together within the adhesive open time\n5. Apply uniform pressure until initial cure (typically 4-6 hours)\n6. Allow 24 hours for full cure before loading\n\nAre you looking for assistance with a particular installation challenge?`;
          } else if (primaryProduct === 'flexcoat') {
            return `FlexCoat application involves these key steps:\n\n1. Surface preparation: Shot-blast or grind concrete to CSP 3-4\n2. Prime with FlexPrime at 5-7 mils DFT\n3. Detail work: Flash all penetrations, transitions, and joints\n4. Base coat application at 25-30 mils\n5. Reinforcing fabric in high-stress areas\n6. Top coat application at 10-15 mils\n7. Optional surfacing for UV protection or traffic wear\n\nWould you like me to connect you with one of our technical specialists to discuss your specific application requirements?`;
          } else if (primaryProduct === 'polyflex') {
            return `PolyFlex custom formulations have varying application methods depending on the specific system. Common methods include:\n\n1. Manual mixing and pouring for small batches\n2. Meter-mix dispensing for production applications\n3. Spray application for certain coating formulations\n4. Robotic dispensing for high-precision requirements\n\nOur technical team works with you to determine the optimal application method based on your production environment, cure time requirements, and performance specifications. How would you prefer to apply the material in your process?`;
          }
        } else if (primaryTopic === 'comparison') {
          if (primaryProduct === 'profoam') {
            return `When compared to traditional insulation materials, ProFoam offers several significant advantages:\n\n• Nearly twice the R-value per inch vs. fiberglass (6.5 vs. 3.5)\n• Creates an air barrier and vapor retarder in one application\n• Conforms to irregular shapes and fills voids completely\n• Won't sag, settle or degrade over time like cellulose\n• Adds structural strength to wall assemblies (up to 200% in some cases)\n• Higher initial cost but typically 30-50% more energy efficient\n\nCompared to other spray foams, our proprietary formulation offers better dimensional stability and consistent cell structure. Would you like specific comparison data for your application?`;
          } else if (primaryProduct === 'rigidcore') {
            return `RigidCore outperforms competing structural materials in several key metrics:\n\n• 3× better insulation value than XPS foam\n• Superior dimensional stability vs EPS (0.2% vs 2% linear change)\n• Better adhesion to facings than polyisocyanurate\n• Higher compressive strength per unit weight than balsa wood\n• More consistent cell structure than competing urethane boards\n• Available in wider density range (2-50 lb/ft³) than most competitors\n\nIs there a specific competing product or material you'd like me to compare with RigidCore?`;
          } else if (primaryProduct === 'flexcoat') {
            return `FlexCoat provides several advantages over competing waterproofing systems:\n\n• 4× greater elongation than acrylic elastomerics\n• 60% better adhesion to concrete than EPDM sheet goods\n• Seamless application eliminates failure points of membranes\n• Better crack-bridging than cementitious products\n• Maintains flexibility at low temperatures (down to -40°F)\n• Superior chemical resistance compared to asphalt-based products\n• Can be applied to damp substrates unlike many competitors\n\nWhat specific performance characteristic is most important for your waterproofing application?`;
          } else if (primaryProduct === 'polyflex') {
            return `Our PolyFlex custom formulation program offers several advantages over competitors:\n\n• Broader property range (Shore 00 through Shore D in single chemistry)\n• Faster development cycle (2-3 weeks vs industry standard 6-8 weeks)\n• Lower minimum order quantities (5 gallons vs 55 gallons typical)\n• More comprehensive technical support throughout development\n• Better batch-to-batch consistency through automated QC\n• Greater formulation flexibility for challenging requirements\n\nIs there a specific capability you'd like to compare with your current supplier?`;
          }
        }
      }
      
      // If we found specific properties the user is asking about
      if (extractedEntities.properties.length > 0) {
        const primaryProperty = extractedEntities.properties[0];
        
        if (primaryProperty === 'r-value' && (primaryProduct === 'profoam' || primaryProduct === 'rigidcore')) {
          return `The thermal insulation properties (R-value) for our products are:\n\n• ProFoam: 6.5 per inch, significantly higher than fiberglass (R-3.5) or cellulose (R-3.7)\n• RigidCore: 5.0-6.0 per inch depending on density, with higher density boards having slightly lower R-values\n\nThese values are tested according to ASTM C518 standards and provide excellent energy efficiency in building applications. The closed-cell structure also prevents thermal bridging and air infiltration, further improving real-world thermal performance. Would you like information about how this can impact energy costs for your specific application?`;
        } else if (primaryProperty === 'strength' && (primaryProduct === 'rigidcore' || primaryProduct === 'profoam')) {
          return `Regarding structural strength properties:\n\n• RigidCore: Compressive strengths range from 40 psi (2 lb/ft³) to over 900 psi (50 lb/ft³), with tensile strength from 60-450 psi depending on density\n• ProFoam: Typical compressive strength of 25 psi, which adds significant racking strength to wall assemblies (up to 200% in some tests)\n\nBoth products provide excellent dimensional stability under load and maintain their properties over decades of service. What specific load requirements does your application have?`;
        } else if (primaryProperty === 'waterproofing' && primaryProduct === 'flexcoat') {
          return `FlexCoat offers exceptional waterproofing performance, with:\n\n• Zero water permeability when applied at recommended thickness\n• 850% elongation to bridge cracks and building movement\n• Self-flashing capability around penetrations and transitions\n• Resistance to standing water and ice formation\n• Ability to withstand hydrostatic pressure when properly detailed\n\nThe system is backed by a 20-year waterproofing warranty when professionally installed. What specific waterproofing challenge are you looking to address?`;
        } else if (primaryProperty === 'application' && primaryProduct) {
          if (primaryProduct === 'profoam') {
            return `ProFoam application requires specialized equipment and trained applicators. The process involves:\n\n1. Substrate preparation and masking\n2. Equipment setup (temperature 120-140°F, pressure 1000-1200 psi)\n3. Test spray to verify proper mixing and expansion\n4. Application in 1-2 inch lifts, allowing cooling between passes\n5. Quality control inspection for proper cell structure\n\nOur network of certified contractors has the training and equipment to ensure proper application. Would you like me to connect you with an installer in your area?`;
          } else if (primaryProduct === 'flexcoat') {
            return `FlexCoat application involves several key steps:\n\n1. Surface preparation: Shot-blasting or grinding to ICRI CSP 3-4 profile\n2. Primer application at 5-7 mils DFT\n3. Base coat application at 25-30 mils with embedded reinforcement at transitions\n4. Top coat application at 10-15 mils\n5. Optional wear course for traffic-bearing applications\n\nProper surface preparation is critical to long-term performance. Would you like more detailed information about a specific step in the application process?`;
          }
        }
      }
      
      // Default response for the detected product if no specific topic or property matched
      if (primaryProduct === 'profoam') {
        return `I see you're interested in our ProFoam spray insulation system. This is our flagship closed-cell spray polyurethane foam with an R-value of 6.5 per inch and excellent air sealing properties. It's ideal for both new construction and retrofit applications in walls, roofs, attics, and foundations. Would you like specific information about technical specifications, application methods, or pricing for your ProFoam project?`;
      } else if (primaryProduct === 'rigidcore') {
        return `I see you're asking about our RigidCore structural foam board system. This high-density rigid polyurethane product offers exceptional strength-to-weight ratio and is available in densities from 2-50 lb/ft³. It's commonly used in structural insulated panels, marine applications, architectural components, and composite cores. What specific aspect of RigidCore would you like to know more about?`;
      } else if (primaryProduct === 'flexcoat') {
        return `I see you're interested in our FlexCoat elastomeric waterproofing system. This liquid-applied membrane creates a seamless barrier with 850% elongation and excellent UV stability. It's ideal for roofs, foundations, plaza decks, balconies, and areas requiring crack-bridging capability. Would you like information about application methods, technical specifications, or finding a certified installer?`;
      } else if (primaryProduct === 'polyflex') {
        return `I see you're asking about our PolyFlex custom formulation systems. These specialized polyurethane formulations can be tailored for specific applications in coatings, adhesives, sealants, and elastomers. Our chemists can develop systems with precisely tailored characteristics including cure profile, hardness, flexibility, and chemical resistance. What specific performance requirements are you looking to achieve with your application?`;
      }
    }
    
    // Industry-specific responses
    const industryTerms = ['construction', 'building', 'marine', 'automotive', 'aerospace', 'medical', 'industrial'];
    const industry = words.find(word => industryTerms.includes(word.toLowerCase()));
    if (industry) {
      return `Danny's Chemicals provides specialized polyurethane solutions for the ${industry} industry. Our products are engineered to meet the specific demands of this sector, including regulatory compliance, performance requirements, and application-specific challenges. We have case studies and technical documentation specific to this industry. Would you like information about which of our products are most commonly used in ${industry} applications?`;
    }
    
    // Performance-focused responses
    const performanceTerms = ['durability', 'performance', 'lifespan', 'efficiency', 'quality', 'reliability'];
    const performanceTerm = words.find(word => performanceTerms.includes(word.toLowerCase()));
    if (performanceTerm) {
      return `At Danny's Chemicals, we prioritize product ${performanceTerm}. Our polyurethane systems undergo rigorous testing and quality control processes to ensure consistent performance in demanding environments. All our products come with detailed technical data sheets documenting performance specifications and are backed by our comprehensive warranty program. Would you like specific performance data for any of our product lines?`;
    }
    
    // Comparative analysis responses
    const comparisonTerms = ['better', 'best', 'compared', 'versus', 'vs', 'difference', 'alternative'];
    if (comparisonTerms.some(term => queryLower.includes(term))) {
      return `When comparing polyurethane systems, it's important to consider specific application requirements. Danny's Chemicals products typically outperform alternatives in key metrics like thermal efficiency, strength-to-weight ratio, moisture resistance, and long-term durability. Our technical team can provide detailed comparison data showing how our systems compare to conventional materials or competitor products. What specific performance criteria are most important for your application?`;
    }
    
    // Truly universal fallback that still provides value - analyze the question semantically
    console.log("Using universal fallback response - no specific match found");
    return `I understand you're asking about "${query}". Based on your question, I believe you're interested in our polyurethane technology solutions. Danny's Chemicals specializes in high-performance polyurethane systems for insulation, structural applications, waterproofing, and custom industrial uses. Could you provide more specific information about your application requirements so I can give you a more targeted response? For example, are you working on a particular type of building, structure, or product where you need polyurethane materials?`;
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary-dark shadow-lg flex items-center justify-center"
          aria-label="Open AI assistant"
        >
          <Bot className="w-6 h-6 text-white" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          className="fixed bottom-24 left-6 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-xl shadow-xl z-50 flex flex-col overflow-hidden border border-gray-200"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-primary text-white flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              <h3 className="font-medium">Danny's AI Assistant</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-white hover:bg-primary-dark hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 relative overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-white rounded-tr-none'
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      <div className="flex items-start mb-1">
                        <span className={`text-xs ${message.sender === 'user' ? 'text-gray-200' : 'text-gray-500'}`}>
                          {message.sender === 'user' ? 'You' : "Danny's AI"}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatContainerRef} />
              </div>
            </ScrollArea>
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our products..."
                className="flex-1 py-2 px-4 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button 
                type="submit"
                className="rounded-l-none bg-primary hover:bg-primary-dark"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </>
  );
};

export default AIAssistant;