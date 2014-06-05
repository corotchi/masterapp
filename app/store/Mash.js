Ext.define('Q4App.store.Mash', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.JsonP',
        'Q4App.model.Company'
    ],
    config: {
        model: 'Q4App.model.Mash',
        autoLoad: false,
        proxy: {
            type: "jsonp",
            url : "http://192.168.1.136:5000/niri/api/getdata",
            extraParams: {},
            reader: {
                type: "json"
                /*rootProperty: 'projects'*/
            }
        }
    }
});