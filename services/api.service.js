import axios from "axios";
import * as dotenv from "dotenv";
import { getKeyValue, STORAGE_DICTIONARY } from "./storage.service.js";

dotenv.config();

export const getWeather = async (city) => {
  const token =
    process.env.TOKEN ?? (await getKeyValue(STORAGE_DICTIONARY.token));
  if (!token) {
    throw new Error("api key not set, set it using the command -t [API_KEY]");
  }
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: "ru",
        units: "metric",
      },
    }
  );

  return data;
};
