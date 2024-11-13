// src/components/types.ts

export interface WindowProps {
  id: string;
  type: string;
  title: string;
  content: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  position?: { x: number; y: number };
}

export interface ArticleProps {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
}
