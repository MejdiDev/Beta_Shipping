import axios from "axios";
import toast from 'react-hot-toast';

const apiUrl = "http://localhost:5000";

// Toast

export const toastSucc = msg => {
  toast.success(msg, {
    style: {
        border: '2px solid #021E3D',
        borderRadius: '10px',
        background: '#01152B',
        color: '#fff',
    },
    
    iconTheme: {
      primary: '#0A7CFF',
      secondary: '#FFFAEE',
    },
  })
}

export const toastErr = msg => {
  toast.error(msg, {
      style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
      },
  })
}

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