Unicode particle effects for the DOM

Manager Options
---------------

| Name      | Default                   | Remarks                            |
| ----      | -------                   | ---------------------------------- |
| `max`     | `100`                     | Maximum number of particles on screen at any one time. Global across all emitters |
| `preallocate` | `10`                  | How many particle elements to create by default and add to the DOM. More will be created on-demand, up to the `max` amount.
| `tagName` | `span`                    | Tag to use for particle elements
| `container` | document `body` tag     | Parent container for all particles. Will have `position:relative` applied to the styles.
| `autostart` | `true`                  | If `false`, particles will not be animated until `.start()` is called on the manager instance

Manager Methods
---------------

- `.createEmitter(options)` - Create a particle emitter from the provided `options` object (see below for emitter options)
- `.create(options)` - Create a particle from the provided `options` object (see below for particle options)
- `.start()` - If `autostart: false` was passed to this instance, call this function manually to begin animation of a particle.
- `.reset()` - Removes all particles and emitters.
- `.clearEmitters()` - Removes all emitters. Existing particles will remain until the end of their lifespan.


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
| `position` | `{x : 0, y: 0}` | Particle position. If particle is created by an emitter, this is taken to be relative to the emitter's position; if not, it's taken to be relative to the anchor element of the parent `manager` object. For convenience, components which are zero need not be specified: `{x: 1}` and `{y: 1}` are both valid vectors. |
| `velocity` | `{x : 0, y: 0}` | Particle velocity |
| `acceleration` | `{x : 0, y: 0}` | Particle acceleration |

At each frame, the following default update is applied to a particle:

```
velocity += acceleration;
position += velocity;
```

Particle methods:

- `setText(text)`: Sets the `innerText` of the particle element to `text`
- `setContents(html)`: Sets the `innerHTML` of the particle element to `html`
- `updateStyle(styleObject)`: Update particle element styles


Styling Particles
-----------------




Emitter Options
---------------


Helper functions
----------------

`.positionFromDOMNode(node, xofs, yofs)` -- returns a position relative to the given DOM node