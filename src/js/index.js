import TextParticleManager from './text_particle_manager';

let t = new TextParticleManager();

document.querySelector('button').addEventListener('click', () => {
  t.createEmitter({
    manager: this,
    maxEmissions: 500,
    emitEvery: 10,
    getParticleTTL: () => 2000 + 1000 * Math.random(),
    getText: () => {
      return ['#', '!', ',', '.', '$', '%'][Math.floor(6 * Math.random())];
    },
    getPosition: () => {
      return { x: 30, y: document.body.clientHeight / 2}
    },
    getVelocity: () => {
      let k = 50 + 50 * Math.random();  
      let theta = ((2/6) * Math.PI * (Math.random() - 0.5));
      return {x: k * Math.cos(theta), y: k * Math.sin(theta)};
    },
    // getAcceleration: () => ({x: 0, y: 50}),
    onCreate: (p) => {
     p.setStyle({ fontSize: 14, color: '#fff', width: '12px', border: '1px solid #eee' }); 
    },
    onUpdate: (p) => {
      // p.setStyle({ opacity: p.lerp(1, 0)});
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