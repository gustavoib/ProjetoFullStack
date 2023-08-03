import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const loginUser = async (email: string, password: string) => {
    return api.post("/auth/login", { email, password });
}

export const registerUser = async ( name: string, email: string, password: string, phone: string) => {
    return api.post("/auth/register", { name, email, password, phone});
}

export const createNote = async (title: string, content: string, id: string) => {
    return api.post("/notes/" + id + "/register", { title, content });
}

export const getNotes = async (id: string) => {
    return api.get("/notes/" + id + "/list-notes");
}

export const delNote = async (id_user: string, id: string) => {
    return api.delete("/notes/" + id_user + "/" + id + "/delete");
}

export const updateNote = async (id: number, title: string, content: string) => {
    return api.put("/notes/" + id + "/edit", { title, content });
}  