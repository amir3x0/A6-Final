import React, { createContext, useContext, useState } from 'react';
import { fetchRecipeById } from '../services/BackendService'; 

const RecipesForShoppingListContext = createContext();

export const useRecipesForShoppingList = () => useContext(RecipesForShoppingListContext);

export const RecipesForShoppingListProvider = ({ children }) => {
  const [recipesForShoppingList, setRecipesForShoppingList] = useState([]);

  const addRecipeForShoppingList = async (recipeId) => {
    try {
      const recipeDetails = await fetchRecipeById(recipeId);
      
      // Check if the recipe already exists in the list
      const existingRecipeIndex = recipesForShoppingList.findIndex(recipe => recipe._id === recipeDetails._id);
      if (existingRecipeIndex !== -1) {
        // If the recipe already exists, update its quantity
        const updatedRecipes = [...recipesForShoppingList];
        updatedRecipes[existingRecipeIndex].quantity += 1;
        setRecipesForShoppingList(updatedRecipes);
      } else {
        // If the recipe doesn't exist, add it with a quantity of 1
        setRecipesForShoppingList(prevRecipes => [...prevRecipes, { ...recipeDetails, quantity: 1 }]);
      }
    } catch (error) {
      console.error("Error fetching recipe details: ", error);
    }
  };

  const subRecipeForShoppingList = (recipeId) => {
    const updatedRecipes = recipesForShoppingList.map(recipe => {
      if (recipe._id === recipeId) {
        // If the quantity is already 1, remove the recipe instead of decreasing its quantity
        if (recipe.quantity === 1) {
          removeRecipeFromShoppingList(recipeId);
        } else {
          // Decrease the quantity by 1
          return { ...recipe, quantity: recipe.quantity - 1 };
        }
      }
      return recipe;
    });

    // Update the state with the modified recipes
    setRecipesForShoppingList(updatedRecipes);
  };

  const removeRecipeFromShoppingList = (recipeId) => {
    setRecipesForShoppingList(prevRecipes =>
      prevRecipes.filter(recipe => recipe._id !== recipeId)
    );
  };

  const clearRecipesForShoppingList = () => {
    setRecipesForShoppingList([]);
  };

  return (
    <RecipesForShoppingListContext.Provider value={{ recipesForShoppingList, addRecipeForShoppingList, subRecipeForShoppingList, removeRecipeFromShoppingList, clearRecipesForShoppingList }}>
      {children}
    </RecipesForShoppingListContext.Provider>
  );
};
