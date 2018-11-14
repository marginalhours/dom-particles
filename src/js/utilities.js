const RGBA_PATTERN = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)|rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([01](?:\.\d+)*)\s*\)/;
const NUMBER_AND_UNIT_PATTERN = /(\d+|\d+\.\d+)([a-z]+)/;

export const colourFromRGBA = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a || 1.0}`;

export const lerp = (a, b, frac) => a + ((b - a) * frac);

export const rgbaToNumbers = (string) => {
  let [_, r, g, b, a] = RGBA_PATTERN.exec(string);
  return [r, g, b, a].filter(v => v).map(v => parseInt(v)) 
}

export const hexToNumbers = (hex) => {
  let h = [...hex.substring(1)];
  if (h.length === 3) {
    return h.map(d => parseInt(d, 16))  
  } else {
    return [0, 2, 4].map(ix => parseInt(`${h[ix]}${h[ix + 1]}`, 16));  
  }
}

export const extractNumberAndUnit = (string) => {
  let [_, num, unit] = NUMBER_AND_UNIT_PATTERN.exec(string);
  return { value: parseInt(num), unit }
}

export const easeArray = (array, easeFn, frac) => {
    let idxFrac = 1 / array.length;
    let idx = Math.round(frac / idxFrac);
    let nextIdx = idx === array.length - 1 ? idx : idx + 1;
    return easeFn(array[idx], array[nextIdx], frac);
}
  