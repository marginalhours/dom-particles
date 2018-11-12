import TextParticleManager from './text_particle_manager';

let t = new TextParticleManager();

let p = document.querySelector('p');

document.querySelector('button').addEventListener('click', () => {
  t.createEmitter({
    manager: this,
    maxEmissions: 200,
    emitEvery: 10,
    getParticleTTL: () => 2000 + 1000 * Math.random(),
    getText: () => {
      let k = p.innerText[p.innerText.length / 2];
      p.innerText = p.innerText.slice(0, p.innerText.length / 2) + p.innerText.slice(p.innerText.length / 2 + 1);
      return k;
    },
    getPosition: () => {
      return { x: 100, y: 90}
    },
    getVelocity: () => {
      let k = 50 + 50 * Math.random();  
      let theta = (3/2) * Math.PI + ((1/6) * Math.PI * (Math.random() - 0.5));
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