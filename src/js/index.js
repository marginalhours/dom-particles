import TextParticleManager from './text_particle_manager';

let t = new TextParticleManager();

document.querySelector('button').addEventListener('click', () => {
  t.createEmitter({
    manager: this,
    maxEmissions: 10,
    emitEvery: 200,
    getParticleTTL: () => 2000,
    getText: () => '▓',
    getPosition: () => {
      let k = 125 + 50 * (Math.random() - 0.5);
      return {x: k, y: 80}
    },
    getVelocity: () => ({x: 0, y: -10}),
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