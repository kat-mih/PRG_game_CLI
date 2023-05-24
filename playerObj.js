class PlayerObj {
  #stats = {
    hp: 0,
    attack: 0,
    defense: 0,
  };

  constructor(name, stats) {
    this.name = name;
    this.#stats = stats;
    this.sprite = ["🐰", "🦊", "🐵", "🐨", "🐼"];
    // this.sprite = "🐰";
  }

  setSprite(userInput) {
    this.sprite = userInput;
  }

  getName() {
    return this.name;
  }

  getStats() {
    return {
      attack: this.#stats.attack,
      defense: this.#stats.defense,
      hp: this.#stats.hp,
    };
  }

  addToStats(statsObj) {
    if (statsObj.attack) {
      this.#stats.attack += statsObj.attack;
    }
    if (statsObj.defense) {
      this.#stats.defense += statsObj.defense;
    }
    if (statsObj.hp) {
      this.#stats.hp += statsObj.hp;
    }
  }

  describe() {
    console.log(
      `${this.sprite} Player Stats: HP - ${this.#stats.hp}; Attack - ${
        this.#stats.attack
      }; Defense - ${this.#stats.defense}`
    );
  }
}

export { PlayerObj };
