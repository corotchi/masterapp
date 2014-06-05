Ext.define('Q4App.controller.tablet.Overview', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            back: 'navigation button[id="back"]',
            backDetails: 'navigation button[id="backDetails"]',
            titlebar: 'overview titlebar',
            siteBtn: 'overview titlebar button[id="externalSite"]',
            followBtn: 'overview titlebar button[id="followBtn"]',
            overview: 'overview',
            details: 'overview panel',
            overviewBox: 'overview dataview'
        },
        control: {
            overview: {
                initialize: 'onOverviewInit'
            },

            overviewBox: {
                itemtap: 'onBoxTap'
            },

            backDetails: {
                tap: 'onBackTap'
            }
        }
    },

    onOverviewInit: function (viewport) {

    },


    onBoxTap: function (list, index, el, record) {
        switch (list.getId()) {
            case 'companyNews' :
                this.openNews(record);
                break;
            /*case 'companyEvents' :
                this.addToCalendar(record);
                break;

            case 'companyPresentation' :
                this.downloadPdf(record, el);
                break;*/
            default :
                break;
        }
    },

    openNews: function(record){

        this.getOverview().setActiveItem(1);
        this.toggleBack(true);

        var newsHtml = [
            '<div class="head">',
            '<span class="icon"><i class="news"></i></span>',
            '<h3>Press Release</h3>',
            '</div>',
            '<div class="body">',
                '<h1 class="mainTitle">' + record.getData().Headline + '</h1>' +
                record.getData().Body +
                '</div>'
        ].join('');

        /*var test = '<iframe src="http://q4app.com/sencha/build/?project=ice" height="100%" width="100%"></iframe>'*/

        this.getDetails().setHtml(newsHtml);
    },


    toggleBack: function (enable) {
        if(enable) {
            this.getBackDetails().setDisabled(false).show();
            this.getBack().hide();
        }
        else {
            this.getBackDetails().hide();
            this.getBack().show();
        }
    },

    onBackTap: function () {
        this.toggleBack(false);
        this.getOverview().setActiveItem(0);
    }
});