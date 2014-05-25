Ext.define('Q4App.controller.Overview', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            overview: 'overview'
        },
        control: {
            overview: {
                initialize: 'onOverviewInit'
            }
        }
    },

    onOverviewInit: function () {
        var s = setTimeout(function(){
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'overviewChart',
                    height: 280,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent'
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
                    categories: [
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                }]

            });
        }, 1000);

        this.loadPressRelease();
    },

    loadPressRelease: function () {

    }

});