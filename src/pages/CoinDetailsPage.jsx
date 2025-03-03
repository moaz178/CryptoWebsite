import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowUp, ArrowDown, DollarSign, BarChart2, Globe, Clock, TrendingUp, TrendingDown, Info, ExternalLink } from 'lucide-react';

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('24h');

  useEffect(() => {
    const fetchCoinDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCoin(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching coin details:", err);
        setError("Failed to fetch coin details. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchCoinDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!coin) return null;

  const priceChange = coin.market_data?.price_change_percentage_24h;
  const isPriceUp = priceChange >= 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Coin Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src={coin.image?.large} 
                alt={coin.name} 
                className="w-12 h-12 mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {coin.name} ({coin.symbol?.toUpperCase()})
                </h1>
                <div className="flex items-center mt-1">
                  <span className="text-gray-600 mr-2">Rank #{coin.market_cap_rank}</span>
                  {coin.links?.homepage[0] && (
                    <a 
                      href={coin.links.homepage[0]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 flex items-center"
                    >
                      <Globe className="h-4 w-4 mr-1" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center">
                <DollarSign className="h-6 w-6 text-gray-700 mr-1" />
                <span className="text-3xl font-bold text-gray-900">
                  {coin.market_data?.current_price?.usd.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </span>
              </div>
              <div className={`flex items-center mt-1 ${isPriceUp ? 'text-green-600' : 'text-red-600'}`}>
                {isPriceUp ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                <span className="font-medium">
                  {Math.abs(priceChange).toFixed(2)}% (24h)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Price Chart</h2>
            <div className="flex space-x-2">
              {['24h', '7d', '30d', '1y'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    timeframe === period
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          {/* Placeholder for chart - in a real app, you would use a charting library */}
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <p className="text-gray-500 flex items-center">
              <BarChart2 className="h-5 w-5 mr-2" />
              Price chart would be displayed here using a library like Chart.js or Recharts
            </p>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Market Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Market Cap</span>
                <span className="font-medium text-gray-900">
                  ${coin.market_data?.market_cap?.usd.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">24h Trading Volume</span>
                <span className="font-medium text-gray-900">
                  ${coin.market_data?.total_volume?.usd.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fully Diluted Valuation</span>
                <span className="font-medium text-gray-900">
                  ${coin.market_data?.fully_diluted_valuation?.usd?.toLocaleString() || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Circulating Supply</span>
                <span className="font-medium text-gray-900">
                  {coin.market_data?.circulating_supply?.toLocaleString()} {coin.symbol?.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Supply</span>
                <span className="font-medium text-gray-900">
                  {coin.market_data?.total_supply?.toLocaleString() || 'N/A'} {coin.symbol?.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max Supply</span>
                <span className="font-medium text-gray-900">
                  {coin.market_data?.max_supply?.toLocaleString() || 'Unlimited'} {coin.symbol?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Price Change</h2>
            <div className="space-y-4">
              {['24h', '7d', '14d', '30d', '60d', '200d', '1y'].map((period) => {
                const changeKey = `price_change_percentage_${period}`;
                const change = coin.market_data?.[changeKey];
                const isUp = change >= 0;
                
                return (
                  <div key={period} className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {period === '24h' ? '24 hours' : 
                       period === '7d' ? '7 days' : 
                       period === '14d' ? '14 days' : 
                       period === '30d' ? '30 days' : 
                       period === '60d' ? '60 days' : 
                       period === '200d' ? '200 days' : 
                       '1 year'}
                    </span>
                    <span className={`font-medium flex items-center ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                      {isUp ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {change ? `${Math.abs(change).toFixed(2)}%` : 'N/A'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About {coin.name}</h2>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: coin.description?.en || 'No description available.' }}
          />
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Info className="h-5 w-5 mr-2 text-indigo-600" />
                General Info
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Genesis Date</span>
                  <span className="font-medium text-gray-900">{coin.genesis_date || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hashing Algorithm</span>
                  <span className="font-medium text-gray-900">{coin.hashing_algorithm || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Block Time (minutes)</span>
                  <span className="font-medium text-gray-900">{coin.block_time_in_minutes || 'N/A'}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-indigo-600" />
                Links & Resources
              </h3>
              <div className="space-y-2">
                {coin.links?.blockchain_site.slice(0, 3).map((link, index) => (
                  link && (
                    <a 
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {new URL(link).hostname}
                    </a>
                  )
                ))}
                
                {coin.links?.official_forum_url.slice(0, 2).map((link, index) => (
                  link && (
                    <a 
                      key={`forum-${index}`}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Official Forum
                    </a>
                  )
                ))}
                
                {coin.links?.subreddit_url && (
                  <a 
                    href={coin.links.subreddit_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Reddit
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetailsPage;