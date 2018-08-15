import { Hookable } from './helpers';
import Bus from './bus';

export class Dialogue extends Hookable {
  constructor (options) {
    const { parent } = options;
    
    super ({
      parent,
      template: `<div class='big-card' data-hook='container'>
                  <div class='card-image'>
                    <div class='card-image-inner'></div>
                  </div>
                  <div class='content' data-hook='contents'>
                  </div>
                 </div>
                `
    });
    
    Bus.sub('tile-seen', () => {
      this.hydrate(this.stack.peek());  
    });
  }
  
  setStack (q) {
   this.stack = q; 
  }
  
  hydrate (event) {
    event.card.buildContents(this.stack, this.contents);
  }
}