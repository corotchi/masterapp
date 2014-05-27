Ext.define('Q4App.store.StockChart', {
    extend: 'Ext.data.Store',
    requires: [
        'Q4App.model.Stock'
    ],
    config: {
        model: 'Q4App.model.Stock',
        proxy: {
            type: 'jsonp',
            extraParams:{
                pageSize: 1800
            },
            reader: {
                type: 'json',
                rootProperty: 'GetStockQuoteHistoricalListResult'
            }
        }
    }
});
