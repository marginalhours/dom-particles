const { colourToCSSString, positionFromNode, lerp } = letterbomb.utilities;

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

let c = { x: document.body.clientWidth / 2 , y: document.body.clientHeight / 2 };
    
let winder = document.querySelector('.main')
let code = document.querySelector('.code')
let goButton = document.querySelector('.main-button');

let t = new letterbomb({ 
  max: 10000,
  container: winder
});
  

const setButtonText = (text) => {
 goButton.innerText = text; 
}

document.querySelector('.examples-select').addEventListener('change', (e) => {
  // clear out current examples
  t.reset();
  
  let newButton = goButton.cloneNode(true);
  goButton.parentNode.replaceChild(newButton, goButton);
  goButton = document.querySelector('.main-button');
  
  examples[e.target.value]();
});


const examples = {};

examples['number-goes-up'] = () => {
  setButtonText('Press to go up');
  
  goButton.addEventListener('click', (e) => {   
    t.addParticle({
      position: { x: e.layerX, y: e.layerY },
      text: '+1', 
      velocity: { x: 0, y: -10 },
      acceleration: { x: 0, y: -100 },
    })
  });
}

examples['metroidvania'] = () => {
  setButtonText('Press to attack');
  
  winder.style.background = '#fff';
    
  code.innerText = `
    document.querySelector('button').addEventListener('click', (e) => {
        t.addParticle({
          position: { x: e.layerX, y: e.layerY },
          get text () { return Math.floor(200 * Math.random()) }, 
          ttl: 1000,
          velocity: { x: 0, y: -10 },
          acceleration: { x: 0, y: -100 },
          style: { 
            scale: [2, 1, 1],
            fontWeight: 'bold',
            fontFamily: 'monospace',
            textShadow: '1px 1px 0px #f00',
            color: '#fff'
          }
        });
      });
  `;

  goButton.addEventListener('click', (e) => {
    t.addParticle({
      position: { x: e.layerX, y: e.layerY },
      get text () { return Math.floor(200 * Math.random()) }, 
      ttl: 1000,
      velocity: { x: 0, y: -10 },
      acceleration: { x: 0, y: -100 },
      style: { 
        scale: [2, 1, 1],
        fontWeight: 'bold',
        fontFamily: 'monospace',
        textShadow: '1px 1px 0px #f00',
        color: '#fff'
      }
    });
  });
}

examples['trails'] = () => {  
    setButtonText('Hold to trail');
  
    winder.style.background = '#fff';
  
    let k = 0;
    let l = -400;
    let m = 120;
    let n = 16;
  
    goButton.addEventListener('mousedown', () => {
      t.addEmitter({
        position: { x: winder.clientWidth / 2, y: winder.clientWidth / 2 },
        emitEvery: 8,
        onUpdate: (emitter) => {   
          emitter.position.y = c.y + (m * Math.sin(k++/n));
        },
        particleOptions: {
          ttl: 1000,
          style: { 
            get backgroundColor () { return  ['#f33', '#fefeee'] },
            width: '12px',
            height: '12px',
            scale: [2, 0.1], 
            zIndex: 100
          },
          text: '',
          get position () { return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5), z: -100 } },
          get velocity () {
            let h = -1 * (500 + (100 * Math.random()));
            return { x: l, y: 0, z: 0 }
          }
        }
      });

      t.addEmitter({
        position: { x: winder.clientWidth / 2, y: winder.clientWidth / 2 },
        emitEvery: 8,
        onUpdate: (emitter) => {   
          emitter.position.y = c.y + (m * Math.sin(Math.PI + k/n));
          emitter.position.z = 100 * Math.sin(Math.PI + k / n);
        },
        particleOptions: {
          ttl: 1000,
          style: { 
            get backgroundColor () { return  ['#33f', '#eefefe'] },
            width: '12px',
            height: '12px',
            scale: [2, 0.1], 
            zIndex: 50
          },
          text: '',
          get position () { return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) } },
          get velocity () {
            let h = -1 * (500 + (100 * Math.random()));
            return { x: l, y: 0 }
          }
        }
      });
    });
  
    goButton.addEventListener('mouseup', () => {
      t.emitters = [];
    });
}

examples['flame'] = () => {
  
  winder.style.backgroundColor = '#000';
  setButtonText('Hold to Burn');
  
  goButton.addEventListener('mousedown', () => {
    t.addEmitter({
      position: { x: winder.clientWidth / 2, y: goButton.getBoundingClientRect().y - 60 },
      emitEvery: 8,
      particleOptions: {
        text: '',
        ttl: 1500,
        get position () { return { x: 64 * (Math.random() - 0.5), y: 15 * (Math.random() - 0.5) } },
        velocity: { x: 0, y: -66 },
        style: { backgroundColor: HEAT_COLOURS.map(c => colourToCSSString(c)), width: '8px', height: '8px', scale: [2, 1], borderRadius: '8px' },
      },
    });  
  });
  
  goButton.addEventListener('mouseup', () => {
    t.emitters = [];
  });
}

