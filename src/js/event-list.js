import { Hookable } from './helpers';

export class EventList extends Hookable {
  constructor (options) {
    this._events = [];
    
    const { parent } = options;

    super ({ 
          parent,
          template: `<ul data-hook='container' class='event-list'>
                      <li><div></div></li>
                    </ul>`
    });
  }
  
  add () {
     new Event({ parent: this.container }); 
  }
  
  reposition () {
    this._events.ma
  }
}

export class Event extends Hookable {
  constructor (options) {
    const { parent } = options;
    
    super ({
          parent, 
          template: `<li data-hook='outer'>
                      <div data-hook='inner'> 
                        <div data-hook='contents'>
                        </div>
                      </div>
                     </li>`
    });
  }
}