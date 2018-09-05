import { Hookable } from './helpers';
import Bus from './bus';

export default class Log extends Hookable {
  constructor (options) {
    const { parent } = options;
    
    super ({
      parent,
      template: `<div class='log-outer' data-hook='container'></div>`
    });
    
    Bus.sub('log-message', (msg) => {
      this.addMessage(msg);  
    });
  }
  
  addMessage (msg){
    let m = document.createElement("p");
    m.innerHTML = msg.html;
    this.container.appendChild(m);
  }
}