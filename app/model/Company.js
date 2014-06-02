Ext.define('Q4App.model.Company', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            "version",
            "live",
            "favorite",
            "apiKey",
            "clientLogo",
            "splashLogo",
            "siteUrl",
            "title",
            "shortName",
            "stock",
            "exchange",
            "symbol",
            "desktopSiteURL",
            "_id"
        ]
    }
});