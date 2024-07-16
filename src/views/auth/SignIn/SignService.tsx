// import axios from 'axios';

// const API_URL = 'http://localhost:5000'; 

// export const signIn = async (email: string, password: string) => {
//     try {
//         console.log("Attempting to sign in...");
//         console.log("Payload:", { email, password });

//         const response = await axios.post(`${API_URL}/login`, { email, password });

//         console.log('Response status:', response.status);
//         console.log('Response data:', response.data);

//         return response.data;
//     } catch (error: any) {
//         if (error.response) {
//             console.error('Error data:', error.response.data);
//             console.error('Error status:', error.response.status);
//         } else if (error.request) {
//             console.error('Error request:', error.request);
//         } else {
//             console.error('Error message:', error.message);
//         }
//         throw error;
//     }
// };
