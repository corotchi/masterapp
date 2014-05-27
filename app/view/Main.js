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
                xtype: 'panel',
                cls: 'searchPanel',
                hideOnMaskTap: true,
                modal: true,
                hidden: true,
                top: 0,
                items: [
                    {
                        xtype: 'searchfield',
                        name: 'query'
                    }
                ]

            },
            {xtype: 'home'}
//            {xtype: 'overview'}
        ]
    }
});
