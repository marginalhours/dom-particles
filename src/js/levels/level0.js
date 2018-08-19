import { shuffle} 
import CreatureCard from '../cards/creature';
import CorridorCard from '../cards/corridor';
import { getCreature } from '../creature';


export const makeLevel0 = () => {
  let cards = [];
  for(let i = 0; i < 5; i++){
    cards.push(new CreatureCard({ creature: getCreature() })); 
  }
               
  return cards;
}