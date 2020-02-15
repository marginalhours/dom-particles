const { colourToCSSString, positionFromNode, lerp } = DomParticles.utilities;

const manager = new DomParticles({
  max: 10000,
  preallocate: 100,
  container: document.querySelector("body")
});

examples = {};

const getScrollTop = () =>
  document.body.scrollTop || document.documentElement.scrollTop;
const getScrollLeft = () =>
  document.body.scrollLeft || document.documentElement.scrollLeft;

const getTileMidpoint = tile => {
  const tileBounds = tile.getBoundingClientRect();

  return {
    x: getScrollLeft() + tileBounds.x + tileBounds.width / 2,
    y: getScrollTop() + tileBounds.y + tileBounds.height / 2
  };
};

/* Simple */
{
  const simpleButton = document.querySelector(".simple .example-button");

  const showParticle = event => {
    manager.addParticle({
      position: {
        x: event.clientX,
        y: getScrollTop() + simpleButton.getBoundingClientRect().y - 16
      },
      contents: "+1",
      velocity: { x: 0, y: -40 },
      style: { color: "#fff", fontSize: "24px" }
    });
  };

  simpleButton.addEventListener("click", event => {
    event.preventDefault();
    showParticle(event);
  });

  simpleButton.addEventListener("touchstart", touchEvent => {
    touchEvent.preventDefault();
    showParticle(touchEvent.touches[0]);
  });
}

/* Metroidvania */
{
  const metroidButton = document.querySelector(".metroidvania .example-button");

  const healthInner = document.querySelector(".metroidvania .health-inner");
  const healthShadow = document.querySelector(".metroidvania .health-shadow");

  let healthAmount = 1000;

  const showParticle = () => {
    const rect = healthInner.getBoundingClientRect();
    const xpos = getScrollLeft() + rect.x + rect.width;
    const ypos = getScrollTop() + rect.y;

    manager.addParticle({
      position: { x: xpos, y: ypos },
      get contents() {
        return 100 + Math.floor(100 * Math.random());
      },
      ttl: 800,
      velocity: { x: 0, y: -25 },
      acceleration: { x: 0, y: -100 },
      style: {
        scale: [2.5, 1, 1, 1, 1, 1, 1],
        opacity: [1, 1, 0],
        fontWeight: "bold",
        fontSize: "18px",
        fontFamily: "monospace",
        textShadow: "1px 1px 0px #842337",
        color: "#fff"
      },
      onCreate(particle) {
        healthAmount -= particle.contents;
        if (healthAmount < 0) {
          healthAmount = 1000;
        }
        healthInner.style.width = `${(100 * healthAmount) / 1000}%`;
        setTimeout(() => {
          healthShadow.style.width = `${(100 * healthAmount) / 1000}%`;
        }, 500);
      }
    });
  };

  metroidButton.addEventListener("click", event => {
    event.preventDefault();
    showParticle();
  });

  metroidButton.addEventListener("touchstart", touchEvent => {
    touchEvent.preventDefault();
    showParticle();
  });
}

