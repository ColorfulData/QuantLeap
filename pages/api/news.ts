// pages/api/news.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { ArticleProps } from '@/components/types';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ArticleProps[] | { error: string }>) {
  if (!NEWS_API_KEY) {
    return res.status(500).json({ error: 'News API key is not configured.' });
  }

  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: req.query.q,
        apiKey: NEWS_API_KEY,
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: 10,
        searchIn: 'title',
      },
    });

    const data = response.data;

    if (data.status !== 'ok') {
      throw new Error(data.message || 'Error fetching news');
    }

    const articles: ArticleProps[] = data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      source: {
        name: article.source.name,
      },
    }));

    res.status(200).json(articles);
  } catch (error: any) {
    console.error('Error fetching news:', error.message || error);
    res.status(500).json({ error: 'Failed to fetch news.' });
  }
}
