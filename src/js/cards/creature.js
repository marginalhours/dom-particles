import Player from '../player';
import Card from '.';
import { CorpseCard } from './corpse';
import { ItemSelectCard } from './item-select';

// For combat and such.
export class CreatureCard extends Card { 
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
        
        this.creature.health -= 5;
        Player.changeResource('health', -2);
        
        if(this.creature.dead){
          stack.unshift(new CorpseCard());
        } else {
          stack.unshift(this); 
        }
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
  
  exit (player, stack) {
    // and so on...
  }
  
}