/* Trails */
{
  const trailButton = document.querySelector(".trail .example-button");

  const showEmitters = () => {
    const trailContainer = document.querySelector(".trail");
    const midpoint = getTileMidpoint(trailContainer);

    const magnitude = 140;
    const cycleLength = 12;

    manager.addEmitter({
      position: { x: midpoint.x, y: midpoint.y - 120 },
      emitEvery: 16,
      onUpdate(emitter) {
        emitter.position.x =
          midpoint.x + magnitude * Math.sin(emitter.frameNumber / cycleLength);
      },
      particleOptions: {
        ttl: 600,
        style: {
          get backgroundColor() {
            return ["#f33", "#fefeee"];
          },
          width: "12px",
          height: "12px",
          scale: [2, 0.1],
          zIndex: 100
        },
        contents: "",
        get position() {
          return {
            x: 20 * (Math.random() - 0.5),
            y: 20 * (Math.random() - 0.5),
            z: -100
          };
        },
        get velocity() {
          return { y: 500 + 100 * Math.random() };
        }
      }
    });

    manager.addEmitter({
      position: { x: midpoint.x, y: midpoint.y - 120 },
      emitEvery: 16,
      onUpdate(emitter) {
        emitter.position.x =
          midpoint.x +
          magnitude * Math.sin(Math.PI + emitter.frameNumber / cycleLength);
      },
      particleOptions: {
        ttl: 600,
        style: {
          get backgroundColor() {
            return ["#33f", "#eefefe"];
          },
          width: "12px",
          height: "12px",
          scale: [2, 0.1],
          zIndex: 50
        },
        contents: "",
        get position() {
          return {
            x: 20 * (Math.random() - 0.5),
            y: 20 * (Math.random() - 0.5)
          };
        },
        get velocity() {
          return { y: 500 + 100 * Math.random() };
        }
      }
    });
  };

  const hideEmitters = () => {
    manager.clearEmitters();
  };

  trailButton.addEventListener("mousedown", event => {
    event.preventDefault();
    showEmitters();
  });

  trailButton.addEventListener("touchstart", touchEvent => {
    touchEvent.preventDefault();
    showEmitters();
  });

  trailButton.addEventListener("mouseup", hideEmitters);
  trailButton.addEventListener("touchend", hideEmitters);
}

/* Flame */
{
  const flameButton = document.querySelector(".flame .example-button");
  const flameContainer = document.querySelector(".flame");

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
    [254, 254, 254, 1.0] // white
  ].reverse();

  const showFlame = () => {
    const midpoint = getTileMidpoint(flameContainer);
    flameContainer.style.backgroundColor = "#000";

    manager.addEmitter({
      position: { x: midpoint.x, y: midpoint.y - 40 },
      emitEvery: 8,
      particleOptions: {
        contents: "",
        ttl: 1500,
        get position() {
          return {
            x: 64 * (Math.random() - 0.5),
            y: 15 * (Math.random() - 0.5)
          };
        },
        velocity: { x: 0, y: -66 },
        style: {
          backgroundColor: HEAT_COLOURS.map(c => colourToCSSString(c)),
          width: "8px",
          height: "8px",
          scale: [2, 1],
          borderRadius: "8px"
        }
      }
    });
  };

  const stopFlame = event => {
    event.preventDefault();
    manager.clearEmitters();
    flameContainer.style.backgroundColor = "rgba(0, 0, 0, 0)";
  };

  flameButton.addEventListener("mousedown", event => {
    event.preventDefault();
    showFlame();
  });

  flameButton.addEventListener("touchstart", touchEvent => {
    touchEvent.preventDefault();
    showFlame();
  });

  flameButton.addEventListener("mouseup", stopFlame);
  flameButton.addEventListener("touchend", stopFlame);
}

/* Bubbles */
{
  const bubbleButton = document.querySelector(".bubble .example-button");
  const bubbleContainer = document.querySelector(".bubble");
  const midpoint = getTileMidpoint(bubbleContainer);

  const showBubbles = () => {
    bubbleContainer.style.backgroundColor = "#113";

    manager.addEmitter({
      position: { x: midpoint.x, y: midpoint.y - 40 },
      emitEvery: 200,
      particleOptions: {
        contents: "",
        get position() {
          return { x: 80 * (Math.random() - 0.5) };
        },
        get ttl() {
          return 1500 + 250 * Math.random();
        },
        get velocity() {
          return { y: -10 };
        },
        get acceleration() {
          return { x: 0, y: -100 };
        },
        style: {
          get scale() {
            return 0.25 + Math.random();
          },
          opacity: [0.5, 1, 1, 1, 0.9],
          border: "2px solid rgba(192, 192, 200, 1.0)",
          width: "32px",
          height: "32px",
          borderRadius: "16px"
        },
        onDestroy(particle) {
          const rawSpeed = 32;
          const numberOfFragments = 6;
          const angularOffset = (Math.random() * Math.PI) / numberOfFragments;

          for (let i = 0; i < numberOfFragments; i++) {
            /* radial fragments */
            manager.addParticle({
              ttl: 600,
              position: {
                x: particle.position.x + 16 * particle.style.scale,
                y: particle.position.y + 16 * particle.style.scale
              },
              velocity: {
                x:
                  rawSpeed *
                  Math.sin(
                    (2 * i * Math.PI) / numberOfFragments + angularOffset
                  ),
                y:
                  rawSpeed *
                  Math.cos(
                    (2 * i * Math.PI) / numberOfFragments + angularOffset
                  )
              },
              contents: "-",
              onCreate(subParticle) {
                subParticle.heading = Math.atan2(
                  subParticle.velocity.y,
                  subParticle.velocity.x
                );
              },
              style: {
                opacity: [0.7, 0],
                color: "rgba(192, 192, 200, 1.0)",
                scale: particle.style.scale,
                fontSize: "32px"
              }
            });
          }
        }
      }
    });
  };

  const stopBubbles = () => {
    manager.clearEmitters();
  };

  bubbleButton.addEventListener("mousedown", event => {
    event.preventDefault();
    showBubbles();
  });

  bubbleButton.addEventListener("touchstart", touchEvent => {
    touchEvent.preventDefault();
    showBubbles();
  });

  bubbleButton.addEventListener("mouseup", stopBubbles);
  bubbleButton.addEventListener("touchend", stopBubbles);
}

