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
    // initialize player
    const player = new PlayerObj();
    const sprite = await chooseSprite(player);
    player.setSprite(sprite.sprite);
    player.describe();

    // create game map
    console.log("--------------");
    this.generateGridObject();
    this.insert(this.playerStartX, this.playerStartY, sprite.sprite);
    this.displayGrid();

    // take a move
    while (this.playerStartX !== this.width - 1 || this.playerStartY !== 0) {
      const move = await playerMove();
      try {
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
        this.insert(this.playerStartX, this.playerStartY, sprite.sprite);
        this.displayGrid();
      } catch (e) {
        console.error(`You can't go ${move.move}`);
      }
    }
    console.log("You Won!");
  }

  displayGrid() {
    for (const el of this.#currentObject) {
      console.log(...el);
    }
  }

  insert(x, y, object) {
    this.#currentObject[y][x] = object;
  }

  executeTurn() {}

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
    this.playerStartY -= 1;
    if (this.playerStartY < 0) {
      this.playerStartY = 0;
      throw new Error();
    }
  }

  moveRight() {
    this.playerStartX += 1;
    if (this.playerStartX >= this.width) {
      this.playerStartX = this.width - 1;
      throw new Error();
    }
  }

  moveDown() {
    this.playerStartY += 1;
    if (this.playerStartY >= this.height) {
      this.playerStartY = this.height - 1;
      throw new Error();
    }
  }

  moveLeft() {
    this.playerStartX -= 1;
    if (this.playerStartX < 0) {
      this.playerStartX = 0;
      throw new Error();
    }
  }
}

const game = new Game();

console.log(`Let's Start the GAME!`);
await game.StartGame();
