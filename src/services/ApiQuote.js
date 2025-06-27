  import axios from "axios";

const apiUrl = "http://localhost:5000/quote";

export function capitalizeWords(str) {
  if(!str) return ""
  
  return str
    .split(' ')
    .map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ');
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate;
}

export function getLabelColor(status) {
  switch(status) {
    case "requested":
      return"#3fccc1"

    case "approved":
      return"#fe9a3b"

    case "in transit":
      return"#fed333"

    case "delivered":
      return"#374658"

    case "rejected":
      return"#F44336"

    case "pending":
      return"#3fccc1"

    case "active":
      return"#3fccc1"

    case "quoted":
      return"#fe9a3b"

    case "accepted":
      return"#fe9a3b"
  }
}

export function getShipLabelColor(status) {
  switch(status) {
    case "created":
      return"#3fccc1"

    case "in transit":
      return"#fe9a3b"

    case "delivered":
      return"#374658"

    case "delayed":
      return"#f44336"
  }
}

export async function requestQuote(shipmentMode, dataQuote) {
  try {
    const response = await axios.post(`${apiUrl}/request`, {
      shipmentMode,
      
      shipDetails: {
        ...dataQuote,
        clientId: localStorage.getItem("userId")
      }
    }, {
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function getClientQuotes() {
  try {
    const response = await axios.get(`${apiUrl}/my-quotes?userId=${localStorage.getItem("userId")}`, {
        withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}