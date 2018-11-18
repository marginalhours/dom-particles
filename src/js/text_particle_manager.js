import TextParticle from './text_particle';
import TextParticleEmitter from './text_particle_emitter';

import { buildOffsets } from './utilities';

const DEFAULT_TPM_OPTIONS = {
  max: 100, 
  preallocate: 10, 
  tagName: 'span',
  autoStart: true
};

const PARTICLE_SKELETON_STYLES = {
  display: 'block', 
  position: 'absolute', 
  pointerEvents: 'none',
  transform: 'translate3d(0,0,0)',
  opacity: 0
}

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
    offsets.reverse().map(o => { 
      let r = document.createRange();
      r.setStart(element.childNodes[0], o[0]);
      r.setEnd(element.childNodes[0], o[1]);
      let s = document.createElement('span');
      r.surroundContents(s);
      let { x, y, width, height } = s.getBoundingClientRect();
      Object.assign(s.style, {...PARTICLE_SKELETON_STYLES});
      let p = new TextParticle({...options, text: r.toString(), element: s, position: { x, y }, style: {...options.style, width, height }});
      p.element.parentElement.removeChild(p.element);
      this.foldElement.appendChild(p.element);
      this.particles.push(p);
    });
    this.start();
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
      Object.assign(p.element.style, PARTICLE_SKELETON_STYLES);
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
    let element = document.createElement(this.tagName);
    this.foldElement.appendChild(element);    
    Object.assign(element.style, PARTICLE_SKELETON_STYLES);
    
    return element;
  }
  
  allocate (n) {
    if (this._pool.length < n){
      for(let i = this._pool.length; i < n; i++){
        this.push(this.create());
      }
    }
  }
    
}