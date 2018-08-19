import Player from '../player';
import Card from '.';
import CorpseCard from './corpse';
import { backpackOption } from './options-helper';

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
        
        if (this.creature.dead) {
          stack.unshift(new CorpseCard());
        } else {
          stack.unshift(this.tile); 
        }
      }
    });
    
    options.push(backpackOption(stack));
    
    return {
      flavour: this.creature.description,
      options
    }
  }
  
  exit (stack) {
    if(!this.creature.dead){ this.creature.attack(Player); }
    // Call super.exit() to make sure we push the right cards...
    super.exit();
  }
  
}
