var ViewType;
(function (ViewType) {
    ViewType["all"] = "";
    ViewType["consumer"] = "consumer";
    ViewType["agent"] = "agent";
    ViewType["franchise"] = "franchise";
})(ViewType || (ViewType = {}));
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
        this.interactEvents();
    }
    /** Manage click events */
    RogHomepage.prototype.interactEvents = function () {
        var _this = this;
        this.gridTriggers.all$.on('click', function (e) {
            _this.toggleState(_this.gridItems.all$, ViewType.all, _this.gridTriggers.all$, e);
        });
        this.gridTriggers.consumer$.on('click', function (e) {
            _this.toggleState(_this.gridItems.consumer$, ViewType.consumer, _this.gridTriggers.consumer$, e);
        });
        this.gridTriggers.agent$.on('click', function (e) {
            _this.toggleState(_this.gridItems.agent$, ViewType.agent, _this.gridTriggers.agent$, e);
        });
        this.gridTriggers.franchise$.on('click', function (e) {
            _this.toggleState(_this.gridItems.franchise$, ViewType.franchise, _this.gridTriggers.franchise$, e);
        });
    };
    /**
     * Toggle between animation states on the homepage
     * @param selector$
     * @param slug
     */
    RogHomepage.prototype.toggleState = function (selector$, slug, trigger$, event) {
        var _this = this;
        for (var key in this.gridTriggers) {
            this.gridTriggers[key].removeClass('active');
        }
        trigger$.addClass('active');
        // Remove all active states
        this.gridItems.all$.removeClass('active');
        $('.box-body-bonus').hide();
        var delay = this.delay;
        var selector = '.' + slug;
        // If not a view all, add active state to the new selectors 
        // Update slug to correct one
        // Only delay if not going to all
        if (slug !== ViewType.all) {
            selector$.addClass('active');
            delay = 0;
        }
        else {
            selector = '';
        }
        // Wait till after animation is complete
        setTimeout(function () {
            _this.grid$.isotope({ filter: selector });
        }, delay);
        setTimeout(function () {
            if (slug === ViewType.consumer) {
                _this.gridItems.consumer$.find('.box-body-bonus').show();
            }
        }, this.delay * 2);
        event.preventDefault();
    };
    return RogHomepage;
}());
new RogHomepage();
