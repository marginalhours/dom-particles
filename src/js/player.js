import Bus from './bus';

// Big dumb player object
const Player = {
  name: "",
  health: 15,
  max_health: 15,
  mana: 15,
  max_mana: 15,
  exp: 0,
  next_level: 1000,
  gold: 0,
  
  items: {
    "Potion of Healing": { "count": 1, "effect": "Heal", "callback": () => {}, "target": 1 }
  },
  
  changeResource: function(name, amount) {
    this[name] += amount;
    Bus.pub(`${name}-amount`, this[name]);
  }
};

export default Player;