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
        const originalRequest = error.config;
        if(error.response?.data.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try{
                const response = await api.post("/auth/refresh",{},{withCredentials : true});

                const newAccessToken = response.data.accessToken;
                localStorage.setItem("accessToken",newAccessToken);
                originalRequest.header.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest)
            }catch(refreshError){
                localStorage.removeItem("accessToken")
                return Promise.reject(error)                
            }
        }
    }
)

export default api;