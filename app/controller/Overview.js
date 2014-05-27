Ext.define('Q4App.controller.Overview', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            overview: 'overview'
        },
        control: {
            overview: {
                show: 'onOverviewInit'
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
//        this.highChartInit(chartData);
    },

    highChartInit: function(data) {
        var chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'overviewChart',
                height: 280,
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                events: {
                    load: function(event) {
                        document.getElementById('overviewChart').setAttribute('class', 'animated fadeIn');

                    },
                    redraw: function(event) {
                        alert ('Chart loaded');
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
    }




});