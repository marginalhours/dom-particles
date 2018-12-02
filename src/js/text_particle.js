/* 
*  Basic particle class. 
*  Configuration: 
*    position, velocity, acceleration: coordinate-like objects. During the particle update step, velocity += position, position += acceleration
*    ttl: Time-to-live in milliseconds
*    text: text content of particle node
*    grid: size of grid to snap to. If false, don't snap to grid.
*    style: Object with most CSS properties, plus
*      (1) scale (or scaleX and scaleY separately)
*      (2) rotation
*      In the style object, you can provide:
*         (1) Literal values
*         (2) Getters 
*         (3) Arrays of numbers / colours / css values, which will be animated as a fraction of particle TTL
*    onCreate: function called during particle creation. Takes one argument, the particle object.
*    onUpdate: function called every frame during particle lifespan. Takes one argument, the particle object.
*  Needs a better reset on exit
*/

import { propValueToFunction } from './utilities';

const zeroVector = { x: 0, y: 0 }

export const DEFAULT_PARTICLE_OPTIONS = {
  ttl: 1000,
  text: '.',
  style: { display: 'inline-block' },
  onCreate: () => {},
  onUpdate: () => {},
  onDestroy: () => {},
  heading: false,
  grid: false,
}


export default class TextParticle {
  constructor (options) {
    Object.assign(this, { 
      ...DEFAULT_PARTICLE_OPTIONS, 
      ...options, 
      velocity: { ...zeroVector, ...options.velocity },
      position: { ...zeroVector, ...options.position },
      acceleration: { ...zeroVector, ...options.acceleration },
      style: {...DEFAULT_PARTICLE_OPTIONS.style, ...options.style}
    });
    
    this.elapsed = 0;
    this.frameNumber = 0;
    this.getTransform = this.grid ? this.getGridTransform : this.getTransform;

    // Populate initial text content
    this.setText(this.text);
 
    // Fetch initial style snapshot, call user onCreate(), assign styles
    this.buildProps(this.style);
    this.nextProps = this.getSnapshot();
    this.onCreate(this);    
    Object.assign(this.element.style, this.nextProps);
  }
  
  get alive () {
    return this.elapsed < this.ttl;
  }
  
  get lifeFrac () {
    return this.elapsed / this.ttl;
  }
  
  buildProps (propObject) {
    let fixedProps = {};
    let dynamicProps = {};
    Object.keys(propObject).map(propKey => {
      let propValue = propObject[propKey];
      if (Array.isArray(propValue)) {
        if (propValue.length === 1){
          // It's a one-element array, so it's still fixed
          fixedProps[propKey] = propValue; 
        } else {
          // dynamic property; calculate function for it
          dynamicProps[propKey] = propValueToFunction(propValue);
        }
      } else if (typeof styleValue === 'object') {
        // Not implemented yet, but I guess per-property easing (>.<)
      } else {
        // Either a fixed value or a getter, either way, just assign it
        fixedProps[propKey] = propValue; 
      }
    });
    
    this.dynamicProps = dynamicProps;
    this.fixedProps = fixedProps;
  }
  
  setText (text) {
    this.element.innerText = text;
  }
  
  setStyleText (text) {
      this.element.style.cssText = text;  
  }
  
  getSnapshot () {
    let lifeFrac = this.lifeFrac;
    
    let snapshot = Object.keys(this.dynamicProps)
      .reduce((a, b) => {
        let propFn = this.dynamicProps[b];
        return { ...a, [b]: propFn(lifeFrac) }
      }, {...this.fixedProps});
    
    return {...snapshot, transform: this.getScaledTransform(snapshot) }
  }
  
  getScaledTransform(snapshot) {
    let { rotation, scale, scaleX, scaleY } = snapshot;
    rotation = (this.heading && `${this.heading}rad`) || rotation || 0;
    scale = scale || 1.0;
    scaleX = scaleX || scale;
    scaleY = scaleY || scale;
    
    return this.getTransform(scaleX, scaleY, rotation);
  }
  
  getTransform (scaleX, scaleY, rotation) {
    return `translate3d(${this.position.x}px, ${this.position.y}px, 0px) rotateZ(${rotation}) scale(${scaleX}, ${scaleY})`;
  }
  
  getGridTransform (scaleX, scaleY, rotation) {
    let x = this.position.x - (this.position.x % this.grid);
    let y = this.position.y - (this.position.y % this.grid);
    return `translate3d(${x}px, ${y}px, 0px) rotateZ(${rotation}) scale(${scaleX}, ${scaleY})`;
  }
    
  update (f) {
    // Housekeeping
    this.elapsed += f * 1000;
    
    // Standard motion update
    this.velocity.x += this.acceleration.x * f;
    this.velocity.y += this.acceleration.y * f;
    this.position.x += this.velocity.x * f;
    this.position.y += this.velocity.y * f;
    
    // Get current props, call user onUpdate(), assign them
    this.nextProps = this.getSnapshot();
    this.onUpdate(this);
    Object.assign(this.element.style, this.nextProps);
    
    // Next frame
    this.frameNumber ++;
  }
}