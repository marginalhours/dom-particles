import Card from '.';
import Player from '../player';
import CorridorCard from './corridor';

export default class CorpseCard extends Card {
  constructor (options) {
    super(options);
  }
  
  enter (loop) {
   let options = []; 
  
   options.push({
     label: "Loot corpse",
     effect: "Chance of treasure",
     callback: () => {
       loop.pop();
       loop.unshift(new CorridorCard());
       Player.changeResource('gold', 5);
     }
   });
    
   options.push({
     label: "Respect the dead",
     effect: "---",
     callback: () => {
       loop.pop();
       loop.unshift(new CorridorCard());
     }
   });
    
   return {
     flavour: "A fallen foe",
     options
   }
  }
}