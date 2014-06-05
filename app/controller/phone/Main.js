Ext.define('Q4App.controller.phone.Main', {
    extend: 'Ext.app.Controller',
    requires: [
        'Q4App.view.Overview'
    ],
    config: {
        refs: {
            main: 'main',
            home: 'home',
            menu: 'main mainmenu',
            more: 'main button[id="mainMenu"]'

        },
        control: {
            home: {
                initialize: 'onMainInit'
            },

            more: {
                tap: 'onMoreTap'
            }
        }
    },

    onMainInit: function (viewport) {
    },

    onMoreTap: function () {
        this.getMenu().toggle();
    }


});