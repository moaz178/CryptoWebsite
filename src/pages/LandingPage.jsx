import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  TrendingUp,
  ArrowRight,
  BarChart2,
  Globe,
  Shield,
  Star,
} from 'lucide-react';
import CryptoCard from '../components/CryptoCard';
import NewsCard from '../components/NewsCard';

const LandingPage = () => {
  const [topCoins, setTopCoins] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch top cryptocurrencies
        const coinsResponse = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 6,
              page: 1,
              sparkline: false,
              price_change_percentage: '24h',
            },
          }
        );
        setTopCoins(coinsResponse.data);

        // Simulated crypto news data
        setLatestNews([
          {
            id: 1,
            title: "Bitcoin Surges Past $60,000 as Institutional Adoption Grows",
            description:
              "Bitcoin has reached new heights as major financial institutions continue to invest in the cryptocurrency.",
            url: "#",
            publishedAt: "2025-04-15T09:30:00Z",
            source: { name: "Crypto Daily" },
            imageUrl:
              "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          },
          {
            id: 2,
            title: "Ethereum 2.0 Upgrade: What You Need to Know",
            description:
              "The long-awaited Ethereum upgrade promises to improve scalability and reduce energy consumption.",
            url: "#",
            publishedAt: "2025-04-14T14:15:00Z",
            source: { name: "BlockNews" },
            imageUrl:
              "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          },
          {
            id: 3,
            title: "Regulatory Clarity: New Framework for Cryptocurrency Trading",
            description:
              "Government agencies have released new guidelines for cryptocurrency exchanges and traders.",
            url: "#",
            publishedAt: "2025-04-13T11:45:00Z",
            source: { name: "CoinReport" },
            imageUrl:
              "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          },
        ]);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Fixed Navigation Bar */}
      <header className="fixed w-full z-30 backdrop-blur-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="text-white text-2xl font-bold">CryptoInsight</div>
          <nav className="space-x-8">
            <Link to="/" className="text-white hover:text-indigo-300">
              Home
            </Link>
            <Link to="/coins" className="text-white hover:text-indigo-300">
              Coins
            </Link>
            <Link to="/news" className="text-white hover:text-indigo-300">
              News
            </Link>
            <Link to="/about" className="text-white hover:text-indigo-300">
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section with Full-Screen Background */}
        <section
          className="relative h-screen bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1602742950939-26a9d9c5d3e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg">
              Welcome to CryptoInsight
            </h1>
            <p className="mt-4 text-xl md:text-2xl drop-shadow-lg">
              Your gateway to real-time cryptocurrency data and news
            </p>
            <div className="mt-8 flex space-x-4">
              <Link
                to="/news"
                className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-full text-lg font-bold transition transform hover:-translate-y-1"
              >
                Explore News <ArrowRight className="inline ml-2 h-5 w-5" />
              </Link>
              <a
                href="#market"
                className="border border-indigo-600 hover:bg-indigo-600 px-8 py-4 rounded-full text-lg font-bold transition transform hover:-translate-y-1"
              >
                Market Trends <TrendingUp className="inline ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
          {/* Animated SVG Elements */}
          <svg
            className="absolute bottom-0 left-0 w-64 opacity-70 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 20l9-5-9-5-9 5 9 5z"
            ></path>
          </svg>
          <svg
            className="absolute top-10 right-10 w-32 opacity-70 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></circle>
          </svg>
        </section>

        {/* Market Overview Section */}
        <section id="market" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900">
                Top Cryptocurrencies
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Track market leaders and emerging trends
              </p>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {topCoins.map((coin) => (
                  <CryptoCard key={coin.id} coin={coin} />
                ))}
              </div>
            )}
            <div className="text-center mt-8">
              <Link
                to="/coins"
                className="text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center"
              >
                View All Coins <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900">
                Latest Crypto News
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Stay informed with our curated news selection
              </p>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            )}
            <div className="text-center mt-8">
              <Link
                to="/news"
                className="text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center"
              >
                More News <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold">Testimonials</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-indigo-500 bg-opacity-80 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                <p className="text-lg italic">
                  "CryptoInsight's insights have been game-changing for my portfolio."
                </p>
                <div className="mt-4 flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-3 font-bold">Alice K.</span>
                </div>
              </div>
              <div className="bg-indigo-500 bg-opacity-80 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                <p className="text-lg italic">
                  "The data is incredibly reliable and the UI is stunning."
                </p>
                <div className="mt-4 flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-3 font-bold">Michael R.</span>
                </div>
              </div>
              <div className="bg-indigo-500 bg-opacity-80 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                <p className="text-lg italic">
                  "A must-have tool for any serious crypto enthusiast!"
                </p>
                <div className="mt-4 flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-3 font-bold">Samantha P.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold">Join Our Newsletter</h2>
              <p className="mt-2 text-lg">
                Get the latest insights and updates right in your inbox
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full sm:w-auto flex-grow px-6 py-4 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-r-lg font-bold transition-colors mt-4 sm:mt-0">
                Subscribe
              </button>
            </div>
            <p className="mt-4 text-center text-gray-300 text-sm">
              We value your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CryptoInsight. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
