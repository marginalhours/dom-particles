const assert = require('assert');
const TextParticleManager = require('../src/js/text_particle_manager').default;
const TextParticleEmitter = require('../src/js/text_particle_emitter').default;
const { DEFAULT_PARTICLE_OPTIONS } = require('../src/js/text_particle');
const { ZERO_VECTOR } = require('../src/js/utilities');

describe('TextParticleEmitter', () => {

  it('should have default options on creation', () => {
    const e = new TextParticleEmitter();

    assert.equal(e.maxEmissions, false);
    assert.equal(e.ttl, false);
    assert.equal(e.emitEvery, 500);
    assert.deepEqual(e.particleOptions, DEFAULT_PARTICLE_OPTIONS);
    assert.deepEqual(e.position, ZERO_VECTOR);
    assert.deepEqual(e.velocity, ZERO_VECTOR);
    assert.deepEqual(e.acceleration, ZERO_VECTOR);
    assert.equal(e.heading, 0);
  });

  it('should have its properties overridden by the user on creation', () => {
    const e = new TextParticleEmitter({
      position: { x: 5, y: 5 },
      velocity: { x: 10, y: 10 },
      acceleration: { x: 15, y: 15}
    });

    assert.deepEqual(e.position, { x: 5, y: 5 });
    assert.deepEqual(e.velocity, { x: 10, y: 10 });
    assert.deepEqual(e.acceleration, { x: 15, y: 15 });
  });

  it('should have particle properties overridden by the user on creation', () => {
    const t = new TextParticleManager({ autostart: false });
    const e = new TextParticleEmitter({
      manager: t,
      particleOptions: {
        position: { x: 5, y: 5 },
        velocity: { x: 10, y: 10 }
      }
    });

    e.update(0.5);

    assert.equal(t._particles.length, 1);

    const p = t._particles[0];

    assert.deepEqual(p.position, { x: 5, y: 5 });
  });

  it('should produce particles with positions relative to its position', () => {
    const t = new TextParticleManager({ autostart: false });
    const e = new TextParticleEmitter({
      manager: t,
      position: { x: 5, y: 5 },
      particleOptions: {
        position: { x: 5, y: 5 }
      }
    });

    e.update(0.5);
    assert.equal(t._particles.length, 1);

    const p = t._particles[0];
    assert.deepEqual(p.position, { x: 10, y: 10 });
  });

  it('should create different particles if an option is a computed getter', () => {
    const t = new TextParticleManager({ autostart: false });
    let k = 0;
    const e = new TextParticleEmitter({
      manager: t,
      particleOptions: {
        get contents () { return "abc"[k++] }
      }
    });

    e.update(1.5);
    assert.equal(t._particles.length, 3);
    assert.equal(t._particles[0].contents, 'a');
    assert.equal(t._particles[1].contents, 'b');
    assert.equal(t._particles[2].contents, 'c');
  });
});