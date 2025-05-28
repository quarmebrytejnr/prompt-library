import React from 'react';
import { Badge } from './ui/badge';
import { Prompt } from '@/lib/promptsData';
import { IconView } from '@/assets/svgs/IconView';
import { IconCopy } from '@/assets/svgs/IconCopy';
import { copyToClipboard } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PromptCardProps {
  prompt: Prompt;
  onView: (promptId: string) => void;
}

const getCategoryLabel = (category: string): string => {
  switch (category) {
    case 'presentation':
      return 'Presentation';
    case 'research':
      return 'Research';
    case 'pitch':
      return 'Pitch';
    case 'productivity':
      return 'Productivity';
    default:
      return category;
  }
};

const iconBgColors: Record<string, string> = {
  presentation: 'bg-[hsl(var(--blue)/0.15)] text-[hsl(var(--blue))]',
  research: 'bg-[hsl(var(--purple)/0.15)] text-[hsl(var(--purple))]',
  pitch: 'bg-[hsl(var(--pink)/0.15)] text-[hsl(var(--pink))]',
  productivity: 'bg-[hsl(var(--yellow)/0.15)] text-[hsl(var(--yellow))]',
};

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onView }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(prompt.content);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const openPromptLink = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="card-hover bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm relative"
      data-category={prompt.category}
    >
      <div className="gradient-card-top"></div>
      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className={`w-12 h-12 flex items-center justify-center rounded-full ${iconBgColors[prompt.category]} mr-4`}>
            <span className="text-2xl">{prompt.icon}</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{prompt.title}</h3>
            <Badge 
              variant={prompt.category as any}
              className="mt-1 text-xs font-medium py-1 px-3"
            >
              {getCategoryLabel(prompt.category)}
            </Badge>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{prompt.description}</p>
        
        {/* Platform information */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="text-xs font-medium text-gray-500 mr-2">Platforms:</div>
            <div className="flex flex-wrap gap-1">
              {prompt.platforms?.map((platform, index) => (
                <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                  {platform}
                </span>
              )) || <span className="text-xs text-gray-500">Not specified</span>}
            </div>
          </div>
          
          {/* Suitable Tools */}
          {prompt.suitableTools && prompt.suitableTools.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {prompt.suitableTools.map((tool, index) => (
                <span key={index} className="text-xs bg-[hsl(var(--teal)/0.1)] px-2 py-0.5 rounded text-[hsl(var(--teal))]">
                  {tool}
                </span>
              ))}
            </div>
          )}
          
          {/* Sensitivity label */}
          {prompt.sensitivityLabel && (
            <p className="text-xs text-gray-500 italic">
              {prompt.sensitivityLabel}
            </p>
          )}
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => onView(prompt.id)}
            className="flex-1 py-2.5 px-4 rounded-lg border border-[hsl(var(--blue))] text-[hsl(var(--blue))] font-medium text-sm hover:bg-[hsl(var(--blue)/0.1)] transition duration-300 flex items-center justify-center"
          >
            <IconView className="w-4 h-4 mr-2" />
            View Prompt
          </button>
          <button 
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 rounded-lg bg-[hsl(var(--pink))] text-white font-medium text-sm hover:bg-[hsl(var(--pink)/0.9)] transition duration-300 flex items-center justify-center"
          >
            <IconCopy className="w-4 h-4 mr-2" />
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        {/* Prompt Link */}
        {prompt.promptLink && (
          <div className="mt-3">
            <button 
              onClick={(e) => openPromptLink(e, prompt.promptLink)}
              className="w-full py-1.5 px-4 rounded-lg bg-[hsl(var(--yellow)/0.2)] text-gray-800 font-medium text-xs hover:bg-[hsl(var(--yellow)/0.3)] transition duration-300 flex items-center justify-center"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              Open in Platform
            </button>
          </div>
        )}
        
        {isCopied && (
          <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs py-1 px-3 rounded-full animate-fade-in-out">
            Copied!
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PromptCard;
