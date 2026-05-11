import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  // ❌ Don't attach token for login/register
  if (
    token &&
    !req.url.includes("login") &&
    !req.url.includes("register")
  ) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;