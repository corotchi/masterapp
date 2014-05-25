Ext.define('Q4App.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [],
    config: {
        layout: 'card',
        items: [
            {
                docked: 'left',
                xtype: 'navigation'
            },
            {
                top: 10,
                left: 10,
                width: 200,
                height: 20,
                xtype: 'searchfield',
                label: 'Query',
                name: 'query'
            },
            {xtype: 'home'},
            {xtype: 'overview'}
        ]
    }
});
