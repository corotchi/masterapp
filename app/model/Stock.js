Ext.define('Q4App.model.Stock', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'Change',
            'PercChange',
            'HistoricalDate',
            'High',
            'High52',
            'Low',
            'Last',
            'Low52',
            'Open',
            'PreviousClose',
            'TradeDate',
            'TradePrice',
            'Volume'
        ]
    }
});