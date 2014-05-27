Ext.define('Q4App.store.Stock', {
    extend: 'Ext.data.Store',
    requires: [
        'Q4App.model.Stock'
    ],
    config: {
        model: 'Q4App.model.Stock',
        proxy: {
            type: 'jsonp',
            extraParams:{
                pageSize: 1
            },
            reader: {
                type: 'json',
                rootProperty: 'GetStockQuoteListResult'
            }
        }
    }
});
