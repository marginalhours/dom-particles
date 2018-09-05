import { Hookable } from './helpers';
import Card from './cards/';
import CreatureCard from './cards/creature';
import { getCreature } from './creature';

// Better to call it a card "loop", with a movable pointer to the current card.
// This changes what operations we need to support.

export default class CardLoop extends Hookable {
  constructor (options) {
    const { parent } = options;

    super ({ 
          parent,
          template: `<ul data-hook='container' class='event-list'></ul>`
    });
    
    this._cards = [];
    
    this.pointer = 0; // current position in the stack
    this.direction = 1; // which way we're moving
    this.stride = 1; // how many steps we take per move
  }
  
  next () {
    this.pointer += (this.direction * this.stride);  
    this.pointer = (this._cards.length + this.pointer) % this._cards.length;
    this.reposition();
  }
  
  previous () {
    this.pointer -= (this.direction * this.stride);  
    this.pointer = (this._cards.length + this.pointer) % this._cards.length;
    this.reposition();
  }
  
  reverse () {
    this.direction = -this.direction;  
  }
  
  push (c) {
    this._cards.unshift(c);
    
    let t = c.buildTile();
    t.setPosition(this._cards.length);
    t.setParent(this.container);
    t.inner.classList.add('spin1');
    
    this.reposition();
  }
  
  peek (idx) {
    // Gets card at index (relative to the current pointer)
    idx = idx || 0; 
    return this._cards[this.pointer + idx]; 
  }
  
  pop (idx) {
    // Removes card at index (relative to current pointer)
    idx = idx || 0;
    let m =  this._cards.splice(this.pointer + idx, 1)[0];
    this.reposition();
    m.destroy();
    return m;
  }
  
  unshift (c) {
    // Adds a card under the current index
    this._cards.splice(this.pointer, 0, c);
    
    let t = c.buildTile();
    t.setPosition(0);
    t.setParent(this.container);
    t.inner.classList.add('spin1');
    
    this.reposition();
  }
   
  reposition () {
    // call this to resync 
    this._cards.map((e, idx) => e.reposition(idx, this.pointer, this._cards.length));
  }
}
