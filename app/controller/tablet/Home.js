Ext.define('Q4App.controller.tablet.Home', {
    extend: 'Ext.app.Controller',
    requires: [
        'Q4App.view.Overview'
    ],
    config: {
        refs: {
            main: 'main',
            home: 'home',
            navigation: 'navigation',
            menu: 'navigation button',
            back: 'navigation button[id="back"]',
            overview: 'overview',
            searchPanel: 'panel[id="searchPanel"]',
            searchBtn: 'panel[id="searchPanel"] button[cls="cancel"]',
            search: 'searchfield'
        },
        control: {
            home: {
                initialize: 'onHomeInit',
                itemtap: 'onItemTap',
                hide: 'onHomeHide',
                show: 'onHomeShow'
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

            searchPanel: {
                hide: 'onSearchHide'
            }
        }
    },

    onHomeInit: function () {},

    onMenuTap: function(button) {
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
            case 'search' :
                this.searchList(button);
                break;
            case 'back' :
                this.backHome(button);
                break;
            default :
                break;
        }
    },

    onHomeHide: function (viewport) {
        viewport.addCls('inactive');
        var menuItems = this.getNavigation().getItems().items;
        this.getSearchPanel().hide();

        Ext.each(menuItems, function(item){
            item.setDisabled(true);
        }, this)
        this.getBack().setDisabled(false);
    },

    onHomeShow: function (viewport) {
        var menuItems = this.getNavigation().getItems().items;
        Ext.each(menuItems, function(item){
            item.setDisabled(false);
        }, this)
        viewport.removeCls('inactive');
    },

    onSearchClose: function (button) {
        this.getSearchPanel().hide();
    },

    onSearchHide: function() {
        this.getNavigation().down('button[id="search"]').removeCls('active');
    },


    onItemTap: function (list, el, index, record) {
        this.clearMenu();
        this.getMenu().hide();
        this.getBack().show();
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

    searchList: function(button) {
        if(this.getSearchPanel().isHidden( )){
            button.setCls('active');
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
        this.getSearchPanel().hide();
        var menuItems = this.getNavigation().getItems().items;
        var store = Ext.getStore('Company');
        store.clearFilter()

        Ext.each(menuItems, function(item){
            item.removeCls('active');
        }, this)
    },

    backHome: function(button) {
        this.getOverview().destroy();
        this.getHome().show();
        this.getMenu().show();
        button.hide();
    },

    clearMenu: function () {
        var menuItems = this.getNavigation().getItems().items,
            store = Ext.getStore('Company');

        store.clearFilter();
        Ext.each(menuItems, function(item){
            item.removeCls('active');
        }, this)
    }


});