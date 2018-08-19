import ItemSelectCard from './item-select';

export const backpackOption = (stack) => {
   return {
      label: "Item",
      effect: "Open backpack",
      callback: () => {
        stack.unshift(new ItemSelectCard());
      }
    } 
}

export const forwardOption = (stack) => {
  return {
    label: "Forward!",
    effect: "",
    callback: () => {
      stack.next();
    }  
  }
}