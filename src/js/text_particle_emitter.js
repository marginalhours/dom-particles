import { DEFAULT_PARTICLE_OPTIONS } from './text_particle';

const DEFAULT_EMITTER_OPTIONS = {
  emitEvery: 500,
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  acceleration: { x: 0, y: 0},
  onCreate: () => {},
  onUpdate: () => {},
  particleOptions: DEFAULT_PARTICLE_OPTIONS
}

export default class TextParticleEmitter {
  constructor (options) {
    Object.assign(this, {...DEFAULT_EMITTER_OPTIONS, ...options});
    
    this.manager = options.manager;
    this.totalElapsed = 0;
    this.elapsed = this.emitEvery;
    this.emitted = 0;
    
    this.onCreate(this);
  }
  
  get alive () {
    if (this.maxEmissions && this.emitted >= this.maxEmissions) {
      return false;
    }
    if (this.ttl && this.totalElapsed >= this.ttl) {
      return false;
    }
    return true;
  }
  
  update (f) {
    // position update
    this.velocity.x += this.acceleration.x * f;
    this.velocity.y += this.acceleration.y * f;
    this.position.x += this.velocity.x * f;
    this.position.y += this.velocity.y * f;
    
    // emission update
    this.elapsed += f * 1000;
    this.totalElapsed += f * 1000;
    if (this.elapsed > this.emitEvery) {
      let toEmit = Math.floor(this.elapsed / this.emitEvery);
      
      if (this.maxEmissions) { toEmit = Math.min(this.maxEmissions - this.emitted, toEmit); }
      
      this.elapsed = 0;
      
      for(let i = 0; i < toEmit; i++){
        // emit particle
        this.emitted++;
        let p = this.particleOptions.position;
        let pp = { x: this.position.x + p.x, y: this.position.y + p.y }
        this.manager.createParticle({...this.particleOptions, position: pp});
      }
    }
    
    // user-provided update
    this.onUpdate(this);
  }
}