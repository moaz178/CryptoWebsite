import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Calendar, Clock, ExternalLink } from 'lucide-react';
import NewsCard from '../components/NewsCard';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // In a real application, you would use a proper news API
        // For demo purposes, we'll use placeholder data
        const demoNews = [
          {
            id: 1,
            title: "Bitcoin Surges Past $60,000 as Institutional Adoption Grows",
            description: "Bitcoin has reached new heights as major financial institutions continue to invest in the cryptocurrency. Analysts predict further growth as adoption increases globally.",
            url: "#",
            publishedAt: "2025-04-15T09:30:00Z",
            source: { name: "Crypto Daily" },
            imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "bitcoin"
          },
          {
            id: 2,
            title: "Ethereum 2.0 Upgrade: What You Need to Know",
            description: "The long-awaited Ethereum upgrade promises to improve scalability and reduce energy consumption. This comprehensive guide explains all the changes and how they might affect the ecosystem.",
            url: "#",
            publishedAt: "2025-04-14T14:15:00Z",
            source: { name: "BlockNews" },
            imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "ethereum"
          },
          {
            id: 3,
            title: "Regulatory Clarity: New Framework for Cryptocurrency Trading",
            description: "Government agencies have released new guidelines for cryptocurrency exchanges and traders. The framework aims to provide clarity while ensuring consumer protection.",
            url: "#",
            publishedAt: "2025-04-13T11:45:00Z",
            source: { name: "CoinReport" },
            imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "regulation"
          },
          {
            id: 4,
            title: "DeFi Protocols Reach $100 Billion in Total Value Locked",
            description: "Decentralized Finance continues its explosive growth with total value locked in protocols exceeding $100 billion. New projects and innovations are driving this unprecedented expansion.",
            url: "#",
            publishedAt: "2025-04-12T16:20:00Z",
            source: { name: "DeFi Pulse" },
            imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "defi"
          },
          {
            id: 5,
            title: "NFT Market Shows Signs of Recovery After Slump",
            description: "The NFT market is showing signs of recovery after a period of declining sales. New use cases and improved infrastructure are bringing renewed interest to the space.",
            url: "#",
            publishedAt: "2025-04-11T10:00:00Z",
            source: { name: "NFT Insider" },
            imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "nft"
          },
          {
            id: 6,
            title: "Major Bank Launches Cryptocurrency Custody Service",
            description: "One of the world's largest banks has announced a new cryptocurrency custody service for institutional clients, marking another milestone in mainstream adoption.",
            url: "#",
            publishedAt: "2025-04-10T13:45:00Z",
            source: { name: "Banking Today" },
            imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "business"
          },
          {
            id: 7,
            title: "New Layer 2 Solution Promises 100x Faster Transactions",
            description: "A new Layer 2 scaling solution for Ethereum claims to offer transaction speeds up to 100 times faster than the base layer, with significantly reduced gas fees.",
            url: "#",
            publishedAt: "2025-04-09T15:30:00Z",
            source: { name: "Tech Crypto" },
            imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "technology"
          },
          {
            id: 8,
            title: "Bitcoin Mining Becomes More Environmentally Friendly",
            description: "Bitcoin mining operations are increasingly turning to renewable energy sources, addressing one of the main criticisms of the cryptocurrency.",
            url: "#",
            publishedAt: "2025-04-08T09:15:00Z",
            source: { name: "Green Crypto" },
            imageUrl: "https://images.unsplash.com/photo-1516245834210-c4c142787335?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "bitcoin"
          },
          {
            id: 9,
            title: "Central Bank Digital Currencies: The Future of Money?",
            description: "As more countries develop Central Bank Digital Currencies (CBDCs), experts debate their impact on the financial system and private cryptocurrencies.",
            url: "#",
            publishedAt: "2025-04-07T11:00:00Z",
            source: { name: "Economic Times" },
            imageUrl: "https://images.unsplash.com/photo-1574607383476-f517f260d30b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            category: "regulation"
          }
        ];
        
        setNews(demoNews);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Filter news based on search term and category
  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'bitcoin', name: 'Bitcoin' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'defi', name: 'DeFi' },
    { id: 'nft', name: 'NFTs' },
    { id: 'regulation', name: 'Regulation' },
    { id: 'technology', name: 'Technology' },
    { id: 'business', name: 'Business' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Cryptocurrency News</h1>
          <p className="mt-4 text-xl text-gray-600">
            Stay updated with the latest developments in the crypto world
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-grow md:max-w-md">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">Filter by:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* News Content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <p className="text-xl text-gray-600">No news articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map(item => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}

        {/* Featured Analysis */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Analysis</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img 
                  className="h-48 w-full object-cover md:w-48" 
                  src="https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Featured analysis" 
                />
              </div>
              <div className="p-8">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>April 16, 2025</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>10 min read</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  The Future of Cryptocurrency: Trends to Watch in 2025
                </h3>
                <p className="text-gray-600 mb-4">
                  Our expert analysts break down the most important trends that will shape the cryptocurrency landscape in the coming year, from regulatory developments to technological innovations.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  Read full analysis
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;