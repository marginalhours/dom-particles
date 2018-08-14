import Player from '../player';
// Base card class (duh.)
export class Card {
  constructor (options) {
    options = options || {};
    this.flavour = options.flavour || "An empty card";
  }
  
  enter (stack) {
    // method called on this card becoming the current one. Arguments are player state and stack of cards.
    let options = [];
    
    return {
     flavour: this.flavour,
     options 
    }
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
    this.type = 'creature';
  }
  
  enter (player, stack) {
    // duh
  }
  
  exit (player, stack) {
    // and so on...
  }
}