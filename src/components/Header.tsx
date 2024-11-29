import React from 'react';
import { Bot, PanelRightClose, Moon, Sun, Terminal } from 'lucide-react';
import { useTheme } from '../store/theme';

interface HeaderProps {
  onTogglePanel: () => void;
  onToggleInstructions: () => void;
  showingInstructions: boolean;
}

export function Header({ onTogglePanel, onToggleInstructions, showingInstructions }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">AI Assistant</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Always here to help</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          )}
        </button>
        <button
          onClick={onToggleInstructions}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          title={showingInstructions ? 'Hide System Instructions' : 'Show System Instructions'}
        >
          <Terminal className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          onClick={onTogglePanel}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          title="Toggle Knowledge Base"
        >
          <PanelRightClose className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </header>
  );
}