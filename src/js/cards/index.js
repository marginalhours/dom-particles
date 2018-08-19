import Bus from '../bus';
import Player from '../player';
import Choice from '../choice';
import Tile from '../tile';

// Base card class (duh.)
// A card has two views into it (contents and tile)
// Plus functions that are called when it is entered / exited
export default class Card {
  constructor (options) {
    options = options || {};
    this.flavour = options.flavour || "An empty card";
  }
  
  buildContents (stack, container) {
    // Gets the expanded view
    // Default contents implementation is some flavour text plus a number of choices. 
    
    let { flavour, options } = this.enter(stack);
    
    let flavourEl = document.createElement('div');
    flavourEl.className = "flavour";
    flavourEl.innerText = flavour;
    
    let choiceList = document.createElement('div');
    choiceList.className = "choices-inner";
     
    options.map(({ callback, label, effect }) => {
      new Choice ({
        parent: choiceList,
        handleClick: () => { callback(); this.exit(stack); },
        label,
        effect
      });
    });
    
    container.innerHTML = '';
    container.appendChild(flavourEl);
    container.appendChild(choiceList);
  }
  
  buildTile () {
    // Get the "small" representation of this card, for putting in the queue
    if(!this.tile) { this.tile = new Tile ({ card: this, position: -1 }); }
    return this.tile;
  }
  
  enter (stack) {
    // method called on this card becoming the current one.
    let options = [];
    
    return {
      flavour: this.flavour,
      options 
    }
  }
  
  exit (player, stack) {
    // method called on card leaving stack. 
    Bus.pub('tile-seen');
  }
}