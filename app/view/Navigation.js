Ext.define('Q4App.view.Navigation', {
    extend: 'Ext.Toolbar',
    requires: [
    ],
    xtype: 'navigation',
    config: {
        cls: 'mainToolbar',
        width: 75,
        items: [
            {
                html: '<img src="resources/images/q4-logo.png" alt="logo"  />'
            },
            {
                iconCls: 'back',
                hidden: true,
                id: 'back'
            },
            {
                iconCls: 'back',
                hidden: true,
                id: 'backDetails'
            },
            {
                iconCls: 'search',
                id: 'search'
            },
            {
                iconCls: 'sort',
                id: 'sort'
            },
            {
                iconCls: 'bookmark',
                id: 'bookmark'
            },
            {
                iconCls: 'settings',
                id: 'settings'
            },
        ]
    }
});
