import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getRecipeById,
  parseRecipeIngredients,
  getUploadedRecipeFromServer,
} from "../utils/api";
import {
  saveRecipe,
  removeSavedRecipe,
  isRecipeSaved,
  getUploadedRecipes,
} from "../utils/localStorage";
import IngredientChecklist from "./IngredientChecklist";
import Timer from "./Timer";
import RatingStars from "./RatingStars";
import "./RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    const loadRecipe = async () => {
      setLoading(true);

      // Handle user-uploaded recipe
      if (id.startsWith("user_")) {
        const uploadedRecipes = getUploadedRecipes();
        const recipeData = uploadedRecipes.find((r) => r.id === id);
        if (recipeData) {
          setRecipe({
            ...recipeData,
            strMeal: recipeData.name || recipeData.strMeal,
            strMealThumb: recipeData.image || recipeData.strMealThumb,
            strCategory: recipeData.category || recipeData.strCategory,
            strArea: recipeData.cuisine || recipeData.strArea,
            strInstructions: recipeData.steps
              ? recipeData.steps.join("\n")
              : recipeData.strInstructions,
          });
          setSaved(isRecipeSaved(id));
          setIngredients(recipeData.ingredients || []);
          setInstructions(recipeData.steps || []);
        }
      } else {
        // Handle API recipe
        let recipeData = await getRecipeById(id);
        if (recipeData) {
          setRecipe(recipeData);
          setSaved(isRecipeSaved(id));
          const parsedIngredients = parseRecipeIngredients(recipeData);
          setIngredients(parsedIngredients);
          const steps = recipeData.strInstructions
            .split("\n")
            .filter((step) => step.trim());
          setInstructions(steps);
        } else {
          // Fallback to uploaded recipe from server
          const uploaded = await getUploadedRecipeFromServer(id).catch(
            () => null
          );
          if (uploaded) {
            setRecipe({
              ...uploaded,
              strMeal: uploaded.name || uploaded.strMeal,
              strMealThumb: uploaded.image || uploaded.strMealThumb,
              strCategory: uploaded.category || uploaded.strCategory,
              strArea: uploaded.cuisine || uploaded.strArea,
              strInstructions: uploaded.steps
                ? uploaded.steps.join("\n")
                : uploaded.strInstructions,
            });
            setSaved(isRecipeSaved(id));
            setIngredients(uploaded.ingredients || []);
            const steps =
              uploaded.steps ||
              (uploaded.strInstructions
                ? uploaded.strInstructions.split("\n").filter(Boolean)
                : []);
            setInstructions(steps);
          }
        }
      }

      setLoading(false);
    };

    loadRecipe();
  }, [id]);

  const handleSave = () => {
    if (saved) {
      removeSavedRecipe(id);
      setSaved(false);
    } else {
      saveRecipe(recipe);
      setSaved(true);
    }
  };

  if (loading) {
    return (
      <div className="recipe-details-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-details-error">
        <p>Recipe not found</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  const prepTime = recipe.prepTime || 30; // Default 30 minutes

  return (
    <motion.div
      className="recipe-details"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <button
          className="btn btn-outline back-button"
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-arrow-left"></i> Back
        </button>

        <div className="recipe-details-header">
          <div className="recipe-details-image">
            <img
              src={
                recipe.strMealThumb ||
                recipe.image ||
                "https://via.placeholder.com/400x300?text=Recipe+Image"
              }
              alt={recipe.strMeal || recipe.name}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=Recipe+Image";
              }}
            />
          </div>

          <div className="recipe-details-info">
            <h1>{recipe.strMeal || recipe.name}</h1>
            <div className="recipe-meta">
              {(recipe.strCategory || recipe.category) && (
                <span className="meta-item">
                  <i className="fas fa-tag"></i>{" "}
                  {recipe.strCategory || recipe.category}
                </span>
              )}
              {(recipe.strArea || recipe.cuisine) && (
                <span className="meta-item">
                  <i className="fas fa-globe"></i>{" "}
                  {recipe.strArea || recipe.cuisine}
                </span>
              )}
              <span className="meta-item">
                <i className="fas fa-clock"></i> {prepTime} minutes
              </span>
            </div>
            <div className="recipe-actions">
              <button
                className={`btn ${saved ? "btn-secondary" : "btn-primary"}`}
                onClick={handleSave}
              >
                <i className="fas fa-bookmark"></i>
                {saved ? "Remove from Cookbook" : "Save Recipe"}
              </button>
            </div>
            <RatingStars recipeId={id} />
          </div>
        </div>

        <div className="recipe-details-content">
          <div className="recipe-section">
            <h2>
              <i className="fas fa-list"></i> Ingredients
            </h2>
            <IngredientChecklist ingredients={ingredients} />
          </div>

          <div className="recipe-section">
            <h2>
              <i className="fas fa-clock"></i> Prep Time
            </h2>
            <Timer initialMinutes={prepTime} />
          </div>

          <div className="recipe-section">
            <h2>
              <i className="fas fa-book-open"></i> Instructions
            </h2>
            <ol className="instructions-list">
              {instructions.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {step}
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeDetails;
