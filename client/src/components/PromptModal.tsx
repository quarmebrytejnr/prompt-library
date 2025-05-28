import React, { useEffect } from 'react';
import { IconCopy } from '@/assets/svgs/IconCopy';
import { copyToClipboard, formatPromptContent } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Prompt } from '@/lib/promptsData';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptId: string | null;
  promptTitle: string;
  promptContent: string;
  selectedPrompt: Prompt | null;
}

const PromptModal: React.FC<PromptModalProps> = ({ 
  isOpen, 
  onClose, 
  promptId, 
  promptTitle, 
  promptContent,
  selectedPrompt
}) => {
  const [isCopied, setIsCopied] = React.useState(false);
  
  // Disable scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);
  
  const handleCopy = async () => {
    if (!promptContent) return;
    
    const success = await copyToClipboard(promptContent);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openPromptLink = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Format the prompt content with markdown-like styling
  const formattedContent = formatPromptContent(promptContent);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto"
          onClick={handleBackdropClick}
        >
          <div className="min-h-screen px-4 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-gray-900/80 backdrop-blur"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-auto relative"
            >
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-900 transition duration-200"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="p-6 max-h-[80vh] overflow-y-auto no-scrollbar">
                <div className="flex items-center gap-3 mb-6">
                  {selectedPrompt && (
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full 
                      ${selectedPrompt.category === 'presentation' ? 'bg-[hsl(var(--blue)/0.15)] text-[hsl(var(--blue))]' : 
                       selectedPrompt.category === 'research' ? 'bg-[hsl(var(--purple)/0.15)] text-[hsl(var(--purple))]' : 
                       'bg-[hsl(var(--pink)/0.15)] text-[hsl(var(--pink))]'}`}>
                      <span className="text-xl">{selectedPrompt?.icon}</span>
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-gray-900">{promptTitle}</h2>
                </div>
                
                {/* Additional prompt information */}
                {selectedPrompt && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    {/* Platform information */}
                    <div className="mb-3">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Available on platforms:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPrompt.platforms.map((platform, index) => (
                          <span key={index} className="text-sm bg-white px-3 py-1 rounded-full border border-gray-200 text-gray-700">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Suitable for */}
                    {selectedPrompt.suitableTools && (
                      <div className="mb-3">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Suitable for:</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedPrompt.suitableTools.map((tool, index) => (
                            <span key={index} className="text-sm bg-[hsl(var(--teal)/0.1)] px-3 py-1 rounded-full text-[hsl(var(--teal))]">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Sensitivity note */}
                    {selectedPrompt.sensitivityLabel && (
                      <div className="mt-3 text-sm text-gray-600 italic border-t border-gray-200 pt-3">
                        {selectedPrompt.sensitivityLabel}
                      </div>
                    )}
                  </div>
                )}
                
                <div 
                  className="prompt-content prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: formattedContent }}
                />
              </div>
              
              <div className="bg-gray-50 rounded-b-2xl p-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    onClick={handleCopy}
                    className="flex-1 sm:flex-none bg-[hsl(var(--blue))] hover:bg-[hsl(var(--blue)/0.9)] text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                  >
                    <IconCopy className="w-4 h-4 mr-2" />
                    Copy Prompt
                  </button>
                  
                  {selectedPrompt?.promptLink && (
                    <button 
                      onClick={() => openPromptLink(selectedPrompt.promptLink)}
                      className="flex-1 sm:flex-none bg-[hsl(var(--yellow)/0.2)] hover:bg-[hsl(var(--yellow)/0.3)] text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                      Open in Platform
                    </button>
                  )}
                </div>
                
                <div className={`text-[hsl(var(--blue))] font-medium ${isCopied ? 'animate-pulse' : 'hidden sm:opacity-0 sm:block'}`}>
                  {isCopied ? 'Copied to clipboard!' : 'Click to copy prompt'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromptModal;
