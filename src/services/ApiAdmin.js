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

export const getRoleLabel = role => {
    switch(role) {
      case "client":
        return "Client"

      case "salesAgent":
        return "Sales"

      case "operationalOfficer":
        return "Operations"

      case "Manager":
        return "Manager"

      default:
        return role
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

// Shipments

export async function getShipments() {
  try {
    const response = await axios.get(`${apiUrl}/getAllShipments`, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function getShipmentById(id) {
  try {
    const response = await axios.get(`${apiUrl}/getShipmentById/${id}`, {
        withCredentials: true
    });
    return response.data.shipment;
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

// Quotes

export async function getQuotes() {
  try {
    const response = await axios.get(`${apiUrl}/getAllQuotes`, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function GetQuoteOfferById(id) {
  try {
    const response = await axios.get(`${apiUrl}/getQuoteById/${id}`, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}


export async function AddQuote(formData) {
  try {
    const response = await axios.post(`${apiUrl}/quotes`, { ...formData, assignedBy: localStorage.getItem('userId') }, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function EditQuote(formData) {
  try {
    const response = await axios.put(`${apiUrl}/quotes/${formData.quoteId}`, formData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function DeleteQuote(id) {
  try {
    const response = await axios.delete(`${apiUrl}/quotes/${id}`, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

// Tasks

export async function getTasks() {
  try {
    const response = await axios.get(`${apiUrl}/task`, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function AddTask(formData) {
  try {
    const response = await axios.post(`${apiUrl}/task`, { ...formData, assignedBy: localStorage.getItem('userId') }, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function DeleteTask(id) {
  try {
    const response = await axios.delete(`${apiUrl}/task/${id}`, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function EditTask(formData) {
  try {
    const response = await axios.put(`${apiUrl}/task/${formData._id}`, formData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}