import { Hookable } from './helpers';
import Card from './cards/';
import CreatureCard from './cards/creature';
import { getCreature } from './creature';

// Better to call it a tile "loop", with a movable pointer to the current card.
// This changes what operations we need to support.

export class TileLoop extends Hookable {
  constructor (options) {
    const { parent } = options;

    super ({ 
          parent,
          template: `<ul data-hook='container' class='event-list'></ul>`
    });
    
    this._tiles = [];
    
    this.pointer = 0; // current position in the stack
    this.direction = 1; // which way we're moving
    this.stride = 1; // how many steps we take per move
  }
  
  next () {
    this.pointer += (this.direction * this.stride);  
    this.pointer = this.pointer % this._tiles.length;
    this.reposition();
  }
  
  reverse () {
    this.direction = -this.direction;  
  }
  
  add () { 
    let e = new Tile({ parent: this.container, position: this._tiles.length, card: new CreatureCard({ creature: getCreature() }) });
    e.inner.classList.add('spin1');
    this._tiles.push(e); 
    this.reposition();
  }
  
  addAtIndex (index) {
    let e = new Tile({ parent: this.container, position: 1, card: new CreatureCard({ creature: getCreature() }) });
    e.inner.classList.add('spin1');
    this._tiles.splice(index, 0, e); 
    this.reposition();
  }
  
  push (c) {
    let e = new Tile({ parent: this.container, position: this._tiles.length, card: c });
    e.inner.classList.add('spin1');
    this._tiles.unshift(e); 
    this.reposition();
  }
  
  peek (idx) {
    // Gets tile at index (relative to the current pointer)
    idx = idx || 0; 
    return this._tiles[this.pointer + idx]; 
  }
  
  pop (idx) {
    // Removes tile at index (relative to current pointer)
    idx = idx || 0;
    let m =  this._tiles.splice(this.pointer + idx, 1)[0];
    this.reposition();
    m.destroy();
    return m;
  }
  
  unshift (c) {
    // Places a new tile under current pointer
    let e = new Tile({ parent: this.container, position: this.pointer, card: c });
    e.inner.classList.add('spin1');
    this._tiles.splice(this.pointer, 0, e);
    this.reposition();
  }
  
  reposition () {
    // call this to resync 
    this._tiles.map((e, idx) => e.reposition(idx, this.pointer, this._tiles.length));
  }
}

export class Tile extends Hookable {
  constructor (options) {
    const { parent, position, card } = options;
    super ({
          parent, 
          template: `<li data-hook='outer'>
                      <div data-hook='inner' class='inner'> 
                        <div data-hook='contents' class='contents ${card.type}-card'>
                        </div>
                      </div>
                     </li>`
    });
    
    this.card = card;
    this.position = position;
  }
  
  reposition (rank, pointer, size) {
    let realIndex = rank - pointer;
    if(realIndex < -3){
      realIndex += size;  
    }
    if (realIndex > 0){
      this.outer.style.transform = "translateX(" + realIndex * 48 + "px)";
    } else {
      this.outer.style.transform = "translateY(" + -realIndex * 48 + "px)";
    }
    if(this.position !== null && Math.abs(this.position - rank) > 1){
      this.inner.className = 'inner';
      
      let anim = (this.position < rank) ? 'upbounce' : 'downbounce';
      this.inner.classList.add(anim);
    }
    this.position = rank;
  }
  
  destroy () {
   this.parent.removeChild(this.outer); 
  }   
}