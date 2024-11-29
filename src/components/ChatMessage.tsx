import React from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div className={`flex gap-3 ${isAssistant ? 'bg-gray-50/50 dark:bg-slate-800/50' : ''} p-4 rounded-lg`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isAssistant 
          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
      }`}>
        {isAssistant ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-1">
          {isAssistant ? 'AI Assistant' : 'You'}
        </div>
        <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
          {message.content}
        </div>
      </div>
    </div>
  );
}