/* Blossom */
{
  const blossomButton = document.querySelector(".blossom .example-button");
  const blossomContainer = document.querySelector(".blossom");

  const showBlossom = () => {
    const midpoint = getTileMidpoint(blossomContainer);

    manager.addEmitter({
      position: { x: midpoint.x, y: midpoint.y },
      emitEvery: 3,
      particleOptions: {
        ttl: 300,
        style: {
          backgroundColor: ["#f33", "#fefeee"],
          width: "16px",
          height: "16px",
          scale: [0, 10]
        },
        contents: "",
        get position() {
          return {
            x: 20 * (Math.random() - 0.5),
            y: 20 * (Math.random() - 0.5)
          };
        },
        get velocity() {
          const theta = 2 * Math.PI * Math.random();
          const magnitude = 800 + 100 * Math.random();
          return {
            x: magnitude * Math.cos(theta),
            y: magnitude * Math.sin(theta)
          };
        },
        onCreate(particle) {
          particle.heading =
            Math.atan2(particle.velocity.y, particle.velocity.x) + Math.PI / 2;
        }
      }
    });
  };

  const stopBlossom = () => {
    manager.clearEmitters();
  };

  blossomButton.addEventListener("mousedown", event => {
    event.preventDefault();
    showBlossom();
  });
  blossomButton.addEventListener("touchstart", touchEvent => {
    touchEvent.preventDefault();
    showBlossom();
  });

  blossomButton.addEventListener("mouseup", stopBlossom);
  blossomButton.addEventListener("touchend", stopBlossom);
}

