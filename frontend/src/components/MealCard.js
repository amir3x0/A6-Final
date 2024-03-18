import React, { useState } from "react";
import RecipeCard from "./RecipeCard";

const MealCard = ({ meal , onExpandChange  }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderCollage = () => {
    const images = meal.recipes.map((recipe, index) => (
      <img
        key={index}
        src={recipe.picture}
        alt={recipe.title}
        className={`w-full ${
          meal.recipes.length > 4 ? "h-full" : "h-2/3"
        } object-cover ${index > 3 ? "hidden" : ""}`}
        style={{ maxHeight: "400px" }}
      />
    ));

    const gridTemplateColumns = {
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-2",
    };

    return (
      <div
        className={`grid ${
          gridTemplateColumns[meal.recipes.length] || "grid-cols-1"
        } gap-1 cursor-pointer`}
        onClick={toggleExpand}
      >
        {images}
      </div>
    );
  };

  const toggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpandChange(meal._id, newExpandedState); 
  };

  return (
    <div
      onClick={toggleExpand} // Toggle expand on the entire meal card
      className={`meal-card border border-gray-300 rounded-lg shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? "p-8 w-full" : "p-4"
      } cursor-pointer`}
    >
      <h2 className="text-2xl font-extrabold mb-6 text-green-800 hover:text-green-600 transition-colors duration-200 ease-in-out cursor-pointer">{meal.name}</h2>
      {isExpanded ? (
        <div className="recipes-expanded space-y-4 w-full">
          {meal.recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              isExpanded={true}
              showSelectButton={false}
            />
          ))}
        </div>
      ) : (
        <>
          {renderCollage()}
          <div className="mt-4">
            <ul className="list-disc pl-5">
              {meal.recipes.map((recipe) => (
                <li key={recipe._id}>{recipe.title}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default MealCard;
