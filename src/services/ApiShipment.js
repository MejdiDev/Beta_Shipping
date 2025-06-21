  import axios from "axios";

const apiUrl = "http://localhost:5000/shipment";

export async function getShipments() {
  try {
    const response = await axios.get(`${apiUrl}/my-shipments?userId=${localStorage.getItem("userId")}`, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}