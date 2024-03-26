// In services/BackendService.js or wherever you've defined this function
import axios from "axios";


const API_URL = "http://localhost:4000";

// export const fetchMessageFromBackend = async () => {
//   try {
//     const response = await axios.get(`${API_URL}recipes`);
//     return response.data;
//   } catch (error) {
//     console.error("There was an error fetching the data:", error);
//     throw new Error("Failed to fetch message from backend"); // Propagate error
//   }
// };

// export const fetchProtectedData = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/protected-route`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching protected data:", error);
  //     throw new Error("Failed to fetch protected data");
  //   }
  // };

export const registerNewUser = async (name, email, username, password) => {
  try {
    await axios.post(`${API_URL}/users`, { name, email, username, password });
    return true;
  } catch (error) {
    return false;
  }
};

export const shareRecipe = async (recipe) => {
  try {
    const res = await axios.post(`${API_URL}/recipes/share`, recipe);
    return res.data;
  } catch (error) {
    return false;
  }
};

// Updating the uploaded recipes of a user.
export const updateUserUploadedRecipes = async (userId, recipeId) => {
  try {
    const res = await axios.post(`${API_URL}/users/updateShare`, { userId, recipeId });
    return res.data;
  } catch (error) {
    return false;
  }
};

export const authenticateUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      username,
      password,
    });
    // Capture and return the access token from the response
    return response.data; // Assuming the server sends back an object with accessToken
  } catch (error) {
    console.error(
      "Error during authentication:",
      error.response?.data?.message || error.message
    );
    return false;
  }
};

export const fetchRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/recipes`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch the recipes.");
  }
};

export const fetchRecipeById = async (recipeId) => {
  try {
    const response = await axios.get(`${API_URL}/recipes/findone/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    throw new Error("Failed to fetch recipe");
  }
};


export const fetchMealPlansbyId = async (mealId) => {
  try {
    const response = await axios.get(`${API_URL}/meals/loadmeal/${mealId}`);
    return response.data;
  } catch (error) {
    console.error("Axios error fetching meal plans:", error.response ? error.response.data : error.message);
    throw new Error("Failed to fetch the meal plans.");
  }
};

export const saveMealPlan = async (mealPlan) => {
  try {
    const response = await axios.post(`${API_URL}/meals/savemeal`, mealPlan);
    return response.data;
  } catch (error) {
    console.error("Error saving meal plan:", error);
    return false;
  }
};

export const addFavoriteRecipe = async (recipeId, userId) => {
  try {
    await axios.post(`${API_URL}/users/favorite`, { recipeId, userId });
    return true;
  } catch (error) {
    console.error("Error adding favorite recipe:", error);
    return false;
  }
};

export const removeFavoriteRecipe = async (recipeId, userId) => {
  try {
    await axios.delete(`${API_URL}/users/deletefavorite?recipeId=${encodeURIComponent(recipeId)}&userId=${encodeURIComponent(userId)}`);
    return true;
  } catch (error) {
    console.error("Error removing favorite recipe:", error);
    return false;
  }
};

export const updateUserBio = async (userId, newBio) => {
  try {
    const response = await axios.post(`${API_URL}/users/bio/`, {userId,
      bio: newBio,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update user bio:', error);
    throw error; 
  }
};

export const updateUserTheme = async (userId, newTheme) => {
  try {
    const response = await axios.post(`${API_URL}/users/theme/`, {userId,
      theme: newTheme,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update user theme:', error);
    throw error;
  }
};
