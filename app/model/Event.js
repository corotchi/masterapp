Ext.define('Q4App.model.Event', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'StartDate',
            'EndDate',
            'DocumentFileType',
            'DocumentFileSize',
            'DocumentPath',
            'IsWebcast',
            'Title',
            'Body',
            'EventPresentation',
            'EventSpeaker',
            'WebCastLink',
            'LinkToUrl',
            'EventSpeaker',
            'WorkflowId',
            'LinkToDetailPage',
            'Location',
            'TimeZone',
            'EventId',
            'Attachments'
        ]
    }
});