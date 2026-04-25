import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import UploadRecipeForm from "../components/UploadRecipeForm";
import "./UploadRecipe.css";
import { isAuthenticated } from "../utils/localStorage";

const UploadRecipe = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  if (success) {
    return (
      <motion.div
        className="upload-success"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="success-content">
          <i className="fas fa-check-circle"></i>
          <h2>Recipe uploaded successfully!</h2>
          <div className="success-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/community")}
            >
              View in Community
            </button>
            <button
              className="btn btn-outline"
              onClick={() => setSuccess(false)}
            >
              Upload Another Recipe
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="upload-recipe-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Upload Icon */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <i
              className="fas fa-upload"
              style={{ fontSize: "3rem", color: "#ff6b35" }}
            ></i>

            {/* 🧾 Static Gradient Title (No Animation) */}
            <h1 className="upload-title">UPLOAD YOUR RECIPE</h1>
          </div>

          <p className="upload-subtitle">
            Share your favorite recipe with the community
          </p>
        </motion.div>

        {/* Auth or Upload Form */}
        {isAuthenticated() ? (
          <UploadRecipeForm onSuccess={handleSuccess} />
        ) : (
          <motion.div
            className="auth-prompt"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <i
                className="fas fa-user-lock"
                style={{ fontSize: "2rem", color: "#ff6b35" }}
              ></i>
              <h3 style={{ marginTop: "1rem" }}>
                Please sign in to upload recipes
              </h3>
              <p>
                You need an account to add recipes to the community. It only
                takes a minute.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <Link to="/signin" className="btn btn-primary">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-outline">
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UploadRecipe;
