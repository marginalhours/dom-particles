import join from 'lodash/join';
import './style.css';
import {printMe} from './print.js';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button'); 
  element.innerHTML = join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  btn.innerHTML = 'Click me and check the Console!';
  btn.onclick = printMe;
  element.appendChild(btn);
  return element;
}

document.body.appendChild(component());