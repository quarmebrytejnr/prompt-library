import { useState } from 'react';
import { prompts, Prompt } from '@/lib/promptsData';

interface UsePromptDataReturn {
  prompts: Prompt[];
  filteredPrompts: Prompt[];
  activeCategory: string;
  selectedPrompt: Prompt | null;
  isModalOpen: boolean;
  handleCategoryFilter: (category: string) => void;
  handleViewPrompt: (promptId: string) => void;
  closeModal: () => void;
}

export function usePromptData(): UsePromptDataReturn {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>(prompts);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'all') {
      setFilteredPrompts(prompts);
    } else {
      setFilteredPrompts(prompts.filter(prompt => prompt.category === category));
    }
  };
  
  const handleViewPrompt = (promptId: string) => {
    const prompt = prompts.find(p => p.id === promptId);
    if (prompt) {
      setSelectedPrompt(prompt);
      setIsModalOpen(true);
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return {
    prompts,
    filteredPrompts,
    activeCategory,
    selectedPrompt,
    isModalOpen,
    handleCategoryFilter,
    handleViewPrompt,
    closeModal
  };
}
