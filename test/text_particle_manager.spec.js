const assert = require('assert');
const TextParticleManager = require('../src/js/text_particle_manager').default;

describe('TextParticleManager', () => {
  it('should have default options on creation', () => {
    const t = new TextParticleManager();

    assert.equal(t.max, 100);
    assert.equal(t.preallocate, 10);
    assert.equal(t.tagName, 'span');
    assert.equal(t.container, document.body);
  });

  it('should have a pool as big as the preallocate option on creation', () => {
    const k = Math.floor(Math.random() * 100);
    const t = new TextParticleManager({ preallocate: k});
    assert.equal(t._pool.length, k);
  })

  it('should have its properties overridden by the user on creation', () => {
    const k = Math.floor(Math.random() * 100);
    const t = new TextParticleManager({ max: k, tagName: 'div' });

    assert.equal(t.max, k);
    assert.equal(t.tagName, 'div');
  });

  it('should have a fold element for storing particles', () => {
    const t = new TextParticleManager();
    assert(t.foldElement);
  })

  it('should be able to create particles', () => {
    const t = new TextParticleManager({ autostart: false });
    const p = t.addParticle();

    assert.equal(t._particles.length, 1);
    assert.equal(t._particles[0], p);
  });

  it('should be able to create emitters', () => {
    const t = new TextParticleManager({ autostart: false });
    const e = t.addEmitter();

    assert.equal(t._emitters.length, 1);
    assert.equal(t._emitters[0], e);
  });

  it('should be able to create particles from a DOM element', () => {
    // lol
    assert(false);
  })

});