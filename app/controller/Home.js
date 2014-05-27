Ext.define('Q4App.controller.Home', {
    extend: 'Ext.app.Controller',
    requires: [
        'Q4App.view.Overview'
    ],
    config: {
        refs: {
            main: 'main',
            home: 'home',
            menu: 'navigation button',
            back: 'navigation button[id="back"]',
            overview: 'overview',
            searchPanel: 'panel[cls="searchPanel"]',
            search: 'searchfield'
        },
        control: {
            home: {
                initialize: 'onHomeInit',
                itemtap: 'onItemTap'
            },

            menu: {
                tap: 'onMenuTap'
            },

            search: {
                keyup: 'onSearchKeyUp'
            }
        }
    },

    onHomeInit: function () {

    },

    onItemTap: function (list, el, index, record) {
        var overview = Ext.create(Q4App.view.Overview);
        this.getHome().hide();
        this.getMain().add(overview).show({
            type: 'fadeIn',
            duration: 1000
        });


        this.loadNews(record.getData());
        this.loadStock(record.getData());
        this.loadChart(record.getData());
        this.loadEvents(record.getData());

        this.getMenu().hide();
        this.getBack().show();
    },

    loadNews: function(data) {
        var newsStore = Ext.getStore('PressRelease'),
            proxy = newsStore.getProxy(),
            param = proxy.getExtraParams();

        proxy.setUrl(data.siteUrl + "/feed/PressRelease.svc/GetPressReleaseList");
        param.apiKey = data.apiKey;

        newsStore.load()
    },

    loadStock: function(data) {
        var stockStore = Ext.getStore('Stock'),
            proxy = stockStore.getProxy(),
            param = proxy.getExtraParams();

        proxy.setUrl(data.siteUrl + '/feed/StockQuote.svc/GetStockQuoteList');
        param.apiKey = data.apiKey;
        param.exchange = data.stock.exchange;
        param.symbol = data.stock.symbol;

        stockStore.load();
    },

    loadChart: function(data) {
        var chartStore = Ext.getStore('StockChart'),
            proxy = chartStore .getProxy(),
            param = proxy.getExtraParams();

        proxy.setUrl(data.siteUrl + '/feed/StockQuote.svc/GetStockQuoteHistoricalList');
        param.apiKey = data.apiKey;
        param.exchange = data.stock.exchange;
        param.symbol = data.stock.symbol;

        chartStore.load();
    },

    loadEvents: function(data){
        var eventStore = Ext.getStore('Event'),
            proxy = eventStore.getProxy(),
            param = proxy.getExtraParams();

        proxy.setUrl(data.siteUrl + "/feed/Event.svc/GetEventList");
        param.apiKey = data.apiKey;

        eventStore.load(function(records){
            console.log(records);
        })
    },

    onMenuTap: function(button) {
        switch (button.getId()) {
            case 'sort' :
                this.sortList(button);
                   break;
            case 'search' :
                this.searchList(button);
                break;
            case 'back' :
                this.backHome(button);
                break;
            default :
                break;
        }
    },

    sortReverse: false,

    sortList: function(button) {
        this.sortReverse = !this.sortReverse;

        var store = Ext.getStore('Company'),
            type = !this.sortReverse ? 'ASC' : 'DESC',
            cls = this.sortReverse ? 'sort sortDown' : 'sort sortUp';

        button.setIconCls(cls);
        store.sort('title', type);
    },

    searchList: function(button) {
        this.getSearchPanel().showBy(button)
    },

    onSearchKeyUp: function(searchfield, e) {
        var string = searchfield.getValue().toLowerCase(),
            store = Ext.getStore('Company');

        store.clearFilter()
        store.filterBy(function(record){
            var title = record.get('title').toLowerCase();
            if(title.indexOf(string) >= 0)
                return record;
        });
    },

    backHome: function(button) {
        this.getOverview().destroy();
        this.getHome().show({
            type: 'fadeIn',
            duration: 1000
        });

        this.getMenu().show();
        button.hide();
    }


});