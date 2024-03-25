import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import {
  fetchRecipeById,
  fetchMealPlansbyId,
  getAuthenticationParametersImageKit,
  performImageUpload,
} from "../services/BackendService";
import RecipeCard from "./RecipeCard";
import MealCard from "./MealCard";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import Settings from "../pages/profile/settings";

async function fetchAvatarPics() {
  return [
    "/avatar_pics/avatar1.jpg",
    "/avatar_pics/avatar2.jpg",
    "/avatar_pics/avatar3.jpg",
    "/avatar_pics/avatar4.jpg",
    "/avatar_pics/avatar5.jpg",
  ];
}

export default function MyYummy() {
  const { user, setUser } = useUser();
  const [loadingStatus, setLoadingStatus] = useState("Loading");
  const [error, setError] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [uploadedRecipes, setUploadedRecipes] = useState([]);
  const [MealPlans, setMealPlans] = useState([]);
  const [avatarPics, setAvatarPics] = useState([]);
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [expandedMealId, setExpandedMealId] = useState(null);
  //imagkekit
  const [file, setFile] = useState(null);

  useEffect(() => {
    const initFetch = async () => {
      setLoadingStatus("Loading");
      try {
        if (user) {
          const avatarPicsResult = await fetchAvatarPics();
          setAvatarPics(avatarPicsResult);
          await fetchRecipes(user.favoriteRecipes, setFavoriteRecipes);
          await fetchRecipes(user.uploadedRecipes, setUploadedRecipes);
          await fetchMealPlans(user.MealPlans, setMealPlans);
          setLoadingStatus("Loaded");
        } else {
          throw new Error("User data not available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoadingStatus("Error");
      }
    };

    const fetchRecipes = async (recipeIds, setter) => {
      if (recipeIds.length > 0) {
        const recipes = await Promise.all(
          recipeIds.map((id) => fetchRecipeById(id))
        );
        setter(recipes);
      }
    };

    const fetchMealPlans = async (mealPlanIds, setter) => {
      if (mealPlanIds.length > 0) {
        const mealPlans = await Promise.all(
          mealPlanIds.map((id) => fetchMealPlansbyId(id))
        );
        setter(mealPlans);
      }
    };

    initFetch();
  }, [user]);

  const handleRecipeClick = (id) =>
    setExpandedRecipeId(expandedRecipeId === id ? null : id);

  const renderRecipeCards = (recipes) => (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
        expandedRecipeId ? "lg:gap-8 xl:gap-10" : ""
      }`}
    >
      {recipes.map((recipe) => (
        <div
          key={recipe._id}
          className={`p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 bg-white ${
            expandedRecipeId === recipe._id
              ? "col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4"
              : ""
          }`}
        >
          <RecipeCard
            recipe={recipe}
            onClick={() => handleRecipeClick(recipe._id)}
            isExpanded={expandedRecipeId === recipe._id}
          />
        </div>
      ))}
    </div>
  );

  const handleExpandChange = (mealId, isExpanded) => {
    setExpandedMealId(isExpanded ? mealId : null);
  };

  const renderMealPlans = (mealPlans) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mealPlans.map((meal) => (
        <div
          key={meal._id}
          className={`meal-plan-container transition duration-300 transform hover:-translate-y-1 ${
            expandedMealId === meal._id
              ? "sm:col-span-2 lg:col-span-3 xl:col-span-4"
              : "col-span-1"
          }`}
        >
          <MealCard meal={meal} onExpandChange={handleExpandChange} />
        </div>
      ))}
    </div>
  );

  if (loadingStatus === "Loading") return <div>Loading...</div>;
  if (loadingStatus === "Error") return <div>Error: {error}</div>;

  const toggleSettingsVisibility = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };
  const toggleOptions = () => setShowOptions(!showOptions);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
};

const uploadImageToImageKit = async () => {
  if (!file) {
    alert("Please select a file first!");
    return;
  }

  try {
    // Get the authentication parameters from your server
    const authParams = await getAuthenticationParametersImageKit();
    const formData = new FormData();
    formData.append("file", file); // The file to upload

    // Call the renamed service function to perform the upload
    const uploadResponse = await performImageUpload(formData);
    if (uploadResponse.success) { // Ensure to check the correct property for success
      alert("Upload successful!");
    } else {
      throw new Error("Upload failed due to server error");
    }
  } catch (error) {
    alert(error.message || "Upload failed!");
  }
};



  return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap -mb-4">
          {/* Profile Section */}
          <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
            <div className="flex flex-col items-center bg-white rounded-lg shadow-xl relative">
              <img
                src={user.profileImageUrl || "default_profile_image_url"}
                alt="Profile"
                className="rounded-full h-32 w-32 md:h-48 md:w-48 object-cover shadow-lg border-4 border-blue-300 cursor-pointer"
                onClick={toggleOptions}
              />
              {/* User Details */}
              <h2 className="text-2xl md:text-3xl font-extrabold text-center mt-4 text-blue-600">
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
                onClick={toggleSettingsVisibility}
              >
                Settings
              </button>
            </div>
          </div>

          {/* Recipes and Meal Plans */}
          <div className="w-full lg:w-2/3 px-4">
            <div className="container mx-auto px-4 py-8">
              {/* Favorite Recipes Section */}
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-8">Favorite Recipes</h2>
                {renderRecipeCards(favoriteRecipes)}
              </div>

              {/* Uploaded Recipes Section */}
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-8">Uploaded Recipes</h2>
                {renderRecipeCards(uploadedRecipes)}
              </div>

              {/* Meal Plans Section */}
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-8">Meal Plans</h2>
                {renderMealPlans(MealPlans)}
              </div>
            </div>
          </div>
        </div>

        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={uploadImageToImageKit}>Upload to ImageKit</button>
        </div>
      </div>
  );
}
