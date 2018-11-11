const DEFAULT_EMITTER_OPTIONS = {
  emitEvery: 500,
  getParticleTTL: () => 1000,
  getText: () => '.',
  getVelocity: () => ({ x: 0, y: -10}),
  getAcceleration: () => ({ x: 0, y: 0}),
  onCreate: () => {},
  onUpdate: () => {},

}

export default class TextParticleEmitter {
  constructor (options) {
    Object.defineProperties(this, {...DEFAULT_EMITTER_OPTIONS, options});
    this.manager = options.manager;
    this.totalElapsed = 0;
    this.elapsed = this.emitEvery;
    this.emitted = 0;
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
    this.elapsed += f * 1000;
    this.totalElapsed += f * 1000;
    if (this.elapsed > this.emitEvery) {
      this.elapsed = 0;
      this.emitted++;
      // emit particle
      this.manager.createParticle({
        position: this.getPosition(this),
        velocity: this.getVelocity(this),
        acceleration: this.getAcceleration(this),
        ttl: this.getParticleTTL(this),
        text: this.getText(this),
        onCreate: this.onCreate,
        onUpdate: this.onUpdate
      });
    }
  }
}