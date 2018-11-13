const DEFAULT_PARTICLE_OPTIONS = {
  velocity: { x: 0, y: 0}, 
  acceleration: { x: 0, y: 0 },
  ttl: 1000,
  text: '.',
  style: {},
  onCreate: () => {},
  onUpdate: () => {},
  heading: 0,
  scale: { x: 1, y: 1 }
}

export default class TextParticle {
  constructor (options) {
    Object.assign(this, { ...DEFAULT_PARTICLE_OPTIONS, ...options});
    
    this.elapsed = 0;
    this.setText(this.text);
    this.setStyle(this.style);
    this.updateTransform();
    this.el.style.opacity = 1;
    this.frameNumber = 0;
    this.onCreate(this);
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
  
  arrayLerp(array, cycle) {
    cycle = cycle || false;
    let idxFrac = 1 / array.length;
    let idx = Math.round(this.lifeFrac / idxFrac);
    let nextIdx = (idx === array.length - 1) ? (cycle ? 0 : idx) : idx + 1;
    
    return this.lerp(array[idx], array[nextIdx]);
  }
  
  colourFromRGBA(r, g, b, a){
    return `rgba(${r}, ${g}, ${b}, ${a || 1.0}`  
  }
  
  updateTransform () {
    this.el.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0) rotateZ(${this.heading}rad) scale(${this.scale.x}, ${this.scale.y})`;
  }
    
  update (f) {
    this.elapsed += f * 1000;
    this.frameNumber ++;
    
    this.velocity.x += this.acceleration.x * f;
    this.velocity.y += this.acceleration.y * f;
    this.position.x += this.velocity.x * f;
    this.position.y += this.velocity.y * f;
    
    this.onUpdate(this);
    
    this.updateTransform();
  }
}