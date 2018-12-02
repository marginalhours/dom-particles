Unicode particle effects for the DOM

API
---

`.createEmitter(options)`
`.create(options)`

Particle Options
----------------

| Name      | Default                   |                                     |
| ----      | -------                   | ------------------------------------ |
| text      | `'.'`                     | Text content of the particle element |
| ttl       | `1000`                    | Lifespan of particle in milliseconds |
| onCreate  | N/A                       | Callback function on particle creation - called with the particle object as its first argument | 
| onUpdate  | N/A                       | Callback function on particle update - called with the particle object as its first argument |
| onDestroy | N/A                       | Callback function on particle destruction - called with the particle object as its first argument |
| style | `{ display: 'inline-block' }` | object of styles to be applied to the particle. Style values can be arrays, for animation purposes - see section **Styling Particles** below.



Styling Particles
-----------------



Helper functions
----------------

`.positionFromDOMNode(node, xofs, yofs)` -- returns a position relative to the given DOM node