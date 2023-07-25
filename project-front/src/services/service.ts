import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const loginUser = async (email: string, password: string) => {
    console.log("tentando acessar a api")
    return api.post("/auth/login", { email, password });
}