# Library Name

Particle-style animation for the DOM. [Demo Page]()

## Installation

`npm install --save <library_name>`

or

`<script type='text/javascript' src='//unpkg'>`


## Quickstart example

`git clone` this repository and have a look at the examples folder

```
let t = new LibraryName();
let c = { x: document.body.clientWidth / 2 , y: document.body.clientHeight / 2 };

t.addEmitter({
  position: { x: c.x, y: c.y },
  particleOptions: {
    velocity: { y: -50 },
    contents: 'Hello world'
  }
})
```


## Manager object

The Manager object is the chief way of creating particles and emitters.

By default, a Manager only uses the `requestAnimationFrame` API to update itself
while a particle or emitter is extant. After the last particle or emitter reaches the end of its
lifespan, the Manager will unregister itself and stop updating until the next `add` or `addEmitter` call.


### Options

| Name      | Default                   | Remarks                            |
| ----      | -------                   | ---------------------------------- |
| `max`     | `100`                     | Maximum number of particles on screen at any one time. Global across all emitters |
| `preallocate` | `10`                  | How many particle elements to create by default and add to the DOM. More will be created on-demand, up to the `max` amount.
| `tagName` | `span`                    | Tag to use for particle elements
| `container` | document `body` tag     | Parent container for all particles. Will have `position:relative` applied to the styles.
| `autostart` | `true`                  | If `false`, particles will not be animated until `.start()` is called on the manager instance

### Methods
- `.add(options)` - Create a particle from the provided `options` object (see below for particle options)
- `.addEmitter(options)` - Create a particle emitter from the provided `options` object (see below for emitter options)
- `.start()` - If `autostart: false` was passed to this instance, call this function manually to begin animation of a particle.
- `.reset()` - Removes all particles and emitters.
- `.clearEmitters()` - Removes all emitters. Existing particles will remain until the end of their lifespan.


## Particles

Particles are created (and returned) by the `add` function on a `Manager` object.
By default they have a finite lifespan, after which they disappear from the DOM.

At each frame, the following default update is applied to a particle:

```
velocity += acceleration;
position += velocity;
```

There are also three update hooks which can be provided in the particle options: `onCreate`, `onUpdate`, and `onDestroy`. All of these are called with the particle object as the first argument. For `onUpdate`, the second argument is the elapsed time (in fractions of a second, so `1.0` is one second) since the last `onUpdate` call.


### Options

| Name      | Default                   | Remarks                             |
| ----      | -------                   | ----------------------------------- |
| `contents`  | `'.'`                     | innerHTML of the particle element |
| `ttl`       | `1000`                    |  Set to an integer to destroy this emitter after that many milliseconds have elapsed. |
| `onCreate`  | N/A                       | Callback function on particle creation - called with the particle object as its first argument |
| `onUpdate`  | N/A                       | Callback function on particle update - called with the particle object as its first argument, and elapsed time since last `onUpdate` call as the second argument |
| `onDestroy` | N/A                       | Callback function on particle destruction - called with the particle object as its first argument |
| `style` | `{ display: 'inline-block' }` | object of styles to be applied to the particle. Style values can be arrays, for animation purposes - see section **Styling Particles** below.
| `heading` | `false` | Set to a number in range `0`...`2 * Math.PI` to manually control the particle heading in an `onUpdate` handler, otherwise animate using the `rotation` style.
| `grid` | `false` | Set to a number to snap the particle's position to a grid of that size
| `position` | `{x : 0, y: 0}` | Particle position. If particle is created by an emitter, this is taken to be relative to the emitter's position; if not, it's taken to be relative to the anchor element of the parent `manager` object. For convenience, components which are zero need not be specified: `{x: 1}` and `{y: 1}` are both valid vectors. |
| `velocity` | `{x : 0, y: 0}` | Particle velocity |
| `acceleration` | `{x : 0, y: 0}` | Particle acceleration |

### Methods

- `setText(text)`: Sets the `innerText` of the particle element to `text`
- `setContents(html)`: Sets the `innerHTML` of the particle element to `html`
- `updateStyle(styleObject)`: Update particle element styles


### Styling particles

The `style` property of a particle options object, or a `particleOptions` object passed to an `Emitter`, is not limited to static properties or getters. You can pass an array of values for a specific property, like so:

```
t.add({
  style: {
    'backgroundColor': ['#fff', '#000']
  }
});
```

Over the lifetime (`ttl` property) of the particle, the values in this array will be linearly interpolated between
for the purpose of the particle's actual style at a particular moment in time. In the above example, a particle with a `ttl` of `500` milliseconds will begin life at `t = 0` with a white background but end it at `t = 500` with a black one.

The array of values can be any length. Most simple CSS properties (colours; unit + value eg `1px`, `2em` etc) are supported. Compound properties have to be manipulated component-by-component.

There are also some transform properties which are included as separate arguments for ease-of-use. These are as follows:

- `scale` (or just `scaleX` or `scaleY`) - scale the element
- `rotation` - rotate the element
- `skew` (or just `skewX` or `skewY`) - skew the element

## Emitters

Emitters are created (and returned) by the `addEmitter` function on a `Manager` object. They provide a convenient way to create multiple particles with similar properties.


### Options

| Name      | Default                   | Remarks                             |
| ----      | -------                   | ----------------------------------- |
| `maxEmissions` | `false`              | Maximum particles to emit. Set to a integer to destroy this emitter after that many have been created. |
| `ttl`       | `false`                 | Set to an integer to destroy this emitter after that many milliseconds have elapsed. |
| `onCreate`  | N/A                     | Callback function on emitter creation - called with the particle object as its first argument |
| `onUpdate`  | N/A                     | Callback function on emitter update - called with the emitter object as its first argument, and elapsed time since last `onUpdate` call as the second argument |
| `onDestroy` | N/A                     | Callback function on emitter destruction - called with the emitter object as its first argument |
| `heading` | `0` | Set to a number in range `0`...`2 * Math.PI` to rotate the direction from which particles are emitted.
| `position` | `{x : 0, y: 0}` | Emitter position. Particles emitted from this emitter will have a position relative to the emitter's position, not the origin. |
| `velocity` | `{x : 0, y: 0}` | Emitter velocity |
| `acceleration` | `{x : 0, y: 0}` | Emitter acceleration |
| `particleOptions` | default particle options | See subsection "Options" of the "Particle" section. |