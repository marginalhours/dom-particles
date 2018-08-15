import Card from '.';
import Player from '../player';
import CorridorCard from './corridor';

export default class CorpseCard extends Card {
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