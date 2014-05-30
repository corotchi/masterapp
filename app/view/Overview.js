Ext.define('Q4App.view.Overview', {
    extend: 'Ext.Container',
    xtype: 'overview',
    config: {
        cls: 'CompanyOverview',
        layout: 'card',
        items: [
            {
                xtype: 'titlebar',
                titleAlign: 'left',
                items: [
                    {
                        cls: 'follow',
                        text: 'Follow',
                        align: 'right',
                        width: 130
                    },
                    {
                        id: 'externalSite',
                        width: 120,
                        align: 'right',
                        text: 'Website'
                    }
                ],
                docked: 'top',
                id: 'companyTitle',
                cls: 'companyName'
            },
            {
                items: [
                    {
                        xtype: 'dataview',
                        cls: 'stockQuote',
                        scrollable: null,
                        itemTpl: new Ext.XTemplate(
                            '<tpl for=".">',
                            '<h4>Stock price</h4>',
                            '<h3><span>{[this.getDirection(values.Change)]}</span>{[this.getPrice(values.TradePrice)]}</h3>',
                            '<h4>{[this.getChange(values.Change)]}</h4>',
                            '</tpl>',
                            {

                                getPrice: function (price) {
                                    return price.toFixed(2);
                                },
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
                                /*html: [
                                    '<span class="icon"><i class="calendar"></i></span>',
                                    '<h2>Event</h2>'
                                ].join(''),*/
                                xtype: 'dataview',
                                cls: 'companyEvents companyBox',
                                scrollable: null,
                                itemTpl: new Ext.XTemplate(
                                    '<div class="head">',
                                        '<span class="icon"><i class="calendar"></i></span>',
                                        '<h2>Event</h2>',
                                    '</div>',
                                    '<div class="body">',
                                        '<h3>{StartDate:date("M d, Y")}</h3>',
                                        '<h2>{Title}</h2>',
                                    '</div>'
                                ),
                                store: 'Event'
                            },
                            {
                                xtype: 'dataview',
                               /* html: [
                                    '<span class="icon"><i class="news"></i></span>',
                                    '<h2>Press Release</h2>'
                                ].join(''),*/
                                id: 'companyNews',
                                scrollable: null,
                                cls: 'companyNews companyBox',
                                itemTpl: new Ext.XTemplate(
                                    '<div class="head">',
                                        '<span class="icon"><i class="news"></i></span>',
                                        '<h2>Press Release</h2>',
                                    '</div>',
                                    '<div class="body">',
                                        '<tpl for=".">',
                                            '<h3>{PressReleaseDate:date("M d, Y")}</h3>',
                                            '<h2>{Headline}</h2>',
                                        '</tpl>',
                                    '</div>'
                                ),
                                store: 'PressRelease'
                            },
                            {
                                xtype: 'dataview',
                                cls: 'companyPresentation companyBox',
                                /*html: [
                                    '<span class="icon"><i class="presentation"></i></span>',
                                    '<h2>Presentation</h2>'
                                ].join(''),*/
                                scrollable: null,
                                emptyText: '<span>No Presentation Found</span>',
                                itemTpl: new Ext.XTemplate(
                                    '<div class="head">',
                                        '<span class="icon"><i class="presentation"></i></span>',
                                        '<h2>Presentation</h2>',
                                    '</div>',
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
            },
            {
                xtype: 'panel',
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                cls: 'overviewDetails',
                styleHtmlContent: true,
                showAnimation: {
                    type: 'fadeIn',
                    duration: 400
                }
            }
        ]
    }
});
