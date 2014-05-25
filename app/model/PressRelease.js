Ext.define('Q4App.model.PressRelease', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'PressReleaseDate',
            'Headline',
            'Body',
            'ShortBody',
            'MediaCollection',
            'LinkToDetailPage',
            'WorkflowId'
        ]
    }
});