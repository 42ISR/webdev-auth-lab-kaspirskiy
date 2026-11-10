import axios from "axios"
import { useUserStore } from "../store/useUserStore"

const apiInstance = axios.create({
    baseURL: "https://api.kitek-pg.ru/api/marketplace/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})

apiInstance.interceptors.request.use((config) => {
    const { user } = useUserStore.getState()

    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }

    return config
})

const registerUser = async (user) => {
    const res = apiInstance.post("/auth/register", user)
    return res
}

const loginUser = async (user) => {
    const res = apiInstance.post("/auth/login", user)
    return res
}

const getItems = async () => {
    const res = await apiInstance.get("/items")
    return res
}

const getStats = async () => {
    const res = await apiInstance.get("/stats")
    return res
}

const getItemsBids = async () => {
    const res = await apiInstance.get("/items/${id}bids")
    return res
}

const getMyBids = async () => {
    const res = await apiInstance.get("/bids/my")
    return res
}

const sendItems = async (item) => {
    const res = await apiInstance.get("/items", item)
    return res.data
}

const deleteItems = async (id) => {
    const res = await apiInstance.get("/items/${id}")
    return res.data
}

const createBid = async (id) => {
    const res = await apiInstance.post("/items/:id/bids")
    return res.data
}

export const api = {
    registerUser,
    loginUser,
    getItems,
    getStats,
    getItemsBids,
    getMyBids,
    sendItems,
    deleteItems,
    createBid
}
