export default class Pool {
  constructor (options) {
    const { tagName, preallocate, container } = options;
    
    this.tagName = tagName.toLowerCase();
    this.container = container;
    
    this._pool = [];
    this.allocate(preallocate || 10);
  }
  
  push (el) {
    if (el.tagName.toLowerCase() === this.tagName){
      this._pool.push(el);
    } else {
      throw `${el.tagName} is not of type ${this.tagName}!`
    }
  }
  
  pop (el) {
    if (this._pool.length > 0){
      return this._pool.pop();
    } else {
      return this.create();
    }
  }
  
  create () {
    let el = document.createElement(this.tagName);
    
    Object.assign(el.style, { 
      display: 'block', 
      position: 'absolute', 
      pointerEvents: 'none', 
      transform: 'translate3d(0,0,0)',
      opacity: 0
    });
    
    this.container.appendChild(el);
    return el;
  }
  
  allocate (n) {
    if (this._pool.length < n){
      for(let i = this._pool.length; i < n; i++){
        this.push(this.create());
      }
    }
  }
}