import { Hookable } from './helpers';
import Bus from './bus';

export default class Dialogue extends Hookable {
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
      Bus.pub("log-message", { html: "a new adventure"});
      this.hydrate(this.loop.peek());  
    });
  }
  
  setLoop (q) {
   this.loop = q; 
  }
  
  hydrate (card) {
    card.buildContents(this.loop, this.contents);
  }
}