import { Hookable, qs } from './helpers';

// A tile is a small UI element corresponding to a single card.

export default class extends Hookable {
  constructor (options) {
    const { position, type, card } = options;
    super ({
          parent: qs('body'), 
          template: `<li data-hook='outer'>
                      <div data-hook='inner' class='inner'> 
                        <div data-hook='contents' class='contents ${card.type}-card'>
                        </div>
                      </div>
                     </li>`
    });
    
    qs('body').removeChild(this.outer);
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
  
  setParent (p) {
    this.parent = p;
    this.parent.appendChild(this.outer);
  }
  
  setPosition (p) {
    this.position = p;  
  }
  
  destroy () {
   this.parent.removeChild(this.outer); 
  }   
}