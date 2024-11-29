export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface KnowledgeBase {
  documents: string[];
  enabled: boolean;
}

export interface SystemInstructions {
  content: string;
  enabled: boolean;
}

export interface ThemeState {
  isDark: boolean;
}