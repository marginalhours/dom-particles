import TextParticle from './text_particle';
import TextParticleEmitter from './text_particle_emitter';

const DEFAULT_TPM_OPTIONS = {
  max: 100, 
  preallocate: 10, 
  tagName: 'span'
};

export default class TextParticleManager {
  constructor (options) {
    Object.assign(this, { ...DEFAULT_TPM_OPTIONS, ...options });
    
    this._pool = [];
    this.particles = [];
    this.emitters = [];
    
    this.foldElement = document.createElement('div');
    this.foldElement.className = 'text-particle-manager-reservoir';
    Object.assign(this.foldElement.style, { width: 0, height: 0 });
    document.body.appendChild(this.foldElement);
  }
  
  create (options) {
    if (this.particles.length < this.max) {
      this.particles.push(new TextParticle({...options, el: this.pop()}));
    }
  }
  
  createEmitter (options) {
    this.emitters.push(new TextParticleEmitter({...options, manager: this}));
  }
  
  from (element, pattern, options) {
   // wrap a dom node, mess about with it 
  }
  
  update(dt) {
    let f = (dt/1000);
    this.particles = this.particles.filter(p => {
      p.update(f);
      if (p.alive) { return true; }
      
      // disappear and return to pool
      p.el.style.opacity = 0;
      this.push(p.el);
      return false;
    });
    
    this.emitters = this.emitters.filter(e => {
      e.update(f);
      if (e.alive) { return true; }
      return false;
    });
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