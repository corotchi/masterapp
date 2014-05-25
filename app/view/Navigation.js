Ext.define('Q4App.view.Navigation', {
    extend: 'Ext.Toolbar',
    xtype: 'navigation',
    requires: [],
    config: {
        cls: 'mainToolbar',
        width: 75,
        items: [
            {
                html: '<img src="resources/images/q4-logo.png" alt="logo"  />'
            },
            {
                iconCls: 'search',
                id: 'search'
            },
            {
                iconCls: 'arrow_up',
                id: 'sort'
            },
            {
                iconCls: 'star',
                id: 'bookmark'
            },
            {
                iconCls: 'settings',
                id: 'settings'
            },
        ]
    }
});
