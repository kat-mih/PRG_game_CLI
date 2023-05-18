class GridObj {
  #backgroundSprites = ["🌴", "🌲", "🌵", "🌳"];

  constructor(sprite, type = "undiscovered") {
    this.sprite =
      this.#backgroundSprites[
        Math.floor(Math.random() * (this.#backgroundSprites.length - 1))
      ];
    this.type = type;
  }

  decription() {
    console.log(`${type}`);
  }
}

export { GridObj };
