import axios from "axios";

const apiUrl = "http://localhost:5000";

// Notifications

export async function checkNewNotifs() {
  try {
    const response = await axios.get(`${apiUrl}/notif/check/new?userId=${ localStorage.getItem('userId') }&lastChecked=${ localStorage.getItem('lastCheckedNotifs') }`, {
      withCredentials: true, // Include cookies in the request
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}

export async function MarkNotifAsRead(notifId) {
  try {
    const response = await axios.put(`${apiUrl}/notif`, { notifId }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error, please try again" };
  }
}