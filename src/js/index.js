import TextParticleManager from './text_particle_manager';

let t = new TextParticleManager();

let p = document.querySelector('p');

document.querySelector('button').addEventListener('click', () => {
  t.createEmitter({
    manager: this,
    maxEmissions: 50,
    emitEvery: 10,
    getParticleTTL: () => 1000 + 1000 * Math.random(),
    getText: () => {
      let k = p.innerText[0];
      let 
    },
    getPosition: () => {
      let k = 125 + 100 * (Math.random() - 0.5);
      return {x: k, y: 80}
    },
    getVelocity: () => ({x: 0, y: -20}),
    onCreate: (p) => {
     p.setStyle({ fontSize: 14, color: '#aaa' }); 
    },
    onUpdate: (p) => {
      p.setText(['░', '▒' ,'▓'][Math.floor(p.lerp(3, 0))]);
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