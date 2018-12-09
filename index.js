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
    
let mainWindow = document.querySelector('.main')
let code = document.querySelector('.code')
let goButton = document.querySelector('.main-button');

let t = new letterbomb({ 
  max: 10000,
  container: mainWindow
});
  
const setBackgroundColor = (color) => {
  mainWindow.style.backgroundColor = color;  
}

const setButtonText = (text) => {
  goButton.innerText = text; 
}

const setCode = (text) => {
  code.innerText = text; 
}

document.querySelector('.examples-select').addEventListener('change', (e) => {
  // clear out current examples
  t.reset();
  
  // replace event handlers
  let newButton = goButton.cloneNode(true);
  goButton.parentNode.replaceChild(newButton, goButton);
  goButton = document.querySelector('.main-button');
  
  // pick example
  examples[e.target.value]();
});


const examples = {};

examples['number-goes-up'] = () => {
  setButtonText('Press to go up');
  
  setCode(`  
    t.addParticle({
      position: { x: e.layerX, y: e.layerY },
      contents: '+1', 
      velocity: { x: 0, y: -10 },
      acceleration: { x: 0, y: -100 },
    })
  `);
  
  goButton.addEventListener('click', (e) => {   
    t.addParticle({
      position: { x: e.layerX, y: e.layerY },
      contents: '+1', 
      velocity: { x: 0, y: -10 },
      acceleration: { x: 0, y: -100 },
    })
  });
}

examples['metroidvania'] = () => {
  setButtonText('Press to attack');
  setBackgroundColor('#113');
    
  setCode(`
    goButton.addEventListener('click', (e) => {
        t.addParticle({
          position: { x: e.layerX, y: e.layerY },
          get contents () { return Math.floor(200 * Math.random()) }, 
          ttl: 500,
          velocity: { x: 0, y: -20 },
          acceleration: { x: 0, y: -100 },
          style: { 
            scale: [2, 1, 1, 1, 1, 1, 1],
            fontWeight: 'bold',
            fontFamily: 'monospace',
            textShadow: '1px 1px 0px #f00',
            color: '#fff'
          }
        });
      });
  `);

  goButton.addEventListener('click', (e) => {
    t.addParticle({
      trail: 3,
      position: { x: e.layerX, y: goButton.getBoundingClientRect().y - 60 },
      get contents () { return Math.floor(200 * Math.random()) }, 
      ttl: 800,
      velocity: { x: 0, y: -25 },
      acceleration: { x: 0, y: -100 },
      style: { 
        scale: [2.5, 1, 1, 1, 1, 1, 1],
        fontWeight: 'bold',
        fontSize: '18px',
        fontFamily: 'monospace',
        textShadow: '1px 1px 0px #f00',
        color: '#fff'
      }
    });
  });
}

examples['trails'] = () => {  
    setButtonText('Hold to trail');
    setBackgroundColor('#fff');
  
    let k = 0;
    let l = -400;
    let m = 200;
    let n = 16;
  
    goButton.addEventListener('mousedown', () => {
      t.addEmitter({
        position: { x: mainWindow.clientWidth / 2, y: mainWindow.clientWidth / 4 },
        emitEvery: 8,
        onUpdate: (emitter) => {   
          emitter.position.x = mainWindow.clientWidth / 2 + (m * Math.sin(k++/n));
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
          contents: '',
          get position () { return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5), z: -100 } },
          get velocity () {
            let h = (500 + (100 * Math.random()));
            return { y: h }
          }
        }
      });

      t.addEmitter({
        position: { x: mainWindow.clientWidth / 2, y: mainWindow.clientWidth / 4 },
        emitEvery: 8,
        onUpdate: (emitter) => {   
          emitter.position.x = mainWindow.clientWidth / 2 + (m * Math.sin(Math.PI + k/n));
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
          contents: '',
          get position () { return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) } },
          get velocity () {
            let h = (500 + (100 * Math.random()));
            return { y: h }
          }
        }
      });
    });
  
    goButton.addEventListener('mouseup', () => {
      t.emitters = [];
    });
}

