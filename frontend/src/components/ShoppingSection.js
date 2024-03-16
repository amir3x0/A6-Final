import React, { useEffect, useState } from "react";
import { useShoppingList } from "../context/ShoppingListContext";
import { useNavigate } from "react-router-dom";
import { useRecipesForShoppingList } from "../context/RecipesForShoppingListContext";

const ShoppingSection = () => {
  const { recipesForShoppingList } = useRecipesForShoppingList();
  const navigate = useNavigate();
  const [shoppingList, setShoppingListState] = useState([]);
  const { setShoppingList } = useShoppingList();


  const handleAddRecipe = () => {
    navigate("/recipes", { state: { fromShoppingList: true } }); // Pass the flag in the location state
  };

  return (
    <div className="container mx-auto p-4 max-w-8xl relative grid grid-cols-2 gap-4">
      <div className="col-span-1 bg-opacity-50 bg-cover bg-center">
        <div className="bg-white bg-opacity-50 h-full flex flex-col justify-center items-center">
          <button
            className="shadow-lg hover:bg-light-700 text-black font-bold py-2 px-4 rounded mb-4 w-full"
            onClick={handleAddRecipe}
          >
            Add Ingredients According to Recipe
          </button>
        </div>
      </div>
      <div className="col-span-1 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-black-800">
          Selected recipes for shopping list 
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-left text-gray-600 uppercase">
                Recipe
              </th>
              <th className="px-6 py-3 font-semibold text-left text-gray-600 uppercase">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recipesForShoppingList.map((recipe, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {recipe.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {recipe.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-2xl font-bold mb-6 text-center text-black-800">
          Shopping List
        </h2>
        <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-left text-gray-600 uppercase">
                    Ingredient
                  </th>
                  <th className="px-4 py-3 font-semibold text-left text-gray-600 uppercase">
                    Quantity
                  </th>
                  <th className="px-4 py-3 font-semibold text-left text-gray-600 uppercase">
                    Unit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {shoppingList.map(({ name, quantity, unit }, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-700">{name}</td>
                    <td className="px-4 py-2 text-gray-700">{quantity}</td>
                    <td className="px-4 py-2 text-gray-700">{unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
      </div>
    </div>
  );
};

export default ShoppingSection;