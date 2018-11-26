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

let t = new letterbomb({ 
  max: 10000,
  autostart: false
});

let c = { x: document.body.clientWidth / 2 , y: document.body.clientHeight / 2 };
    
document.querySelector('button').addEventListener('click', (e) => {
  t.addParticle({
    position: positionFromNode(document.querySelector('button'), 0, -10),
    get text () { return Math.floor(200 * Math.random()) }, 
    ttl: 500,
    get velocity () { return { x: 0, y: -10 } },
    get acceleration () { return { x: 0, y: -100 } },
    style: { 
      scale: [2, 1, 1],
      fontWeight: 'bold',
      fontFamily: 'monospace',
      textShadow: '1px 1px 0px #f00',
      color: '#fff'
    }
  });
});

// blossom
  // let theta = 0;
  // t.addEmitter({
  //   position: {...c},
  //   emitEvery: 0.1,
  //   particleOptions: {
  //     ttl: 1000,
  //     style: { 
  //       backgroundColor: ['#f33', '#fefeee'], 
  //       width: '16px',
  //       height: '16px',
  //       scale: [1, 20], 
  //     },
  //     text: '',
  //     get position () { return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) } },
  //     get velocity () {
  //       let h = 800 + 100 * Math.random();
  //       // theta += 0.1 * Math.PI * Math.random();
  //       theta = 2 * Math.random() * Math.PI;
  //       return { x: h * Math.cos(theta), y: h * Math.sin(theta) }
  //     },
  //     onCreate: (p) => {
  //       p.heading = Math.atan2(p.velocity.y, p.velocity.x) + Math.PI / 2;
  //     }
  //   }
  // })

  // t.addEmitter({
  //   position: { x: document.body.clientWidth / 2 - 50, y: document.body.clientHeight / 2 - 20},
  //   emitEvery: 4,
  //   onUpdate: (emitter) => {   
  //     emitter.position.y = emitter.position.y + (10 * Math.sin(emitter.frameNumber/10));
  //   },
  //   particleOptions: {
  //     ttl: 1000,
  //     style: { 
  //       backgroundColor: ['#f33', '#fefeee'], 
  //       width: '12px',
  //       height: '12px',
  //       scale: [2, 1], 
  //     },
  //     text: '',
  //     get position () { return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) } },
  //     get velocity () {
  //       let h = -1 * (500 + (100 * Math.random()));
  //       return { x: h, y: 0 }
  //     },
  //     onCreate: (p) => {
  //       p.heading = Math.atan2(p.velocity.y, p.velocity.x) + Math.PI / 2;
  //     }
  //   }
  // });

  // let k = 1;
  // t.from(document.querySelector('p'), 1, {
  //   ttl: 15000,
  //   style: { rotation: ['0deg', '360deg'] }, 
  //   onCreate: (p) => { p.n = k++; },
  //   onUpdate: (p) => { 
  //     p.position = { 
  //       x: p.position.x,
  //       y: p.position.y + Math.sin(((p.n) + p.frameNumber) * 0.1)
  //     }
  //   }
  // });


    // particleOptions: {
    //   ttl: 1000,
    //   style: { 
    //     backgroundColor: ['#f33', '#fefeee'], 
    //     width: '16px',
    //     height: '16px',
    //     scale: [0.1, 20], 
    //   },
    //   text: '',
    //   get position () { return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) } },
    //   get velocity () {
    //     let h = 600 + 100 * Math.random();
    //     theta += 0.1 * Math.PI * Math.random();
    //     return { x: h * Math.cos(theta), y: h * Math.sin(theta) }
    //   },
    //   onCreate: (p) => {
    //     p.heading = Math.atan2(p.velocity.y, p.velocity.x) + Math.PI / 2;
    //   }
    // }

  // t.addEmitter({
  //   position: { x: document.body.clientWidth / 2 - 50, y: document.body.clientHeight / 2},
  //   emitEvery: 2,
  //   particleOptions: {
  //     grid: false,
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

// trails 

//     let k = 0;
//     let l = -400;
//     let m = 120;
//     let n = 16;
  

    // t.addEmitter({
    //   ttl: 10000,
    //   position: {...c},
    //   emitEvery: 8,
    //   onUpdate: (emitter) => {   
    //     emitter.position.y = c.y + (m * Math.sin(k++/n));
    //   },
    //   particleOptions: {
    //     ttl: 1000,
    //     style: { 
    //       get backgroundColor () { return  ['#f33', '#fefeee'] },
    //       width: '12px',
    //       height: '12px',
    //       scale: [2, 0.1], 
    //       zIndex: 100
    //     },
    //     text: '',
    //     get position () { return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5), z: -100 } },
    //     get velocity () {
    //       let h = -1 * (500 + (100 * Math.random()));
    //       return { x: l, y: 0, z: 0 }
    //     }
    //   }
    // });
  
    // t.addEmitter({
    //   ttl: 10000,
    //   position: {...c},
    //   emitEvery: 8,
    //   onUpdate: (emitter) => {   
    //     emitter.position.y = c.y + (m * Math.sin(Math.PI + k/n));
    //     emitter.position.z = 100 * Math.sin(Math.PI + k / n);
    //   },
    //   particleOptions: {
    //     ttl: 1000,
    //     style: { 
    //       get backgroundColor () { return  ['#33f', '#eefefe'] },
    //       width: '12px',
    //       height: '12px',
    //       scale: [2, 0.1], 
    //       zIndex: 50
    //     },
    //     text: '',
    //     get position () { return { x: 20 * (Math.random() - 0.5), y: 20 * (Math.random() - 0.5) } },
    //     get velocity () {
    //       let h = -1 * (500 + (100 * Math.random()));
    //       return { x: l, y: 0 }
    //     }
    //   }
    // });

// Bubbles
  // t.addEmitter({
  //   position: positionFromNode(document.querySelector('button'), 0, 0),
  //   emitEvery: 500,
  //   particleOptions: {
  //     text: '', 
  //     get position () { return { x: 100 * Math.random() } },
  //     get ttl () { return 750 + (250 * Math.random()) },
  //     get velocity () { return { x: 0, y: -10 } },
  //     get acceleration () { return { x: 0, y: -100 } },
  //     style: { 
  //       get scale () { return 0.75 * Math.random() },
  //       opacity: [0, 1, 1, 1, 0.5],
  //       border: '2px solid rgba(192, 192, 200, 1.0)',
  //       width: '16px',
  //       height: '16px',
  //       borderRadius: '16px'
  //     },
  //     onDestroy: (p) => {
  //         let k = 60;
  //         let m = Math.random() * Math.PI / 4;
  //         for(var i = 0; i < 4; i++){
  //           let s = t.addParticle({
  //             ttl: 400,
  //             position: { x: p.position.x + 8, y: p.position.y + 8 },
  //             velocity: { x: k * Math.sin(i * Math.PI / 2 + m), y: k * Math.cos(i * Math.PI / 2 + m) },
  //             text: '-',
  //             onCreate: (p) => {
  //               p.heading = Math.atan2(p.velocity.y, p.velocity.x);
  //             },
  //             style: { opacity: [0.7, 0], color: 'rgba(192, 192, 200, 1.0)', scale: p.scale },
  //           });
  //         }
  //     }
  //   }
  // });