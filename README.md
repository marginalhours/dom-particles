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
| `particleOptions` | 
| `onCreate`  | N/A                       | Callback function on particle creation - called with the particle object as its first argument | 
| `onUpdate`  | N/A                       | Callback function on particle update - called with the particle object as its first argument |
| `onDestroy` | N/A                       | Callback function on particle destruction - called with the particle object as its first argument |

Particle Options
----------------

| Name      | Default                   | Remarks                             |
| ----      | -------                   | ----------------------------------- |
| `text`      | `'.'`                     | Text content of the particle element |
| `ttl`       | `1000`                    | Lifespan of particle in milliseconds |
| `onCreate`  | N/A                       | Callback function on particle creation - called with the particle object as its first argument | 
| `onUpdate`  | N/A                       | Callback function on particle update - called with the particle object as its first argument |
| `onDestroy` | N/A                       | Callback function on particle destruction - called with the particle object as its first argument |
| `style` | `{ display: 'inline-block' }` | object of styles to be applied to the particle. Style values can be arrays, for animation purposes - see section **Styling Particles** below.
| `heading` | `false` | Set to a number in range `0`...`2 * Math.PI` to manually control the particle heading
| `grid` | `false` | Set to a number to snap the particle's position to a grid of that size 



Styling Particles
-----------------





Helper functions
----------------

`.positionFromDOMNode(node, xofs, yofs)` -- returns a position relative to the given DOM node