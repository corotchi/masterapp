Ext.define('Q4App.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'main',
            menu: 'navigation'
        },
        control: {
            main: {
                initialize: 'onMainInit'
            }
        }
    },

    onMainInit: function () {

    }

});