/* Lightspeed */
{
  const lightspeedButton = document.querySelector(
    ".lightspeed .example-button"
  );
  const lightspeedContainer = document.querySelector(".lightspeed");
  lightspeedButton.style.zIndex = 1000;

  let MOVING;

  const showLightspeed = () => {
    const midpoint = getTileMidpoint(lightspeedContainer);
    lightspeedContainer.style.backgroundColor = "#01010f";

    manager.addEmitter({
      position: { x: midpoint.x, y: midpoint.y },
      emitEvery: 4,
      particleOptions: {
        contents: "",
        ttl: false,
        style: {
          backgroundColor: "#fff",
          width: "2px",
          height: "2px",
          transformOrigin: "100% 50%",
          scaleX: 1,
          zIndex: 1
        },
        get position() {
          return {
            x: 20 * (Math.random() - 0.5),
            y: 20 * (Math.random() - 0.5)
          };
        },
        onCreate(particle) {
          particle.fixedProps.scaleX = MOVING ? 25 : 1;
          particle.speed = MOVING ? 300 : 0;
          const theta = Math.atan2(
            particle.position.y - midpoint.y,
            particle.position.x - midpoint.x
          );
          particle.state = MOVING;
          particle.velocity = {
            x: particle.speed * Math.cos(theta),
            y: particle.speed * Math.sin(theta)
          };
          particle.heading = theta;
        },
        onUpdate(particle) {
          if (MOVING) {
            particle.updateStyle({
              backgroundColor: "#aaf",
              scaleX: lerp(particle.style.scaleX, 50, 0.1)
            });
            particle.speed = lerp(particle.speed, 300, 0.1);
          } else {
            particle.updateStyle({
              backgroundColor: "#fff",
              scaleX: lerp(particle.style.scaleX, 1, 0.1)
            });
            particle.speed = lerp(particle.speed, 0, 0.1);
          }
          particle.velocity = {
            x: particle.speed * Math.cos(particle.heading),
            y: particle.speed * Math.sin(particle.heading)
          };
          if (particle.state != MOVING) {
            particle.state = MOVING;
            if (particle.state == false) {
              particle.ttl = false;
            } else {
              particle.elapsed = 0;
              particle.ttl = 800;
            }
          }

          const rect = lightspeedContainer.getBoundingClientRect();

          if (
            particle.position.x < rect.x ||
            particle.position.x > rect.x + rect.width ||
            particle.position.y < getScrollTop() + rect.y ||
            particle.position.y > getScrollTop() + rect.y + rect.height
          ) {
            particle.ttl = particle.elapsed;
          }
        }
      }
    });
  };

  const stopLightspeed = () => {
    manager.clearEmitters();
  };

  lightspeedButton.addEventListener("mousedown", event => {
    lightspeedContainer.style.backgroundColor = "#010120";
    lightspeedButton.classList.add("active-lightspeed");
    MOVING = true;
    event.preventDefault();
    showLightspeed();
  });
  lightspeedButton.addEventListener("touchstart", touchEvent => {
    lightspeedContainer.style.backgroundColor = "#010120";
    lightspeedButton.classList.add("active-lightspeed");
    MOVING = true;
    touchEvent.preventDefault();
    showLightspeed();
  });
  lightspeedButton.addEventListener("mouseup", () => {
    lightspeedContainer.style.backgroundColor = "#01010f";
    lightspeedButton.classList.remove("active-lightspeed");
    MOVING = false;
    stopLightspeed();
  });
  lightspeedButton.addEventListener("touchend", () => {
    lightspeedContainer.style.backgroundColor = "#01010f";
    lightspeedButton.classList.remove("active-lightspeed");
    MOVING = false;
    stopLightspeed();
  });
}

/* Fireworks */
{
  const fireworkButton = document.querySelector(".fireworks .example-button");
  const fireworkContainer = document.querySelector(".fireworks");

  const startFireworks = () => {
    fireworkContainer.style.backgroundColor = "#070710";
    const midpoint = getTileMidpoint(fireworkContainer);

    manager.addEmitter({
      position: {
        x: midpoint.x,
        y: midpoint.y + fireworkContainer.getBoundingClientRect().height / 2
      },
      emitEvery: 400,
      particleOptions: {
        contents: "",
        get position() {
          return { x: 0.167 * 320 * (Math.random() - 0.5) };
        },
        get ttl() {
          return 800 + 250 * Math.random();
        },
        get velocity() {
          const theta =
            (3 / 2) * Math.PI + (Math.PI / 8) * (Math.random() - 0.5);
          const magnitude = 600;
          return {
            x: magnitude * Math.cos(theta),
            y: magnitude * Math.sin(theta)
          };
        },
        get acceleration() {
          return { y: 600 };
        },
        style: {
          get backgroundColor() {
            return ["rgb(255, 0, 0)", "rgb(255, 255, 255)", "rgb(0, 0, 255)"][
              Math.floor(3 * Math.random())
            ];
          },
          opacity: [1, 1, 0.5],
          width: "5px",
          height: "5px",
          borderRadius: "5px"
        },
        onDestroy(particle) {
          const magnitude = 100;
          const childCount = 10;
          for (let i = 0; i < childCount; i++) {
            manager.addEmitter({
              emitEvery: 32,
              maxEmissions: 8,
              particleOptions: {
                ttl: 600,
                position: { x: particle.position.x, y: particle.position.y },
                velocity: {
                  x: magnitude * Math.sin((2 * i * Math.PI) / childCount),
                  y: magnitude * Math.cos((2 * i * Math.PI) / childCount)
                },
                get acceleration() {
                  return { x: 0, y: 150 };
                },
                onCreate(particle) {
                  particle.heading = Math.atan2(
                    particle.velocity.y,
                    particle.velocity.x
                  );
                },
                style: { ...particle.style, scale: 0.5, opacity: [1, 0] }
              }
            });
          }
        }
      }
    });
  };

  const stopFireworks = () => {
    manager.clearEmitters();
    fireworkContainer.style.backgroundColor = "rgba(0, 0, 0, 0)";
  };

  fireworkButton.addEventListener("mousedown", event => {
    event.preventDefault();
    startFireworks();
  });
  fireworkButton.addEventListener("touchstart", touchEvent => {
    touchEvent.preventDefault();
    startFireworks();
  });
  fireworkButton.addEventListener("mouseup", stopFireworks);
  fireworkButton.addEventListener("touchend", stopFireworks);
}

