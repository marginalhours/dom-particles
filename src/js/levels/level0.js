import { shuffle } from '../helpers';
import CreatureCard from '../cards/creature';
import CorridorCard from '../cards/corridor';
import { getCreature } from '../creature';


export const makeLevel0 = () => {
  let cards = [];
  for(let i = 0; i < 7; i++){
    cards.push(new CreatureCard({ creature: getCreature() })); 
  }
  
  for(let i = 0; i < 24; i++){
    cards.push(new CorridorCard());  
  }
  
  cards = shuffle(cards);
               
  return cards;
}