import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import NewsPage from './pages/NewsPage';
import CoinDetailsPage from './pages/CoinDetailsPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/CryptoWebsite" element={<LandingPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/coin/:id" element={<CoinDetailsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;