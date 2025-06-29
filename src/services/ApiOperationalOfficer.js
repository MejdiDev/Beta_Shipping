import axios from "axios";

const apiUrl = "http://localhost:5000/operationalOfficer";

export async function getShipments() {
  try {
    const response = await axios.get(`${apiUrl}/shipments?userId=${localStorage.getItem('userId')}`, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function getShipmentById(id) {
  try {
    const response = await axios.get(`${apiUrl}/shipments/${id}`, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function addShipment(formData) {
  try {
    const response = await axios.post(`${apiUrl}/shipments`, formData, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function editShipment(formData) {
  try {
    const response = await axios.put(`${apiUrl}/shipments/${formData.shipmentId}`, formData, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function deleteShipment(id) {
  try {
    const response = await axios.delete(`${apiUrl}/shipments/${id}`, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function getClients() {
  try {
    const response = await axios.get(`${apiUrl}/clients`, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function getQuotes() {
  try {
    const response = await axios.get(`${apiUrl}/quotes`, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function getTasks() {
  try {
    const response = await axios.get(`${apiUrl}/task//getUserTasks?userId=${ localStorage.getItem('userId') }`, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

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