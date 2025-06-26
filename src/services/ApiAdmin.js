import axios from "axios";

const apiUrl = "http://localhost:5000/admin";

export const getRoleColor = role => {
  switch(role) {
    case "client":
      return "#3fccc1"

    case "salesAgent":
      return "#fe9a3b"

    case "operationalOfficer":
      return "#374658"

    case "manager":
      return "#f44336"

    case "admin":
      return "#f44336"
  }
}

// Clients

export async function getClients() {
  try {
    const response = await axios.get(`${apiUrl}/getAllUsers`, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function AddClient(formData) {
  try {
    const response = await axios.post(`${apiUrl}/clients`, { ...formData, assignedBy: localStorage.getItem('userId') }, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function DeleteClient(id) {
  try {
    const response = await axios.delete(`${apiUrl}/deleteUserProfile/${id}`, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function EditClient(formData) {
  try {
    const response = await axios.put(`${apiUrl}/updateUserProfile`, { ...formData, userId: localStorage.getItem('userId') }, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}