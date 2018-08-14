class Creature {
  constructor () {
    this.health = 20;
    this.maxhealth = 20;
    this.name = 'Goblin';
  }
  
  get description () {
    return (this.health < this.maxhealth) ? `A Wounded ${this.name}` : `A ${this.name}`;
  }
}


export const getCreature = () => new Creature();