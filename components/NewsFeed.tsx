import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

const NEWS_API_KEY = 'b89e1494e5d5447792ee2ad042204f55';
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchNews = async (pageNum: number) => {
    try {
      const response = await axios.get(`${NEWS_API_URL}&page=${pageNum}`);
      return response.data.articles;
    } catch (err) {
      setError('Failed to fetch news');
      return [];
    }
  };

  const loadMore = useCallback(async () => {
    setLoading(true);
    const newArticles = await fetchNews(page);
    setArticles(prevArticles => [...prevArticles, ...newArticles]);
    setPage(prevPage => prevPage + 1);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadMore();
  }, []);

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

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="news-feed space-y-4 overflow-y-auto h-full">
      {articles.map((article, index) => (
        <div
          key={index}
          ref={index === articles.length - 1 ? lastArticleRef : null}
          className="news-article bg-gray-700 p-4 rounded hover:bg-gray-600 transition-colors duration-200"
        >
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex space-x-4">
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="w-24 h-24 object-cover rounded" />
            )}
            <div className="flex-1">
              <h3 className="text-blue-400 font-semibold">{article.title}</h3>
              <p className="text-gray-300 text-sm">{article.description}</p>
              <div className="text-gray-400 text-xs mt-2">
                <span>{article.source.name}</span> • 
                <span>{new Date(article.publishedAt).toLocaleString()}</span>
              </div>
            </div>
          </a>
        </div>
      ))}
      {loading && <div className="text-center">Loading more articles...</div>}
    </div>
  );
};

export default NewsFeed;