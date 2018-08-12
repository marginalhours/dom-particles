import { Hookable } from './helpers';

export class EventList extends Hookable {
  constructor (options) {
    const { parent } = options;

    super ({ 
          parent,
          template: `<ul data-hook='container' class='event-list'>
                      <li><div></div></li>
                    </ul>`
    });
  }
}