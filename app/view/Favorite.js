Ext.define('Q4App.view.Favorite', {
    extend: 'Ext.Container',
    xtype: 'favorite',
    config: {
        layout: 'card',
        items: {
            xtype: 'dataview',
            itemTpl: [
                '<span>{Date:date("M d, Y")}</span>',
                '<h2>{Title}</h2>',
                '<div>{Description}</div>'
            ],
            store: 'Mash'
        }
    }
});
