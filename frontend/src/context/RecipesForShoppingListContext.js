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

  const clearRecipesForShoppingList = () => {
    setRecipesForShoppingList([]);
  };

  return (
    <RecipesForShoppingListContext.Provider value={{ recipesForShoppingList, addRecipeForShoppingList, clearRecipesForShoppingList }}>
      {children}
    </RecipesForShoppingListContext.Provider>
  );
};
