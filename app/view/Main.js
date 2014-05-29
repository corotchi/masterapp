Ext.define('Q4App.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: ['Ext.field.Search'],
    config: {
        layout: 'card',
        items: [
            {
                docked: 'left',
                xtype: 'navigation'
            },
            {
                hidden: true,
                xtype: 'panel',
                id: 'searchPanel',
                cls: 'searchPanel',
                docked: 'top',
                items: [
                    {
                        cls: 'cancel',
                        xtype: 'button',
                        text: 'cancel',
                        right: 10,
                        top: 8
                    },
                    {
                        xtype: 'button',
                        iconCls: 'search',
                        left: 0
                    },
                    {
                        xtype: 'searchfield',
                        name: 'query'
                    }
                ]

            },
//            {xtype: 'favorite'},
            {xtype: 'home'},
//            {xtype: 'overview'}
        ]
    }
});
