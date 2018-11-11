class Pool {
  constructor (options) {
    const { tagName, preallocate, className } = options;
    
    this.tagName = tagName.toLowerCase();
    this.className = className; 
    
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
    el.className = this.className;
    el.style.transform = 'translate3d(0, 0, 0)';
    el.style.opacity = 0;
    document.body.appendChild(el);
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