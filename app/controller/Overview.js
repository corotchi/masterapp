Ext.define('Q4App.controller.Overview', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            back: 'navigation button[id="back"]',
            backDetails: 'navigation button[id="backDetails"]',
            titlebar: 'overview titlebar',
            siteBtn: 'button[id="externalSite"]',
            followBtn: 'button[id="followBtn"]',
            overview: 'overview',
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

            siteBtn: {
                tap: 'onSiteTap'
            },

            followBtn: {
                tap: 'onFollowTap'
            }
        }
    },

    onOverviewInit: function (viewport) {
        var data = viewport.getData();
        this.setFollowed(!data.favorite);

        this.getTitlebar()
            .setTitle('<span>' + data.stock.exchange + ':</span>' + data.title);

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
                name: 'Price',
                data: data
            }]

        });
    },

    onBoxTap: function (list, index, el, record) {
        switch (list.getId()) {
           /* case 'companyNews' :
                this.openNews(record);
                break;*/
            case 'companyEvents' :
                this.addToCalendar(record);
                break;

            case 'companyPresentation' :
                this.downloadPdf(record, el);
                break;
            default :
                break;
        }
    },

    addToCalendar: function (record) {

        if (window.plugins) {

            var data = record.getData();
            var startDate = new Date(data.StartDate);
            var endDate = new Date(data.EndDate);
            var title = data.Title;
            var location = "";
            var notes = "";

            function onConfirm(buttonIndex) {
                if (buttonIndex === 1 ) {
                    var success = function(message) {

                    };
                    var error = function(message) { alert("Error: " + message); };
                    window.plugins.calendar.createEvent(title,location,notes,startDate,endDate,success,error);
                }
            }
            navigator.notification.confirm(
                title, // message
                onConfirm,
                "Add To Calendar !",
                ['OK','Cancel']
            );
        }
    },

    downloadStatus: true,

    downloadPdf: function(record, el) {
        var button = el.down('span.view_more');
        var me = this;

        if (this.downloadStatus) {
            me.downloadStatus = false;
            button.setHtml('Loading ..');
            button.addCls('progress');

            var url = record.getData().DocumentPath;
            var loadingStatus = {
                setPercentage: function (num) {
                    var percentComplete = Math.round(num * 100);
                    button.setHtml(percentComplete + '%');
                    console.log(percentComplete + '%');
                }
            };
            var ft = new FileTransfer();
            ft.onprogress = function (progressEvent) {
                if (progressEvent.lengthComputable) {
                    loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
                }
            };

            var documentTitle = url.replace(/ /g, '_').split('/').pop();
            var uri = encodeURI(url);
            var fileURL = 'cdvfile://localhost/temporary/' + documentTitle;

            ft.download(
                uri,
                fileURL,
                function (entry) {
                    button.setHtml('Download PDF');
                    button.removeCls('progress');

                    me.downloadStatus = true;
                    console.log('download complete: ' + entry.fullPath);
                    cordova.exec(null, null, 'CDVPDFViewer', 'showPDF', ['../tmp/' + documentTitle ]);
                },
                function (error) {
                    button.setHtml('Download PDF');
                    button.removeCls('progress');

                    me.downloadStatus = true;
                    console.log('download error source ' + error.source);
                    console.log('download error target ' + error.target);
                    console.log('upload error code' + error.code);
                }
            );
        }
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
        /*var url = this.getOverview().getData().siteUrl;
        var ref = window.open(url + '/m', '_blank', 'location=yes');*/

        var ref = window.open('Q4App/index.html?project=' + this.getOverview().getData().shortName , '_blank', 'location=yes');

    },

    onFollowTap: function (button) {
        var data = this.getOverview().getData();
        var follow = (data.favorite) ? true : false;

        var dataModel = {
            shortName: data.shortName,
            id: data._id,
            favorite: !follow
        };

        this.toggleFollowBtn();


        Ext.Ajax.request({
            /*url : 'http://localhost:5000/niri/api/favorite',*/
            url : 'http://q4staging.herokuapp.com/niri/api/favorite',
            method : "PUT",
             headers: {
                'Content-Type': 'application/json'
             },
            params : Ext.JSON.encode(dataModel),
            useDefaultXhrHeader : false,
                success : function(response) {
                    var store = Ext.getStore('Company');
                    store.findRecord('shortName', data.shortName).data.favorite = !follow;
//                    Ext.Msg.alert("Success", "Welcome ");
                },
                failure : function(response) {
                    console.log(response);
                }
            });
    },

    setFollowed: function (status) {
        this.follow = status;
        this.toggleFollowBtn();
    },

    getFollowed: function (status) {
        /*this.toggleFollowBtn();*/
    },

    toggleFollowBtn: function(status){
        var cls = (this.follow) ? 'inactive' : 'active';
        this.follow = !this.follow;
        this.getFollowBtn().setCls('follow ' + cls);
    }


});