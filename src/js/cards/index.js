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
       
       Player.changeResource('gold', 5);
     }
   });
    
   options.push({
     label: "Respect the dead",
     effect: "---",
     callback: () => {
       stack.pop();  
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
      options.push({
        label: k,
        effect: Player.items[k].effect,
        callback: () => {
          stack.pop();
          stack.unshift(new TargetCard({
            range: Player.items[k].target,
            effect: Player.items[k].callback
          }));
        }
      });
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
  }
                                  
  enter (stack) {
    let options = [];
    return {
      flavour: "Choose a target",
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
    // duh
    let options = [];
    
    options.push({
      label: "Attack",
      effect: "Deal damage to creature",
      callback: () => {
        stack.pop();
        
        this.creature.health -= 5;
        
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