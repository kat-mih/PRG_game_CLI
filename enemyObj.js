import { GridObj } from "./gridObj.js";

class EnemyObj extends GridObj {
  #stats = {
    HP: 6,
    Attack: 3,
    Defense: 1,
  };

  constructor(sprite, stats) {
    super(sprite);
  }

  getName() {
    return "Spider";
  }

  getStat() {
    return this.#stats;
  }

  describe() {
    console.log(
      `🕷️ ${this.getName()}: HP - ${this.#stats.HP}; Attack - ${
        this.#stats.Attack
      }; Defense = ${this.#stats.Defense}`
    );
  }
}

export { EnemyObj };
