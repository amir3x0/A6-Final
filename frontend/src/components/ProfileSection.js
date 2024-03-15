import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { fetchRecipeById } from "../services/BackendService";
import RecipeCard from "../components/RecipeCard";
import Settings from "./settings"; // Adjust the import path as necessary

export default function MyYummy() {
  const { user } = useUser(); // Access user data from context
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [uploadedRecipes, setUploadedRecipes] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleRecipeClick = (id) =>
    setExpandedRecipeId(expandedRecipeId === id ? null : id);
  const handleRecipeSelect = (id) => setSelectedRecipeId(id);
  const toggleSettings = () => setShowSettings(!showSettings);

  // Function to handle fetching of recipes by IDs and setting state
  const fetchRecipes = async (recipeIds, setter) => {
    const recipes = [];
    for (const id of recipeIds.split(",")) {
      // Assuming your IDs are in a single string separated by commas
      try {
        const recipe = await fetchRecipeById(id);
        recipes.push(recipe);
      } catch (error) {
        console.error(`Failed to fetch recipe with ID ${id}:`, error);
      }
    }
    setter(recipes);
  };

  useEffect(() => {
    if (user.favoriteRecipes && user.favoriteRecipes.length > 0) {
      fetchRecipes(user.favoriteRecipes[0], setFavoriteRecipes); // Assuming favoriteRecipes is an array with a single string of IDs
    }
    if (user.uploadedRecipes && user.uploadedRecipes.length > 0) {
      fetchRecipes(user.uploadedRecipes[0], setUploadedRecipes); // Assuming uploadedRecipes is an array with a single string of IDs
    }
  }, [user]);

  // Adjust this to correctly render recipe cards based on user data
  const renderRecipeCards = (recipes) =>
    recipes.map((recipe) => (
      <div
        key={recipe._id} // Ensure recipes have a unique identifier, such as _id
        className={`${
          expandedRecipeId === recipe._id ? "col-span-3" : "col-span-1"
        } transition-all duration-300 ease-in-out`}
      >
        <RecipeCard
          recipe={recipe}
          isSelected={selectedRecipeId === recipe._id}
          isExpanded={expandedRecipeId === recipe._id}
          onSelect={() => handleRecipeSelect(recipe._id)}
          onClick={() => handleRecipeClick(recipe._id)}
        />
      </div>
    ));

  // Render the Add button
  const renderAddButton = (onClickFunction, buttonText = "+") => (
    <button
      className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClickFunction}
    >
      {buttonText}
    </button>
  );

  if (!user) {
    return <div>Loading user data...</div>; // Or handle user not found more gracefully
  }

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleUpload = () => {
    // Implement the upload logic
    console.log("Upload button clicked");

    setShowOptions(false);
  };

  const handleChooseAvatar = () => {
    // Implement the choose avatar logic
    console.log("Choose Avatar button clicked");

    setShowOptions(false);
  };

  return (
    <div className="container mx-auto px-5">
      <div className="flex flex-wrap -mb-4">
        {/* Profile and settings block */}
        <div className="flex flex-col items-center w-1/3 p-6 bg-white rounded-lg shadow-xl relative">
          <img
            src={user.profileImageUrl || "default_profile_image_url"}
            alt="Profile"
            className="rounded-full h-48 w-48 object-cover shadow-lg border-4 border-blue-300 cursor-pointer"
            onClick={toggleOptions}
          />
          {showOptions && (
            <div className="options-overlay absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
              <button
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpload}
              >
                Upload
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleChooseAvatar}
              >
                Choose Avatar
              </button>
            </div>
          )}
          <h2 className="text-3xl font-extrabold text-center mt-4 text-blue-600">
            {user.name}
          </h2>
          <p className="text-base text-center text-gray-500 mt-2">
            @{user.username}
          </p>
          <p className="text-center mt-4 text-lg text-gray-700">
            {user.bio || "No bio available"}
          </p>
          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-150 ease-in-out"
            onClick={toggleSettings}
          >
            Settings
          </button>
        </div>

        {/* Favorite and uploaded recipes, and meal plans */}
        <div className="w-full lg:w-2/3 px-4">
          {/* Favorite Recipes Section */}
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-indigo-600 tracking-tight">
              Favorite Recipes
            </h2>
            {favoriteRecipes.length > 0 ? (
              <div
                className="grid grid-cols-3 gap-6 overflow-auto"
                style={{ maxHeight: "calc(100px * 6)" }}
              >
                {renderRecipeCards(favoriteRecipes)}
              </div>
            ) : (
              <p>No favorite recipes added yet.</p>
            )}
          </div>

          {/* Uploaded Recipes Section */}
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-indigo-600 tracking-tight">
              Uploaded Recipes
            </h2>
            {uploadedRecipes.length > 0 ? (
              <div
                className="grid grid-cols-3 gap-6 overflow-auto"
                style={{ maxHeight: "calc(100px * 6)" }}
              >
                {renderRecipeCards(uploadedRecipes)}
              </div>
            ) : (
              <p>No recipes uploaded yet.</p>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-indigo-600 tracking-tight">
              Meal Plans
            </h2>
            {user.MealPlans && user.MealPlans.length > 0 ? (
              user.MealPlans.map((plan) => (
                <div key={plan.id} className="py-2">
                  {plan.title}
                </div>
              ))
            ) : (
              <p>No meal plans added yet.</p>
            )}
          </div>
        </div>

        {/* Debugging: Display user object
        <div>
          <h3>User Object:</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div> */}
      </div>
    </div>
  );
}
