import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import './HeroSection.css';

const HeroSection = ({ onSearch, onCuisineSelect }) => {
  return (
    <section className="hero-section">
      {/* 🌄 Background Image */}
      <div className="hero-background">
        <img
          src="/assets/hero-bg.jpeg"
          alt="Delicious food background"
          className="background-image"
        />
        <div className="image-overlay"></div>
      </div>

      {/* 🌟 Hero Content */}
      <div className="hero-content container">
        {/* 🍴 Floating Icon */}
        <motion.div
          className="hero-icon"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <i className="fas fa-utensils"></i>
        </motion.div>

        {/* ✨ Title and Subtitle */}
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div style={{ position: 'relative', height: '220px', width: '100%' }}>
            <h1 className="hero-title gradient-title">COOKBOOK!</h1>
          </div>
          {/* 🌈 Highlighted Subtitle */}
          <p className="hero-subtitle">Discover the Art of Flavors.</p>
        </motion.div>

        {/* 🔍 Search Bar */}
        <motion.div
          className="hero-search"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SearchBar onSearch={onSearch} placeholder="Search recipes..." />
        </motion.div>

        {/* 🍱 Cuisine Tags */}
        <motion.div
          className="hero-cuisine-tags"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {['Thai', 'Chinese', 'Italian', 'Indian'].map((cuisine) => (
            <button
              key={cuisine}
              type="button"
              className="hero-cuisine-button"
              onClick={() =>
                onCuisineSelect ? onCuisineSelect(cuisine) : onSearch?.(cuisine)
              }
            >
              {cuisine}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
