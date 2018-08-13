import { Hookable } from './helpers';

const event_types = ['monster', 'money', 'directions'];

export class EventList extends Hookable {
  constructor (options) {
    const { parent } = options;

    super ({ 
          parent,
          template: `<ul data-hook='container' class='event-list'>
                    </ul>`
    });
    
    this._events = [];
  }
  
  add () { 
    let e = new Event({ parent: this.container, position: this._events.length, type: event_types[Math.floor(Math.random() * event_types.length)] });
    e.inner.classList.add('spin1');
    this._events.push(e); 
    this.reposition();
  }
  
  addAtIndex (index) {
    let e = new Event({ parent: this.container, position: 1, type: event_types[Math.floor(Math.random() * event_types.length)] });
    e.inner.classList.add('spin1');
    this._events.splice(index, 0, e); 
    this.reposition();
  }
  
  peek () {
   return this._events[0]; 
  }
  
  pop () {
    let m =  this._events.shift(); 
    this.reposition();
    m.destroy();
    return m;
  }
  
  
  reposition () {
    // call this to resync 
    this._events.map((e, idx) => e.reposition(idx));
  }
}

export class Event extends Hookable {
  constructor (options) {
    const { parent, position, type } = options;
    super ({
          parent, 
          template: `<li data-hook='outer'>
                      <div data-hook='inner' class='inner'> 
                        <div data-hook='contents' class='contents ${type}-card'>
                        </div>
                      </div>
                     </li>`
    });
    
    this.type = type;
    this.position = position;
  }
  
  reposition (rank) {
    
    this.outer.style.transform = "translateX(" + rank * 48 + "px)";
    if(this.position !== null && Math.abs(this.position - rank) > 1){
      this.inner.className = 'inner';
      
      let anim = (this.position < rank) ? 'upbounce' : 'downbounce';
      this.inner.classList.add(anim);
    }
    this.position = rank;
  }
  
  getFlavourText () {
    return "A singular occurence.";  
  }
  
  destroy () {
   this.parent.removeChild(this.outer); 
  }
}