import React from 'react';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CryptoInsight</h3>
            <p className="text-indigo-200 text-sm">
              Your trusted source for cryptocurrency news, market trends, and insights.
              Stay updated with the latest developments in the crypto world.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-indigo-200">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/news" className="hover:text-white transition-colors">News</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Market Data</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-indigo-200">
              Subscribe to our newsletter for weekly updates.
            </p>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 text-sm bg-indigo-800 text-white placeholder-indigo-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-sm rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-indigo-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-indigo-200">
            © {new Date().getFullYear()} CryptoInsight. All rights reserved.
          </p>
          <p className="text-sm text-indigo-200 flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-red-400" /> for crypto enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;