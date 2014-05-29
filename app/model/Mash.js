Ext.define('Q4App.model.Mash', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'Origin',
            'Date',
            'Title',
            'Description',
            'Body',
            'MediaCollection',
            'Type: String',
            'WorkflowId'
        ]
    }
});