Ext.define('Q4App.view.Overview', {
    extend: 'Ext.Panel',
    xtype: 'overview',
    config: {
        cls: 'CompanyOverview',
        items: [
            {
                cls: 'companyName',
                html: [
                    '<h2><span>NYSE:</span>Company Name Inc.</h2>'
                ].join('')
            },
            {
                cls: 'stockQuote',
                html: [
                    '<h4>Stock price</h4>',
                    '<h3><span>+</span>43.75</h3>',
                    '<h4>Change <span>+ 00.00</span></h4>',
                ].join('')
            },
            {
                id: 'overviewChart'
            }
        ]
    }
});
