#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printError, printHelp, printSuccess } from "./services/log.service.js";
import {
  saveKeyValue,
  getKeyValue,
  STORAGE_DICTIONARY,
} from "./services/storage.service.js";
import { getWeather } from "./services/api.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("You need to add token");
    return;
  }
  try {
    await saveKeyValue(STORAGE_DICTIONARY.token, token);
    printSuccess("Token saved");
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("You need to add city");
    return;
  }

  try {
    await saveKeyValue(STORAGE_DICTIONARY.city, city);
    printSuccess("City saved");
  } catch (e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  try {
    const city = await getKeyValue(STORAGE_DICTIONARY.city);
    const weather = await getWeather(city);

    console.log(`
      Погода в городе ${weather.name}
      
      ${weather.weather[0].icon} => ${weather.weather[0].description}
      Температура => ${weather.main.temp.toFixed()}°C 
      Ощущается как => ${weather.main.feels_like.toFixed()}°C
    `);
  } catch (e) {
    if (e?.response?.status === 404) {
      printError("Wrong city name");
    } else if (e?.response?.status === 401) {
      printError("Wrong token");
    } else {
      printError(e.message);
    }
  }
};

const initCli = async () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }
  if (args.s) {
    await saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }

  await getForecast();
};

initCli();
