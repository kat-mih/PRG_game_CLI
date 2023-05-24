import { PlayerObj } from "./playerObj.js";
import { GridObj } from "./gridObj.js";
import { ItemObj } from "./itemObj.js";
import { EnemyObj } from "./enemyObj.js";
import { chooseSprite, playerMove } from "./playerPromt.js";

class Game {
  #currentObject;
  #player;
  #grid;

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
    this.createGrid();

    // game logic
    this.StartGame();
  }

  createGrid() {
    this.#grid = [];
    while (this.#grid.length !== this.height) {
      const nestedArr = [];
      while (nestedArr.length !== this.width) {
        nestedArr.push(new GridObj());
      }
      this.#grid.push(nestedArr);
    }
  }

  async StartGame() {
    await this.initializePlayer();

    // insert player
    this.insert(this.height - 1, 0, new GridObj(this.#player.sprite, "player"));

    // insert goal
    this.insert(0, this.width - 1, new GridObj("⭐️", "win"));

    while (this.#player.getStats().hp > 0) {
      this.displayGrid();
      const response = await playerMove();

      switch (response) {
        case "Up": {
          this.moveUp();
          break;
        }
        case "Right": {
          this.moveRight();
          break;
        }
        case "Down": {
          this.moveDown();
          break;
        }
        case "Left": {
          this.moveLeft();
          break;
        }
      }

      console.log("------------------------------");
    }
  }

  async initializePlayer() {
    this.#player = new PlayerObj("Player", { attack: 10, defense: 5, hp: 20 });
    const sprite = await chooseSprite(this.#player.sprite);
    this.#player.setSprite(sprite.sprite);
  }

  displayGrid() {
    this.#player.describe();

    for (const row of this.#grid) {
      for (const col of row) {
        process.stdout.write(col.sprite);
        process.stdout.write("\t");
      }
      console.log();
    }
  }

  generateGridObject() {
    const random = Math.random();
    let object;

    if (random < 0.15) {
      object = new ItemObj("🗡️", {
        name: "Sword",
        attack: 3,
        defense: 1,
        hp: 0,
      });
    } else if (random < 0.35) {
      object = new EnemyObj("🕷️", {
        name: "Spider",
        attack: 15,
        defense: 1,
        hp: 6,
      });
    } else {
      object = new GridObj("🐾", "discovered");
    }

    return object;
  }

  executeTurn() {
    if (this.#grid[this.playerRow][this.playerCol].type === "win") {
      console.log(`🎉 Congrats! You reached the end of the game! 🥳`);
      process.exit(); // exit entire program
    }

    if (this.#currentObject.type === "discovered") {
      this.#currentObject.describe();
      return;
    }

    if (this.#currentObject.type === "item") {
      this.#currentObject.describe();
      const itemStats = this.#currentObject.getStats();
      this.#player.addToStats(itemStats);
      return;
    }

    // enemy
    this.#currentObject.describe();
    const enemyStats = this.#currentObject.getStats();
    const enemyName = this.#currentObject.getName();
    const playerStats = this.#player.getStats();

    if (enemyStats.defense > playerStats.attack) {
      console.log(`You Lose - ${enemyName} was too powerful!`);
      process.exit();
    }

    let totalPlayerDamage = 0;
    while (enemyStats.hp > 0) {
      const enemyDamageTurn = playerStats.attack - enemyStats.defense;
      const playerDamageTurn = enemyStats.attack - playerStats.defense;

      if (enemyDamageTurn > 0) {
        enemyStats.hp -= enemyDamageTurn;
      }
      if (playerDamageTurn > 0) {
        playerStats.hp -= playerDamageTurn;
        totalPlayerDamage += playerDamageTurn;
      }
    }

    if (playerStats.hp <= 0) {
      console.log(`You Lose - ${enemyName} was too powerful!`);
      process.exit();
    }

    this.#player.addToStats({ hp: -totalPlayerDamage });
    console.log(`You defeated the ${enemyName}!`);
    this.#player.describe();
  }

  insert(x, y, object) {
    this.#grid[x][y] = object;
  }

  moveUp() {
    // border validation
    if (this.playerRow === 0) {
      console.log("Cannot move up.");
      return;
    }

    this.insert(
      this.playerRow,
      this.playerCol,
      new GridObj("🐾", "discovered")
    );

    // move player to the right
    this.playerRow -= 1;

    // check if player discovered this spot already
    if (this.#grid[this.playerRow][this.playerCol].type === "discovered") {
      this.#grid[this.playerRow][this.playerCol].describe();
      this.insert(
        this.playerRow,
        this.playerCol,
        new GridObj(this.#player.sprite)
      );
      return;
    }

    // discovering a new place
    this.#currentObject = this.generateGridObject();
    this.executeTurn();
    this.insert(
      this.playerRow,
      this.playerCol,
      new GridObj(this.#player.sprite)
    );
  }

  moveRight() {
    // border validation
    if (this.playerCol === this.width - 1) {
      console.log("Cannot move right.");
      return;
    }

    this.insert(
      this.playerRow,
      this.playerCol,
      new GridObj("🐾", "discovered")
    );
    // move player to the right
    this.playerCol += 1;

    // check if player discovered this spot already
    if (this.#grid[this.playerRow][this.playerCol].type === "discovered") {
      this.#grid[this.playerRow][this.playerCol].describe();
      this.insert(
        this.playerRow,
        this.playerCol,
        new GridObj(this.#player.sprite)
      );
      return;
    }

    // discovering a new place
    this.#currentObject = this.generateGridObject();
    this.executeTurn();
    this.insert(
      this.playerRow,
      this.playerCol,
      new GridObj(this.#player.sprite)
    );
  }

  moveDown() {
    // border validation
    if (this.playerRow === this.height - 1) {
      console.log("Cannot move down.");
      return;
    }

    this.insert(
      this.playerRow,
      this.playerCol,
      new GridObj("🐾", "discovered")
    );
    // move player to the right
    this.playerRow += 1;

    // check if player discovered this spot already
    if (this.#grid[this.playerRow][this.playerCol].type === "discovered") {
      this.#grid[this.playerRow][this.playerCol].describe();
      this.insert(
        this.playerRow,
        this.playerCol,
        new GridObj(this.#player.sprite)
      );
      return;
    }

    // discovering a new place
    this.#currentObject = this.generateGridObject();
    this.executeTurn();
    this.insert(
      this.playerRow,
      this.playerCol,
      new GridObj(this.#player.sprite)
    );
  }

  moveLeft() {
    // border validation
    if (this.playerCol === 0) {
      console.log("Cannot move left.");
      return;
    }

    this.insert(
      this.playerRow,
      this.playerCol,
      new GridObj("🐾", "discovered")
    );
    // move player to the right
    this.playerCol -= 1;

    // check if player discovered this spot already
    if (this.#grid[this.playerRow][this.playerCol].type === "discovered") {
      this.#grid[this.playerRow][this.playerCol].describe();
      this.insert(
        this.playerRow,
        this.playerCol,
        new GridObj(this.#player.sprite)
      );
      return;
    }

    // discovering a new place
    this.#currentObject = this.generateGridObject();
    this.executeTurn();
    this.insert(
      this.playerRow,
      this.playerCol,
      new GridObj(this.#player.sprite)
    );
  }
}

const game = new Game();
