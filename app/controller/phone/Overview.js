Ext.define('Q4App.controller.phone.Overview', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            home: 'home',
            titlebar: 'overview titlebar',
            overview: 'overview',
            overviewBox: 'overview dataview',
            details: 'overview panel',
            back: 'overview button[id="backHome"]',
            backDetails: 'overview button[id="backPhoneDetails"]'
        },
        control: {
            overview: {
                initialize: 'onOverviewInit'
            },

            overviewBox: {
                itemtap: 'onBoxTap'
            },

            back: {
                tap: 'onBackTap'
            },

            backDetails: {
                tap: 'onBackNewsTap'
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
            default :
                break;
        }
    },


    openNews: function(record){
        this.getOverview().setActiveItem(1);
        this.toggleBack(true);
        var newsHtml = [
            '<div class="head">',
                '<h3>Press Release</h3>',
            '</div>',
            '<div class="body">',
                '<h1 class="mainTitle">' + record.getData().Headline + '</h1>' +
                record.getData().Body +
                '</div>'
        ].join('');
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
        this.getOverview().destroy();
        this.getHome().show();
    },

    onBackNewsTap: function () {
        this.toggleBack(false);
        this.getOverview().setActiveItem(0);
    }


});