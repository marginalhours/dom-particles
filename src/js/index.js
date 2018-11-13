import TextParticleManager from './text_particle_manager';

let t = new TextParticleManager();

let c = { x: document.body.clientWidth / 2 , y: document.body.clientHeight / 2 };
const GRAVITY = 0.1;

document.querySelector('button').addEventListener('click', () => {
  t.createEmitter({
    manager: this,
    maxEmissions: 500,
    emitEvery: 10,
    getParticleTTL: () => 5000 + 1000 * Math.random(),
    getText: () => {
      return ['#', '!', ',', '.', '$', '%'][Math.floor(6 * Math.random())];
    },
    getPosition: () => {
      return { x: 100, y: document.body.clientHeight / 2}
    },
    getVelocity: () => {
      let k = 150 + 50 * Math.random();  
      let theta = ((2/6) * Math.PI * (Math.random() - 0.5));
      return {x: k * Math.cos(theta), y: k * Math.sin(theta)};
    },
    // getAcceleration: () => ({x: 0, y: 50}),
    onParticleCreate: (p) => {
     p.setStyle({ fontSize: 14, color: '#aaa', width: '12px', }); 
    },
    onParticleUpdate: (p) => {
      // p.setStyle({ opacity: p.lerp(1, 0)});
      let h = Math.atan2(c.y - p.position.y, c.x - p.position.x);
      let k = Math.sqrt((c.x - p.position.x)*(c.x - p.position.x) + (c.y - p.position.y)*(c.y - p.position.y));
      
      p.acceleration = { x: -GRAVITY * k * Math.cos(h), y: -GRAVITY * k * Math.sin(h) }
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