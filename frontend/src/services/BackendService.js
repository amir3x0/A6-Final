// In services/BackendService.js or wherever you've defined this function
import axios from "axios";

const API_URL = "http://localhost:4000";

export const fetchMessageFromBackend = async () => {
  try {
    const response = await axios.get(`${API_URL}recipes`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data:", error);
    throw new Error("Failed to fetch message from backend"); // Propagate error
  }
};

export const registerNewUser = async (name, email, username, password) => {
  try {
    await axios.post(`${API_URL}/users`, { name, email, username, password });
    return true;
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

export const fetchProtectedData = async () => {
  try {
    const response = await axios.get(`${API_URL}/protected-route`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching protected data:", error);
    throw new Error("Failed to fetch protected data");
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
    console.error('Error fetching recipe by ID:', error);
    throw new Error('Failed to fetch recipe');
  }
};


  // Function to handle profile picture update
  export const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file); // Append the file
      // Assuming updateUserProfileImage is an API call to your backend
      const updatedUrl = await updateUserProfileImage(formData); // You need to implement this API call
      // Update user state or perform necessary actions after successful upload
      console.log("Profile picture updated:", updatedUrl);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };