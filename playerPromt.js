import inquirer from "inquirer";

const chooseSprite = async (player) => {
  return await inquirer.prompt({
    type: "list",
    name: "sprite",
    message: "Please select your sprite:",
    choices: [...player],
  });
};

const playerMove = async () => {
  const result = await inquirer.prompt({
    type: "list",
    name: "direction",
    message: "Which direction would you like to travel?",
    choices: ["Up", "Right", "Down", "Left"],
  });

  return result.direction;
};

export { chooseSprite, playerMove };
