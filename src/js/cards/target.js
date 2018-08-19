import Card from '.';
import Player from '../player';

// Pick a target for an effect (or ranged weapon, or spell, at some point)
export default class TargetCard extends Card {
  
  constructor (options){
    super(options);
    this.type = "target";
    
    this.range = options.range;
    this.effect = options.effect;
    this.item = options.item;
  }
                                  
  enter (loop) {
    let options = [];
    
    options.push({
      label: "You",
      effect: "",
      callback: () => {
        loop.pop();
        this.effect(Player); 
      }
    });
    
    for (let i = 1; i <= this.range; i++){
      let c = loop.peek(i);
      if (c.type === "creature") {
        options.push({
          label: c.creature.name,
          effect: "",
          callback: () => {
            loop.pop();
            this.effect(c.creature);
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