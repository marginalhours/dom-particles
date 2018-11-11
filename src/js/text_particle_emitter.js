export default class TextParticleEmitter {
  constructor (options) {
    const { 
      manager,
      position,
      emitEvery, 
      ttl, 
      maxEmissions,
      getParticleTTL,
      getText,
      getVelocity,
      getAcceleration,
      onCreate,
      onUpdate
    } = options;
    this.manager = manager;
    // lifecycle
    this.ttl = ttl;
    this.totalElapsed = 0;
    this.elapsed = emitEvery;
    this.emitEvery = emitEvery || 500;
    this.emitted = 0;
    this.maxEmissions = maxEmissions;
    this.position = position;
    // particle creation
    this.getParticleTTL = getParticleTTL || (() => 2000);
    this.getText = getText || (() => '.');
    this.getVelocity = getVelocity || (() => ({x: 0, y: -10}));
    this.getAcceleration = getAcceleration || (() => ({x: 0, y: 0}));
    this.onCreate = onCreate || (() => {});
    this.onUpdate = onUpdate || (() => {});
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
        position: {...this.position},
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