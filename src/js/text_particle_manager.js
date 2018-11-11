import Pool from './pool';
import TextParticle from './text_particle';
import TextParticleEmitter from './text_particle_emitter';

const DEFAULT_TPM_OPTIONS = {
  { max: 100, preallocate: 10, tagName: 'span' }
};

export default class TextParticleManager {
  constructor (options) {
    let { max, preallocate, tagName } = { ..DEFAULT_TPM_OPTIONS, ...options };
    this.max = max;
    this.foldElement = document.createElement('div');
    this.foldElement.className = 'text-particle-manager-reservoir';
    Object.assign(this.foldElement.style, { width: 0, height: 0 });
    document.body.appendChild(this.foldElement);
    this.pool = new Pool({ tagName: 'span', preallocate, container: this.foldElement });
    this._pool = [];
    this.particles = [];
    this.emitters = [];
  }
  
  createParticle (options) {
    if (this.particles.length < this.max) {
      this.particles.push(new TextParticle({...options, el: this.pop()}));
    }
  }
  
  createEmitter (options) {
    this.emitters.push(new TextParticleEmitter({...options, manager: this}));
  }
  
  update(dt) {
    let f = (dt/1000);
    this.particles = this.particles.filter(p => {
      p.update(f);
      if (p.alive) { return true; }
      
      // disappear and return to pool
      p.el.style.opacity = 0;
      this.pool.push(p.el);
      return false;
    });
    
    this.emitters = this.emitters.filter(e => {
      e.update(f);
      if (e.alive) { return true; }
      return false;
    });
    
  push (el) {
    if (el.tagName.toLowerCase() === this.tagName){
      this._pool.push(el);
    } else {
      throw `${el.tagName} is not a ${this.tagName}`
    }
  }
  
  pop (el) {
    if (this._pool.length > 0){
      return this._pool.pop();
    } else {
      return this.create();
    }
  }
    
    
}