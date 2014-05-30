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
//            url : "http://192.168.1.136:3000/api/projects",
            extraParams: {
              live: true
            },
            reader: {
                type: "json",
                rootProperty: 'projects'
            }
        }
    }
});