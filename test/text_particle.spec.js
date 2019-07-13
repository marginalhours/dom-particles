import assert from 'assert';
import TextParticle from '../src/text_particle';

describe('TextParticle', () => {
  it('should have default options on creation', () => {
    const p = new TextParticle({
      element: document.createElement('span')
    });

    assert.deepEqual(p.position, { x: 0, y: 0 });
    assert.deepEqual(p.acceleration, { x: 0, y: 0 });
    assert.deepEqual(p.velocity, { x: 0, y: 0 });
    assert.equal(p.ttl, 1000);
    assert.equal(p.frameNumber, 0);
  });

  it('should have options overridden by user options', () => {
    const p = new TextParticle({
      element: document.createElement('span'),
      position: { x: 5, y: 5 },
      velocity: { x: 10, y: 10 },
      acceleration: { x: 7, y: 7 }
    });

    assert.deepEqual(p.position, { x: 5, y: 5 });
    assert.deepEqual(p.velocity, { x: 10, y: 10 });
    assert.deepEqual(p.acceleration, { x: 7, y: 7 });
  });

  describe('#update', () => {
    it('should increment framenumber', () => {
      const p = new TextParticle({
        element: document.createElement('span'),
        acceleration: { x: 1, y: 0 },
      });

      assert.equal(p.frameNumber, 0);
      p.update(1.0);
      assert.equal(p.frameNumber, 1);
    });

    it('should update position', () => {
      const p = new TextParticle({
        element: document.createElement('span'),
        velocity: { x: 1, y: 0 },
      });

      p.update(1.0);
      assert.deepEqual(p.position, { x: 1, y: 0 });
    });

    it('should update velocity', () => {
      const p = new TextParticle({
        element: document.createElement('span'),
        acceleration: { x: 1, y: 0 },
      });

      p.update(1.0);
      assert.deepEqual(p.acceleration, { x: 1, y: 0 });
    });

    it('should convert arrays into dynamic properties', () => {
      const p = new TextParticle({
        element: document.createElement('span'),
        style: { 'scale': [0, 1] }
      });

      assert.equal(typeof p.dynamicProps.scale, 'function');
      assert.equal(p.nextProps.scale, 0);

      p.update(0.5);
      assert.equal(p.nextProps.scale, 0.5);

      p.update(0.5);
      assert.equal(p.nextProps.scale, 1.0);
    });

    it('should kill the particle after its ttl has elapsed', () => {
      const p = new TextParticle({
        element: document.createElement('span')
      });

      p.update(0.5);

      assert(p.alive);
      assert(p.lifeFrac < 1.0);

      p.update(0.5);

      assert(!p.alive);
      assert(p.lifeFrac >= 1.0);
    })
  });
});