import Card from '.';
import { forwardOption, backpackOption } from './options-helper';

export default class CorridorCard extends Card {
  
  constructor () {
    super();
    this.type = "corridor";
  }
  
  enter (stack){
    return {
      flavour: "An empty corridor.",
      options: [forwardOption(stack), backpackOption(stack)]
    }
  }
}