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
            /*enablePagingParams: false,
            actionMethods: {
                create : 'POST',
                read   : 'POST',
                update : 'PUT',
                destroy: 'DELETE'
            },*/
            type: "jsonp",
//            url : "http://q4app.com/api/projects",
            url : "http://q4staging.herokuapp.com/niri/api/getProjects",
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