Ext.define('Q4App.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        controllers: [
            'Main',
            'Home',
            'Overview'
        ],
        views: [
            'Main',
            'Overview'
        ]
    },

    isActive: function() {
        return Ext.os.is.Tablet || true;
    },

    launch: function() {
        Ext.create('Q4App.view.tablet.Main');
    }
});