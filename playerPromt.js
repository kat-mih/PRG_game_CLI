import inquirer from "inquirer";

const chooseSprite = async (player) => {
  return await inquirer.prompt({
    type: "list",
    name: "sprite",
    message: "Please select your sprite:",
    choices: [...player.chooseSprite()],
  });
};

const playerMove = async () => {
  return await inquirer.prompt({
    type: "list",
    name: "move",
    message: "Which direction would you like to travel?",
    choices: ["Up", "Right", "Down", "Left"],
  });
};

export { chooseSprite, playerMove };
