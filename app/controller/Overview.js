Ext.define('Q4App.controller.Overview', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            back: 'navigation button[id="back"]',
            backDetails: 'navigation button[id="backDetails"]',
            overview: 'overview',
            siteBtb: 'overview titlebar button[id="externalSite"]',
            details: 'overview panel',
            overviewBox: 'overview dataview'
        },
        control: {
            overview: {
                show: 'onOverviewInit'
            },

            overviewBox: {
                itemtap: 'onBoxTap'
            },

            backDetails: {
                tap: 'onBackTap'
            },

            siteBtb: {
                tap: 'onSiteTap'
            }
        }
    },

    onOverviewInit: function (viewport) {

        Ext.getStore('StockChart').load(function(records){
            this.buildChart(records);
        }, this);

    },

    buildChart: function (records) {
        var chartData = [];
        Ext.each(records, function (feedItem) {
            var date = Ext.Date.parseDate(feedItem.data.HistoricalDate, 'm/d/Y H:i:s').getTime();
            if (feedItem.data.Last >= 0) {
                chartData.push([date, feedItem.data.Last * 1]);
            }
        }, this);


        chartData.reverse();
        this.highChartInit(chartData);
    },

    highChartInit: function(data) {
        var chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'overviewChart',
                height: 260,
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                events: {
                    load: function(event) {
                        document.getElementById('overviewChart').setAttribute('class', 'animated fadeIn');

                    },
                    redraw: function(event) {

                    }
                }
            },
            colors: ['#50aca4', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
            yAxis: {
                gridLineColor: 'rgba(255,255,255, 0.1)',
                gridLineWidth: 0.5,
                labels: {
                    style: {
                        color: '#d8dadc'
                    }
                }
            },
            xAxis: {
                lineColor: 'rgba(255,255,255, 0.1)',
                lineWidth: 0.5,
                labels: {
                    style: {
                        color: '#d8dadc'
                    }
                }
            },
            credits: false,
            rangeSelector: {
                enabled: false,
                selected: 1
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            title: false,
            series: [{
                animation: false,
                name: 'asd',
                data: data
            }]

        });
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
                '<span class="icon"><i class="news"></i></span>',
                '<h3>Press Release</h3>',
            '</div>',
            '<div class="body">',
                '<h1 class="mainTitle">' + record.getData().Headline + '</h1>' +
                record.getData().Body +
            '</div>'
        ].join('');

//        var test = '<iframe src="http://q4app.com/sencha/build/?project=ice" height="100%" width="100%"></iframe>'

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
    },

    onSiteTap: function (button) {
        window.open(button.getData().siteUrl + '/m', '_blank', 'location=yes')
    }


});