import { propValueToFunction } from './utilities';

export const DEFAULT_PARTICLE_OPTIONS = {
  ttl: 1000,
  contents: '.',
  style: { display: 'inline-block', zIndex: 1 },
  onCreate: () => { },
  onUpdate: () => { },
  onDestroy: () => { },
  heading: false,
  grid: false,
}

export default class TextParticle {
  constructor(options) {
    Object.assign(this, {
      ...DEFAULT_PARTICLE_OPTIONS,
      ...options,
      velocity: { ...{ x: 0, y: 0 }, ...options.velocity },
      position: { ...{ x: 0, y: 0 }, ...options.position },
      acceleration: { ...{ x: 0, y: 0 }, ...options.acceleration },
      style: { ...DEFAULT_PARTICLE_OPTIONS.style, ...options.style }
    });

    this.elapsed = 0;
    this.frameNumber = 0;
    this.getTransform = this.grid ? this.getGridTransform : this.getTransform;

    this.setContents(this.contents);

    this.updateStyle(this.style);
    this.nextProps = this.getSnapshot();
    this.onCreate(this);

    // scale is a valid property, but only in Firefox 😬
    // https://developer.mozilla.org/en-US/docs/Web/CSS/scale CSS2!
    // we don't want to assign it directly (it's used as part of transform),
    // so we delete it from nextProps
    delete this.nextProps.scale;

    Object.assign(this.element.style, this.nextProps);
  }

  get alive() {
    return !this.ttl || this.elapsed < this.ttl;
  }

  get lifeFrac() {
    return this.elapsed / this.ttl;
  }

  buildProps(propObject) {
    let fixedProps = {};
    let dynamicProps = {};
    Object.keys(propObject).map(propKey => {
      let propValue = propObject[propKey];
      if (Array.isArray(propValue)) {
        if (propValue.length === 1) {
          // It's a one-element array, so it's still fixed
          fixedProps[propKey] = propValue;
        } else {
          // dynamic property; calculate function for it
          dynamicProps[propKey] = propValueToFunction(propValue);
        }
      } else if (typeof styleValue === 'object') {
        // Not implemented yet, but I guess per-property easing one day (>.<)
      } else {
        // Either a fixed value or a getter, either way, just assign it
        fixedProps[propKey] = propValue;
      }
    });

    this.dynamicProps = { ...this.dynamicProps, ...dynamicProps };
    this.fixedProps = { ...this.fixedProps, ...fixedProps };
  }

  setContents(html) {
    this.element.innerHTML = html;
  }

  setText(text) {
    this.element.innerText = text;
  }

  setStyleText(text) {
    this.element.style.cssText = text;
  }

  updateStyle(obj) {
    this.style = { ...this.style, ...obj };
    this.buildProps(obj);
  }

  getSnapshot() {
    let snapshot = Object.keys(this.dynamicProps)
      .reduce((a, b) => ({
        ...a,
        [b]: this.dynamicProps[b](this.lifeFrac)
      }), { ...this.fixedProps });

    return { ...snapshot, transform: this.getScaledTransform(snapshot) }
  }

  getScaledTransform(snapshot) {
    let { rotation, scale, scaleX, scaleY, skew, skewX, skewY } = snapshot;
    rotation = (this.heading && `${this.heading}rad`) || rotation || 0;
    scale = scale || 1.0;
    scaleX = scaleX || scale;
    scaleY = scaleY || scale;
    skew = skew || 0;
    skewX = skewX || skew;
    skewY = skewY || skew;

    return this.getTransform(scaleX, scaleY, rotation, skewX, skewY);
  }

  getTransform(scaleX, scaleY, rotation, skewX, skewY) {
    return `translate3d(${this.position.x}px, ${this.position.y}px, 0px) rotateZ(${rotation}) scale(${scaleX}, ${scaleY}) skew(${skewX}, ${skewY})`;
  }

  getGridTransform(scaleX, scaleY, rotation, skewX, skewY) {
    let x = this.position.x - (this.position.x % this.grid);
    let y = this.position.y - (this.position.y % this.grid);
    return `translate3d(${x}px, ${y}px, 0px) rotateZ(${rotation}) scale(${scaleX}, ${scaleY}) skew(${skewX}, ${skewY})`;
  }

  update(f) {
    // Housekeeping
    this.elapsed += f * 1000;
    // Standard motion update
    this.velocity.x += this.acceleration.x * f;
    this.velocity.y += this.acceleration.y * f;
    this.position.x += this.velocity.x * f;
    this.position.y += this.velocity.y * f;

    // Get current props, call user onUpdate(), assign them
    this.nextProps = this.getSnapshot();
    this.onUpdate(this, f);
    delete this.nextProps.scale;
    Object.assign(this.element.style, this.nextProps);

    // Next frame
    this.frameNumber++;
  }
}