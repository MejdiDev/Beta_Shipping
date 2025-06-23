import axios from "axios";
const apiUrl = "http://localhost:5000/client";

//Notifications

export async function getNotifs() {
  try {
    const response = await axios.get(`${apiUrl}/notif?userId=${localStorage.getItem('userId')}`, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function AddNotif(formData) {
  try {
    const response = await axios.post(`${apiUrl}/task`, { ...formData, assignedBy: localStorage.getItem('userId') }, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

//Shipment

export async function getShipments() {
  try {
    const response = await axios.get(`${apiUrl}/getShipments?userId=${localStorage.getItem('userId')}`, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data.shipments;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

//Offer

export async function AcceptOffer(formData) {
  try {
    const response = await axios.post(`${apiUrl}/offer/accept`, { ...formData, clientId: localStorage.getItem('userId') }, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function GetOfferById(id) {
  try {
    const response = await axios.get(`${apiUrl}/offer/${id}`, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}