/* Snowflakes */
{
  const snowflakeButton = document.querySelector(".snowflakes .example-button");
  const snowflakeContainer = document.querySelector(".snowflakes");

  const showSnowflakes = () => {
    const midpoint = getTileMidpoint(snowflakeContainer);

    manager.addEmitter({
      position: { x: midpoint.x, y: midpoint.y - 160 },
      emitEvery: 100,
      particleOptions: {
        contents: "❄",
        style: {
          color: "#fff",
          get scale() {
            return 0.5 + 2 * Math.random();
          },
          get opacity() {
            const startOpacity = 0.5 + 0.5 * Math.random();
            return [startOpacity, startOpacity, 0];
          }
        },
        get position() {
          return { x: 320 * (Math.random() - 0.5) };
        },
        get velocity() {
          return { x: 60 * (Math.random() - 0.5), y: 15 + 10 * Math.random() };
        },
        ttl: 12000,
        onUpdate(particle) {
          if (Math.random() > 0.99) {
            particle.velocity.x = -particle.velocity.x;
          }
        }
      }
    });
  };

  const stopSnowflakes = () => {
    manager.clearEmitters();
  };

  snowflakeButton.addEventListener("mousedown", event => {
    event.preventDefault();
    showSnowflakes();
  });
  snowflakeButton.addEventListener("touchstart", touchEvent => {
    touchEvent.preventDefault();
    showSnowflakes();
  });
  snowflakeButton.addEventListener("mouseup", stopSnowflakes);
  snowflakeButton.addEventListener("touchend", stopSnowflakes);
}

examples.chess = () => {
  manager.addEmitter({
    position: { x: mainWindow.clientWidth / 2, y: mainWindow.clientHeight / 2 },
    emitEvery: 200,
    particleOptions: {
      ttl: 1000,
      style: {
        color: "#000",
        fontSize: "32px",
        width: "32px",
        height: "32px",
        get scale() {
          return 10 * Math.random();
        }
      },
      get contents() {
        return [
          "⏣",
          "♔",
          "♕",
          "♖",
          "♗",
          "♘",
          "♙",
          "♚",
          "♛",
          "♜",
          "♝",
          "♞",
          "♟"
        ][Math.floor(12 * Math.random())];
      },
      get position() {
        return { x: 128 * (Math.random() - 0.5) };
      },
      get velocity() {
        const theta = 2 * Math.PI * Math.random();
        const magnitude = 100 + 10 * Math.random();
        return {
          x: magnitude * Math.cos(theta),
          y: magnitude * Math.sin(theta)
        };
      },

      onUpdate(particle) {
        particle.heading += 0.01;
      }
    }
  });
};

