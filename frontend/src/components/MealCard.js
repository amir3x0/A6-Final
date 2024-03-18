import React, { useState } from 'react';
import RecipeCard from './RecipeCard'; // Assuming RecipeCard is in the same directory

// This component will accept a meal object and render a card for the meal
// and individual cards for each recipe within the meal
const MealCard = ({ meal }) => {
  // State to control which recipe card is expanded, if any
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);

  // Function to toggle expanded state of recipe cards
  const toggleRecipeExpand = (id) => {
    setExpandedRecipeId(expandedRecipeId === id ? null : id);
  };

  return (
    <div className="meal-card border border-gray-300 rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">{meal.name}</h2>
      <div className="recipes-container space-y-4">
        {meal.recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            isExpanded={expandedRecipeId === recipe._id}
            onClick={() => toggleRecipeExpand(recipe._id)}
            showSelectButton={false} // Assuming we don't want to show select button on meal recipes
          />
        ))}
      </div>
    </div>
  );
};

export default MealCard;
