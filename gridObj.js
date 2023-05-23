class GridObj {
  #backgroundSprites = ["🌴", "🌲", "🌵", "🌳"];

  constructor(sprite, type = "undiscovered") {
    if (!sprite) {
      this.sprite =
        this.#backgroundSprites[
          Math.floor(Math.random() * this.#backgroundSprites.length)
        ];
    } else {
      this.sprite = sprite;
    }
    this.type = type;
  }

  describe() {
    const random = Math.random();
    if (random < 0.33) {
      console.log("Coast is clear!");
    } else if (random < 0.66) {
      console.log("This surroundings look familiar.");
    } else {
      console.log("There's not much here.");
    }
  }
}

export { GridObj };
