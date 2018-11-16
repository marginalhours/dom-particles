import TextParticleManager from './text_particle_manager';
import { colourToCSSString, positionFromNode } from './utilities';

let t = new TextParticleManager({ max: 10000 });

let c = { x: document.body.clientWidth / 2 , y: document.body.clientHeight / 2 };
const GRAVITY = 0.1;

const HEAT_COLOURS = [
  [0, 0, 0, 1.0], // out
  [31, 0, 0, 1.0], // even fainter
  [61, 12, 8, 1.0], // faint red
  [98, 12, 11, 1.0], // blood red
  [167, 18, 14, 1.0], // dark cherry
  [220, 25, 21, 1.0], // medium cherry 
  [232, 39, 24, 1.0], // cherry
  [255, 54, 28, 1.0], // bright cherry
  [255, 72, 24, 1.0], // salmon
  [255, 105, 16, 1.0], // dark orange
  [255, 166, 36, 1.0], // orange
  [255, 246, 79, 1.0], // lemon
  [255, 253, 148, 1.0], // light yellow
  [254, 254, 200, 1.0], // white
  [254, 254, 254, 1.0], // white
].reverse();


document.querySelector('button').addEventListener('click', (e) => {
  t.addEmitter({
    position: { x: e.clientX, y: e.clientY},
    emitEvery: 100,
    maxEmissions: 1,
    particleOptions: {
      get position ()  { return { x: 0, y: 0 }},
      get velocity () {
        let k = 50 + 50 * Math.random();
        let h = 2 * Math.PI * Math.random();
        return { x: k * Math.cos(h), y: k * Math.sin(h)}
      },
      text: '>',
      style: { 
        width: '16px',
        height: '16px',
        borderRadius: '16px', 
        color: '#fff', 
        fontWeight: 'bold', 
        textShadow: '1px 1px 1px #f00',
        scale: [1, 5],
        translateX: [0, 10],
        translateY: [0, 10]
      },
      onUpdate: (p) => {
        if (p.frameNumber % 30 === 0){
          let k = 50 + 50 * Math.random();
          let h = 2 * Math.PI * Math.random();
          p.acceleration = {x: k * Math.cos(h),  
        }
        
        p.heading = Math.atan2(this.acceleration.y, this.acceleration.x);
      },
      velocity: { x: 0, y: -50}
    }
  });
  // t.from(document.querySelector('p'), /\w+/g);
});

  // t.createEmitter({
  //   position: { x: document.body.clientWidth / 2 - 50, y: document.body.clientHeight / 2},
  //   emitEvery: 2,
  //   particleOptions: {
  //     grid: 16,
  //     get ttl () { return 1500 },
  //     get text () { return ['#', '!', '$', '%', '?'][Math.floor(5 * Math.random())]},
  //     /* particle position getter is relative to emitter position */
  //     get position () { return { x: 100 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) } },
  //     get velocity () { return { x: 0, y: -50 } },
  //     style: { color: HEAT_COLOURS.map(c => colourToCSSString(c)), fontSize: ['24px', '12px'] },
  //     onUpdate: (p) => {
  //       if (p.frameNumber % 30 === 0){
  //         p.setText(['#', '!', '$', '%', '?'][Math.floor(5 * Math.random())]);
  //       }
  //     }
  //   },
  // });