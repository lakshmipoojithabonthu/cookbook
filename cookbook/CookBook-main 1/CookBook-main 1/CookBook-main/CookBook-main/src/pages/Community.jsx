import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RecipeCard from "../components/RecipeCard";
import RatingStars from "../components/RatingStars";
import {
  getUploadedRecipes,
  removeUploadedRecipe,
} from "../utils/localStorage";
import {
  getUploadedRecipesFromServer,
  deleteUploadedRecipeFromServer,
} from "../utils/api";
import "./Community.css";

const Community = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = () => {
    (async () => {
      const server = await getUploadedRecipesFromServer().catch(() => []);
      const local = getUploadedRecipes();
      const all = [...(server || []), ...(local || [])];

      const seen = new Set();
      const unique = [];
      for (const r of all) {
        const key = r.id || r.idMeal || r.strMeal || JSON.stringify(r);
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(r);
        }
      }
      setRecipes(unique);
    })();
  };

  const handleRemove = (recipe) => {
    if (!recipe) return;
    if (!window.confirm("Are you sure you want to remove this recipe?")) return;

    (async () => {
      const id = recipe.id;
      let deletedFromServer = false;

      if (typeof id === "number") {
        deletedFromServer = await deleteUploadedRecipeFromServer(id).catch(
          () => false
        );
      }

      if (id !== undefined && id !== null) {
        try {
          removeUploadedRecipe(id);
        } catch {
          // ignore
        }
      } else {
        try {
          const name = recipe.name || recipe.strMeal;
          const { removeUploadedRecipeByName } = await import(
            "../utils/localStorage"
          );
          removeUploadedRecipeByName(name);
        } catch {
          // ignore
        }
      }

      if (!deletedFromServer && typeof id === "number") {
        alert(
          "Could not delete recipe from server; it was removed locally (if present)."
        );
      }

      loadRecipes();
    })();
  };

  return (
    <div className="community-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 🔸 Header Icon + Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <i
              className="fas fa-users"
              style={{ fontSize: "3rem", color: "#ff6b35" }}
            ></i>

            {/* Static Gradient Title — Removed TextPressure */}
            <h1 className="community-title">COMMUNITY RECIPES</h1>
          </div>
          <p className="community-subtitle">Recipes shared by our community</p>
        </motion.div>

        {/* 🧁 Empty State or Recipe List */}
        {recipes.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-users"></i>
            <p>No community recipes yet. Be the first to share!</p>
            <Link to="/upload" className="btn btn-primary">
              <i className="fas fa-upload"></i> Upload Recipe
            </Link>
          </motion.div>
        ) : (
          <div className="recipes-grid">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id || recipe.idMeal || recipe.strMeal || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="community-recipe-card"
              >
                <button
                  className="card-delete"
                  onClick={() => handleRemove(recipe)}
                  title="Remove"
                >
                  <i className="fas fa-trash"></i>
                </button>
                <RecipeCard recipe={recipe} index={index} />
                <div className="community-recipe-info">
                  <RatingStars recipeId={recipe.id} />
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      to={`/community/edit/${recipe.id}`}
                      className="btn btn-outline"
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      className="remove-button"
                      onClick={() => handleRemove(recipe)}
                      title="Remove"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
