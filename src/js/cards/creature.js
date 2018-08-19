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
  
  enter (loop) {
    // Combat! But there should be a penalty for using an item (creature gets free hit?)
    // Worth bearing in mind for after the item targeting thing is cleared.
    let options = [];
    
    options.push({
      label: "Attack",
      effect: "Deal damage to creature",
      callback: () => {
        loop.pop();
        Player.attack(this.creature);
        
        if (this.creature.dead) {
          loop.unshift(new CorpseCard());
        } else {
          loop.unshift(this.tile); 
        }
      }
    });
    
    options.push(backpackOption(loop));
    
    return {
      flavour: this.creature.description,
      options
    }
  }
  
  exit (loop) {
    if(!this.creature.dead){ this.creature.attack(Player); }
    // Call super.exit() to make sure we push the right cards...
    super.exit(loop);
  }
  
}
