import Card from '.';
import { forwardOption, backpackOption, retreatOption } from './options-helper';

export default class CorridorCard extends Card {
  
  constructor () {
    super();
    this.type = "corridor";
  }
  
  enter (loop){
    return {
      flavour: "An empty corridor.",
      options: [forwardOption(loop), backpackOption(loop), retreatOption(loop)]
    }
  }
}