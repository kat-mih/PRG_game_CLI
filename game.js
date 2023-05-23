import { PlayerObj } from "./playerObj.js";
import { GridObj } from "./gridObj.js";
import { ItemObj } from "./itemObj.js";
import { EnemyObj } from "./enemyObj.js";
import { chooseSprite, playerMove } from "./playerPromt.js";

class Game {
  #currentObject;

  constructor(
    height = 5,
    width = 8,
    playerStartX = 0,
    playerStartY = height - 1
  ) {
    this.height = height;
    this.width = width;
    this.playerCol = playerStartX;
    this.playerRow = playerStartY;

    // create game map
    this.grid = [];
    while (this.grid.length !== this.height) {
      const nestedArr = [];
      while (nestedArr.length !== this.width) {
        nestedArr.push(new GridObj());
      }
      this.grid.push(nestedArr);
    }

    // insert player
    this.grid[this.height - 1][0] = new GridObj("🐰", "player");

    // insert goal
    this.grid[0][this.width - 1] = new GridObj("⭐️", "win");

    this.displayGrid();
    this.moveRight();
    this.moveLeft();
    this.displayGrid();
  }

  displayGrid() {
    for (const row of this.grid) {
      for (const col of row) {
        process.stdout.write(col.sprite);
        process.stdout.write("\t");
      }
      console.log();
    }
  }

  moveUp() {
    // border validation
    if (this.playerRow === 0) {
      console.log("Cannot move up.");
      return;
    }

    this.grid[this.playerRow][this.playerCol] = new GridObj("🐾", "discovered");
    // move player to the right
    this.playerRow -= 1;

    // check if player discovered this spot already
    if (this.grid[this.playerRow][this.playerCol].type === "discovered") {
      this.grid[this.playerRow][this.playerCol].describe();
      this.grid[this.playerRow][this.playerCol] = new GridObj("🐰");
      return;
    }

    // discovering a new place
    // this.#currentObject = new GridObj();
    this.grid[this.playerRow][this.playerCol] = new GridObj("🐰");
  }

  moveRight() {
    // border validation
    if (this.playerCol === this.width - 1) {
      console.log("Cannot move right.");
      return;
    }

    this.grid[this.playerRow][this.playerCol] = new GridObj("🐾", "discovered");
    // move player to the right
    this.playerCol += 1;

    // check if player discovered this spot already
    if (this.grid[this.playerRow][this.playerCol].type === "discovered") {
      this.grid[this.playerRow][this.playerCol].describe();
      this.grid[this.playerRow][this.playerCol] = new GridObj("🐰");
      return;
    }

    // discovering a new place
    // this.#currentObject = new GridObj();
    this.grid[this.playerRow][this.playerCol] = new GridObj("🐰");
  }

  moveDown() {
    // border validation
    if (this.playerRow === this.height - 1) {
      console.log("Cannot move down.");
      return;
    }

    this.grid[this.playerRow][this.playerCol] = new GridObj("🐾", "discovered");
    // move player to the right
    this.playerRow += 1;

    // check if player discovered this spot already
    if (this.grid[this.playerRow][this.playerCol].type === "discovered") {
      this.grid[this.playerRow][this.playerCol].describe();
      this.grid[this.playerRow][this.playerCol] = new GridObj("🐰");
      return;
    }

    // discovering a new place
    // this.#currentObject = new GridObj();
    this.grid[this.playerRow][this.playerCol] = new GridObj("🐰");
  }

  moveLeft() {
    // border validation
    if (this.playerCol === 0) {
      console.log("Cannot move left.");
      return;
    }

    this.grid[this.playerRow][this.playerCol] = new GridObj("🐾", "discovered");
    // move player to the right
    this.playerCol -= 1;

    // check if player discovered this spot already
    if (this.grid[this.playerRow][this.playerCol].type === "discovered") {
      this.grid[this.playerRow][this.playerCol].describe();
      this.grid[this.playerRow][this.playerCol] = new GridObj("🐰");
      return;
    }

    // discovering a new place
    // this.#currentObject = new GridObj();
    this.grid[this.playerRow][this.playerCol] = new GridObj("🐰");
  }

  // async StartGame() {
  //   // Create player
  //   await this.initializePlayer();

  //   // create and display game map
  //   console.log("--------------");
  //   this.generateGridObject();
  //   this.insert(
  //     this.playerStartX,
  //     this.playerStartY,
  //     this.#playerSprite.sprite
  //   );
  //   this.addItems();
  //   this.displayGrid();

  //   // take a move
  //   while (this.playerStartX !== this.width - 1 || this.playerStartY !== 0) {
  //     const move = await playerMove();
  //     // add paws
  //     this.insert(
  //       this.playerStartX,
  //       this.playerStartY,
  //       this.#player.getStat().paws
  //     );
  //     // move logic
  //     try {
  //       if (move === "Up") {
  //         this.moveUp();
  //       }
  //       if (move === "Right") {
  //         this.moveRight();
  //       }
  //       if (move === "Down") {
  //         this.moveDown();
  //       }
  //       if (move === "Left") {
  //         this.moveLeft();
  //       }
  //       // move player
  //       this.insert(
  //         this.playerStartX,
  //         this.playerStartY,
  //         this.#playerSprite.sprite
  //       );
  //       this.displayGrid();
  //     } catch (e) {
  //       console.error(`You can't go ${move}`);
  //     }
  //   }
  //   console.log("You Won!");
  // }

  // async initializePlayer() {
  //   // initialize player
  //   this.#player = new PlayerObj();
  //   this.#playerSprite = await chooseSprite(this.#player);
  //   this.#player.setSprite(this.#playerSprite.sprite);
  //   this.#player.describe();
  // }

  // generateGridObject() {}

  // addItems() {
  //   // item & enemy objects
  //   for (let i = 0; i < this.width * this.height * 0.1; i++) {
  //     // generate random object (Item / Enemy)
  //     const randomItem = [new ItemObj(), new EnemyObj()][
  //       Math.random() > 0.5 ? 1 : 0
  //     ];

  //     // generate random coords
  //     const randomX = Math.floor(Math.random() * this.width);
  //     const randomY = Math.floor(Math.random() * this.height);

  //     this.insert(randomX, randomY, randomItem.sprite);
  //   }
  // }

  // insert(x, y, object) {
  //   this.#map[y][x] = object;
  // }

  // executeTurn() {}
}

const game = new Game();
