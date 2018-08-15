import Card from '.';
import Player from '../player';

// Pick a target for an effect (or ranged weapon, or spell, at some point)
export default class TargetCard extends Card {
  
  constructor (options){
    super(options);
    
    this.range = options.range;
    this.effect = options.effect;
    this.item = options.item;
  }
                                  
  enter (stack) {
    let options = [];
    
    options.push({
      label: "You",
      effect: "",
      callback: () => {
        stack.pop();
        this.effect(Player); 
      }
    });
    
    for (let i = 1; i <= this.range; i++){
      let c = stack.peek(i);
      if (c.card.type === "creature") {
        options.push({
          label: c.card.creature.name,
          effect: "",
          callback: () => {
            stack.next();
            this.effect(c.card.creature);
          }
        });
      }
    }
    
    return {
      flavour: `Choose a target for ${this.item}`,
      options
    }
  }
}