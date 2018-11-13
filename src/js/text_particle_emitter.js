const DEFAULT_EMITTER_OPTIONS = {
  emitEvery: 500,
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  acceleration: { x: 0, y: 0},
  onCreate: () => {},
  onUpdate: () => {},
  getParticleTTL: () => 1000,
  getParticleText: () => '.',
  getParticlePosition: (emitter) => ({...emitter.position}),
  getParticleVelocity: () => ({ x: 0, y: -10}),
  getParticleAcceleration: () => ({ x: 0, y: 0}),
  getParticleStyle: () => ({}),
  onParticleCreate: () => {},
  onParticleUpdate: () => {},
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
      this.elapsed = 0;
      this.emitted++;
      // emit particle
      this.manager.createParticle({
        position: this.getParticlePosition(this),
        velocity: this.getParticleVelocity(this),
        acceleration: this.getParticleAcceleration(this),
        ttl: this.getParticleTTL(this),
        text: this.getParticleText(this),
        onCreate: this.onParticleCreate,
        onUpdate: this.onParticleUpdate
      });
    }
    
    // user-provided update
    this.onUpdate(this);
  }
}