Ext.define('Q4App.controller.Home', {
    extend: 'Ext.app.Controller',
    requires: [],
    config: {
        refs: {
            main: 'main',
            home: 'home',
            overview: 'overview',
        },
        control: {
            home: {
                itemtap: 'onItemTap'
            }
        }
    },

    onItemTap: function (list, el, index, record) {

        var overview = (Ext.os.is.Phone) ? Ext.create(Q4App.view.phone.Overview) : Ext.create(Q4App.view.tablet.Overview) ;

        this.getHome().hide();
        this.getMain().add(overview).show({
            type: 'fadeIn',
            duration: 1000
        });

        overview.setData(record.getData());

        this.loadNews(record.getData());
        this.loadStock(record.getData());
        this.loadChart(record.getData());
        this.loadEvents(record.getData());
        this.loadPresentation(record.getData());

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

        store.load();
    },

    sortReverse: false


});