Ext.define('Q4App.view.Home', {
    extend: 'Ext.DataView',
    xtype: 'home',
    requires: 'Ext.dataview.DataView',
    config: {
        cls: 'homeList',
        xtype: 'dataview',
        store: 'Company',
        pressedDelay: 10,
        masked: {
            xtype: 'loadmask'
        },
        itemTpl: [
            '<span><img src="{clientLogo}" alt="{title}" /></span>',
            '<h3>{title}</h3>'
        ]
    }
});
