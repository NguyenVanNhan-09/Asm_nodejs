import axios from "axios";

const instance = axios.create({
   baseURL: "https://project-reactjs.onrender.com",
   headers: {
      "Content-Type": "application/json",
   },
});
export default instance;
