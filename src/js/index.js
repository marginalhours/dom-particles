import TextParticleManager from './text_particle_manager';

let t = new TextParticleManager();

let p = document.querySelector('p');

document.querySelector('button').addEventListener('click', () => {
  t.createEmitter({
    manager: this,
    maxEmissions: p.innerText.length,
    emitEvery: 10,
    getParticleTTL: () => 2000 + 1000 * Math.random(),
    getText: () => {
      let k = p.innerText[0];
      p.innerText = p.innerText.slice(1);
      return k;
    },
    getPosition: () => {
      return { x: 110, y: 90}
    },
    getVelocity: () => {
      let k = 50 + 50 * Math.random();  
      let theta = (2/2) * Math.PI + ((2/6) * Math.PI * (Math.random() - 0.5));
      return {x: k * Math.cos(theta), y: k * Math.sin(theta)};
    },
    getAcceleration: () => ({x: 0, y: 50}),
    onCreate: (p) => {
     p.setStyle({ fontSize: 14, color: '#333' }); 
    },
    onUpdate: (p) => {
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