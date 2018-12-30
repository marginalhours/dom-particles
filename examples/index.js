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

let t = new letterbomb({
  max: 10000,
  container: document.querySelector('body')
});

examples = {};

const getTileMidpoint = (tile) => {
  const t = tile.getBoundingClientRect();
  return {
    x: window.scrollX, //+ t.x + (t.width / 2),
    y: window.scrollY //+ t.y + (t.height / 2)
  }
}


/* Simple */
const simpleButton = document.querySelector('.simple .example-button');
const simpleContainer = document.querySelector('.simple');

simpleButton.addEventListener('click', (e) => {
  simpleContainer.style.backgroundColor = 'rgba(255, 255, 240, 1.0)';
  t.addParticle({
    position: { x: e.clientX, y: e.clientY },
    contents: '+1',
    velocity: { x: 0, y: -50 }
  });
});


/* Metroidvania */
const metroidButton = document.querySelector('.metroidvania .example-button');

metroidButton.addEventListener('click', (e) => {
  t.addParticle({
    position: { x: e.clientX, y: window.scrollY + metroidButton.getBoundingClientRect().y },
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


/* Trails */
{
  const trailButton = document.querySelector('.trail .example-button');

  const f = (e) => {
    e.preventDefault();

    const trailContainer = document.querySelector('.trail');
    const midpoint = getTileMidpoint(trailContainer);

    let k = 0;
    let m = 180;
    let n = 16;

    t.addEmitter({
      position: { x: midpoint.x, y: trailContainer.getBoundingClientRect().y },
      emitEvery: 8,
      onUpdate: (emitter) => {
        emitter.position.x = midpoint.x + (m * Math.sin(k++/n));
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
      position: { x: midpoint.x, y: trailContainer.getBoundingClientRect().y },
      emitEvery: 8,
      onUpdate: (emitter) => {
        emitter.position.x = midpoint.x + (m * Math.sin(Math.PI + k/n));
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
  }

  const g = () => {
    t.clearEmitters();
  }

  trailButton.addEventListener('mousedown', f);
  trailButton.addEventListener('touchstart', f);
  trailButton.addEventListener('mouseup', g);
  trailButton.addEventListener('touchend', g);
}

/* Flame */
{
  const flameButton = document.querySelector('.flame .example-button');
  const flameContainer = document.querySelector('.flame');

  const f = (e) => {
    e.preventDefault();
    const midpoint = getTileMidpoint(flameContainer);
    flameContainer.style.backgroundColor = '#000';
    t.addEmitter({
      position: { x: midpoint.x, y: window.scrollY + flameButton.getBoundingClientRect().y },
      emitEvery: 8,
      particleOptions: {
        contents: '',
        ttl: 1500,
        get position () { return { x: 64 * (Math.random() - 0.5), y: 15 * (Math.random() - 0.5) } },
        velocity: { x: 0, y: -66 },
        style: { backgroundColor: HEAT_COLOURS.map(c => colourToCSSString(c)), width: '8px', height: '8px', scale: [2, 1], borderRadius: '8px' },
      },
    });
  }

  const g = (e) => {
    e.preventDefault();
    t.clearEmitters();
    flameContainer.style.backgroundColor = '#fff';
  }

  flameButton.addEventListener('mousedown', f);
  flameButton.addEventListener('touchstart', f);
  flameButton.addEventListener('mouseup', g);
  flameButton.addEventListener('touchend', g);
}


/* Bubbles */
const bubbleButton = document.querySelector('.bubble .example-button');
const bubbleContainer = document.querySelector('.bubble');


const f = (e) => {
  e.preventDefault();

  bubbleContainer.style.backgroundColor = '#113';

  const midpoint = getTileMidpoint(bubbleContainer);

  t.addEmitter({
      position: { x: midpoint.x, y: window.scrollY + bubbleButton.getBoundingClientRect().y },
      emitEvery: 200,
      particleOptions: {
        contents: '',
        get position () { return { x: 80 * (Math.random() - 0.5) } },
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

const g = () => {
  t.clearEmitters();
  bubbleContainer.style.backgroundColor = '#fff';
}

bubbleButton.addEventListener('mousedown', f);
bubbleButton.addEventListener('touchstart', f);
bubbleButton.addEventListener('mouseup', g);
bubbleButton.addEventListener('touchend', g);

examples['blossom'] = () => {
  mainWindow.style.backgroundColor = '#fefeee';

  setButtonText('Hold to Blossom');

  goButton.addEventListener('mousedown', () => {
    let theta = 0;
    t.addEmitter({
      position: { x: mainWindow.clientWidth / 2, y: mainWindow.clientHeight / 2 },
      emitEvery: 3,
      onUpdate: (e, t) => {
        e.heading += 0.1;
      },
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
          return { x: 800 + 100 * Math.random() }
        },
        onCreate: (p) => {
          p.heading = Math.atan2(p.velocity.y, p.velocity.x) + Math.PI / 2;
        },
        onUpdate: (p) => {
          p.heading += 0.1;
        },
      }
    });
  });

  goButton.addEventListener('mouseup', () => {
    t.clearEmitters();
  });
}

/* Lightspeed */
{
  const lightspeedButton = document.querySelector('.lightspeed .example-button');
  const lightspeedContainer = document.querySelector('.lightspeed');
  lightspeedButton.style.zIndex = 1000;

  let MOVING;

  let f = () => {
    const midpoint = getTileMidpoint(lightspeedContainer);
    lightspeedContainer.style.backgroundColor = '#01010f';

    t.addEmitter({
      position: { ...midpoint },
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
          zIndex: 1
        },
        get position () {
          return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) }
        },
        onCreate: (p) => {
          p.fixedProps.scaleX = MOVING ? 25 : 1;
          p.speed = MOVING ? 300 : 0;
          let theta = Math.atan2(p.position.y - midpoint.y, p.position.x - midpoint.x);
          p.state = MOVING;
          p.velocity = { x: p.speed * Math.cos(theta), y: p.speed * Math.sin(theta) }
          p.heading = theta;
        },
        onUpdate: (p) => {
          if (MOVING) {
            p.updateStyle({'backgroundColor': '#aaf', scaleX: lerp(p.style.scaleX, 50, 0.1)});
            p.speed = lerp(p.speed, 300, 0.1);
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

          let rect = lightspeedContainer.getBoundingClientRect();

          if (p.position.x < rect.x ||
              p.position.x > rect.x + rect.width ||
              p.position.y < rect.y ||
              p.position.y > rect.y + rect.height){
                p.ttl = p.elapsed;
          }
        }
      }
    });
  }

  const g = () => {
    t.clearEmitters();
  };

  lightspeedButton.addEventListener('mousedown', () => {
    lightspeedContainer.style.backgroundColor = '#010120';
    MOVING = true;
    f();
  });
  lightspeedButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    lightspeedContainer.style.backgroundColor = '#010120';
    MOVING = true;
    f();
  });
  lightspeedButton.addEventListener('mouseup', () => {
    lightspeedContainer.style.backgroundColor = '#01010f';
    MOVING = false;
    g();
  });
  lightspeedButton.addEventListener('touchend', () => {
    lightspeedContainer.style.backgroundColor = '#01010f';
    MOVING = false;
    g();
  });
}

/* Fireworks */
{
  const fireworkButton = document.querySelector('.fireworks .example-button');
  const fireworkContainer = document.querySelector('.fireworks');

  const f = () => {
    fireworkContainer.style.backgroundColor = '#112';
    const midpoint = getTileMidpoint(fireworkContainer);

    t.addEmitter({
        position: { x: midpoint.x, y: fireworkContainer.getBoundingClientRect().y + fireworkContainer.getBoundingClientRect().height },
        emitEvery: 400,
        particleOptions: {
          contents: '',
          get position () { return { x: 0.167 * 320 * (Math.random() - 0.5) } },
          get ttl () { return 800 + (250 * Math.random()) },
          get velocity () {
            let theta = (3/2) * Math.PI + (Math.PI / 8) * (Math.random() - 0.5);
            let k = 600;
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
                    ttl: 600,
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

  let g = () => { t.clearEmitters(); }

  fireworkButton.addEventListener('mousedown', f);
  fireworkButton.addEventListener('mouseup', g);
}


/* Snowflakes */
{
  const snowflakeButton = document.querySelector('.snowflakes .example-button');
  const snowflakeContainer = document.querySelector('.snowflakes');

  let f = (e) => {
    e.preventDefault();

    snowflakeContainer.style.backgroundColor = '#213';
    const midpoint = getTileMidpoint(snowflakeContainer);

    t.addEmitter({
      position: { x: midpoint.x, y: snowflakeContainer.getBoundingClientRect().y },
      emitEvery: 100,
      particleOptions: {
        contents: '❄',
        style: {
          color: '#fff',
          get scale () { return 0.5 + 2 * Math.random() },
          get opacity () {
            let k = 0.5 + (0.5 * Math.random());
            return [k, k, 0]
          }
        },
        get position() { return { x: 320 * (Math.random() - 0.5)}},
        get velocity () { return { x: 60 * (Math.random() - 0.5), y: 15 + 10 * Math.random() } },
        ttl: 12000,
        onUpdate: (p) => {
          if (Math.random() > 0.99) {
            p.velocity.x = -p.velocity.x;
          }
        }
      }
    });
  }

  let g = () => {
    t.clearEmitters();
  }

  snowflakeButton.addEventListener('mousedown', f);
  snowflakeButton.addEventListener('touchstart', f);
  snowflakeButton.addEventListener('mouseup', g);
  snowflakeButton.addEventListener('touchend', g);
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
        contents: '🐝',
        style: {
          width: '16px',
          height: '16px',
          get scale () { return 1; }
        },
        get position () { return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) } },
        get velocity () {
          let h = 100 + 100 * Math.random();
          theta = 2 * Math.random() * Math.PI;
          return { x: h * Math.cos(theta), y: h * Math.sin(theta) }
        },
        onCreate: (p) => {
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
      style: { fontSize: '48px' },
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

  let moons = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'].reverse()

  goButton.addEventListener('mousedown', () => {
    t.addParticle({
      ttl: 8000,
      contents: `🌑`,
      style: { fontSize: '48px' },
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