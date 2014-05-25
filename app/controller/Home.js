Ext.define('Q4App.controller.Home', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            home: 'home',
            menu: 'navigation button',
            overview: 'overview',
            search: 'searchfield'
        },
        control: {
            home: {
                itemtap: 'onItemTap'
            },

            menu: {
                tap: 'onMenuTap'
            },

            search: {
                keyup: 'onSearchKeyUp'
            }
        }
    },

    onItemTap: function (list, el, index, record) {
        var data = record.getData();

        this.getHome().hide();
        this.getOverview().show({
            type: 'fadeIn',
            duration: 1000
        });


        var newsStore = Ext.getStore('PressRelease'),
            proxy = newsStore.getProxy(),
            param = proxy.getExtraParams();

        proxy.setUrl(data.siteUrl + "/feed/PressRelease.svc/GetPressReleaseList");
        param.apiKey = data.apiKey;


        newsStore .load(function(records){
            console.log(records);
        })
    },

    onMenuTap: function(button) {
        switch (button.getId()) {
            case 'sort' :
                this.sortList()
                   break;
            case 'search' :
                this.searchList()
                break;
            default :
                break;
        }
    },

    sortReverse: false,

    sortList: function() {
        var store = Ext.getStore('Company');

        this.sortReverse = !this.sortReverse;
        var type = this.sortReverse ? 'ASC' : 'DESC';

        store.sort('title', type);
    },

    searchList: function() {
        var store = Ext.getStore('Company');

        store.filterBy(function(record){
            var title = record.get('title');
            if(title.indexOf('ACE Limited') !== -1)
                return record;
        });
    },

    onSearchKeyUp: function(searchfield, e) {
        var string = searchfield.getValue().toLowerCase();
        var store = Ext.getStore('Company');
        store.clearFilter()
        store.filterBy(function(record){
            var title = record.get('title').toLowerCase();
            if(title.indexOf(string) >= 0)
                return record;
        });



        /*if (e.event.keyCode == 13){
         alert('User pressed enter');
         }*/
    }


});