Ext.define('Q4App.store.Presentation', {
    extend: 'Ext.data.Store',
    requires: [
        'Q4App.model.Presentation'
    ],

    config: {
        model: 'Q4App.model.Presentation',
        proxy: {
            type: 'jsonp',
            extraParams:{
                presentationDateFilter: 3,
                pageSize: 1
            },
            reader: {
                type: 'json',
                rootProperty: 'GetPresentationListResult'
            }
        }
    }
});
