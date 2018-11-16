/* Fix scaling! */

import { styleValueToFunction } from './utilities';

export const DEFAULT_PARTICLE_OPTIONS = {
  velocity: { x: 0, y: 0}, 
  acceleration: { x: 0, y: 0 },
  heading: 0,
  ttl: 1000,
  text: '.',
  grid: false,
  style: {},
  onCreate: () => {},
  onUpdate: () => {},
}

export default class TextParticle {
  constructor (options) {
    Object.assign(this, { ...DEFAULT_PARTICLE_OPTIONS, ...options});
    
    this.elapsed = 0;
    this.frameNumber = 0;
    this.updateTransform = this.grid ? this.updateGridTransform : this.updateTransform;

    // By default, at this point opacity will be 0, so set it to 1
    this.element.style.opacity = 1;
    // Populate initial text content
    this.setText(this.text);
 
    // Fetch initial style snapshot, call user onCreate(), assign styles
    this.buildStyles(this.style);
    this.nextStyles = this.getStyleSnapshot();
    this.onCreate(this);    
    Object.assign(this.element.style, this.nextStyles);
  }
  
  get alive () {
    return this.elapsed < this.ttl;
  }
  
  get lifeFrac () {
    return this.elapsed / this.ttl;
  }
  
  buildStyles (styleObject) {
    let fixedStyles = {};
    let dynamicStyles = {};
    
    Object.keys(styleObject).map(styleKey => {
      let styleValue = styleObject[styleKey];
      if (Array.isArray(styleValue)) {
        if (styleValue.length === 1){
          // It's a one-element array, so it's still fixed
          fixedStyles[styleKey] = styleValue; 
        } else {
          // dynamic style, calculate function for it
          dynamicStyles[styleKey] = styleValueToFunction(styleValue);
        }
      } else if (typeof styleValue === 'object') {
        // Not implemented yet, but I guess per-property easing (>.<)
      } else {
        // assume fixed style, just assign it
        fixedStyles[styleKey] = styleValue; 
      }
    });
    
    this.dynamicStyles = dynamicStyles;
    this.fixedStyles = fixedStyles;
  }
  
  setText (text) {
    this.element.innerText = text;
  }
  
  getStyleSnapshot () {
    let lifeFrac = this.lifeFrac;
    
    let snapshot = Object.keys(this.dynamicStyles)
      .reduce((a, b) => {
        let styleFn = this.dynamicStyles[b];
        return { ...a, [b]: styleFn(lifeFrac) }
      }, {...this.fixedStyles});
    
    return {...snapshot, transform: this.getScaledTransform(snapshot) }
  }
  
  getScaledTransform(snapshot) {
    let { scaleX, scaleY, scale, } = snapshot;
    scale = scale || 1.0;
    scaleX = scaleX || scale;
    scaleY = scaleY || scale;
    
    return this.getTransform(scaleX, scaleY);
  }
  
  getTransform (scaleX, scaleY) {    
    return `translate3d(${this.position.x}px, ${this.position.y}px, 0) rotateZ(${this.heading}rad) scale(${scaleX}, ${scaleY})`;
  }
  
  getGridTransform (scaleX, scaleY) {
    let x = this.position.x - (this.position.x % this.grid);
    let y = this.position.y - (this.position.y % this.grid);
    return `translate3d(${x}px, ${y}px, 0) rotateZ(${this.heading}rad) scale(${this.scale.x}, ${this.scale.y})`;
  }
    
  update (f) {
    // Housekeeping
    this.elapsed += f * 1000;
    this.frameNumber ++;
    
    // Standard motion update
    this.velocity.x += this.acceleration.x * f;
    this.velocity.y += this.acceleration.y * f;
    this.position.x += this.velocity.x * f;
    this.position.y += this.velocity.y * f;

    // Get current style, call user onUpdate(), assign them
    this.nextStyles = this.getStyleSnapshot();
    this.onUpdate(this);
    Object.assign(this.element.style, this.nextStyles);
  }
}