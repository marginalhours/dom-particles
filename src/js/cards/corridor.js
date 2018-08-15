import Card from '.';

export class CorridorCard extends Card {
  enter (stack){
    let options = [];
    
    options.push({
      label: "OK",
      effect: "",
      callback: () => {
        stack.pop();
      }
    });
    
    return {
      flavour: "An empty corridor.",
      options
    }
  }
}