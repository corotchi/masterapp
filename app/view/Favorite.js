Ext.define('Q4App.view.Favorite', {
    extend: 'Ext.Container',
    requires: [
        'Ext.TitleBar'
    ],
    xtype: 'favorite',
    config: {
        cls: 'MashPage',
        layout: 'card',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Filter:',
                titleAlign: 'left',
                items: [
                    {
                        text: 'Type',
                        align: 'right'
                    },
                    {
                        text: 'Client',
                        align: 'right'
                    }
                ]
            },
            {
                cls: 'mashList',
                xtype: 'dataview',
                itemTpl: [
                    '<h2><span>{Origin}</span> {Date:date("M d, Y")}</h2>',
                    '<h3>{Title}</h3>',
                ],
                store: 'Mash'
            }
        ]
    }
});
