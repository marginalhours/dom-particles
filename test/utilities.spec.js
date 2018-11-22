var assert = require('assert');
let utilities = require('../src/js/utilities');

describe('utilities', function() {
  describe('#rgbToNumbers()', function() {
    it('should parse an RGB string to an array', function() {
      let r = Math.floor(255 * Math.random());
      let g = Math.floor(255 * Math.random());
      let b = Math.floor(255 * Math.random());
      let k = `rgb(${r}, ${g}, ${b})`;
      
      let s = utilities.rgbToNumbers(k);
      assert.deepEqual(s, [r, g, b, 1]);
    });
  });
  
  describe('#rgbaToNumbers()', function() {
    it('should parse an RGBA string to an array', function() {
      let r = Math.floor(255 * Math.random());
      let g = Math.floor(255 * Math.random());
      let b = Math.floor(255 * Math.random());
      let a = Math.random();
      let k = `rgba(${r}, ${g}, ${b}, ${a})`;
      console.log(k);
      
      let s = utilities.rgbaToNumbers(k);  
      assert.equal(s, [r, g, b, a]);
    });
  });
});