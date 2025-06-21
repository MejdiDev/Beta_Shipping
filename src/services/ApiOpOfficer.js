import axios from "axios";
const apiUrl = "http://localhost:5000/document";

//Documents
export async function uploadDocument(formData) {
    try {
        const response = await axios.post(apiUrl + "/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // For file upload
            },
            withCredentials: true, // This ensures cookies are sent with the request (if necessary)
        });

        console.log('Document uploaded successfully:', response.data);
        return response.data; // Return the response data or handle it as needed
    } catch (error) {
        console.error('Error uploading document:', error.response?.data || error.message);
        throw error; // Optionally, you can handle the error or return a specific response
    }
};