examples['flame'] = () => {
  setButtonText('Hold to Burn');
  setBackgroundColor('#000');
  
  setCode(`
    goButton.addEventListener('mousedown', () => {
      t.addEmitter({
        position: { x: mainWindow.clientWidth / 2, y: goButton.getBoundingClientRect().y - 60 },
        emitEvery: 8,
        particleOptions: {
          contents: '',
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
  `);
  
  goButton.addEventListener('mousedown', () => {
    t.addEmitter({
      position: { x: mainWindow.clientWidth / 2, y: goButton.getBoundingClientRect().y - 60 },
      emitEvery: 8,
      particleOptions: {
        contents: '',
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
  setBackgroundColor('#113');
  setButtonText('Hold to Bubble');
  
  setCode(`
    t.addEmitter({
      position: { x: mainWindow.clientWidth / 2, y: goButton.getBoundingClientRect().y - 60  },
      emitEvery: 200,
      particleOptions: {
        contents: '', 
        get position () { return { x: 0.167 * mainWindow.clientWidth * (Math.random() - 0.5) } },
        get ttl () { return 1500 + (250 * Math.random()) },
        get velocity () { return { y: -10 } },
        get acceleration () { return { x: 0, y: -100 } },
        style: { 
          get scale () { return 0.25 + Math.random() },
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
              /* radial fragments */
              let s = t.addParticle({
                ttl: 600,
                position: { x: p.position.x + (16 * p.style.scale), y: p.position.y + (16 * p.style.scale) },
                velocity: { x: k * Math.sin(2 * i * Math.PI / x + m), y: k * Math.cos(2 * i * Math.PI / x + m) },
                contents: '-',
                onCreate: (p) => {
                  p.heading = Math.atan2(p.velocity.y, p.velocity.x);
                },
                style: { opacity: [0.7, 0], color: 'rgba(192, 192, 200, 1.0)', scale: p.style.scale, fontSize: '32px' },
              });
            }
        }
      }
    });
  `);
  
  let f = () => {
    t.addEmitter({
        position: { x: mainWindow.clientWidth / 2, y: goButton.getBoundingClientRect().y - 60  },
        emitEvery: 200,
        particleOptions: {
          contents: '', 
          get position () { return { x: 0.167 * mainWindow.clientWidth * (Math.random() - 0.5) } },
          get ttl () { return 1500 + (250 * Math.random()) },
          get velocity () { return { y: -10 } },
          get acceleration () { return { x: 0, y: -100 } },
          style: { 
            get scale () { return 0.25 + Math.random() },
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
                /* radial fragments */
                let s = t.addParticle({
                  ttl: 600,
                  position: { x: p.position.x + (16 * p.style.scale), y: p.position.y + (16 * p.style.scale) },
                  velocity: { x: k * Math.sin(2 * i * Math.PI / x + m), y: k * Math.cos(2 * i * Math.PI / x + m) },
                  contents: '-',
                  onCreate: (p) => {
                    p.heading = Math.atan2(p.velocity.y, p.velocity.x);
                  },
                  style: { opacity: [0.7, 0], color: 'rgba(192, 192, 200, 1.0)', scale: p.style.scale, fontSize: '32px' },
                });
              }
          }
        }
      });
  }
  
  let g = () => {
    t.emitters = [];  
  }
  
  goButton.addEventListener('mousedown', f);
  goButton.addEventListener('touchstart', f);
  goButton.addEventListener('mouseup', g);
  goButton.addEventListener('touchend', g);
}

examples['blossom'] = () => {
  mainWindow.style.backgroundColor = '#fefeee';
  
  setButtonText('Hold to Blossom');

  goButton.addEventListener('mousedown', () => {
    let theta = 0;
    t.addEmitter({
      position: { x: mainWindow.clientWidth / 2, y: mainWindow.clientHeight / 2 },
      emitEvery: 3,
      particleOptions: {
        ttl: 800,
        style: { 
          backgroundColor: ['#f33', '#fefeee'], 
          width: '16px',
          height: '16px',
          scale: [0, 20], 
        },
        contents: '',
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
  setBackgroundColor('#01010f');
  setButtonText('Hold to Lightspeed');
  
  let MOVING = false;

  let theta = 0;
  let emitter = t.addEmitter({
    position: { x: mainWindow.clientWidth / 2, y: mainWindow.clientHeight / 2 },
    emitEvery: 800,
    particleOptions: {
      style: { 
        color: ['#eef', '#fff'], 
        fontSize: '16px',
        scale: [1, 2], 
        get opacity () { return MOVING ? 1 : [1, 1, 0] }
      },
      get position () { 
        if (MOVING) { 
          return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) }
        } else {
          return { x: mainWindow.clientWidth * (Math.random() - 0.5), y: mainWindow.clientHeight * (Math.random() - 0.5) }
        }
      },
      get velocity () {
        let h = 300 + 300 * Math.random();
        h = MOVING ? h : 0;
        theta += 2 * Math.PI * Math.random();
        return { x: h * Math.cos(theta), y: h * Math.sin(theta) }
      },
      onCreate: (p) => {
        this.state = MOVING;
        p.heading = Math.atan2(p.velocity.y, p.velocity.x) + Math.PI / 2;
        
      },
      onUpdate: (p) => {
        if (this.state != MOVING){
          if (this.state == false) {
            this.ttl = 800;
          } else {
            this.ttl = 10000;
            this.velocity = 0;
          }
        }
        // p.acceleration = { x: -1.1 * p.velocity.x, y: -1.1 * p.velocity.y }
      }
    }
  }); 
  
  goButton.addEventListener('mousedown', () => { MOVING = true; emitter.emitEvery = 16; });
  goButton.addEventListener('mouseup', () => { MOVING = false; emitter.emitEvery = 400; });
}

examples['fireworks'] = () => {  
  setBackgroundColor('#112');  
  setButtonText('Hold to 4th of July');
  
  let f = () => {
    t.addEmitter({
        position: { x: mainWindow.clientWidth / 2, y: mainWindow.clientHeight },
        emitEvery: 100,
        particleOptions: {
          contents: '', 
          get position () { return { x: 0.167 * mainWindow.clientWidth * (Math.random() - 0.5) } },
          get ttl () { return 1500 + (250 * Math.random()) },
          get velocity () { 
            let theta = (3/2) * Math.PI + (Math.PI / 6) * (Math.random() - 0.5);
            let k = 800;
            return { x: k * Math.cos(theta),  y: k * Math.sin(theta) } 
          },
          get acceleration () { return { y: 600 } },
          style: { 
            get backgroundColor () { return ['rgb(255, 0, 0)', 'rgb(255, 255, 255)', 'rgb(0, 0, 255)'][Math.floor(3 * Math.random())] },
            opacity: [1, 1, 0],
            width: '5px',
            height: '5px',            
            borderRadius: '5px',
            // boxShadow: '1px 1px #888888'
          },
          onDestroy: (p) => {
              let k = 100;
              let x = 24;
              for(var i = 0; i < x; i++){
                t.addParticle({
                  ttl: 1200,
                  position: { x: p.position.x, y: p.position.y },
                  velocity: { x: k * Math.sin(2 * i * Math.PI / x), y: k * Math.cos(2 * i * Math.PI / x) },
                  get acceleration () { return { x: 0, y: 150 } },
                  onCreate: (p) => {
                    p.heading = Math.atan2(p.velocity.y, p.velocity.x);
                  },
                  style: { ...p.style, scale: 0.5, opacity: [1, 0] },
                });
              }
          }
        }
      });
  }
  
  let g = () => {
    t.emitters = [];  
  }
  
  goButton.addEventListener('mousedown', f);
  goButton.addEventListener('mouseup', g);
}

examples['chess'] = () => {
  t.addEmitter({
     position: { x: mainWindow.clientWidth / 2, y: mainWindow.clientHeight / 2 },
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
      get contents () { return ['⏣', '♔','♕','♖','♗','♘','♙','♚','♛','♜','♝','♞','♟'][Math.floor(12 * Math.random())] } ,
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

examples['bees'] = () => {
  mainWindow.style.backgroundColor = '#fefeee';
  
  setButtonText('Hold to Swarm');

  goButton.addEventListener('mousedown', () => {
    let theta = 0;
    t.addEmitter({
      position: { x: mainWindow.clientWidth / 2, y: mainWindow.clientHeight / 2 },
      emitEvery: 3,
      particleOptions: {
        ttl: 800,
        contents: `<img src='https://www.gstatic.com/webp/gallery3/1.sm.png'>`, //🐝'
        style: {
          width: '16px',
          height: '16px',
          get scale () { return 1; }
        },
        get position () { return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) } },
        get velocity () {
          let h = 100 + 100 * Math.random();
          // theta += 0.01 * Math.PI * Math.random();
          theta = 2 * Math.random() * Math.PI;
          return { x: h * Math.cos(theta), y: h * Math.sin(theta) }
        },
        onCreate: (p) => {
          p.element.querySelector('img').style.width = '64px';
          p.element.querySelector('img').style.height = '64px';
          p.heading = Math.atan2(p.velocity.y, p.velocity.x) + 5 * Math.PI / 6;
        }
      }
    }); 
  });
  
  goButton.addEventListener('mouseup', () => {
    t.emitters = [];
  });  
}