const assert = require('assert');
const utilities = require('../src/js/utilities');

describe('utilities', () => {
  describe('#rgbToNumbers()', () => {
    it('should parse an RGB string to an array', () => {
      const r = Math.floor(256 * Math.random());
      const g = Math.floor(256 * Math.random());
      const b = Math.floor(256 * Math.random());
      const k = `rgb(${r}, ${g}, ${b})`;

      const s = utilities.rgbToNumbers(k);
      assert.deepEqual(s, [r, g, b, 1]);
    });

    it('should return false for unparseable strings', () => {
      const s = utilities.rgbToNumbers('non-rgb string');
      assert.equal(s, false);
    });
  });

  describe('#rgbaToNumbers()', () => {
    it('should parse an RGBA string to an array', () => {
      const r = Math.floor(256 * Math.random());
      const g = Math.floor(256 * Math.random());
      const b = Math.floor(256 * Math.random());
      const a = Math.random();
      const k = `rgba(${r}, ${g}, ${b}, ${a})`;

      const s = utilities.rgbaToNumbers(k);
      assert.deepEqual(s, [r, g, b, a]);
    });

    it('should return false for unparseable strings', () => {
      const s = utilities.rgbaToNumbers('non-rgba string');
      assert.equal(s, false);
    });
  });

  describe('#hexToNumbers()', () => {
    it('should parse a 3-digit hex string to an array', () => {
      const r = Math.floor(16 * Math.random());
      const g = Math.floor(16 * Math.random());
      const b = Math.floor(16 * Math.random());

      const k = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

      const s = utilities.hexToNumbers(k);
      assert.deepEqual(s, [r * 0x11, g * 0x11, b * 0x11, 1]);
    });

    it('should parse a 6-digit hex string to an array', () => {
      const r = Math.floor(256 * Math.random());
      const g = Math.floor(256 * Math.random());
      const b = Math.floor(256 * Math.random());

      const rString = ('00' + r.toString(16)).substr(-2);
      const gString = ('00' + g.toString(16)).substr(-2);
      const bString = ('00' + b.toString(16)).substr(-2);

      const k = `#${rString}${gString}${bString}`;

      const s = utilities.hexToNumbers(k);
      assert.deepEqual(s, [r, g, b, 1]);
    });

    it('should return false for unparseable strings', () => {
      const s = utilities.hexToNumbers('non-hex-string');
      assert.equal(s, false);
    });
  });

  describe('#valueToNumberAndUnit', () => {
    it('should convert a decimal value with unit', () => {
      const r = 10 * Math.random();

      const s = utilities.valueToNumberAndUnit(`${r}px`);

      assert.deepEqual(s, [r, 'px']);
    });

    it('should convert an integer value with unit', () => {
      const r = Math.floor(1000 * Math.random());

      const s = utilities.valueToNumberAndUnit(`${r}em`);

      assert.deepEqual(s, [r, 'em']);
    });

    it('should handle bare integers', () => {
      const r = Math.floor(1000 * Math.random());

      const s = utilities.valueToNumberAndUnit(`${r}`);

      assert.deepEqual(s, [r, '']);
    });

    it('should handle bare floats', () => {
      const r = 1000 * Math.random();

      const s = utilities.valueToNumberAndUnit(`${r}`);

      assert.deepEqual(s, [r, '']);
    });

    it('should return false for unparseable strings', () => {
      const s = utilities.valueToNumberAndUnit('invalid-unit-string');

      assert.equal(s, false);
    });
  });

  describe('#easeArray', () => {
    it('should ease an array', () => {
      const vals = [];

      for(let i = 0; i < 5; i++){
          vals.push(Math.floor(1000 * Math.random()));
      }

      let val = utilities.easeArray(vals, utilities.lerp, 0);
      assert.equal(val, vals[0]);

      val = utilities.easeArray(vals, utilities.lerp, 0.25);
      assert.equal(val, vals[1]);

      val = utilities.easeArray(vals, utilities.lerp, 0.5);
      assert.equal(val, vals[2]);

      val = utilities.easeArray(vals, utilities.lerp, 0.75);
      assert.equal(val, vals[3]);

      val = utilities.easeArray(vals, utilities.lerp, 1);
      assert.equal(val, vals[4]);
    });
  });

});