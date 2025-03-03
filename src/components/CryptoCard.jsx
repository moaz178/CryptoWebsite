import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const CryptoCard = ({ coin }) => {
  const priceChange = coin.price_change_percentage_24h;
  const isPriceUp = priceChange >= 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={coin.image} 
            alt={coin.name} 
            className="w-10 h-10 mr-3"
          />
          <div>
            <h3 className="font-bold text-gray-900">{coin.name}</h3>
            <span className="text-sm text-gray-500">{coin.symbol.toUpperCase()}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-2xl font-bold text-gray-900">
            ${coin.current_price.toLocaleString()}
          </div>
          <div className={`flex items-center ${isPriceUp ? 'text-green-600' : 'text-red-600'}`}>
            {isPriceUp ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span>{Math.abs(priceChange).toFixed(2)}% (24h)</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-gray-500">Market Cap</p>
            <p className="font-medium text-gray-900">${coin.market_cap.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Volume (24h)</p>
            <p className="font-medium text-gray-900">${coin.total_volume.toLocaleString()}</p>
          </div>
        </div>
        
        <Link 
          to={`/coin/${coin.id}`} 
          className="flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          View Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default CryptoCard;