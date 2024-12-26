import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MAIN_URL,
  withCredentials: true,
});

export default function useAxios() {
  const { Logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          Logout().then(() => {
            navigate("/auth/login");
          });
        }
        return Promise.reject(error);
      }
    );
  });
  return axiosInstance;
}
