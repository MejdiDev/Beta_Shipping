import axios from "axios";

const apiUrl = "http://localhost:5000/salesAgent";

export const getLeadColor = status => {
  switch(status) {
    case "new":
      return "#3fccc1"

    case "contacted":
      return "#374658"

    case "qualified":
      return "#fe9a3b"

    case "lost":
      return "#f44336"
  }
}

export const getPriorityColor = priority => {
  switch(priority) {
    case "low":
      return "#6c757d"

    case "medium":
      return "#ffc107"

    case "high":
      return "#f44336"
  }
}

export const getTaskColor = stat => {
  switch(stat) {
    case "pending":
      return "#3fccc1"

    case "in progress":
      return "#fe9a3b"

    case "completed":
      return "#374658"

    case "overdue":
      return "#f44336"
  }
}

export const getRoleColor = role => {
  switch(role) {
    case "admin":
      return "#3fccc1"

    case "user":
      return "#fe9a3b"

    case "client":
      return "#374658"

    case "salesAgent":
      return "#f44336"

    case "manager":
      return "#f44336"

    case "financialOfficer":
      return "#f44336"

    case "operationalOfficer":
      return "#f44336"
  }
}

//Quotes

export async function getQuotes() {
  try {
    const response = await axios.get(`${apiUrl}/quotes`, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function getQuoteById(id) {
  try {
    const response = await axios.get(`${apiUrl}/quotes/${id}`, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

//Offer

export async function AddOffer(offerData) {
  try {
    const response = await axios.post(`${apiUrl}/offer`, offerData, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function CheckOfferExists(quoteId) {
  try {
    const response = await axios.get(`${apiUrl}/offer/check/exists?quoteId=${ quoteId }`, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

//Clients

export async function getClients() {
  try {
    const response = await axios.get(`${apiUrl}/clients`, {
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
    const response = await axios.delete(`${apiUrl}/clients/${id}`, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function EditClient(formData) {
  try {
    const response = await axios.put(`${apiUrl}/clients/${formData._id}`, formData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

//Leads

export async function getAgentLeads() {
  try {
    const response = await axios.get(`${apiUrl}/leads`, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function AddLead(formData) {
  try {
    const response = await axios.post(`${apiUrl}/leads`, formData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function EditLead(formData) {
  try {
    const response = await axios.put(`${apiUrl}/leads/${formData._id}`, formData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function DeleteLead(id) {
  try {
    const response = await axios.delete(`${apiUrl}/leads/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

//Tasks

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

//Actors

export async function getAllWithRole() {
  try {
    const response = await axios.get(`${apiUrl}/getAllWithRole`, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

//Notifs

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