examples['bubbles'] = () => {
  winder.style.backgroundColor = '#113';

  setButtonText('Hold to Bubble');
  goButton.addEventListener('mousedown', () => {
    
  t.addEmitter({
      position: { x: winder.clientWidth / 2, y: goButton.getBoundingClientRect().y - 60  },
      emitEvery: 200,
      particleOptions: {
        text: '', 
        get position () { return { x: 0.167 * winder.clientWidth * (Math.random() - 0.5) } },
        get ttl () { return 1500 + (250 * Math.random()) },
        get velocity () { return { y: -10 } },
        get acceleration () { return { x: 0, y: -100 } },
        style: { 
          get scale () { return Math.random() },
          opacity: [0.5, 1, 1, 1, 0.9],
          border: '2px solid rgba(192, 192, 200, 1.0)',
          width: '32px',
          height: '32px',
          borderRadius: '16px'
        },
        onDestroy: (p) => {
            let k = 32;
            let x = 6;
            let m = Math.random() * Math.PI / x;
            for(var i = 0; i < x; i++){
              let s = t.addParticle({
                ttl: 600,
                position: { x: p.position.x + (16 * p.style.scale), y: p.position.y + (16 * p.style.scale) },
                velocity: { x: k * Math.sin(2 * i * Math.PI / x + m), y: k * Math.cos(2 * i * Math.PI / x + m) },
                text: '-',
                onCreate: (p) => {
                  p.heading = Math.atan2(p.velocity.y, p.velocity.x);
                },
                style: { opacity: [0.7, 0], color: 'rgba(192, 192, 200, 1.0)', scale: p.style.scale, fontSize: '32px' },
              });
            }
        }
      }
    });
  });
  
  goButton.addEventListener('mouseup', () => {
    t.emitters = [];
  });
}

examples['blossom'] = () => {
  winder.style.backgroundColor = '#fefeee';

  goButton.addEventListener('mousedown', () => {
    let theta = 0;
    t.addEmitter({
      position: { x: winder.clientWidth / 2, y: winder.clientHeight / 2 },
      emitEvery: 3,
      particleOptions: {
        ttl: 800,
        style: { 
          backgroundColor: ['#f33', '#fefeee'], 
          width: '16px',
          height: '16px',
          scale: [0, 20], 
        },
        text: '',
        get position () { return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) } },
        get velocity () {
          let h = 800 + 100 * Math.random();
          // theta += 0.01 * Math.PI * Math.random();
          theta = 2 * Math.random() * Math.PI;
          return { x: h * Math.cos(theta), y: h * Math.sin(theta) }
        },
        onCreate: (p) => {
          p.heading = Math.atan2(p.velocity.y, p.velocity.x) + Math.PI / 2;
        }
      }
    }); 
  });
  
  goButton.addEventListener('mouseup', () => {
    t.emitters = [];
  });
}

examples['you-know-i-had-to-do-it-to-em'] = () => {
  winder.style.backgroundColor = '#01010f';
  setButtonText('Hold to Lightspeed');
  
  const MOVING = false;
  
  goButton.addEventListener('mousedown', () => MOVING = true);
  goButton.addEventListener('mouseup', () => MOVING = false);
  

  let theta = 0;
  t.addEmitter({
    position: { x: winder.clientWidth / 2, y: winder.clientHeight / 2 },
    emitEvery: 8,
    particleOptions: {
      get ttl () { }
      style: { 
        color: ['#eef', '#fff'], 
        fontSize: '16px',
        scale: [1, 2], 
      },
      text: '.',
      get position () { 
        if (MOVING) { 
          return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) }
        } else {
        }
      },
      get velocity () {
        let h = 800 + 300 * Math.random();
        theta += 2 * Math.PI * Math.random();
        return { x: h * Math.cos(theta), y: h * Math.sin(theta) }
      },
      onCreate: (p) => {
        p.heading = Math.atan2(p.velocity.y, p.velocity.x) + Math.PI / 2;
        p.acceleration = { x: -1.1 * p.velocity.x, y: -1.1 * p.velocity.y }
      }
    }
  }); 
}

examples['fireworks'] = () => {
  
}

examples['chess'] = () => {
  t.addEmitter({
     position: { x: winder.clientWidth / 2, y: winder.clientHeight / 2 },
    emitEvery: 200,
    particleOptions: {
      ttl: 1000,
      style: { 
        color: '#000', 
        fontSize: '32px', 
        width: '32px',
        height: '32px',
        get scale() { return 10 * Math.random() }
      },
      get text () { return ['⏣', '♔','♕','♖','♗','♘','♙','♚','♛','♜','♝','♞','♟'][Math.floor(12 * Math.random())] } ,
      get position () { return { x: 128 * (Math.random() - 0.5) } },
      get velocity () {
        let theta = 2 * Math.PI * Math.random();
        let h = 100 + 10 * Math.random();
        return { x: h * Math.cos(theta), y: h * Math.sin(theta) }
      },

      onUpdate: (p) => {
        p.heading += 0.01;
      }
    }
  });
}