export const colourFromRGBA = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a || 1.0}`;

export const lerp = (a, b, frac) => a + ((b - a) * frac);

export const rgbaToNumbers = (rgba) => {
  if   
}

export const hexToNumbers = (hex) => {
  let h = [...hex.substring(1)];
  if (h.length === 3) {
    return h.map(d => parseInt(d, 16))  
  } else {
    return [0, 2, 4].map(ix => parseInt(`${h[ix]}${h[ix + 1]}`, 16));  
  }
}