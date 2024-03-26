import React, { useEffect, useState } from "react";
import { useShoppingList } from "../context/ShoppingListContext";
import { useNavigate } from "react-router-dom";
import { useRecipesForShoppingList } from "../context/RecipesForShoppingListContext";
import ShopBg from "../pages/shopping/shopping_img/Shopping-list-paper.jpg";

const ShoppingSection = () => {
  const {
    recipesForShoppingList,
    addRecipeForShoppingList,
    removeRecipeFromShoppingList,
  } = useRecipesForShoppingList();
  const navigate = useNavigate();
  const { shoppingList: initialShoppingList, setShoppingList } =
    useShoppingList();
  const [shoppingList, setShoppingListState] = useState(initialShoppingList);

  // Update shopping list when recipesForShoppingList changes
  useEffect(() => {
    // Create a new shopping list based on the ingredients of the recipesForShoppingList
    const newShoppingList = recipesForShoppingList.reduce((acc, recipe) => {
      // Iterate over each ingredient in the recipe
      recipe.ingredients.forEach((ingredient) => {
        // Check if the ingredient already exists in the shopping list
        const existingIndex = acc.findIndex(
          (item) => item.name === ingredient.name
        );
        if (existingIndex !== -1) {
          // If the ingredient exists, update its quantity
          acc[existingIndex].quantity += ingredient.quantity * recipe.quantity;
        } else {
          // If the ingredient does not exist, add it to the shopping list
          acc.push({
            name: ingredient.name,
            quantity: ingredient.quantity * recipe.quantity,
            unit: ingredient.unit,
          });
        }
      });
      return acc;
    }, []);
    // Set the updated shopping list
    setShoppingListState(newShoppingList);
  }, [recipesForShoppingList]);

  const handleAddRecipe = () => {
    navigate("/recipes", { state: { fromShoppingList: true } });
  };

  const handleAddQuantity = (recipeId) => {
    addRecipeForShoppingList(recipeId);
  };

  const handleSubtractQuantity = (recipeId) => {
    const recipeIndex = recipesForShoppingList.findIndex(
      (recipe) => recipe._id === recipeId
    );
    if (recipeIndex !== -1) {
      const updatedRecipes = [...recipesForShoppingList];
      if (updatedRecipes[recipeIndex].quantity === 1) {
        removeRecipeFromShoppingList(recipeId);
      } else {
        updatedRecipes[recipeIndex].quantity -= 1;
        // Update the recipesForShoppingList context
        setShoppingList(updatedRecipes);
      }
    }
  };

  const handleRemoveRecipe = (recipeId) => {
    removeRecipeFromShoppingList(recipeId);
  };

  return (
    <div
      className="container mx-auto p-4 max-w-8xl relative grid grid-cols-2 gap-4 dark:bg-gray-800"
      style={{
        backgroundImage: `url(${ShopBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="col-span-1 bg-opacity-80 shadow-lg bg-gray-100 dark:bg-gray-700 dark:bg-opacity-80 p-4 rounded-lg flex flex-col justify-center items-center"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <div className="bg-white dark:bg-gray-600 bg-opacity-80 dark:bg-opacity-80 h-full flex flex-col justify-center items-center">
          <button
            className="shadow-lg hover:bg-light-700 dark:hover:bg-gray-500 text-black dark:text-white font-bold py-2 px-4 rounded mb-4"
            onClick={handleAddRecipe}
          >
            Add Ingredients According to Recipe
          </button>
        </div>
      </div>

      <div className="col-span-1 bg-opacity-80 shadow-lg bg-gray-100 dark:bg-gray-700 dark:bg-opacity-80 p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
          Selected recipes for shopping list
        </h2>
        <div className="overflow-auto max-h-96">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 font-semibold text-left text-gray-600 dark:text-gray-300 uppercase">
                  Recipe
                </th>
                <th className="px-6 py-3 font-semibold text-left text-gray-600 dark:text-gray-300 uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 font-semibold text-left text-gray-600 dark:text-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recipesForShoppingList.map((recipe, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                    {recipe.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {recipe.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex space-x-2">
                    <button
                      onClick={() => handleAddQuantity(recipe._id)}
                      className="bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleSubtractQuantity(recipe._id)}
                      className="bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleRemoveRecipe(recipe._id)}
                      className="bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-span-1"></div>
      <div className="col-span-1 shadow-lg bg-gray-100 dark:bg-gray-700 p-4 rounded-lg bg-opacity-80 dark:bg-opacity-80">
        <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
          Shopping List
        </h2>
        <div className="overflow-auto max-h-96">
          <table className="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-semibold text-left text-gray-600 dark:text-gray-200 uppercase">
                  Ingredient
                </th>
                <th className="px-4 py-3 font-semibold text-left text-gray-600 dark:text-gray-200 uppercase">
                  Quantity
                </th>
                <th className="px-4 py-3 font-semibold text-left text-gray-600 dark:text-gray-200 uppercase">
                  Unit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-600">
              {shoppingList.map(({ name, quantity, unit }, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                    {name}
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                    {quantity}
                  </td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                    {unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShoppingSection;
