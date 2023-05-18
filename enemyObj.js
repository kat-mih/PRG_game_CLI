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
      `🕷️ ${this.getName()}: HP - ${this.#static.HP}; Attack - ${
        this.#static.Attack
      }; Defense = ${this.#static.Defense}`
    );
  }
}

export { EnemyObj };
