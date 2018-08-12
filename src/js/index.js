import '../scss/style.scss';
import { qs } from './helpers';
import { Bar } from './bar';

let h = new Bar({parent: qs('body'), name: "health"});
let k = new Bar({parent: qs('body'), name: "mana"});
let e = new Bar({parent: qs('body'), name: "experience"});

h.setText("15/30 HP");
k.setText("10/30 MP");
e.setText("100 EXP"); 

h.setPercentage(80);
k.setPercentage(90);
e.setPercentage(50);

setInterval(() => {
  h.setPercentage(100 * Math.random());
  k.setPercentage(100 * Math.random());
  e.setPercentage(100 * Math.random());
}, 5000);