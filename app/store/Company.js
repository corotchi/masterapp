Ext.define('Q4App.store.Company', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.JsonP',
        'Q4App.model.Company'
    ],
    config: {
        model: 'Q4App.model.Company',
        autoLoad: true,
        proxy: {
            type: "jsonp",
            url : "http://q4app.com/api/projects",
            extraParam: {
              'live': true
            },
            reader: {
                type: "json",
                rootProperty: 'projects'
            }
        }
    }
});