import TextParticleManager from './text_particle_manager';

let t = new TextParticleManager({ max: 10000 });

let c = { x: document.body.clientWidth / 2 , y: document.body.clientHeight / 2 };
const GRAVITY = 0.1;

const HEAT_COLORS = [
  [0, 0, 0], // we're out
  [31, 0, 0,], // even fainter
  [61, 12, 8], // faint red
  [98, 12, 11], // blood red
  [167, 18, 14], // dark cherry
  [220, 25, 21], // medium cherry 
  [232, 39, 24], // cherry
  [255, 54, 28], // bright cherry
  [255, 72, 24], // salmon
  [255, 105, 16], // dark orange
  [255, 166, 36], // orange
  [255, 246, 79], // lemon
  [255, 253, 148], // light yellow
  [254, 254, 200], // white
  [254, 254, 254], // white
]

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
    getParticleText: () => ['#', '!', '$', '%', '?'][Math.floor(5 * Math.random())],
    onParticleCreate: (p) => {
     p.setStyle({ fontSize: 14, color: '#fff', width: '12px' }); 
    },
    onParticleUpdate: (p) => {
      p.setStyle({ opacity: p.lerp(1, 0)});
      if (p.frameNumber % 10 === 0){
        p.setText(['#', '!', '$', '%', '?'][Math.floor(5 * Math.random())]);
      }
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