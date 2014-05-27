Ext.define('Q4App.view.Overview', {
    extend: 'Ext.Container',
    xtype: 'overview',
    config: {
        cls: 'CompanyOverview',
        items: [
            {
                cls: 'companyName',
                html: [
                    '<h2><span>NYSE:</span>Company Name Inc.</h2>'
                ].join('')
            },
            {
                xtype: 'dataview',
                cls: 'stockQuote',
                height: 200,
                width: 350,
                scrollable: null,
                itemTpl: new Ext.XTemplate(
                    '<tpl for=".">',
                        '<h4>Stock price</h4>',
                        '<h3><span>{[this.getDirection(values.Change)]}</span>{TradePrice}</h3>',
                        '<h4>{[this.getChange(values.Change)]}</h4>',
                    '</tpl>',
                    {
                        getDirection: function (change) {
                            return (parseFloat(change) <0 ) ? '-' : '+';
                        },

                        getChange: function (change) {
                            var changeNumber = parseFloat(change).toFixed(2),
                                symbol =  (changeNumber < 0) ? '-' : '+',
                                number =  (changeNumber < 0) ? changeNumber * -1 : changeNumber;

                            return 'Change <span>' + symbol + '</span>' + number;
                        }
                    }
                ),
                store: 'Stock'
            },
            {
                id: 'overviewChart',
                html: '<div class="wrapper">' +
                        '<div class="pie spinner"></div>' +
                        '<div class="pie filler"></div>' +
                        '<div class="mask"></div>' +
                    '</div>'
            },
            {
                xtype: 'panel',
                cls: 'companyFeedContainer',
                items: [
                    {
                        xtype: 'dataview',
                        cls: 'companyEvents companyBox',
                        scrollable: null,
                        itemTpl: new Ext.XTemplate(
                            '<h2>Event</h2>',
                            '<h3>{Title}</h3>'
                        ),
                        store: 'Event'
                    },
                    {
                        xtype: 'dataview',
                        id: 'companyNews',
                        scrollable: null,
                        cls: 'companyNews companyBox',
                        itemTpl: new Ext.XTemplate(
                            '<tpl for=".">',
                                '<h2>Press Release</h2>',
                                '<h3>{Headline}</h3>',
                            '</tpl>'
                        ),
                        store: 'PressRelease'
                    },
                    {
                        cls: 'companyPresentation companyBox',
                        html: [
                            '<h2>Presentation</h2>',
                            '<div class="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>'
                        ].join('')
                    }
                ]
            }
        ]
    }
});
