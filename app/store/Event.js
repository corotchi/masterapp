Ext.define('Q4App.store.Event', {
    extend: 'Ext.data.Store',
    requires: [
        'Q4App.model.Event'
    ],
    config: {
        model: 'Q4App.model.Event',
        proxy: {
            type: 'jsonp',
            extraParams: {
                pageSize: 1,
                eventDateFilter: 3,
                sortOperator: 1,
                buffer: 0,
                year: -1,
                includePressReleases: true,
                includePresentations: true
            },
            reader: {
                type: 'json',
                rootProperty: 'GetEventListResult'
            }
        }
    }
});