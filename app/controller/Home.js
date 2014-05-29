Ext.define('Q4App.controller.Home', {
    extend: 'Ext.app.Controller',
    requires: [
        'Q4App.view.Overview'
    ],
    config: {
        refs: {
            main: 'main',
            home: 'home',
            navigation: 'navigation',
            menu: 'navigation button',
            back: 'navigation button[id="back"]',
            overview: 'overview',
            searchPanel: 'panel[id="searchPanel"]',
            searchBtn: 'panel[id="searchPanel"] button[cls="cancel"]',
            search: 'searchfield'
        },
        control: {
            home: {
                initialize: 'onHomeInit',
                itemtap: 'onItemTap',
                hide: 'onHomeHide',
                show: 'onHomeShow'
            },

            menu: {
                tap: 'onMenuTap'
            },

            search: {
                keyup: 'onSearchKeyUp',
                clearicontap: 'onSearchClear'
            },

            searchBtn: {
                tap: 'onSearchClose'
            },

            searchPanel: {
                hide: 'onSearchHide'
            }
        }
    },

    onHomeInit: function () {

    },

    onHomeHide: function () {
        var menuItems = this.getNavigation().getItems().items;
        this.getSearchPanel().hide();

        Ext.each(menuItems, function(item){
           item.setDisabled(true);
        }, this)
        this.getBack().setDisabled(false);
    },

    onHomeShow: function () {
        var menuItems = this.getNavigation().getItems().items;
        Ext.each(menuItems, function(item){
            item.setDisabled(false);
        }, this)
    },

    onSearchClose: function (button) {
        this.getSearchPanel().hide();
    },

    onSearchHide: function() {
        this.getNavigation().down('button[id="search"]').removeCls('active');
    },


    onItemTap: function (list, el, index, record) {
        var overview = Ext.create(Q4App.view.Overview);
        this.getHome().hide();
        this.getMain().add(overview).show({
            type: 'fadeIn',
            duration: 1000
        });

        overview.down('container[id="companyTitle"]').setData([{exchange: record.getData().stock.exchange, title: record.getData().title}])

        this.loadNews(record.getData());
        this.loadStock(record.getData());
        this.loadChart(record.getData());
        this.loadEvents(record.getData());
        this.loadPresentation(record.getData());

        this.getMenu().hide();
        this.getBack().show();
    },

    loadNews: function(data) {
        var store = Ext.getStore('PressRelease'),
            proxy = store.getProxy(),
            param = proxy.getExtraParams();

        proxy.setUrl(data.siteUrl + "/feed/PressRelease.svc/GetPressReleaseList");
        param.apiKey = data.apiKey;

        store.load()
    },

    loadStock: function(data) {
        var store = Ext.getStore('Stock'),
            proxy = store.getProxy(),
            param = proxy.getExtraParams();

        proxy.setUrl(data.siteUrl + '/feed/StockQuote.svc/GetStockQuoteList');
        param.apiKey = data.apiKey;
        param.exchange = data.stock.exchange;
        param.symbol = data.stock.symbol;

        store.load();
    },

    loadChart: function(data) {
        var store = Ext.getStore('StockChart'),
            proxy = store .getProxy(),
            param = proxy.getExtraParams();

        proxy.setUrl(data.siteUrl + '/feed/StockQuote.svc/GetStockQuoteHistoricalList');
        param.apiKey = data.apiKey;
        param.exchange = data.stock.exchange;
        param.symbol = data.stock.symbol;

        store.load();
    },

    loadEvents: function(data){
        var store = Ext.getStore('Event'),
            proxy = store.getProxy(),
            param = proxy.getExtraParams();

        proxy.setUrl(data.siteUrl + "/feed/Event.svc/GetEventList");
        param.apiKey = data.apiKey;

        store.load();
    },

    loadPresentation: function(data){
        var store = Ext.getStore('Presentation'),
            proxy = store.getProxy(),
            param = proxy.getExtraParams();

        proxy.setUrl(data.siteUrl + "/feed/Presentation.svc/GetPresentationList");
        param.apiKey = data.apiKey;

        store.load(function(records){
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
        if(this.getSearchPanel().isHidden( )){
            button.setCls('active');
            this.getSearchPanel().show();
        }
        else {
            button.removeCls('active');
            this.getSearchPanel().hide();
        }
    },

    onSearchKeyUp: function(searchfield, e) {
        var string = searchfield.getValue().toLowerCase(),
            store = Ext.getStore('Company');

        store.clearFilter()
        store.filterBy(function(record){
            var title = record.get('title').toLowerCase(),
                symbol = record.get('stock').symbol.toLowerCase(),
                exchange= record.get('stock').exchange.toLowerCase();

            if(title.indexOf(string) >= 0 || exchange.indexOf(string) >= 0 || symbol.indexOf(string) >= 0)
                return record;
        });
    },

    onSearchClear: function() {
        var store = Ext.getStore('Company');
        store.clearFilter()
    },

    backHome: function(button) {
        this.getOverview().destroy();
        this.getHome().show({
            type: 'fadeIn',
            duration: 400
        });

        this.getMenu().show();
        button.hide();
    }


});