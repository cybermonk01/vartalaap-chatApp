import axios from "axios";

const axiosReq = axios.create({
  baseURL: "/api/v1/",
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

export default axiosReq;
