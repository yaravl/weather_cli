import { homedir } from "os";
import { join, dirname, extname } from "path";
import { writeFile, readFile, mkdir, stat } from "fs/promises";

const filePath = join(homedir(), "WeatherCLI", "weather-data.json");
const dirPath = dirname(filePath);
const fileExt = extname(filePath);

const isExists = async (path) => {
  try {
    await stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

export const saveKeyValue = async (key, value) => {
  const data = {};

  if (!(await isExists(dirPath))) {
    await mkdir(dirPath, { recursive: true });
    console.log("Dir created");
  }

  if (await isExists(filePath)) {
    const file = await readFile(filePath);
    Object.assign(data, JSON.parse(file.toString()));
  }

  data[key] = value;
  await writeFile(filePath, JSON.stringify(data), {});
};

export const getKeyValue = async (key) => {
  if (await isExists(filePath)) {
    const file = await readFile(filePath);
    const data = JSON.parse(file.toString());
    return data[key];
  }
  return undefined;
};
