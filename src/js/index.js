import '../scss/style.scss';
import { qs } from './helpers';
import Bus from './bus';
import Player from './player';
import { Bar } from './bar';
import { EventList } from './event-list';
import { Dialogue } from './dialogue'; 

let h = new Bar({ parent: qs('.status-wrappers'), name: "health" });
let k = new Bar({ parent: qs('.status-wrappers'), name: "mana" });
let e = new Bar({ parent: qs('.status-wrappers'), name: "experience" });

let s = new EventList({ parent: qs('.game') });
let d = new Dialogue({ parent: qs('.game') });

s.add();

d.setStack(s);
d.hydrate(s.peek());

Bus.sub('exp-amount', (amount) => {
  e.setText(`${amount} EXP`);
  e.setPercentage(100 * Player.exp/Player.next_level);
});

Bus.sub('health-amount', (amount) => {
  h.setText(`${Player.health}/${Player.max_health} HP`);
  h.setPercentage(100 * Player.health / Player.max_health);
});

Bus.sub('mana-amount', (amount) => {
  k.setText(`${Player.mana}/${Player.max_mana} MP`);
  k.setPercentage(100 * Player.mana / Player.max_mana);
});

Bus.pub('exp-amount', 0);
Bus.pub('health-amount', 0);
Bus.pub('mana-amount', 0);