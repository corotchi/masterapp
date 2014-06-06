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
                xtype: 'panel',
                id: 'homeContainer',
                layout: 'card',
                items: [
                    {
                        xtype: 'toolbar',
                        height: 60,
                        docked: 'top',
                        top: 0,
                        width: '100%',
                        id: 'phoneToolbar',
                        cls: 'phoneToolbar',
                        items: [
                            {
                                id: 'mainMenu',
                                iconCls: 'menu'
                            },
                            {
                                cls: 'toolbarSearch',
                                iconCls: 'search',
                                id: 'search'
                            }
                        ]
                    },
                    {
                        top: 60,
                        height: 70,
                        width: '100%',
                        xtype: 'panel',
                        hidden: true,
                        id: 'searchPanel',
                        cls: 'searchPanel phoneSearch',
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
                    {xtype: 'home'}
                ]
            }
//            {xtype: 'favorite'},
//            {xtype: 'overview'}
        ]
    }
});
