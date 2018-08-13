import { Hookable } from './helpers';

export default class Choice extends Hookable {
  constructor (options) { 
    const { parent, handleClick, label, effect } = options;
    super({
      parent,
      template: `<button class='choice-button' data-hook='container'>
                   <div class='label'>${label}</div>
                   <div class='effect'>${effect}</div>
                 </button>`
    });
    
    this.container.addEventListener('click', () => handleClick());
  }
}