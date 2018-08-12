import { Hookable } from './helpers';

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
    let e = new Event({ parent: this.container, position: this._events.length });
    e.inner.classList.add('spin1');
    this._events.push(e); 
    this.reposition();
  }
  
  addAtHead () {
    let e = new Event({ parent: this.container, position: 1 });
    e.inner.classList.add('spin1');
    this._events.splice(1, 0, e); 
    this.reposition();
  }
  
  peek () {
   return this._events[0]; 
  }
  
  pop () {
    let m =  this._events.shift(); 
    this.reposition();
    return m;
  }
  
  
  reposition () {
    // call this to resync 
    this._events.map((e, idx) => e.reposition(idx));
  }
}

const event_types = ['crossroads', 'creature', 'treasure', 'hallway', 'trap']

export class Event extends Hookable {
  constructor (options) {
    const { parent, position } = options;
    super ({
          parent, 
          template: `<li data-hook='outer'>
                      <div data-hook='inner' class='inner'> 
                        <div data-hook='contents' class='contents'>
                        </div>
                      </div>
                     </li>`
    });
    
    this.type = event_types[Math.floor(Math.random() * event_types.length)];
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
}