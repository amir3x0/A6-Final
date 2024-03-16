import React from "react";
import { useShoppingList } from "../context/ShoppingListContext";
import { useNavigate } from "react-router-dom";

const ShoppingSection = () => {
  const navigate = useNavigate();
  const { shoppingList } = useShoppingList(); // Access the shopping list from context

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
          Shopping List
        </h2>
        <ul className="list-disc list-inside">
          {shoppingList.map((item, index) => (
            <li key={index} className="text-lg text-black-600">
              {item.name} - {item.quantity} {item.unit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingSection;
