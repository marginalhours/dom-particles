// Base card class (duh.)
export class Card {
  constructor (options) {
    this.
  }
  
  enter (player, stack) {
    // method called on this card becoming the current one. Arguments are player state and stack of cards.
  }
  
  exit (player, stack) {
   // method called on card leaving stack. 
  }
}

// For combat and such.
export class CreatureCard extends Card { 
  constructor (options) {
    super(options);
    this.creature = options.creature;
  }
  
  enter (player, stack) {
    // duh
  }
  
  exit (player, stack) {
    // and so on...
  }
}