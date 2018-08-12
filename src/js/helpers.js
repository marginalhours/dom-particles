export const qs = selector => document.querySelector(selector);

/*
* HTML templating without tears (TM). Takes a template string with data-hook attributes on everything you want available on the object,
* and rehydrates it. After you call super() anything with a data-hook is available for function calls, etc.
*/
export class Hookable {
    constructor (options){
        
        this.parent = options.parent;
        let container = document.createElement('div');
        this.parent.appendChild(container);
        
        container.innerHTML = options.template;
        let oldContainer = container;
        container = container.children[0];
        
        this.parent.replaceChild(container, oldContainer);
        
        [container, ...Array.prototype.slice.call(container.querySelectorAll('*[data-hook]'), 0)].map((el) => {
            let hook = el.getAttribute('data-hook');
            this[hook] = el;
        });
        
    }
}