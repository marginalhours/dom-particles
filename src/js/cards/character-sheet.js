import Card from '.';

export class CharacterSheet extends Card {
  constructor (options) {
    super(options);
  }
  enter (stack) {
    let options = [];
    
    options.push({
      label: "OK",
      effect: "",
      callback: () => {
        stack.pop();
      }
    });
    
    return {
      flavour: "Yourself",
      options
    }
  }
}