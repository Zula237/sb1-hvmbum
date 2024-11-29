import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { KnowledgeBasePanel } from './components/KnowledgeBasePanel';
import { SystemInstructionsPanel } from './components/SystemInstructionsPanel';
import { useChat } from './hooks/useChat';
import { useTheme } from './store/theme';
import { AlertCircle, PanelRightOpen } from 'lucide-react';

function App() {
  const { messages, isLoading, error, sendMessage } = useChat();
  const [showPanel, setShowPanel] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-slate-900">
      <Header 
        onTogglePanel={() => setShowPanel(!showPanel)} 
        onToggleInstructions={() => setShowInstructions(!showInstructions)}
        showingInstructions={showInstructions}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4 flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
              <div className="max-w-md space-y-4">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Welcome to AI Assistant</h2>
                <p className="text-gray-600 dark:text-gray-400">Start a conversation by typing a message below.</p>
                {!showPanel && (
                  <button
                    onClick={() => setShowPanel(true)}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <PanelRightOpen size={18} />
                    <span>Open Knowledge Base</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-pulse text-gray-500 dark:text-gray-400">AI is thinking...</div>
            </div>
          )}
        </main>

        {showInstructions && <SystemInstructionsPanel />}
        {showPanel && <KnowledgeBasePanel />}
      </div>

      <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
    </div>
  );
}

export default App;