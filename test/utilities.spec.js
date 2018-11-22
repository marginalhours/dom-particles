var assert = require('assert');
let utilities = require('../src/js/utilities');

describe('utilities', () => {
  describe('#rgbToNumbers()', () => {
    it('should parse an RGB string to an array', () => {
      let r = Math.floor(256 * Math.random());
      let g = Math.floor(256 * Math.random());
      let b = Math.floor(256 * Math.random());
      let k = `rgb(${r}, ${g}, ${b})`;
      
      let s = utilities.rgbToNumbers(k);
      assert.deepEqual(s, [r, g, b, 1]);
    });
    
    it('should return false for unparseable strings', () => {
      let s = utilities.rgbToNumbers('non-rgb string');
      assert.equal(s, false);
    });
  });
  
  describe('#rgbaToNumbers()', () => {
    it('should parse an RGBA string to an array', () => {
      let r = Math.floor(256 * Math.random());
      let g = Math.floor(256 * Math.random());
      let b = Math.floor(256 * Math.random());
      let a = Math.random();
      let k = `rgba(${r}, ${g}, ${b}, ${a})`;
      
      let s = utilities.rgbaToNumbers(k);  
      assert.deepEqual(s, [r, g, b, a]);
    });
    
    it('should return false for unparseable strings', () => {
      let s = utilities.rgbaToNumbers('non-rgba string');
      assert.equal(s, false);
    });
  });
  
  describe('#hexToNubmers()', () => {
    it('should parse a 3-digit hex string to an array', () => {
      let r = Math.floor(17 * Math.random());
      let g = Math.floor(17 * Math.random());
      let b = Math.floor(17 * Math.random());
                         
      let k = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
      
      let s = utilities.hexToNumbers(k);
      assert.deepEqual(s, [r * 0x11, g * 0x11, b * 0x11, 1]);
    });
    
    it('should parse a 6-digit hex string to an array', () => {
      let r = Math.floor(256 * Math.random());
      let g = Math.floor(256 * Math.random());
      let b = Math.floor(256 * Math.random());
      
      let rString = ('00' + r.toString(16)).substr(-2); 
      let gString = ('00' + g.toString(16)).substr(-2); 
      let bString = ('00' + b.toString(16)).substr(-2); 
                         
      let k = `#${rString}${gString}${bString}`;
      
      let s = utilities.hexToNumbers(k);
      assert.deepEqual(s, [r, g, b, 1]);
    });
    
    it('should return false for unparseable strings', () => {
      let s = utilities.hexToNumbers('non-hex-string');
      assert.equal(s, false);
    });
  });
  
  describe('#valueToNumberAndUnit', () => {
    it('should convert a decimal value with unit', () => {
      let r = 10 * Math.random();
      
      let s = utilities.valueToNumberAndUnit(`${r}px`);
      
      assert.deepEqual(s, [r, 'px']);
    });
    
    it('should convert an integer value with unit', () => {
      let r = Math.floor(1000 * Math.random());
      
      let s = utilities.valueToNumberAndUnit(`${r}em`);
      
      assert.deepEqual(s, [r, 'em']);
    });
    
    it('should handle bare integers', () => {
      let r = Math.floor(1000 * Math.random());
      
      let s = utilities.valueToNumberAndUnit(`${r}`);
      
      assert.deepEqual(s, [r, '']);
    });
    
    it('should handle bare floats', () => {
      let r = 1000 * Math.random();
      
      let s = utilities.valueToNumberAndUnit(`${r}`);
      
      assert.deepEqual(s, [r, '']);
    });
    
    it('should return false for unparseable strings', () => {
      let s = utilities.valueToNumberAndUnit('invalid-unit-string');
      
      assert.equal(s, false);
    });
  });
  
});