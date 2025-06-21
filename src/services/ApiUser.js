import axios from "axios";

const apiUrl = "http://localhost:5000/users";

// Register a new user
export async function addUser(dataUser) {
  try {
    const response = await axios.post(`${apiUrl}/addUser`, dataUser, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

// Login a user
export async function loginUser(dataUser) {
  try {
    const response = await axios.post(`${apiUrl}/login`, dataUser, {
      withCredentials: true, // Include cookies in the request
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}


