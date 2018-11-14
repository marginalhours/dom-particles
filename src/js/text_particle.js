// Colour, backgroundColour also as particle options? (take string or array, if array, lerp, etc)
// generalized lerping? (ugh, because then you're into other easing function stuff - at that point may as well be an anime.js plugin...
// an API like that would be cool, though. Any style attribute that's an array of values gets lerped over the course of the particle lifetime.

import { tryGetValue } from './utilities';

export const DEFAULT_PARTICLE_OPTIONS = {
  velocity: { x: 0, y: 0}, 
  acceleration: { x: 0, y: 0 },
  ttl: 1000,
  text: '.',
  style: {},
  onCreate: () => {},
  onUpdate: () => {},
  heading: 0,
  scale: { x: 1, y: 1 },
  grid: false
}

export default class TextParticle {
  constructor (options) {
    Object.assign(this, { ...DEFAULT_PARTICLE_OPTIONS, ...options});
    
    this.elapsed = 0;
    this.setText(this.text);
    this.buildStyle(this.style);
    this.updateTransform();
    this.el.style.opacity = 1;
    this.frameNumber = 0;
    this.onCreate(this);
    
    if (this.useGrid) {
      this.updateTransform = this.updateGridTransform;  
    }
  }
  
  get alive () {
    return this.elapsed < this.ttl;
  }
  
  get lifeFrac () {
    return this.elapsed / this.ttl;
  }
  
  buildStyle (styleObject) {
    let fixedStyles = {};
    let dynamicStyles = {};
    
    Object.keys(styleObject).map(styleKey => {
      let styleValue = styleObject[styleKey];
      if (typeof styleValue === 'string'){
        // fixed style, just assign it
        fixedStyles[styleKey] = styleValue; 
      } else if (Array.isArray(styleValue)) {
        let k = styleValue.map(s => tryGetValue(s));
        if (k[0].length === 2){
          dynamicStyles[styleKey] = { unit: k[0][1], values: k.map(v => v[0])};  
        } else {
          dynamicStyles[styleKey] = { unit: '', values: k }  
        }
      } else if (typeof styleValue === 'object') {
        // I guess...?           
      }
    });
    
    this.dynamicStyles = dynamicStyles;
    console.log(this.dynamicStyles);
    // assign fixed styles
    this.setStyle(fixedStyles);
  }
  
  setStyle(styleObject) {
    // Straightforward style assignment
    Object.assign(this.el.style, styleObject);  
  }
  
  setText (text) {
    this.el.innerText = text;
  }
  
  lerp (a, b) {
    return a + ((b - a) * this.lifeFrac);  
  }
  
  
  updateGridTransform () {
    let x = this.grid ? this.position.x - (this.position.x % this.grid) : this.position.x;
    let y = this.grid ? this.position.y - (this.position.y % this.grid) : this.position.y;
    this.el.style.transform = `translate3d(${x}px, ${y}px, 0) rotateZ(${this.heading}rad) scale(${this.scale.x}, ${this.scale.y})`;
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
    
    this.styleUpdate();
    this.onUpdate(this);
    
    this.updateTransform();
  }
}