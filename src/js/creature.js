class Creature {
  constructor () {
    this.health = 20;
    this.maxhealth = 20;
    this.name = 'Goblin';
  }
  
  get description () {
    return (this.health < this.maxhealth) ? `A Wounded ${this.name} (${this.health}/${this.maxhealth} HP)` : `A ${this.name}`;
  }
  
  get dead () {
   return this.health <= 0; 
  }
  
  changeResource(res, val){
    this[res] += val;
  }
  
  attack (player) {
    player.changeResource("health", -1 - Math.floor(3 * Math.random()));  
  }
}


export const getCreature = () => new Creature();