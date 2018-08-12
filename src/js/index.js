import '../scss/style.scss';
import {printMe} from './print';
import qs from './helpers';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button'); 
  element.innerHTML = 'aloha';
  element.classList.add('hello');
  btn.innerHTML = 'Click me and check the Console!';
  btn.onclick = printMe;
  element.appendChild(btn);
  return element;
}

document.body.appendChild(component());