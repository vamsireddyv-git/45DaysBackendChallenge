import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:5000",
    withCredentials : true,
});

api.interceptors.response.use(
    (response) =>{
        return response
    },
    async (error) => {
        if(error.response?.status === 401 && error.response?.data?.code === "ACCESS_TOKEN_EXPIRED"){
            const response = await api.post("/auth/refresh");
            const newAccessToken = response.data.accessToken;
            localStorage.setItem("accessToken",newAccessToken);
            const originalRequest = error.config;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        }
        return Promise.reject(error)
    }
)

export default api;