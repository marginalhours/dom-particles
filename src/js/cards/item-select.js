import Player from '../player';
import Card from '.';
import TargetCard from './target';

import { cancelOption } from './options-helper';

export default class ItemSelect extends Card {
  constructor () {
    super();
    this.type = "itemselect";
  }
  
  enter (loop) {
    let options = [];
    
    Object.keys(Player.items).map(k => {
      if (Player.items[k].count > 0) {
        if(Player.items[k].range > 0){ // case where it's targetable
          options.push({
            label: k + ` (${Player.items[k].count})`,
            effect: Player.items[k].effect,
            callback: () => {
              loop.pop();
              loop.unshift(new TargetCard({
                item: k,
                range: Player.items[k].range,
                effect: (args) => { Player.items[k].count--; Player.items[k].callback(args)} 
              }));
            }
          });
        } else { // not a targetable item
          options.push({
            label: k + ` (${Player.items[k].count})`,
            effect: Player.items[k].effect,
            callback: () => {
              loop.pop();
              Player.items[k].count--;
              Player.items[k].callback(Player);
            }
          });
        }
      }
    });
    
    options.push(cancelOption(loop));
      
    return {
      flavour: "Choose an item",
      options
    }
  }                     
}