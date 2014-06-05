Ext.define('Q4App.view.phone.Main', {
    extend: 'Q4App.view.Main',
    xtype: 'main',

    config: {
        fullscreen: true,
        layout: 'card',
        cls: 'homeMain',
        items: [
            {
                xtype: 'mainmenu'
            },
            {
                layout: 'card',
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        cls: 'phoneToolbar',
                        height: 50,
                        items: [{
                            id: 'mainMenu',
                            iconCls: 'more'
                        }]
                    },
                    {xtype: 'home'}
                ]
            },
            {
                hidden: true,
                xtype: 'panel',
                id: 'searchPanel',
                cls: 'searchPanel viewport-inner',
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

            }
//            {xtype: 'favorite'},
//            {xtype: 'overview'}
        ]
    }
});
