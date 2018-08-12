import { Hookable } from './helpers';

export class Bar extends Hookable {
  constructor (options) {
    const { parent, name } = options;

    super ({ 
          parent,
          template: `<div class='bar-outer ${name}' data-hook='container'>
            <div class='progress-shadow' data-hook='shadow'></div>
            <div class='progress' data-hook='progress'></div>
            <div class='readout' data-hook='readout'></div>
           </div>`
    });
  }

  setText (text) {
      this.readout.innerText = text;
  }

  setPercentage (percentage) {
    this.progress.style.width = percentage + "%";
    setTimeout(() => this.shadow.style.width = percentage + "%", 1500);
  }
}