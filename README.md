Unicode particle effects for the DOM

API
---

`.createEmitter(options)`
`.create(options)`

Manager Options
---------------

| Name      | Default                   | Remarks                            |
| ----      | -------                   | ---------------------------------- | 

Emitter Options
---------------

| Name        | Default                   | Remarks                            |
| ----        | -------                   | ---------------------------------- | 
| `emitEvery` | `500ms`                 | Number of milliseconds delay in between particle emissions                                   |
| `ttl`       | `false`                 | If set to a number, emitter will be destroyed after that number of milliseconds |
| `maxEmissions` | `false`              | If set to a number, emitter will be destroyed after that number of particles have been emitted |
| `particleOptions` | default particle options | A `particleOptions` object (see below). **NB: The position option of an emitter-created particle is specified relative to the emitter's position, not to the window origin.** |
| `onCreate`  | N/A                       | Callback function on particle creation - called with the particle object as its first argument | 
| `onUpdate`  | N/A                       | Callback function on particle update - called with the particle object as its first argument |
| `onDestroy` | N/A                       | Callback function on particle destruction - called with the particle object as its first argument |

Particle Options
----------------

| Name      | Default                   | Remarks                             |
| ----      | -------                   | ----------------------------------- |
| `contents`      | `'.'`                     | innerHTML of the particle element |
| `ttl`       | `1000`                    | Lifespan of particle in milliseconds |
| `onCreate`  | N/A                       | Callback function on particle creation - called with the particle object as its first argument | 
| `onUpdate`  | N/A                       | Callback function on particle update - called with the particle object as its first argument |
| `onDestroy` | N/A                       | Callback function on particle destruction - called with the particle object as its first argument |
| `style` | `{ display: 'inline-block' }` | object of styles to be applied to the particle. Style values can be arrays, for animation purposes - see section **Styling Particles** below.
| `heading` | `false` | Set to a number in range `0`...`2 * Math.PI` to manually control the particle heading
| `grid` | `false` | Set to a number to snap the particle's position to a grid of that size 
| `position` | `{x : 0, y: 0}` | Particle position. If particle is created by an emitter, this is taken to be relative to the emitter's position; if not, it's taken to be relative to the anchor element of the parent `manager` object |
| `velocity` | `{x : 0, y: 0}` | Particle velocity |
| `acceleration` | `{x : 0, y: 0}` | Particle acceleration |

At each frame, the following default update is applied to a particle: 

```
velocity += acceleration;
position += velocity;
```


Styling Particles
-----------------





Helper functions
----------------

`.positionFromDOMNode(node, xofs, yofs)` -- returns a position relative to the given DOM node