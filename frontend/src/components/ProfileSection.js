import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { fetchRecipeById, handleUpload } from "../services/BackendService";
import RecipeCard from "../components/RecipeCard";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import Modal from "../pages/profile/picturemodel";

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
  const { user } = useUser();
  const [loadingStatus, setLoadingStatus] = useState("Loading");
  const [error, setError] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [uploadedRecipes, setUploadedRecipes] = useState([]);
  const [avatarPics, setAvatarPics] = useState([]);
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const initFetch = async () => {
      setLoadingStatus("Loading");
      try {
        if (user) {
          const avatarPicsResult = await fetchAvatarPics();
          setAvatarPics(avatarPicsResult);
          await fetchRecipes(user.favoriteRecipes, setFavoriteRecipes);
          await fetchRecipes(user.uploadedRecipes, setUploadedRecipes);
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
      if (recipeIds?.length > 0) {
        const recipes = await Promise.all(
          recipeIds.map((id) => fetchRecipeById(id))
        );
        setter(recipes);
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

  if (loadingStatus === "Loading") return <div>Loading...</div>;
  if (loadingStatus === "Error") return <div>Error: {error}</div>;

  const toggleSettingsVisibility = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };
  const toggleOptions = () => setShowOptions(!showOptions);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnlargeImage = () => {
    setIsModalOpen(true);
  };

  return (
    <IKContext
      publicKey="your_public_api_key"
      urlEndpoint="https://ik.imagekit.io/k0hnty7yv"
      transformationPosition="path"
      authenticationEndpoint="http://www.yourserver.com/auth"
    >
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <img
          src={user.profileImageUrl || "default_profile_image_url"}
          alt="Profile"
          className="max-w-full h-auto rounded-lg"
        />
      </Modal>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap -mb-4">
          {/* Profile Section */}
          <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
            <div className="flex flex-col items-center bg-white rounded-lg shadow-xl relative">
          <img src={user.profileImageUrl || "default_profile_image_url"} alt="Profile" className="rounded-full h-32 w-32 md:h-48 md:w-48 object-cover shadow-lg border-4 border-blue-300 cursor-pointer" onClick={toggleDropdown}/>
          {showDropdown && (
            <div className="absolute mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
              <a href="#" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white" onClick={handleEnlargeImage}>Enlarge</a>
              <a href="#" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white" onClick={() => console.log('Choose from API')}>Choose from API</a>
              <IKUpload fileName="avatar.jpg" tags={["avatar"]} folder={"/userPics"} onSuccess={(response) => handleUpload(response.file)} onError={(error) => console.error('Upload Error:', error)} />
            </div>
          )}
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
            </div>

            {/* Meal Plans Section */}
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
        </div>
      </div>
    </IKContext>
  );
}
