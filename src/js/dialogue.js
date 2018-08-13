import { Hookable } from './helpers';
import Choice from './choice';

export class Dialogue extends Hookable {
  constructor (options) {
    const { parent } = options;
    
    super ({
      parent,
      template: `<div class='big-card' data-hook='container'>
                  <div class='card-image'>
                    <div class='card-image-inner'></div>
                  </div>
                  <div class='choices'>
                    <div class='flavour' data-hook='flavour'></div>
                    <div class='choices-inner' data-hook='choicelist'></div>
                  </div>
                 </div>
                `
    });
  }
  
  setStack (q) {
   this.stack = q; 
  }
  
  hydrate (event) {
    this.flavour.innerText = "A bonzo loaf";
    this.choicelist.innerHTML = '';  
    
    let { flavour, options } = event.card.enter({}, this.stack);
    
    options.map(({ callback, label, effect }) => {
      new Choice ({
        parent: this.choicelist,
        handleClick: () => { callback(); this.hydrate(this.stack.peek()) }, // default look at next card
        label,
        effect
      });
    });
  }
}