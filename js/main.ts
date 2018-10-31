declare var jquery: any;
declare var $: any;

enum ViewType {
  all = '',
  consumer = 'consumer',
  agent = 'agent',
  franchise = 'franchise'
}

class RogHomepage {

  public grid$ = $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows'
  });

  public gridItems = {
    all$: $('.grid-item'),
    consumer$: $('.grid-item.consumer'),
    agent$: $('.grid-item.agent'),
    franchise$: $('.grid-item.franchise'),
  }

  public gridTriggers = {
    all$: $('.grid-all'),
    consumer$: $('.grid-consumer'),
    agent$: $('.grid-agent'),
    franchise$: $('.grid-franchise'),
  }

  public currentView: ViewType = ViewType.all;

  private delay = 300;

  constructor() {
    this.interactEvents();
  }

  /** Manage click events */
  public interactEvents() {
    
    this.gridTriggers.all$.on('click', (e) => {
      this.toggleState(this.gridItems.all$, ViewType.all, this.gridTriggers.all$, e);
    });

    this.gridTriggers.consumer$.on('click', (e) => {
      this.toggleState(this.gridItems.consumer$, ViewType.consumer, this.gridTriggers.consumer$, e);
    });

    this.gridTriggers.agent$.on('click', (e) => {
      this.toggleState(this.gridItems.agent$, ViewType.agent, this.gridTriggers.agent$, e);
    });

    this.gridTriggers.franchise$.on('click', (e) => {
      this.toggleState(this.gridItems.franchise$, ViewType.franchise, this.gridTriggers.franchise$, e);
    });
  }


  /** 
   * Toggle between animation states on the homepage
   * @param selector$
   * @param slug
   */
  public toggleState(selector$: any, slug: ViewType | string, trigger$:any, event: MouseEvent) {

    for(let key in this.gridTriggers){
      this.gridTriggers[key].removeClass('active');
    }
    trigger$.addClass('active');

    // Remove all active states
    this.gridItems.all$.removeClass('active');
    $('.box-body-bonus').hide();
    let delay = this.delay;  
    let selector = '.' + slug;
    // If not a view all, add active state to the new selectors 
    // Update slug to correct one
    // Only delay if not going to all
    if (slug !== ViewType.all) {
      selector$.addClass('active');
      delay = 0;
    } else {
      selector = '';
    }
    
    // Wait till after animation is complete
    setTimeout(() => {
      this.grid$.isotope({ filter: selector });
    }, delay);


    setTimeout(() => {
      if(slug === ViewType.consumer){
        this.gridItems.consumer$.find('.box-body-bonus').show();
      }
    },  this.delay * 2);


    event.preventDefault();
  }

}
new RogHomepage();
