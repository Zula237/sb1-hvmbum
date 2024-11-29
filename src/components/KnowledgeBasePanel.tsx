import React, { useState, useRef } from 'react';
import { Book, Plus, X, ToggleLeft, Upload, Type, File } from 'lucide-react';
import { useKnowledgeBase } from '../store/knowledgeBase';

export function KnowledgeBasePanel() {
  const [newDocument, setNewDocument] = useState('');
  const [isAddingContent, setIsAddingContent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { documents, enabled, addDocument, removeDocument, toggleEnabled } = useKnowledgeBase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDocument.trim()) {
      addDocument(newDocument.trim());
      setNewDocument('');
      setIsAddingContent(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'text/plain' || file.type === 'application/pdf' || 
        file.type === 'application/msword' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      try {
        const text = await file.text();
        addDocument(text);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error reading file:', error);
        alert('Error reading file. Please try again.');
      }
    } else {
      alert('Please upload a text or document file (TXT, PDF, DOC, DOCX)');
    }
  };

  return (
    <div className="border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 w-80 p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Book className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Knowledge Base</h2>
        </div>
        <button
          onClick={toggleEnabled}
          className={`p-2 rounded-lg transition-colors ${
            enabled 
              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
          title={enabled ? 'Disable Knowledge Base' : 'Enable Knowledge Base'}
        >
          <ToggleLeft className="w-5 h-5" />
        </button>
      </div>

      {!isAddingContent ? (
        <div className="mb-4 space-y-2">
          <button
            onClick={() => setIsAddingContent(true)}
            className="w-full px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={20} />
            <span>Add Content</span>
          </button>
        </div>
      ) : (
        <div className="mb-4 space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Upload size={18} />
              <span>Upload File</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt,.pdf,.doc,.docx"
              className="hidden"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              value={newDocument}
              onChange={(e) => setNewDocument(e.target.value)}
              placeholder="Or paste your text here..."
              className="w-full h-32 p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg resize-none mb-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsAddingContent(false)}
                className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newDocument.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
              >
                <Plus size={18} />
                <span>Add</span>
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Documents ({documents.length})
        </h3>
        <div className="space-y-2">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg relative group"
            >
              <div className="flex items-start gap-2">
                <File className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{doc}</p>
              </div>
              <button
                onClick={() => removeDocument(index)}
                className="absolute top-2 right-2 p-1 bg-white dark:bg-slate-700 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 dark:hover:bg-slate-600"
              >
                <X size={14} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}