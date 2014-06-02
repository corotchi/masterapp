Ext.define('Q4App.store.Favorite', {
    extend: 'Ext.data.Store',
    requires: [
//        'Q4App.model.Stock'
    ],
    config: {
//        autoLoad: true,
//        model: 'Q4App.model.Stock',
        proxy: {
            type: 'ajax',
            url: 'http://localhost:5000/niri/api/favorite',
            batchActions: false,
            enablePagingParams: false,
            actionMethods: {
                create : 'POST',
                read   : 'POST',
                update : 'PUT',
                destroy: 'DELETE'
            },
            extraParams:{},
            reader: {
                type: 'json'
            }
        }
    }
});
