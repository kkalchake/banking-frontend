import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // e.g., http://127.0.0.1:8080/api
  headers: {
    // Backend expects Form Data, not JSON
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const authService = {
  login: async (username, password) => {
    // Convert to URLSearchParams (Form Data format: key=value&key2=value2)
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    // Send request
    const response = await api.post('/login', params);

    // Backend returns plain string "Login success" or error text
    if (response.data === "Login success") {
      return { success: true, username };
    } else {
      throw new Error(response.data || "Invalid credentials");
    }
  },

  register: async (username, password) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    return await api.post('/register', params);
  }
};

export const accountService = {
  // Backend requires username as a query param (e.g., ?username=kk)
  getDetails: async (username) => {
    const response = await api.get(`/accounts/details?username=${username}`);
    return response.data; // Returns List of Maps: [{accNum: "...", balance: 100}]
  },

  createAccount: async (username) => {
    const params = new URLSearchParams();
    params.append('username', username);
    return await api.post('/account', params);
  }
};

export default api;