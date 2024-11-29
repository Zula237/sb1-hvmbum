import React, { useState } from 'react';
import { Terminal, Save, ToggleLeft } from 'lucide-react';
import { useSystemInstructions } from '../store/systemInstructions';

export function SystemInstructionsPanel() {
  const { content, enabled, updateContent, toggleEnabled } = useSystemInstructions();
  const [editedContent, setEditedContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    updateContent(editedContent);
    setIsEditing(false);
  };

  return (
    <div className="border-l bg-white dark:bg-gray-800 w-80 p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2 className="font-semibold dark:text-white">System Instructions</h2>
        </div>
        <button
          onClick={toggleEnabled}
          className={`p-2 rounded-lg ${
            enabled 
              ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' 
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
          }`}
          title={enabled ? 'Disable Instructions' : 'Enable Instructions'}
        >
          <ToggleLeft className="w-5 h-5" />
        </button>
      </div>

      {isEditing ? (
        <div className="flex-1 flex flex-col">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="flex-1 p-3 border rounded-lg resize-none mb-4 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditedContent(content);
                setIsEditing(false);
              }}
              className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
            >
              <Save size={18} />
              <span>Save</span>
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => setIsEditing(true)}
          className="flex-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono">
            {content}
          </pre>
        </div>
      )}
    </div>
  );
}