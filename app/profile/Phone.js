Ext.define('Q4App.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        controllers: [
            'Main',
            'Overview',
            'Home'
        ],
        views: [
            'Main',
            'Menu',
            'Overview'
        ]
    },

    isActive: function() {
        return Ext.os.is.Phone;
    },

    launch: function() {
        Ext.create('Q4App.view.phone.Main');
    }
});