import { PlayerObj } from "./playerObj.js";
import { GridObj } from "./gridObj.js";
import { ItemObj } from "./itemObj.js";
import { chooseSprite, playerMove } from "./playerPromt.js";

class Game {
  #currentObject;

  constructor(
    height = 5,
    width = 10,
    playerStartX = 0,
    playerStartY = height - 1
  ) {
    (this.height = height),
      (this.width = width),
      (this.playerStartX = playerStartX),
      (this.playerStartY = playerStartY);
  }

  async StartGame() {
    const player = new PlayerObj();
    const sprite = await chooseSprite(player);
    player.setSprite(sprite.sprite);
    player.describe();
    console.log("--------------");
    this.generateGridObject();
    this.insert(this.playerStartX, this.playerStartY, sprite.sprite);
    this.displayGrid();
    this.executeTurn();
  }

  displayGrid() {
    for (const el of this.#currentObject) {
      console.log(...el);
    }
  }

  insert(x, y, object) {
    this.#currentObject[y][x] = object;
  }

  async executeTurn() {
    const move = await playerMove();
    if (move.move === "Up") {
      this.moveUp();
    }
    if (move.move === "Right") {
      this.moveRight();
    }
    if (move.move === "Down") {
      this.moveDown();
    }
    if (move.move === "Left") {
      this.moveLeft();
    }
  }

  generateGridObject() {
    // create grid
    const grid = [];
    while (grid.length !== this.height) {
      const nestedArr = [];
      while (nestedArr.length !== this.width) {
        const sprite = new GridObj();
        nestedArr.push(sprite.sprite);
      }
      grid.push(nestedArr);
    }
    grid[0][this.width - 1] = "⭐️";
    this.#currentObject = grid;
  }

  moveUp() {
    console.log("Up");
  }

  moveRight() {}

  moveDown() {
    console.log("Down");
  }

  moveLeft() {
    console.log("Left");
  }
}

const game = new Game();

console.log(`Let's Start the GAME!`);
await game.StartGame();
