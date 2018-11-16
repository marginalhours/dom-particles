import TextParticle from './text_particle';
import TextParticleEmitter from './text_particle_emitter';

import { buildOffsets } from './utilities';

const DEFAULT_TPM_OPTIONS = {
  max: 100, 
  preallocate: 10, 
  tagName: 'span',
  autoStart: true
};

export default class TextParticleManager {
  constructor (options) {
    Object.assign(this, { ...DEFAULT_TPM_OPTIONS, ...options });
    
    this._pool = [];
    this.particles = [];
    this.emitters = [];
    
    this.foldElement = document.createElement('div');
    this.foldElement.className = 'text-particle-manager-reservoir';
    Object.assign(this.foldElement.style, { width: 0, height: 0, position: 'absolute', top: 0, left: 0});
    
    this.allocate(this.preallocate);
    document.body.appendChild(this.foldElement);
    
    this.frameStart = null;
  }
  
  start () {
    this.raf = requestAnimationFrame((t) => this.update(t));
  }
  
  update(timestamp) {
    if (!this.frameStart) this.frameStart = timestamp;
    let dt = timestamp - this.frameStart;
    this.frameStart = timestamp;
    let f = (dt/1000);
    
    this.particles = this.particles.filter(p => {
      p.update(f);
      if (p.alive) { return true; }
      
      // disappear and return to pool
      p.element.style.opacity = 0;
      this.push(p.element);
      return false;
    });
    
    this.emitters = this.emitters.filter(e => {
      e.update(f);
      return e.alive;
    });
    
    if (this.emitters.length === 0 && this.particles.length === 0){
      cancelAnimationFrame(this.raf);
      this.raf = false;
    } else {
      requestAnimationFrame((t) => this.update(t));  
    }
  }
  
  addParticle (options) {
    if (this.particles.length < this.max) {
      let p = this.particles.push(new TextParticle({...options, element: this.pop()}));
      if (!this.raf && this.autoStart) {
        this.start();  
      }
      return p;
    }
  }
  
  addEmitter (options) {
    let e = this.emitters.push(new TextParticleEmitter({...options, manager: this}));
    if (!this.raf && this.autoStart){
      this.start();
    }
    return e;
  }
  
  from (element, pattern, options) {
    let offsets = buildOffsets(element.innerText, pattern);
    // at this point, range.setStart() and setEnd() will give you your wrapped object, then we can start playing with it.
  }
    
  push (el) {
    this._pool.push(el);
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
    
    this.foldElement.appendChild(el);
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