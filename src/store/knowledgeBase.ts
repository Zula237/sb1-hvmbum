import { create } from 'zustand';
import type { KnowledgeBase } from '../types';

interface KnowledgeBaseStore extends KnowledgeBase {
  addDocument: (content: string) => void;
  removeDocument: (index: number) => void;
  clearDocuments: () => void;
  toggleEnabled: () => void;
}

export const useKnowledgeBase = create<KnowledgeBaseStore>((set) => ({
  documents: [],
  enabled: true,
  addDocument: (content) =>
    set((state) => ({ documents: [...state.documents, content] })),
  removeDocument: (index) =>
    set((state) => ({
      documents: state.documents.filter((_, i) => i !== index),
    })),
  clearDocuments: () => set({ documents: [] }),
  toggleEnabled: () => set((state) => ({ enabled: !state.enabled })),
}));