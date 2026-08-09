import axios from "axios";
import api from "../lib/axios";

const getErrorMessage = (error) => {

    return (error.response?.data.msg || error.message || "Server Error.Try again later!")
}

export const saveUser = async (data) => {
    try {
        const response = await api.post("/api/user/save", data);
        return response.data
    } catch (error) {
        console.log("❌ [saveUser API Error]", error)
        return {
            success: false,
            msg: getErrorMessage(error),
            user_warning: error.response?.data?.user_warning
        }
    }
}

export const fetchUser = async () => {
    try {
        const response = await api.get("/api/user/fetch");
        return response.data
    } catch (error) {
        console.log("❌ [fetchUser API Error]", error)
        return {
            success: false,
            msg: getErrorMessage(error),
            user_warning: error.response?.data?.user_warning
        }
    }
}

export const updateUser = async (data) => {
    try {
        const response = await api.post("/api/user/update", data);
        return response.data
    } catch (error) {
        console.log("❌ [updateUser API Error]", error)
        return {
            success: false,
            msg: getErrorMessage(error),
            user_warning: error.response?.data?.user_warning
        }
    }
}

export const sendMessage = async (form) => {
    try {
        const response = await api.post("/api/chat/send", form)
        return response.data;
    } catch (error) {
        console.log("❌ [sendMessage API Error]", error);
        return {
            success: false,
            msg: getErrorMessage(error),
            user_warning: error.response?.data?.user_warning,
        };
    }
}

export const fetchMessages = async (chatId) => {
    try {
        const response = await api.get(`/api/chat/fetch/${chatId}`);
        return response.data
    } catch (error) {
        console.log("❌ [fetchMessage API Error]", error)
        return {
            success: false,
            msg: getErrorMessage(error),
            user_warning: error.response?.data?.user_warning
        }
    }
}

export const fetchChats = async () => {
    try {
        const response = await api.get(`/api/chat/fetch-chats`);
        return response.data
    } catch (error) {
        console.log("❌ [fetchChats API Error]", error)
        return {
            success: false,
            msg: getErrorMessage(error),
            user_warning: error.response?.data?.user_warning
        }
    }
}

export const deleteChat = async (chatId) => {
    try {
        const response = await api.delete(`/api/chat/delete/${chatId}`);
        return response.data
    } catch (error) {
        console.log("❌ [deleteChat API Error]", error)
        return {
            success: false,
            msg: getErrorMessage(error),
            user_warning: error.response?.data?.user_warning
        }
    }
}

export const reverseGeocode = async (latitude, longitude) => {
    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1&accept-language=en`
        )

        if (!response.data || response.data.error) {
            return {
                success: false,
                msg: "Could not detect your location details. Please enter manually.",
            }
        }

        return {
            success: true,
            address: response.data.address,
            lat: response.data.lat,
            lon: response.data.lon,
        }
    } catch (error) {
        console.log("❌ [reverseGeocode API Error]", error)
        return {
            success: false,
            msg: "Could not detect your location details. Please enter manually.",
        }
    }
}

export const fetchWeather = async (lat, lng) => {
    try {
        const params = {
            "latitude": lat,
            "longitude": lng,

            "current": [
                "temperature_2m",
                "relative_humidity_2m",
                "precipitation",
                "rain",
                "weather_code",
                "wind_speed_10m",
                "wind_direction_10m",
                "surface_pressure"
            ].join(","),

            "daily": [
                "temperature_2m_max",
                "temperature_2m_min",
                "precipitation_sum",
                "precipitation_probability_max",
                "sunrise",
                "sunset"
            ].join(","),

            "timezone": "auto",
            "forecast_days": 5
        }
        const response = await axios.get("https://api.open-meteo.com/v1/forecast", { params })
        return { success: true, weather: response.data }
    } catch (error) {
        console.log("❌ [fetchWeather API Error]", error)
        return {
            success: false,
            msg: error.message,
        }
    }
}

export const sendQuery = async (data) => {
    try {
        const response = await api.post(`/api/user/send-query`, data);
        return response.data
    } catch (error) {
        console.log("❌ [sendQuery API Error]", error)
        return {
            success: false,
            msg: getErrorMessage(error),
            user_warning: error.response?.data?.user_warning
        }
    }
}

export const reportIssue = async (data) => {
    try {
        const response = await api.post(`/api/user/report-issue`, data);
        return response.data
    } catch (error) {
        console.log("❌ [reportIssue API Error]", error)
        return {
            success: false,
            msg: getErrorMessage(error),
            user_warning: error.response?.data?.user_warning
        }
    }
}

export const sendFeedback = async (data) => {
    try {
        const response = await api.post(`/api/user/feedback`, data);
        return response.data
    } catch (error) {
        console.log("❌ [sendFeedback API Error]", error)
        return {
            success: false,
            msg: getErrorMessage(error),
            user_warning: error.response?.data?.user_warning
        }
    }
}

export const getFarmInsights = async (data) => {
    try {
        const response = await api.get(`/api/user/farm/insights`);
        return response.data
    } catch (error) {
        console.log("❌ [getFarmInsights API Error]", error)
        return {
            success: false,
            msg: getErrorMessage(error),
            user_warning: error.response?.data?.user_warning
        }
    }
}