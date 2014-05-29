Ext.define('Q4App.view.Overview', {
    extend: 'Ext.Container',
    xtype: 'overview',
    config: {
        cls: 'CompanyOverview',
        items: [
            {
                id: 'companyTitle',
                cls: 'companyName',
                tpl:  new Ext.XTemplate(
                    '<tpl for=".">',
                        '<h2><span>{exchange}</span>{title}</h2>',
                    '</tpl>'
                ),
                data: [{exchange :'NYSE', title: 'Company Name Inc.'}]
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
                html:
                    '<div class="loaderContainer">' +
                        '<div class="loader">' +
                            '<span class="loader-block"></span>' +
                            '<span class="loader-block"></span>' +
                            '<span class="loader-block"></span>' +
                            '<span class="loader-block"></span>' +
                            '<span class="loader-block"></span>' +
                            '<span class="loader-block"></span>' +
                            '<span class="loader-block"></span>' +
                            '<span class="loader-block"></span>' +
                            '<span class="loader-block"></span>' +
                        '</div>' +
                    '</div>'
            },
            {
                xtype: 'panel',
                cls: 'companyFeedContainer',
                items: [
                    {
                        xtype: 'dataview',
                        html: [
                            '<span class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16" preserveAspectRatio="none"><circle cx="8" cy="8" r="6.215"></circle></svg></span>',
                            '<span class="icon"><i class="calendar"></i></span>',
                            '<h2>Event</h2>'
                        ].join(''),
                        cls: 'companyEvents companyBox',
                        scrollable: null,
                        itemTpl: new Ext.XTemplate(
                            '<h3>{StartDate:date("M d, Y")}</h3>',
                            '<h2>{Title}</h2>'
                        ),
                        store: 'Event'
                    },
                    {
                        xtype: 'dataview',
                        html: [
                            '<span class="icon calendar"><i class="calendar"></i></span>',
                            '<h2>Press Release</h2>'
                        ].join(''),
                        id: 'companyNews',
                        scrollable: null,
                        cls: 'companyNews companyBox',
                        itemTpl: new Ext.XTemplate(
                            '<tpl for=".">',
                                '<h3>{PressReleaseDate:date("M d, Y")}</h3>',
                                '<h2>{Headline}</h2>',
                            '</tpl>'
                        ),
                        store: 'PressRelease'
                    },
                    {
                        xtype: 'dataview',
                        cls: 'companyPresentation companyBox',
                        html: [
                            '<span class="icon presentation"><i class="calendar"></i></span>',
                            '<h2>Presentation</h2>'
                        ].join(''),
                        itemTpl: new Ext.XTemplate(
                            '<tpl for=".">',
                                '<h3>{PresentationDate:date("M d, Y")}</h3>',
                                '<h2>{Title}</h2>',
                            '</tpl>'
                        ),
                        store: 'Presentation'
                    }
                ]
            }
        ]
    }
});
