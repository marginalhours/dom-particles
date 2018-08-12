import { Hookable } from './helpers';

export class Dialogue extends Hookable {
  constructor (options) {
    const { parent } = options;
    
    super ({
      parent,
      template: `<div class='big-card' data-hook='container'>
                  <div class='card-image'>
                    <div class='card-image-inner'></div>
                  </div>
                  <div class='choices'>
                    <div class='flavour'></div>
                  </div>
                 </div>
                `
    });
  }
}