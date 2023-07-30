import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const loginUser = async (email: string, password: string) => {
    console.log("tentando acessar a api")
    return api.post("/auth/login", { email, password });
}

export const registerUser = async ( name: string, email: string, password: string, phone: string) => {
    console.log("tentando acessar a api")
    return api.post("/auth/register", { name, email, password, phone});
}

export const getNotes = async (id: string) => {
    return api.get('notes/'+ id + '/list-notes');
}