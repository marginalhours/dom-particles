export default class TextParticle {
  constructor (options) {
    let { 
      position, 
      velocity, 
      acceleration, 
      ttl, 
      el, 
      text, 
      onCreate, 
      onUpdate 
    } = options;
    
    this.el = el;
    this.el.innerText = text;
    this.position = position;
    this.heading = 0;
    this.el.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0) rotateZ(${this.heading}rad)`;
    
    this.velocity = velocity || { x : 0, y: 0 };
    this.acceleration = acceleration || { x: 0, y: 0 };
    this.elapsed = 0;
    this.ttl = ttl;
    // lifecycle functions
    this.el.style.opacity = 1;
    onCreate(this);
    this.onUpdate = onUpdate || (() => {});
  }
  
  get alive () {
    return this.elapsed < this.ttl;
  }
  
  get lifeFrac () {
    return this.elapsed / this.ttl;
  }
  
  setText (text) {
    this.el.innerText = text;
  }
  
  lerp (a, b, f) {
    return a + ((b - a) * f);  
  }
    
  update (f) {
    this.elapsed += f * 1000;
    this.velocity.x += this.acceleration.x * f;
    this.velocity.y += this.acceleration.y * f;
    this.position.x += this.velocity.x * f;
    this.position.y += this.velocity.y * f;
    
    this.onUpdate(this);
    
    this.el.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0) rotateZ(${this.heading}rad)`;
  }
}