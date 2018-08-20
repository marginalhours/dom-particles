import ItemSelectCard from './item-select';

export const backpackOption = (loop) => {
   return {
      label: "Item",
      effect: "Open backpack",
      callback: () => {
        loop.unshift(new ItemSelectCard());
      }
    } 
}

export const forwardOption = (loop) => {
  return {
    label: "Forward!",
    effect: "",
    callback: () => {
      loop.next();
    }  
  }
}

export const cancelOption = (loop) => {
  return {
    label: "Cancel",
    effect: "",
    callback: () => {
      loop.pop();
    }
  }
}