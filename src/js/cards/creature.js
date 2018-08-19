import Player from '../player';
import Card from '.';
import CorpseCard from './corpse';
import ItemSelectCard from './item-select';

// For combat and such.
export default class CreatureCard extends Card { 
  constructor (options) {
    super(options);
    this.creature = options.creature;
    this.type = 'creature';
  }
  
  enter (stack) {
    // Combat! But there should be a penalty for using an item (creature gets free hit?)
    // Worth bearing in mind for after the item targeting thing is cleared.
    let options = [];
    
    options.push({
      label: "Attack",
      effect: "Deal damage to creature",
      callback: () => {
        stack.pop();
        Player.attack(this.creature);
      }
    });
    
    options.push({
      label: "Use item",
      effect: "Open backpack",
      callback: () => {
        stack.unshift(new ItemSelectCard());
      }
    });
    
    return {
      flavour: this.creature.description,
      options
    }
  }
  
  exit (stack) {
    if(this.creature.dead){
      stack.unshift(new CorpseCard());
    } else {
      // Attack the player...
      this.creature.attack(Player);
      stack.unshift(this); 
    }
    
    // Call super.exit() to make sure we push the right cards...
    super.exit();
  }
  
}
