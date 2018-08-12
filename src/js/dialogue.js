import { Hookable } from './helpers';

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
    this.flavour.innerText = event.getFlavourText();
    this.choicelist.innerHTML = '';  
    
    let k = document.createElement('button');
    k.innerText = "Double";
    this.choicelist.appendChild(k);
    
    k.addEventListener('click', () => {
      this.queue.pop();
      this.queue.addAtHead();
      this.queue.addAtHead();
      this.hydrate(this.queue.peek());
    });
    
    let l = document.createElement('button');
    l.innerText = 'Nothing';
    this.choicelist.append(l);
    
    l.addEventListener('click', () => {
      this.queue.pop();
      this.hydrate(this.queue.peek());
    });
  }
}