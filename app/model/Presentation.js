Ext.define('Q4App.model.Presentation', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'Body',
            'DocumentPath',
            'PresentationDate',
            'ThumbnailPath',
            'DocumentFileType',
            'Title'
        ]
    }
});