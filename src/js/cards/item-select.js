import Player from '../player';
import Card from '.';

export class ItemSelect extends Card {
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