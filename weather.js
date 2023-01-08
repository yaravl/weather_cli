#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printError, printHelp, printSuccess } from "./services/log.service.js";
import { getKeyValue, saveKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("You need to add token");
    return;
  }
  try {
    await saveKeyValue("token", token);
    printSuccess("Token saved");
  } catch (e) {
    printError(e.message);
  }
};

const initCli = () => {
  const args = getArgs(process.argv);
  console.log("@@@args", args);

  if (args.h) {
    printHelp();
  }
  if (args.s) {
    // Сохранить город
  }
  if (args.t) {
    return saveToken(args.t);
  }

  getKeyValue("asdasd");
};

initCli();
