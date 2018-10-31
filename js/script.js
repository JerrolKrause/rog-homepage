console.log('Test 123');
var RogHomepage = /** @class */ (function () {
    function RogHomepage() {
        this.grid$ = $('.grid').isotope({
            itemSelector: '.grid-item',
            layoutMode: 'fitRows'
        });
        this.gridItems = {
            all$: $('.grid-item'),
            consumer$: $('.grid-item.consumer'),
            agent$: $('.grid-item.agent'),
            franchise$: $('.grid-item.franchise'),
        };
        this.gridTriggers = {
            all$: $('.grid-all'),
            consumer$: $('.grid-consumer'),
            agent$: $('.grid-agent'),
            franchise$: $('.grid-franchise'),
        };
        this.currentView = ViewType.all;
        this.delay = 300;
        console.log('Do cool stuff');
        this.interactEvents();
    }
    /** Manage click events */
    RogHomepage.prototype.interactEvents = function () {
        var _this = this;
        this.gridTriggers.all$.on('click', function (e) {
            _this.toggleState(_this.gridItems.all$, ViewType.all, e);
        });
        this.gridTriggers.consumer$.on('click', function (e) {
            _this.toggleState(_this.gridItems.consumer$, ViewType.consumer, e);
        });
        this.gridTriggers.agent$.on('click', function (e) {
            _this.toggleState(_this.gridItems.agent$, ViewType.agent, e);
        });
        this.gridTriggers.franchise$.on('click', function (e) {
            _this.toggleState(_this.gridItems.franchise$, ViewType.franchise, e);
        });
    };
    /**
     * Toggle between animation states on the homepage
     * @param selector$
     * @param slug
     */
    RogHomepage.prototype.toggleState = function (selector$, slug, event) {
        var _this = this;
        // Remove all active states
        this.gridItems.all$.removeClass('active');
        var delay = this.delay;
        // If not a view all, add active state to the new selectors 
        // Update slug to correct one
        // Only delay if not going to all
        if (slug !== ViewType.all) {
            selector$.addClass('active');
            slug = '.' + slug;
            delay = 0;
        }
        else {
            slug = '';
        }
        // Wait till after animation is complete
        setTimeout(function () {
            _this.grid$.isotope({ filter: slug });
            console.log($('.box-body-bonus'));
            $('.box-body-bonus').show();
        }, delay);
        event.preventDefault();
    };
    return RogHomepage;
}());
new RogHomepage();
