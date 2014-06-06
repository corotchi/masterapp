Ext.define('Q4App.controller.phone.Home', {
    extend: 'Ext.app.Controller',
    requires: [
        'Q4App.view.Overview'
    ],
    config: {
        refs: {
            main: 'main',
            home: 'home',
            phoneToolbar: 'main toolbar[id="phoneToolbar]',
            navigation: 'mainmenu',
            menu: 'mainmenu button',
            overview: 'overview',
            searchMenuBtn: 'main toolbar button[id="search"]',
            searchPanel: 'panel[id="searchPanel"]',
            searchBtn: 'panel[id="searchPanel"] button[cls="cancel"]',
            search: 'searchfield'
        },
        control: {
            home: {
                initialize: 'onHomeInit',
                itemtap: 'onItemTap'
            },
            menu: {
                tap: 'onMenuTap'
            },
            search: {
                keyup: 'onSearchKeyUp',
                clearicontap: 'onSearchClear'
            },
            searchBtn: {
                tap: 'onSearchClose'
            },
            searchMenuBtn : {
                tap: 'searchListShow'
            }
        }
    },

    onHomeInit: function (viewport) {

    },

    onMenuTap: function(button) {
        this.getNavigation().toggle();
        switch (button.getId()) {
            case 'sort' :
                this.sortList(button);
                break;
            case 'home' :
                this.goHome(button);
                break;
            case 'bookmark' :
                this.bookmarkList(button);
                break;
            default :
                break;
        }
    },


    onSearchClose: function (button) {
        this.getSearchPanel().hide();
    },

    onItemTap: function (list, el, index, record) {

        var items = [
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
                text: '<i class="fa fa-star""></i>',
                id: 'followBtn'
            }
        ];

        this.getPhoneToolbar().setItems(items);


    },

    sortReverse: false,

    sortList: function(button) {
        this.sortReverse = !this.sortReverse;

        var store = Ext.getStore('Company'),
            type = !this.sortReverse ? 'ASC' : 'DESC',
            cls = this.sortReverse ? 'sort sortDown' : 'sort sortUp';

        button.setIconCls(cls);
        store.sort('title', type);
    },

    searchListShow: function(button) {
        if(this.getSearchPanel().isHidden( )){
            button.setCls('active toolbarSearch');
            this.getSearchPanel().show();
        }
        else {
            button.removeCls('active');
            this.getSearchPanel().hide();
        }
    },

    bookmarkList: function (button) {
        button.setCls('active');
        var store = Ext.getStore('Company');

        store.filterBy(function(record){
            return record.get('favorite') == true
        });

    },

    onSearchKeyUp: function(searchfield, e) {
        var string = searchfield.getValue().toLowerCase(),
            store = Ext.getStore('Company');

        store.clearFilter()
        store.filterBy(function(record){
            var title = record.get('title').toLowerCase(),
                symbol = record.get('stock').symbol.toLowerCase(),
                exchange= record.get('stock').exchange.toLowerCase();

            if(title.indexOf(string) >= 0 || exchange.indexOf(string) >= 0 || symbol.indexOf(string) >= 0)
                return record;
        });
    },

    onSearchClear: function() {
        var store = Ext.getStore('Company');
        store.clearFilter()
    },

    goHome: function (button) {

        var menuItems = this.getNavigation().getItems().items;
        Ext.each(menuItems, function(item){
            item.removeCls('active');
        }, this)
        Ext.getStore('Company').clearFilter();
        this.getSearchPanel().hide();
    }

});