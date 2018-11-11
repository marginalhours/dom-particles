const DEFAULT_PARTICLE_OPTIONS = {
  velocity: { x: 0, y: 0}, 
  acceleration: { x: 0, y: 0 },
  ttl: 1000,
  text: '.',
  onCreate: () => {},
  onUpdate: () => {},
  heading: 0,
  scale: { x: 1, y: 1 }
}

export default class TextParticle {
  constructor (options) {
    let { 
      position, 
      velocity, 
      acceleration, 
      heading,
      ttl, 
      el, 
      text, 
      onCreate, 
      onUpdate,
      scale
    } = { ...DEFAULT_PARTICLE_OPTIONS, ...options };
    
    this.el = el;
    this.position = position;
    this.heading = heading;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.scale = scale;
    
    this.elapsed = 0;
    this.ttl = ttl;
    
    this.setText(text);
    this.updateTransform();
    this.el.style.opacity = 1;
    onCreate(this);
    this.onUpdate = onUpdate;
  }
  
  get alive () {
    return this.elapsed < this.ttl;
  }
  
  get lifeFrac () {
    return this.elapsed / this.ttl;
  }
  
  setStyle(styleObject) {
    Object.assign(this.el.style, styleObject);  
  }
  
  setText (text) {
    this.el.innerText = text;
  }
  
  lerp (a, b) {
    return a + ((b - a) * this.lifeFrac);  
  }
  
  updateTransform () {
    this.el.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0) rotateZ(${this.heading}rad) scale(${this.scale.x}, ${this.scale.y})`;
  }
    
  update (f) {
    this.elapsed += f * 1000;
    this.velocity.x += this.acceleration.x * f;
    this.velocity.y += this.acceleration.y * f;
    this.position.x += this.velocity.x * f;
    this.position.y += this.velocity.y * f;
    
    this.onUpdate(this);
    
    this.updateTransform();
  }
}