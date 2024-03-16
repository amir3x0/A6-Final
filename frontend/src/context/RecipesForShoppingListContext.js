import React, { createContext, useContext, useState } from 'react';
import { fetchRecipeById } from '../services/BackendService'; 

const RecipesForShoppingListContext = createContext();

export const useRecipesForShoppingList = () => useContext(RecipesForShoppingListContext);

export const RecipesForShoppingListProvider = ({ children }) => {
  const [recipesForShoppingList, setRecipesForShoppingList] = useState([]);

  const addRecipeForShoppingList = async (recipeId) => {
    try {
      // Fetch the recipe details by ID
      const recipeDetails = await fetchRecipeById(recipeId);

      // Add the fetched recipe to the state
      setRecipesForShoppingList((prevRecipes) => {
        // Optionally, you can check if the recipe is already added
        const isExisting = prevRecipes.some(recipe => recipe._id === recipeDetails._id);
        if (!isExisting) {
          return [...prevRecipes, recipeDetails];
        }
        return prevRecipes;
      });
    } catch (error) {
      console.error("Error fetching recipe details: ", error);
      // Handle error (e.g., set error state, show notification, etc.)
    }
  };

  const clearSelectedRecipes = () => {
    setRecipesForShoppingList([]);
  };

  return (
    <RecipesForShoppingListContext.Provider value={{ recipesForShoppingList, addRecipeForShoppingList, clearSelectedRecipes }}>
      {children}
    </RecipesForShoppingListContext.Provider>
  );
};
