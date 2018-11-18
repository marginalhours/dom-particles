/*
*  Particle emitter. 
*
*
*/

import { DEFAULT_PARTICLE_OPTIONS } from './text_particle';
import { propValueToFunction } from './utilities';

const DEFAULT_EMITTER_OPTIONS = {
  emitEvery: 500,
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  acceleration: { x: 0, y: 0 },
  rotation: 0,
  onCreate: () => {},
  onUpdate: () => {},
  particleOptions: { position: { x: 0, y: 0 }, ...DEFAULT_PARTICLE_OPTIONS },
  MAX_EMIT_PER_STEP: 16 /* Prevent thundering herds on tab switch */
}

export default class TextParticleEmitter {
  constructor (options) {
    Object.assign(this, {...DEFAULT_EMITTER_OPTIONS, ...options});
    
    this.manager = options.manager;
    this.totalElapsed = 0;
    this.elapsed = this.emitEvery;
    this.emitted = 0;
    this.frameNumber = 0;
    
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
      toEmit = Math.min(toEmit, this.MAX_EMIT_PER_STEP);
      
      if (this.maxEmissions) { toEmit = Math.min(this.maxEmissions - this.emitted, toEmit); }
      this.elapsed = 0;
      
      for(let i = 0; i < toEmit; i++){
        let p = this.particleOptions.position || { x: 0, y: 0 };
        let pp = { x: this.position.x + p.x, y: this.position.y + p.y }
        let v = this.particleOptions.velocity || { x: 0, y: 0 };
        let v_angle = Math.atan2(v.y, v.x);
        let v_magna = Math.sqrt((v.x * v.x) + (v.y * v.y));
        let t_angle = (this.rotation / 180) * Math.PI;
        let vv = {
          x: v_magna * Math.cos(v_angle + t_angle),
          y: v_magna * Math.sin(v_angle + t_angle)
        }
        this.manager.addParticle({ ...this.particleOptions, position: pp, velocity: vv });
        // emit particle
        this.emitted ++;
      }
      
      this.frameNumber ++;
    }
    
    // user-provided update
    this.onUpdate(this);
  }
}