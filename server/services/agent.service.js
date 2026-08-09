// services/agent.service.js
import axios from "axios";
import FormData from "form-data";

const FASTAPI_URL = process.env.FASTAPI_URL || "http://127.0.0.1:8000";

export const callAgent = async ({
  threadId, query, language = "english", crops, previousCrops,
  state, district, soilType, season, waterSources, farmSize,
  lat, lng, file,
}) => {
  try {
    const formData = new FormData();

    formData.append("thread_id", threadId);
    if (query) formData.append("query", query);
    if (language) formData.append("language", language);
    if (Array.isArray(crops) && crops.length) formData.append("crops", JSON.stringify(crops));
    if (Array.isArray(previousCrops) && previousCrops.length) formData.append("previous_crops", JSON.stringify(previousCrops));
    if (state) formData.append("state", state);
    if (district) formData.append("district", district);
    if (soilType) formData.append("soil_type", soilType);
    if (season) formData.append("season", season);
    if (Array.isArray(waterSources) && waterSources.length) formData.append("water_sources", JSON.stringify(waterSources));
    if (farmSize !== undefined && farmSize !== null) formData.append("farm_size", String(farmSize));
    if (lat !== undefined && lat !== null) formData.append("lat", String(lat));
    if (lng !== undefined && lng !== null) formData.append("lng", String(lng));

    // multer gives an in-memory buffer (memoryStorage), not a disk path — use it directly
    if (file) {
      formData.append("file", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    }

    const response = await axios.post(`${FASTAPI_URL}/ask`, formData, {
      headers: { ...formData.getHeaders() },
      timeout: 120000,
    });

    return response.data;
  } catch (error) {
    console.error("[agentService] FastAPI error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || "Unable to get response from AI agent");
  }
};

export const callFarmInsightsAgent = async (data) => {
  try {
    const response = await axios.post(`${FASTAPI_URL}/farm/insights`, data, {
      timeout: 120000,
    });
    return response.data;
  } catch (error) {
    console.error("[agentService] FastAPI error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || "Unable to get response from AI agent");
  }
}