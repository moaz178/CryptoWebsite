import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

const NewsCard = ({ news }) => {
  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg">
      <img 
        src={news.imageUrl} 
        alt={news.title} 
        className="object-cover w-full h-64 transition-transform duration-500 transform group-hover:scale-110"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      {/* Text container */}
      <div className="absolute bottom-0 left-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center text-xs text-white mb-1">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formatDate(news.publishedAt)}</span>
          <span className="mx-1">•</span>
          <span>{news.source.name}</span>
        </div>
        <h3 className="text-lg font-bold text-white">{news.title}</h3>
        <p className="text-sm text-gray-200 mt-1">
          {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
        </p>
        <a 
          href={news.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-2 inline-flex items-center text-indigo-300 hover:text-indigo-400"
        >
          Read more
          <ExternalLink className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
