import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <i
              className="fas fa-info-circle"
              style={{ fontSize: "3rem", color: "#4c4a85" }}
            ></i>
            <h1 className="about-title">About CookBook</h1>
          </div>
          <p className="subtitle">
            Your Digital Companion for Culinary Creativity.
          </p>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="description">
            CookBook is an intelligent cooking assistant designed to help food
            enthusiasts explore, create, and share recipes effortlessly. Whether
            you’re discovering global cuisines, experimenting with new
            ingredients, or perfecting your favorites, CookBook combines
            simplicity, technology, and taste in one seamless experience. With
            interactive tools and a vibrant community, CookBook turns every meal
            into a story worth sharing.
          </p>

          <section className="features-section">
            <h2>
              <i className="fas fa-star"></i> Key Features
            </h2>
            <div className="features-grid">
              <div className="feature-card">
                <i className="fas fa-search"></i>
                <h3>Smart Recipe Discovery</h3>
                <p>
                  Search and explore thousands of recipes by ingredient,
                  cuisine, or category using TheMealDB API — making global
                  flavors easily accessible.
                </p>
              </div>

              <div className="feature-card">
                <i className="fas fa-tools"></i>
                <h3>Interactive Cooking Tools</h3>
                <p>
                  Stay organized while cooking with built-in tools such as
                  ingredient checklists, a cooking timer, and a rating system to
                  track your favorites.
                </p>
              </div>

              <div className="feature-card">
                <i className="fas fa-bookmark"></i>
                <h3>Personalized Cookbook</h3>
                <p>
                  Save and manage your favorite recipes effortlessly. Organize
                  them into your own virtual cookbook for quick access anytime.
                </p>
              </div>

              <div className="feature-card">
                <i className="fas fa-users"></i>
                <h3>Community and Sharing</h3>
                <p>
                  Connect with fellow food lovers! Upload your unique recipes,
                  discover new creations, and be inspired by the global cooking
                  community.
                </p>
              </div>
            </div>
          </section>

          <section className="tech-section">
            <h2>
              <i className="fas fa-code"></i> Technologies Used
            </h2>
            <div className="tech-list">
              <div className="tech-item">
                <strong>Frontend:</strong> React
              </div>
              <div className="tech-item">
                <strong>APIs:</strong> TheMealDB
              </div>
              <div className="tech-item">
                <strong>Storage:</strong> JSON Server, Local Storage
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