/* Bees */
{
  const beeButton = document.querySelector(".bees .example-button");
  const beeContainer = document.querySelector(".bees");

  const startBees = () => {
    const midpoint = getTileMidpoint(beeContainer);

    manager.addEmitter({
      position: { x: midpoint.x, y: midpoint.y },
      emitEvery: 32,
      particleOptions: {
        ttl: 1600,
        contents: "🐝",
        style: {
          width: "16px",
          height: "16px",
          get scale() {
            return 1;
          }
        },
        get position() {
          return {
            x: 20 * (Math.random() - 0.5),
            y: 20 * (Math.random() - 0.5)
          };
        },
        get velocity() {
          const theta = 2 * Math.random() * Math.PI;
          const magnitude = 50 + 50 * Math.random();
          return {
            x: magnitude * Math.cos(theta),
            y: magnitude * Math.sin(theta)
          };
        },
        onCreate(particle) {
          particle.heading = Math.atan2(
            particle.velocity.y,
            particle.velocity.x
          );
        },
        onUpdate(particle) {
          if (Math.random() > 0.9) {
            const theta = 2 * Math.random() * Math.PI;
            const magnitude = 50 + 50 * Math.random();

            particle.velocity = {
              x: magnitude * Math.cos(theta),
              y: magnitude * Math.sin(theta)
            };
            particle.heading = Math.atan2(
              particle.velocity.y,
              particle.velocity.x
            );
          }
        }
      }
    });
  };

  const stopBees = () => {
    manager.clearEmitters();
  };

  beeButton.addEventListener("mousedown", event => {
    event.preventDefault();
    startBees();
  });

  beeButton.addEventListener("touchstart", touchEvent => {
    touchEvent.preventDefault();
    startBees();
  });

  beeButton.addEventListener("mouseup", stopBees);
  beeButton.addEventListener("touchend", stopBees);
}

/* Worlds */
{
  const worldButton = document.querySelector(".world .example-button");
  const worldContainer = document.querySelector(".world");

  const showWorld = () => {
    const midpoint = getTileMidpoint(worldContainer);

    manager.addParticle({
      ttl: 8000,
      contents: "🌏",
      style: { fontSize: "48px" },
      get position() {
        return { x: midpoint.x, y: midpoint.y };
      },
      get velocity() {
        const magnitude = 10;
        const theta = 2 * Math.random() * Math.PI;
        return {
          x: magnitude * Math.cos(theta),
          y: magnitude * Math.sin(theta)
        };
      },
      onCreate(particle) {
        particle.idx = 0;
      },
      onUpdate(particle) {
        if (particle.frameNumber % 15 === 0) {
          particle.idx = (particle.idx + 1) % 3;
        }
        particle.setContents(["🌏", "🌎", "🌍"][particle.idx]);
      }
    });
  };

  worldButton.addEventListener("mousedown", event => {
    event.preventDefault();
    showWorld();
  });
  worldButton.addEventListener("touchstart", touchEvent => {
    touchEvent.preventDefault();
    showWorld();
  });
}

/* Moons */
{
  const moonButton = document.querySelector(".moon .example-button");
  const moonContainer = document.querySelector(".moon");

  const showMoon = () => {
    const midpoint = getTileMidpoint(moonContainer);

    const moons = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"].reverse();

    manager.addParticle({
      ttl: 8000,
      contents: "🌑",
      style: { fontSize: "48px" },
      get position() {
        return { x: midpoint.x, y: midpoint.y };
      },
      get velocity() {
        const magnitude = 10;
        const theta = 2 * Math.random() * Math.PI;
        return {
          x: magnitude * Math.cos(theta),
          y: magnitude * Math.sin(theta)
        };
      },
      onCreate(particle) {
        particle.idx = 0;
      },
      onUpdate(particle) {
        if (particle.frameNumber % 15 === 0) {
          particle.idx = (particle.idx + 1) % moons.length;
          particle.setContents(moons[particle.idx]);
        }
      }
    });
  };

  moonButton.addEventListener("mousedown", event => {
    event.preventDefault();
    showMoon();
  });
  moonButton.addEventListener("touchstart", touchEvent => {
    touchEvent.preventDefault();
    showMoon();
  });
}
