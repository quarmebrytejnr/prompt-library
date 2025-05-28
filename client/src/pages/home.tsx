import React, { useState, useEffect } from 'react';
import PromptCard from '@/components/PromptCard';
import PromptModal from '@/components/PromptModal';
import growthClubLogo from '@/assets/images/growth_club.png';
import { usePromptData } from '@/hooks/usePromptData';
import { scrollToElement } from '@/lib/utils';
import { IconArrowDown } from '@/assets/svgs/IconArrowDown';
import { motion } from 'framer-motion';

export default function Home() {
  const { 
    filteredPrompts, 
    activeCategory, 
    selectedPrompt, 
    isModalOpen, 
    handleCategoryFilter, 
    handleViewPrompt, 
    closeModal 
  } = usePromptData();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = (sectionId: string) => {
    scrollToElement(sectionId);
    setIsMobileMenuOpen(false);
  };

  // Staggered animation for prompt cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with background */}
      <header className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 gradient-hero bg-gradient-to-br from-slate-950 via-[#5683f7]/10 to-[#0ee0d8]/20"></div>
          
          {/* Abstract patterns with increased opacity */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-30" 
               style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1604076913837-52ab5629fba9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)', backgroundPosition: 'center', backgroundSize: 'cover', mixBlendMode: 'overlay' }}></div>
          
          {/* Enhanced brand-colored floating elements */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0], 
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.5, 0.4] 
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-[#0ee0d8]/40 to-[#5683f7]/40 blur-xl"
          />
          <motion.div 
            animate={{ 
              y: [0, 20, 0], 
              scale: [1, 0.95, 1],
              opacity: [0.4, 0.6, 0.4] 
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-[#5683f7]/40 to-[#ac73d4]/40 blur-xl"
          />
          <motion.div 
            animate={{ 
              y: [-10, 10, -10], 
              x: [5, -5, 5],
              scale: [0.9, 1, 0.9],
              opacity: [0.5, 0.7, 0.5] 
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-[#ac73d4]/40 to-[#eb20a9]/40 blur-xl"
          />
          <motion.div 
            animate={{ 
              y: [0, -15, 0], 
              x: [-5, 5, -5],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-[#eb20a9]/40 to-[#ffd311]/40 blur-xl"
          />
        </div>
        
        {/* Navigation */}
        <nav className="relative z-50">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              {/* Logo Only */}
              <div className="flex-shrink-0 flex items-center">
                <img src={growthClubLogo} alt="Publicis West Africa" className="h-10 w-auto" />
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#home" onClick={() => handleNavLinkClick('home')} className="text-white opacity-90 hover:opacity-100 font-medium text-sm transition duration-200 border-b-2 border-transparent hover:border-white/70 py-1">Home</a>
                <a href="#prompts" onClick={() => handleNavLinkClick('prompts')} className="text-white opacity-90 hover:opacity-100 font-medium text-sm transition duration-200 border-b-2 border-transparent hover:border-white/70 py-1">Prompts</a>
                <a href="#productivity" onClick={() => handleNavLinkClick('productivity')} className="text-white opacity-90 hover:opacity-100 font-medium text-sm transition duration-200 border-b-2 border-transparent hover:border-white/70 py-1">Productivity</a>
                <a href="#about" onClick={() => handleNavLinkClick('about')} className="text-white opacity-90 hover:opacity-100 font-medium text-sm transition duration-200 border-b-2 border-transparent hover:border-white/70 py-1">About</a>
                <button className="bg-gradient-to-r from-[#0ee0d8]/80 to-[#5683f7]/80 hover:from-[#0ee0d8]/90 hover:to-[#5683f7]/90 text-white font-medium py-2 px-6 rounded-full backdrop-blur shadow-lg transition duration-300 text-sm">
                  Get Started
                </button>
              </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button 
                  onClick={toggleMobileMenu}
                  className="text-white focus:outline-none"
                  aria-label="Toggle mobile menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-slate-900/80 backdrop-blur absolute w-full z-50`}>
            <div className="container mx-auto px-6 py-4 space-y-4">
              <a href="#home" onClick={() => handleNavLinkClick('home')} className="block text-white py-2 font-medium">Home</a>
              <a href="#prompts" onClick={() => handleNavLinkClick('prompts')} className="block text-white py-2 font-medium">Prompts</a>
              <a href="#productivity" onClick={() => handleNavLinkClick('productivity')} className="block text-white py-2 font-medium">Productivity</a>
              <a href="#about" onClick={() => handleNavLinkClick('about')} className="block text-white py-2 font-medium">About</a>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-full backdrop-blur transition duration-300 mt-4">
                Get Started
              </button>
            </div>
          </div>
        </nav>
        
        {/* Hero section with enhanced animations */}
        <div id="home" className="container mx-auto px-6 relative z-10 h-[calc(100vh-88px)] min-h-[550px] flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.2,
                type: "spring",
                stiffness: 50
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl leading-tight"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Empower Your Team with{" "}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.6,
                  type: "spring"
                }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ee0d8] via-[#5683f7] to-[#ac73d4] relative inline-block"
              >
                <span className="relative z-10 text-shadow-glow text-[105%]">AI Prompts</span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-[#0ee0d8]/40 to-[#5683f7]/40 blur-lg -z-10"
                  animate={{ 
                    opacity: [0.6, 0.9, 0.6],
                    scale: [1, 1.05, 1] 
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.span>
            </motion.h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.8,
              type: "spring",
              stiffness: 50
            }}
            className="mt-6 text-lg md:text-xl max-w-2xl text-white/80"
          >
            A curated collection of powerful prompts to enhance your team's productivity in presentations, research, and pitches.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a 
              href="#prompts" 
              onClick={() => handleNavLinkClick('prompts')}
              className="bg-gradient-to-r from-[#0ee0d8] to-[#5683f7] text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg transition duration-300 flex items-center justify-center"
            >
              Explore Prompts
              <IconArrowDown className="w-5 h-5 ml-2" />
            </a>
            <a 
              href="#about"
              onClick={() => handleNavLinkClick('about')}
              className="bg-white/10 backdrop-blur text-white font-semibold py-3 px-8 rounded-full hover:bg-white/20 transition duration-300 flex items-center justify-center border border-[#eb20a9]/30"
            >
              Learn More
            </a>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center"
          >
            <span className="text-white/70 text-sm mb-2">Scroll to explore</span>
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </header>
      
      {/* Prompts Section */}
      <section id="prompts" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
              Professional AI Prompts
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#0ee0d8] via-[#5683f7] to-[#ac73d4]"></span>
            </h2>
            <p className="text-gray-500 text-lg">Copy and customize these prompts to supercharge your team's workflow with AI-powered assistance.</p>
          </motion.div>
          
          {/* Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center flex-wrap gap-2 mb-12"
          >
            <button 
              className={`py-2 px-6 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === 'all' ? 'bg-gradient-to-r from-[#0ee0d8] to-[#5683f7] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => handleCategoryFilter('all')}
            >
              All Prompts
            </button>
            <button 
              className={`py-2 px-6 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === 'presentation' ? 'bg-[hsl(var(--blue))] text-white shadow-md' : 'bg-[hsl(var(--blue)/0.1)] text-[hsl(var(--blue))] hover:bg-[hsl(var(--blue)/0.2)]'}`}
              onClick={() => handleCategoryFilter('presentation')}
            >
              Presentation
            </button>
            <button 
              className={`py-2 px-6 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === 'research' ? 'bg-[hsl(var(--purple))] text-white shadow-md' : 'bg-[hsl(var(--purple)/0.1)] text-[hsl(var(--purple))] hover:bg-[hsl(var(--purple)/0.2)]'}`}
              onClick={() => handleCategoryFilter('research')}
            >
              Research
            </button>
            <button 
              className={`py-2 px-6 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === 'pitch' ? 'bg-[hsl(var(--pink))] text-white shadow-md' : 'bg-[hsl(var(--pink)/0.1)] text-[hsl(var(--pink))] hover:bg-[hsl(var(--pink)/0.2)]'}`}
              onClick={() => handleCategoryFilter('pitch')}
            >
              Pitch
            </button>
          </motion.div>
          
          {/* Prompts Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPrompts.map((prompt) => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                onView={handleViewPrompt} 
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Productivity Section */}
      <section id="productivity" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Abstract pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', width: '100%', height: '100%', mixBlendMode: 'multiply' }}></div>
        </div>
        
        {/* Brand color glass morphism elements */}
        <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-[#ffd311]/10 filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#ffd311]/10 filter blur-3xl"></div>
        <div className="absolute top-40 right-10 w-60 h-60 rounded-full bg-[#eb20a9]/10 filter blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
              Productivity & Innovation Prompts
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#ffd311] via-[#eb20a9] to-[#ffd311]"></span>
            </h2>
            <p className="text-gray-500 text-lg">Communication-focused prompts to supercharge your team's productivity and foster innovation.</p>
          </motion.div>
          
          {/* Productivity Prompts Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPrompts.filter(prompt => prompt.category === 'productivity').map(prompt => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                onView={handleViewPrompt} 
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Abstract pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', width: '100%', height: '100%', mixBlendMode: 'multiply' }}></div>
        </div>
        
        {/* Brand color glass morphism elements */}
        <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-[#0ee0d8]/10 filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#ac73d4]/10 filter blur-3xl"></div>
        <div className="absolute top-40 right-10 w-60 h-60 rounded-full bg-[#5683f7]/10 filter blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-72 h-72 rounded-full bg-[#eb20a9]/10 filter blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 relative inline-block">
              About This Library
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#eb20a9] via-[#ffd311] to-[#0ee0d8]"></span>
            </h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg"
            >
              <p className="text-gray-700 mb-6 text-lg">
                This AI prompt library is designed to help your team leverage artificial intelligence effectively in your workflows. Each prompt template is crafted to generate specific, high-quality outputs that can enhance your presentations, research, and client pitches.
              </p>
              <p className="text-gray-700 text-lg">
                Simply copy the prompt you need, customize the inputs for your specific project, and paste it into your preferred AI assistant to get impressive results instantly.
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-center p-4"
                >
                  <div className="w-12 h-12 bg-[#0ee0d8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#0ee0d8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customizable</h3>
                  <p className="text-gray-500 text-sm">Adapt each prompt to your specific project needs and requirements.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-center p-4"
                >
                  <div className="w-12 h-12 bg-[#5683f7]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#5683f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Productivity Boost</h3>
                  <p className="text-gray-500 text-sm">Save hours of work with AI-powered content creation and research.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="text-center p-4"
                >
                  <div className="w-12 h-12 bg-[#eb20a9]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#eb20a9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Enterprise-Ready</h3>
                  <p className="text-gray-500 text-sm">Professional-grade prompts designed for business use cases.</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center">
                <div className="text-2xl font-bold mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ee0d8] to-[#5683f7]">PromptVault</span>
                  <span className="text-sm font-light ml-1">- By Publicis West Africa</span>
                </div>
              </div>
              <p className="text-white/60 text-sm">Empowering teams with AI-powered productivity tools and prompt templates.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" onClick={() => handleNavLinkClick('home')} className="text-white/60 hover:text-white transition duration-200 text-sm">Home</a></li>
                <li><a href="#prompts" onClick={() => handleNavLinkClick('prompts')} className="text-white/60 hover:text-white transition duration-200 text-sm">Prompts</a></li>
                <li><a href="#about" onClick={() => handleNavLinkClick('about')} className="text-white/60 hover:text-white transition duration-200 text-sm">About</a></li>
              </ul>
              <p className="mt-8 text-white/60 text-sm">
                &copy; 2025 PromptVault - Publicis West Africa. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Prompt Modal */}
      {selectedPrompt && (
        <PromptModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          promptId={selectedPrompt.id}
          promptTitle={selectedPrompt.title}
          promptContent={selectedPrompt.content}
          selectedPrompt={selectedPrompt}
        />
      )}
    </div>
  );
}
