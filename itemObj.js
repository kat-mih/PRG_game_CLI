import { GridObj } from "./gridObj.js";

class ItemObj extends GridObj {
  #stats = {
    name: null,
    hp: 0,
    attack: 0,
    defense: 0,
  };

  constructor(sprite, stats) {
    super(sprite);
    this.type = "item";
    this.#stats = stats;
  }

  itemName() {
    return this.#stats.name;
  }

  getStat() {
    return {
      attack: this.#stats.attack,
      defense: this.#stats.defense,
      hp: this.#stats.hp,
    };
  }

  describe() {
    console.log(
      `🗡️ You found a ${this.itemName()}!
${this.itemName()}'s Stats: HP - ${this.#stats.hp}; Attack - ${
        this.#stats.attack
      }; Defense - ${this.#stats.defense}`
    );
  }
}

export { ItemObj };
