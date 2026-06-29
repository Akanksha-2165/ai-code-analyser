import axios from "axios";

// Base URL (works locally now, easy to change later for deployment)
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// Shared Axios client
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Supabase token (if logged in)
apiClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Existing analyze function
import { supabase } from "../lib/supabase";

export async function analyzeCode(code, language, type) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const response = await apiClient.post("/api/analyze", {
    code,
    language,
    type,
    userId: user?.id,
  });

  return response.data;
}

// Export the axios client for other services
export default apiClient;