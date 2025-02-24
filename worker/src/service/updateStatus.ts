import { config } from "../config/envConfig";
import axios from "axios";

export const updateOrderStatusRequest = async (data: any) => {
  try {
    const { API_REST_URL, ACCESS_TOKEN } = config;
    await axios.patch( `${API_REST_URL}/orders`, data, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  } catch (error) {
    const err = error as { statusCode?: number, message: string };
    console.error("Error updating order status:", err.message);
  }
}