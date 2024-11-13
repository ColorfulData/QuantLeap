// src/components/windows/NewsFeed.tsx

'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { ArticleProps } from '@/components/types';

interface NewsFeedProps {
  searchTerm?: string;
  symbol?: string;
  exchange?: string;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ searchTerm, symbol, exchange }) => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const observer = useRef<IntersectionObserver | null>(null);

  const getNewsQuery = () => {
    const ticker = symbol || searchTerm || "AAPL";
    const companyNames: Record<string, string> = {
      'AAPL': 'Apple',
      'MSFT': 'Microsoft',
      'GOOGL': 'Google',
      'META': 'Meta',
      'AMZN': 'Amazon',
      'RELIANCE': 'Reliance',
      'INFY': 'Infosys',
      'NVDA': 'NVIDIA',
      'TSLA': 'Tesla',
      // Add more mappings as needed
    };
    const companyName = companyNames[ticker.toUpperCase()];
    return companyName ? `"${ticker.toUpperCase()}" OR "${companyName}"` : `"${ticker.toUpperCase()}"`;
  };

  const fetchNews = useCallback(async (pageNum: number) => {
    try {
      const query = getNewsQuery();
      const response = await axios.get<ArticleProps[]>(`/api/news`, {
        params: {
          q: query,
          page: pageNum,
        },
      });
      return response.data;
    } catch (err: any) {
      console.error('Error fetching news:', err.response?.data?.error || err.message);
      setError(err.response?.data?.error || 'Failed to fetch news.');
      return [];
    }
  }, [symbol, searchTerm]);

  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const newArticles = await fetchNews(page + 1);
    setArticles(prev => [...prev, ...newArticles]);
    setPage(prev => prev + 1);
    setLoading(false);
  }, [page, loading, fetchNews]);

  useEffect(() => {
    const initializeNews = async () => {
      setArticles([]);
      setPage(1);
      setError(null);
      setLoading(true);
      const initialArticles = await fetchNews(1);
      setArticles(initialArticles);
      setLoading(false);
    };

    initializeNews();
  }, [fetchNews, symbol, searchTerm]);

  const lastArticleRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, loadMore]
  );

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="h-full">
      <h3 className="text-primary font-semibold mb-4">News Feed for {symbol || 'AAPL'}</h3>
      <div className="flex-1 space-y-2 overflow-auto">
        {articles.map((article, index) => (
          <div
            key={article.url || index}
            ref={index === articles.length - 1 ? lastArticleRef : null}
            className="p-2 bg-transparent hover:bg-[#11141C] transition cursor-pointer"
          >
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex space-x-4">
              {article.urlToImage && (
                <img 
                  src={article.urlToImage} 
                  alt={article.title} 
                  className="w-24 h-24 object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-primary">{article.title}</h4>
                <p className="text-sm text-muted mt-1">{article.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-accent-primary text-white">
                    {article.source.name}
                  </span>
                  <span className="text-xs text-muted">
                    {new Date(article.publishedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </a>
          </div>
        ))}
        {loading && <div className="text-center p-4 text-muted">Loading more articles...</div>}
      </div>
    </div>
  );
};

export default NewsFeed;
