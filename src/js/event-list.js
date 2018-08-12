import { Hookable } from './helpers';

export class EventList extends Hookable {
  constructor (options) {
    const { parent } = options;

    super ({ 
          parent,
          template: `<ul data-hook='container' class='event-list'>
                      <li><div></div></li>
                    </ul>`
    });
    
    this._events = [];
  }
  
  add () {
    this._events.push(new Event({ parent: this.container })); 
    this.reposition();
  }
  
  reposition () {
    // call this to resync 
    this._events.map((e, idx) => e.reposition(idx));
  }
}

export class Event extends Hookable {
  constructor (options) {
    const { parent } = options;
    
    super ({
          parent, 
          template: `<li data-hook='outer'>
                      <div data-hook='inner'> 
                        <div data-hook='contents'>
                        </div>
                      </div>
                     </li>`
    });
    
    this.position = -1;
  }
  
  reposition (rank) {
    this.outer.style.transform = "translateX(" + rank * 48 + "px)";
    if(this.position !== null && Math.abs(this.position - rank) > 1){
      this.inner.className = '';
      
      let anim = (this.position < rank) ? 'upbounce' : 'downbounce';
      this.inner.classList.add(anim);
    }
    this.position = rank;
  }
}