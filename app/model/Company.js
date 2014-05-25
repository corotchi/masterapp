Ext.define('Q4App.model.Company', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            "version",
            "live",
            "apiKey",
            "clientLogo",
            "splashLogo",
            "siteUrl",
            "title",
            "shortName",
            "desktopSiteURL",
            "_id"
        ]
    }
});