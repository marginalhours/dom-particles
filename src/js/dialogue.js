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
  
  setQueue (q) {
   this.queue = q; 
  }
  
  hydrate (event) {
    this.flavour.innerText = "A bonzo loaf";
    this.choicelist.innerHTML = '';  
    
    new Choice({
      parent: this.choicelist,
      handleClick: () => { console.log("woo!") },
      label: "A shot in the dark",
      effect: "10% chance of successful hit for 3-9 damage"
    });
    
    new Choice({
      parent: this.choicelist,
      handleClick: () => { console.log("whee!") },
      label: "Defensive stance",
      effect: "+3 STALWART for 1 round"
    });
  }
}