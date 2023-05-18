class PlayerObj {
  #stats = {
    HP: 20,
    Attack: 10,
    Defense: 5,
    sprite: ["🐰", "🦊", "🐵", "🐨", "🐼"],
    paws: "🐾",
  };

  chooseSprite() {
    return this.#stats.sprite;
  }

  setSprite(userInput) {
    this.#stats.sprite = userInput;
  }

  getStat() {
    return this.#stats;
  }

  addToStats(statsObj) {
    for (const key in this.#stats) {
      this.#stats[key] += statsObj[key];
    }
  }

  describe() {
    console.log(
      `${this.#stats.sprite} Player: HP - ${this.#stats.HP}; Attack - ${
        this.#stats.Attack
      }; Defense - ${this.#stats.Defense}`
    );
  }
}

export { PlayerObj };
