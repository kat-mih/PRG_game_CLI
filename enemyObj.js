import { GridObj } from "./gridObj.js";

class EnemyObj extends GridObj {
  #stats = {
    name: null,
    hp: 0,
    attack: 0,
    defense: 0,
  };

  constructor(sprite, stats) {
    super(sprite);
    this.#stats = stats;
    this.type = "enemy";
  }

  getName() {
    return this.#stats.name;
  }

  getStats() {
    return {
      attack: this.#stats.attack,
      defense: this.#stats.defense,
      hp: this.#stats.hp,
    };
  }

  describe() {
    console.log(
      `${this.sprite} You encountered a ${this.getName()}
${this.getName()} Stats: HP - ${this.#stats.hp}; Attack - ${
        this.#stats.attack
      }; Defense - ${this.#stats.defense}`
    );
  }
}

export { EnemyObj };
