import join from 'lodash/join';

export function printMe() {
  console.log(join(['hello', 'from', 'print.js'], ' '));
}

export function unused() {
  console.log("This shouldn't get imported");
}