
import React from 'react';
import { motion } from 'framer-motion';

interface QuickRepliesProps {
  suggestions: string[];
  onSelect: (text: string) => void;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({ suggestions, onSelect }) => {
  if (!suggestions.length) {
    return null;
  }
  
  return (
    <div className="my-4 flex flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={`quick-reply-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => onSelect(suggestion)}
          className="bg-white border border-gray-200 text-sm text-gray-700 px-3 py-2 rounded-full 
                    hover:bg-gray-50 shadow-sm transition-colors"
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  );
};
