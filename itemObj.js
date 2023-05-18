import { GridObj } from "./gridObj.js";

class ItemObj extends GridObj {
  #stats = {
    HP: 0,
    Attack: 3,
    Defense: 1,
  };

  constructor(sprite, stats) {
    super(sprite);
  }

  itemName() {
    return "Sword";
  }

  getStats() {
    return this.#stats;
  }

  describe() {
    console.log(
      `🗡️ You got ${this.itemName()}: HP - ${this.#stats.HP}; Attack - ${
        this.#stats.Attack
      }; Defense - ${this.#stats.Defense}`
    );
  }
}

export { ItemObj };
