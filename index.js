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
    let s = t.addParticle({
      position: { x: e.layerX, y: goButton.getBoundingClientRect().y - 60 },
      get contents () { return Math.floor(200 * Math.random()) },
      ttl: 800,
      velocity: { x: 0, y: -25 },
      acceleration: { x: 0, y: -100 },
      style: {
        scale: [2.5, 1, 1, 1, 1, 1, 1],
        opacity: [1, 1, 0],
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
            return { y: 500 + (100 * Math.random()) };
          }
        }
      });
    });

    goButton.addEventListener('mouseup', () => {
      t.clearEmitters();
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
    t.clearEmitters();
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
                style: { backgroundColor: transparent; opacity: [0.7, 0], color: 'rgba(192, 192, 200, 1.0)', scale: p.style.scale, fontSize: '32px' },
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
    t.clearEmitters();
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
    t.clearEmitters();
  });
}

examples['you-know-i-had-to-do-it-to-em'] = () => {
  setBackgroundColor('#01010f');
  setButtonText('Hold to Lightspeed');

  let MOVING = false;

  let f = () => {
    t.addEmitter({
      position: { x: mainWindow.clientWidth / 2, y: mainWindow.clientHeight / 2 },
      emitEvery: 4,
      particleOptions: {
        contents: '',
        ttl: false,
        style: {
          backgroundColor: '#fff',
          width: '2px',
          height: '2px',
          transformOrigin: '100% 50%',
          scaleX: 1,
          zIndex: 0
        },
        get position () {
          return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) }
        },
        onCreate: (p) => {
          p.fixedProps.scaleX = MOVING ? 25 : 1;
          p.speed = MOVING ? 600 : 0;
          let theta = Math.atan2(p.position.y - mainWindow.clientHeight / 2, p.position.x - mainWindow.clientWidth / 2);
          p.state = MOVING;
          p.velocity = { x: p.speed * Math.cos(theta), y: p.speed * Math.sin(theta) }
          p.heading = theta;
        },
        onUpdate: (p) => {
          if (MOVING) {
            p.updateStyle({'backgroundColor': '#aaf', scaleX: lerp(p.style.scaleX, 50, 0.1)});
            p.speed = lerp(p.speed, 600, 0.1);
          } else {
            p.updateStyle({'backgroundColor': '#fff', scaleX: lerp(p.style.scaleX, 1, 0.1)});
            p.speed = lerp(p.speed, 0, 0.1);
          }
          p.velocity = { x: p.speed * Math.cos(p.heading), y: p.speed * Math.sin(p.heading) }

          if (p.state != MOVING){
            p.state = MOVING;
            if (p.state == false) {
              p.ttl = false;
            } else {
              p.elapsed = 0;
              p.ttl = 800;
            }
          }
          if (p.position.x < -12 ||
              p.position.x > mainWindow.clientWidth + 12 ||
              p.position.y < -12 ||
              p.position.y > mainWindow.clientHeight + 12){
            p.ttl = p.elapsed;
          }
          // p.acceleration = { x: -1.1 * p.velocity.x, y: -1.1 * p.velocity.y }
        }
      }
    });
  }

  let g = () => {
    t.clearEmitters();
  };

  goButton.addEventListener('mousedown', () => { MOVING = true; f(); });
  goButton.addEventListener('mouseup', () => { MOVING = false; g(); });
}

examples['fireworks'] = () => {
  setBackgroundColor('#112');
  setButtonText('Hold to 4th of July');

  let f = () => {
    t.addEmitter({
        position: { x: mainWindow.clientWidth / 2, y: mainWindow.clientHeight },
        emitEvery: 300,
        particleOptions: {
          contents: '',
          get position () { return { x: 0.167 * mainWindow.clientWidth * (Math.random() - 0.5) } },
          get ttl () { return 1500 + (250 * Math.random()) },
          get velocity () {
            let theta = (3/2) * Math.PI + (Math.PI / 8) * (Math.random() - 0.5);
            let k = 800;
            return { x: k * Math.cos(theta),  y: k * Math.sin(theta) }
          },
          get acceleration () { return { y: 600 } },
          style: {
            get backgroundColor () { return ['rgb(255, 0, 0)', 'rgb(255, 255, 255)', 'rgb(0, 0, 255)'][Math.floor(3 * Math.random())] },
            opacity: [1, 1, 0.5],
            width: '5px',
            height: '5px',
            borderRadius: '5px',
          },
          onDestroy: (p) => {
              let k = 100;
              let x = 10;
              for(var i = 0; i < x; i++){
                t.addEmitter({
                  emitEvery: 32,
                  maxEmissions: 8,
                  particleOptions: {
                    ttl: 1200,
                    position: { x: p.position.x, y: p.position.y },
                    velocity: { x: k * Math.sin(2 * i * Math.PI / x), y: k * Math.cos(2 * i * Math.PI / x) },
                    get acceleration () { return { x: 0, y: 150 } },
                    onCreate: (p) => {
                      p.heading = Math.atan2(p.velocity.y, p.velocity.x);
                    },
                    style: { ...p.style, scale: 0.5, opacity: [1, 0] },
                  }
                });
              }
          }
        }
      });
  }

  let g = () => {
    t.clearEmitters();
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
    t.clearEmitters();
  });
}

examples['worlds'] = () => {
   mainWindow.style.backgroundColor = '#fefeee';

  setButtonText('Press to world');

  goButton.addEventListener('mousedown', () => {
    t.addParticle({
      ttl: 8000,
      contents: `🌏`,
      style: {
        width: '16px',
        height: '16px',
        fontSize: '16px',
        lineHeight: '16px',
        borderRadius: '8px',
        color: '#0f0',
        backgroundColor: '#00f',
        get scale () { return 1; }
      },
      get position () { return { x: mainWindow.clientWidth / 2, y: goButton.getBoundingClientRect().y - 60} },
      get velocity () {
        let h = 10;
        let theta = 2 * Math.random() * Math.PI;
        return { x: h * Math.cos(theta), y: h * Math.sin(theta) }
      },
      onCreate (p) {
        p.idx = 0;
      },
      onUpdate (p) {
        if (p.frameNumber % 15 === 0){
          p.idx = (p.idx + 1) % 3;
        }
        p.setContents(['🌏','🌎', '🌍'][p.idx])
      }
    });
  })
};

examples['moons'] = () => {
   mainWindow.style.backgroundColor = '#fefeee';

  setButtonText('Press to world');

  let moons = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘']

  goButton.addEventListener('mousedown', () => {
    t.addParticle({
      ttl: 8000,
      contents: `🌑`,
      style: {
        width: '14px',
        height: '14px',
        fontSize: '16px',
        lineHeight: '14px',
        borderRadius: '12px',
        color: '#f0c420',
        backgroundColor: '#000',
        get scale () { return 1; }
      },
      get position () { return { x: mainWindow.clientWidth / 2, y: goButton.getBoundingClientRect().y - 60} },
      get velocity () {
        let h = 10;
        let theta = 2 * Math.random() * Math.PI;
        return { x: h * Math.cos(theta), y: h * Math.sin(theta) }
      },
      onCreate (p) {
        p.idx = 0;
      },
      onUpdate (p) {
        if (p.frameNumber % 15 === 0){
          p.idx = (p.idx + 1) % moons.length;
          p.setContents(moons[p.idx])
        }
      }
    });
  })
};