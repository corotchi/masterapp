Ext.define('Q4App.store.PressRelease', {
    extend: 'Ext.data.Store',
    requires: [
        'Q4App.model.PressRelease'
    ],
    config: {
        model: 'Q4App.model.PressRelease',
        idProperty: 'WorkflowId',
        proxy: {
            type: 'jsonp',
            extraParams:{
                pageSize: 1,
                categoryId: '1cb807d2-208f-4bc3-9133-6a9ad45ac3b0',
                pressReleaseDateFilter: 3,
                bodyType: 3,
                year: -1
            },
            reader: {
                type: 'json',
                rootProperty: 'GetPressReleaseListResult'
            }
        }
    }
});
