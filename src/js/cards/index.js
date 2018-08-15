import Player from '../player';
// Base card class (duh.)
export class Card {
  constructor (options) {
    options = options || {};
    this.flavour = options.flavour || "An empty card";
  }
  
  buildContents (stack, container) {
  // TODO move logic from dialogue into here, so that more complex cards can override this bit instead
    let { flavour, options } = this.enter(stack);
    
    this.choicelist.innerHTML = '';  
    this.flavour.innerText = flavour;
    
    options.map(({ callback, label, effect }) => {
      new Choice ({
        parent: this.choicelist,
        handleClick: () => { callback(); this.hydrate(this.stack.peek()) }, // default look at next card
        label,
        effect
      });
    });
    
                    <div class='flavour' data-hook='flavour'></div>
                    <div class='choices-inner' data-hook='choicelist'></div>
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

export class CorridorCard extends Card {
  enter (stack){
    let options = [];
    
    options.push({
      label: "OK",
      effect: "",
      callback: () => {
        stack.pop();
      }
    });
    
    return {
      flavour: "An empty corridor.",
      options
    }
  }
}

export class CorpseCard extends Card {
  constructor (options) {
    super(options);
  }
  
  enter (stack) {
   let options = []; 
 
   options.push({
     label: "Loot corpse",
     effect: "Chance of treasure",
     callback: () => {
       stack.pop();
       stack.unshift(new CorridorCard());
       Player.changeResource('gold', 5);
     }
   });
    
   options.push({
     label: "Respect the dead",
     effect: "---",
     callback: () => {
       stack.pop();
       stack.unshift(new CorridorCard());
     }
   });
    
   return {
     flavour: "A fallen foe",
     options
   }
    
  }
}

export class ItemSelectCard extends Card {
  enter (stack) {
    let options = [];
    
    Object.keys(Player.items).map(k => {
      if (Player.items[k].count > 0) {
        options.push({
          label: k,
          effect: Player.items[k].effect,
          callback: () => {
            stack.pop();
            stack.unshift(new TargetCard({
              item: k,
              range: Player.items[k].range,
              effect: Player.items[k].callback
            }));
          }
        });
      }
    });
      
    return {
      flavour: "Choose an item",
      options
    }
  }                     
}

// Pick a target for an effect (or ranged weapon, or spell, at some point)
export class TargetCard extends Card {
  
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
            stack.pop();
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

export class CharacterSheet extends Card {
  constructor (options) {
    super(options);
  }
  enter (stack) {
    let options = [];
    
    options.push({
      label: "OK",
      effect: "",
      callback: () => {
        stack.pop();
      }
    });
    
    return {
      flavour: "Yourself",
      options
    }
  }
}