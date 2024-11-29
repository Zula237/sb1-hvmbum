import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SystemInstructions } from '../types';

interface SystemInstructionsStore extends SystemInstructions {
  updateContent: (content: string) => void;
  toggleEnabled: () => void;
}

const DEFAULT_INSTRUCTIONS = `You are a helpful AI assistant. Your responses should be:
- Clear and concise
- Professional and friendly
- Accurate and well-researched
- Respectful of user privacy
- Free from harmful or inappropriate content`;

export const useSystemInstructions = create<SystemInstructionsStore>()(
  persist(
    (set) => ({
      content: DEFAULT_INSTRUCTIONS,
      enabled: true,
      updateContent: (content) => set({ content }),
      toggleEnabled: () => set((state) => ({ enabled: !state.enabled })),
    }),
    {
      name: 'system-instructions-storage',
    }
  )
);