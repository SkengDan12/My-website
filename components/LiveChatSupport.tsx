import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Define types
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

// Enhanced initial messages with personalized support options
const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello! 👋 I'm Sarah from Danny's Chemicals. How can I help you with our polyurethane products today?\n\nAre you looking for:\n\n• Insulation solutions (ProFoam™)\n• Structural materials (RigidCore™)\n• Waterproofing systems (FlexCoat™)\n• Custom formulations (PolyFlex™)",
    sender: 'agent',
    timestamp: new Date()
  }
];

const LiveChatSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [agentName] = useState('Sarah Johnson');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [messages, isOpen]);
  
  // Simplified direct response system
  const getDirectResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // ProFoam / Insulation
    if (lowerQuery.includes('insulation') || lowerQuery.includes('foam') || lowerQuery.includes('spray')) {
      return "ProFoam™ is our premium insulation solution with R-value of 6.5 per inch. It creates an air barrier and insulation in one application, reducing energy costs by up to 40%.\n\nKey benefits:\n• Superior thermal performance\n• Air sealing and moisture control\n• Adds structural strength\n• Prevents mold and improves air quality\n\nTypical applications include walls, attics, and crawl spaces. Would you like technical specifications or information about installation?";
    }
    
    // RigidCore / Structural
    if (lowerQuery.includes('rigid') || lowerQuery.includes('board') || lowerQuery.includes('structural') || lowerQuery.includes('marine')) {
      return "RigidCore™ boards provide exceptional structural strength with densities from 2-50 lb/ft³. They combine excellent thermal insulation with superior load-bearing capacity.\n\nKey benefits:\n• Excellent strength-to-weight ratio\n• Dimensional stability under load\n• Near-zero water absorption\n• CNC machinability for precise shapes\n\nCommon applications include structural panels, marine components, and industrial applications. Would you like information about specific density grades?";
    }
    
    // FlexCoat / Waterproofing
    if (lowerQuery.includes('water') || lowerQuery.includes('leak') || lowerQuery.includes('roof') || lowerQuery.includes('coating') || lowerQuery.includes('seal')) {
      return "FlexCoat™ is our premium waterproofing membrane with 850% elongation. It creates a seamless, durable barrier against water intrusion.\n\nKey benefits:\n• Exceptional crack-bridging ability\n• UV stable for exposed applications\n• Adheres to virtually any substrate\n• Chemical and weather resistant\n\nIdeal for roofs, foundations, decks, and mechanical rooms. Would you like technical specifications or application details?";
    }
    
    // PolyFlex / Custom
    if (lowerQuery.includes('custom') || lowerQuery.includes('specific') || lowerQuery.includes('medical') || lowerQuery.includes('adhesive')) {
      return "PolyFlex™ custom formulations are tailored to your exact requirements. Our in-house chemists can develop systems with precise properties for your application.\n\nAvailable options:\n• Medical grade (ISO 10993 biocompatible)\n• Structural adhesives for difficult substrates\n• Abrasion-resistant industrial formulations\n• Electrical insulation compounds\n\nWe work with industries from healthcare to aerospace. What specific performance properties are you looking for?";
    }
    
    // Conversational responses
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery === 'hey') {
      return "Hello! I'm Sarah from Danny's Chemicals. How can I help you today? We specialize in polyurethane technology for insulation, structural materials, waterproofing, and custom formulations. What type of product are you interested in?";
    }
    
    if (lowerQuery.includes('thank')) {
      return "You're very welcome! Is there anything else I can help you with regarding our polyurethane products?";
    }
    
    // General product inquiry
    if (lowerQuery.includes('product') || lowerQuery.includes('offer') || lowerQuery.includes('what') || lowerQuery.includes('help')) {
      return "Danny's Chemicals offers four main product lines:\n\n1. ProFoam™ - Spray polyurethane foam insulation (R-6.5)\n2. RigidCore™ - Structural foam boards (2-50 lb/ft³)\n3. FlexCoat™ - Waterproofing membranes (850% elongation)\n4. PolyFlex™ - Custom formulated polyurethanes\n\nWhich product line would you like to learn more about?";
    }
    
    // Default response with product categories
    return "Thank you for your message. We offer several polyurethane solutions that might address your needs:\n\n• ProFoam™ insulation for energy efficiency\n• RigidCore™ structural boards for load-bearing applications\n• FlexCoat™ waterproofing for moisture protection\n• PolyFlex™ custom formulations for specialized requirements\n\nCould you tell me which area you're most interested in, and I can provide specific information?";
  };
  
  // Simulate agent typing after user sends a message
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'user') {
      setIsTyping(true);
      
      const timer = setTimeout(() => {
        setIsTyping(false);
        
        const responseText = getDirectResponse(lastMessage.text);
        
        const newMessage: Message = {
          id: String(Date.now()),
          text: responseText,
          sender: 'agent',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, newMessage]);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const userMessage: Message = {
      id: String(Date.now()),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <>
      {/* Chat toggle button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark flex items-center justify-center p-0 group relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                1
              </span>
            </>
          )}
        </Button>
      </div>
      
      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-2xl overflow-hidden"
          style={{ 
            width: isExpanded ? '400px' : '350px', 
            height: isExpanded ? '600px' : '500px',
            transform: 'translateX(0)' // Ensures proper positioning
          }}
        >
          {/* Chat header */}
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="w-10 h-10 border-2 border-white">
                <AvatarImage src="https://i.pravatar.cc/100?img=44" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <div className="font-medium">{agentName}</div>
                <div className="text-xs flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                  Online
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-white/20"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 14 10 14 10 20"></polyline>
                    <polyline points="20 10 14 10 14 4"></polyline>
                    <line x1="14" y1="10" x2="21" y2="3"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
          
          {/* Chat messages */}
          <div 
            className="p-4 overflow-y-auto bg-gray-50/50 relative"
            style={{ 
              height: isExpanded ? 'calc(600px - 136px)' : 'calc(500px - 136px)'
            }}
          >
            <div className="space-y-4">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'agent' && (
                    <Avatar className="w-8 h-8 mr-2 mt-1 flex-shrink-0">
                      <AvatarImage src="https://i.pravatar.cc/100?img=44" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                  )}
                  <div 
                    className={`rounded-xl p-3 max-w-[80%] ${
                      message.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white shadow-sm rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <span className="text-xs opacity-70 block mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <Avatar className="w-8 h-8 mr-2 mt-1 flex-shrink-0">
                    <AvatarImage src="https://i.pravatar.cc/100?img=44" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div className="bg-white shadow-sm rounded-xl rounded-tl-none p-3 max-w-[80%]">
                    <div className="flex space-x-1 items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Chat input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="pr-12 py-6 focus-visible:ring-primary"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-500 hover:text-primary"
                  >
                    <Paperclip size={16} />
                  </Button>
                </div>
              </div>
              <Button
                type="button"
                onClick={handleSendMessage}
                className="bg-primary hover:bg-primary-dark"
                size="icon"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChatSupport;