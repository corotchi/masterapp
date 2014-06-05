Ext.define('Q4App.view.phone.Overview', {
    extend: 'Ext.Container',
    xtype: 'overview',
    config: {
        cls: 'CompanyOverview phoneCompanyOverview',
        layout: 'card',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                cls: 'phoneCompanyToolbar',
                height: 50,
                items: [
                    {
                        cls: 'fullButton ',
                        iconCls: 'back',
                        id: 'backHome',
                        width: 60
                    },
                    {
                        cls: 'fullButton ',
                        iconCls: 'back',
                        hidden: true,
                        id: 'backPhoneDetails',
                        width: 60
                    },
                    {
                        cls: 'follow',
                        text: '<i class="fa fa-star""></i><span>Follow</span><i class="fa"></i>',
                        width: 130,
                        right: 0,
                        id: 'followBtn'
                    }
                ]
            },
            {
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                items: [
                    {
                        xtype: 'titlebar',
                        id: 'companyTitle',
                        titleAlign: 'left',
                        cls: 'companyName',
                        layout: {}
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

                                            return 'Change <span>' + symbol + ' ' + number + '</span>';
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
                                defaults: {
                                    pressedDelay: 40
                                },
                                items: [
                                    {
                                        xtype: 'dataview',
                                        id: 'companyEvents',
                                        cls: 'companyEvents companyBox',
                                        scrollable: null,
                                        emptyText: [
                                            '<div class="head">',
                                            '<span class="icon"><i class="calendar"></i></span>',
                                            '<h2>Event</h2>',
                                            '</div>',
                                        ].join(''),
                                        itemTpl: new Ext.XTemplate(
                                            '<tpl for=".">',
                                            '<div class="head">',
                                            '<span class="icon"><i class="calendar"></i></span>',
                                            '<h2>Event</h2>',
                                            '</div>',
                                            '<div class="body">',
                                            '<h3>{StartDate:date("M d, Y")}</h3>',
                                            '<h2>{Title}</h2>',
                                            '</div>',
                                            '<span class="view_more">Add To Calendar</span>',
                                            '</tpl>'
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
                                            '<div class="head">',
                                            '<span class="icon"><i class="news"></i></span>',
                                            '<h2>Press Release</h2>',
                                            '</div>',
                                            '<div class="body">',
                                            '<h3>{PressReleaseDate:date("M d, Y")}</h3>',
                                            '<h2>{Headline}</h2>',
                                            '</div>',
                                            '<span class="view_more">View Details</span>',
                                            '</tpl>'
                                        ),
                                        store: 'PressRelease'
                                    },
                                    {
                                        xtype: 'dataview',
                                        id: 'companyPresentation',
                                        cls: 'companyPresentation companyBox',
                                        scrollable: null,
                                        emptyText: [
                                            '<div class="head">',
                                            '<span class="icon"><i class="presentation"></i></span>',
                                            '<h2>Presentation</h2>',
                                            '</div>',
                                            '<h2>No Presentation Found</h2>'

                                        ].join(''),
                                        itemTpl: new Ext.XTemplate(
                                            '<tpl for=".">',
                                            '<div class="head">',
                                            '<span class="icon"><i class="presentation"></i></span>',
                                            '<h2>Presentation</h2>',
                                            '</div>',
                                            '<div class="body">',
                                            '<h3>{PresentationDate:date("M d, Y")}</h3>',
                                            '<h2>{Title}</h2>',
                                            /*'{DocumentPath}',*/
                                            '</div>',
                                            '<span class="view_more">Download PDF</span>',
                                            '</tpl>'
                                        ),
                                        store: 'Presentation'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        cls: 'gotToApp',
                        xtype: 'button',
                        id: 'externalSite',
                        text: 'Go to Mobile App'
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
