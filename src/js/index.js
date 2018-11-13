import TextParticleManager from './text_particle_manager';

let t = new TextParticleManager({ max: 10000 });

let c = { x: document.body.clientWidth / 2 , y: document.body.clientHeight / 2 };
const GRAVITY = 0.1;

document.querySelector('button').addEventListener('click', () => {
  t.createEmitter({
    position: { x: document.body.clientWidth / 2 - 50, y: document.body.clientHeight / 2},
    emitEvery: 10,
    getParticleTTL: () => 4000 + 1000 * Math.random(),
    getParticleVelocity: (emitter) => {
      let k = 150 + 50 * Math.random();  
      let h = Math.atan2(c.y - emitter.position.y, c.x - emitter.position.x);
      h += (1/12) * Math.PI * (Math.random() - 0.5);
      return {x: k * Math.cos(h), y: k * Math.sin(h)};
    },
    // getAcceleration: () => ({x: 0, y: 50}),
    onParticleCreate: (p) => {
     p.setStyle({ fontSize: 14, color: '#333', width: '12px', border: '1px solid #eee' }); 
    },
    onParticleUpdate: (p) => {
      p.setStyle({ opacity: p.lerp(1, 0)});
    }
  });
});

let render = (dt) => {
  t.update(dt);
}

let start = null;
let loop = (timestamp) => {
  if (!start) start = timestamp;
  let dt = timestamp - start;
  start = timestamp;
  render(dt);
  
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);