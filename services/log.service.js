import chalk from "chalk";

export const printError = (error) => {
  console.log(`${chalk.bgRed(" Error ")} 
    => ${chalk.red(error)}`);
};

export const printSuccess = (message) => {
  console.log(`${chalk.bgGreen(" Success ")} 
    => ${chalk.green(message)}`);
};

export const printHelp = () => {
  console.log(
    `${chalk.bgBlueBright(" HELP ")}
    Без параметров - вывод погоды
    -h => вывод помощи
    -s [CITY] => для выбора города
    -t [API_KEY] => для установки токена`
  );
};
