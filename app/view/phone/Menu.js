Ext.define('Q4App.view.phone.Menu',{
    extend: 'Ext.Container',
    xtype: 'mainmenu',
    config: {
        cls: 'mainmenu',
        docked: 'left',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 0,
        width: 65,
        open: false,
        scrollable: 'vertical',
        defaultType: 'button',
        defaults: {
            textAlign: 'left'
        },
        items: [
            {
                html: '<img src="resources/images/q4-logo.png" alt="logo"  />',
                id: 'home'
            },
            {
                iconCls: 'back',
                hidden: true,
                id: 'back'
            },
            {
                iconCls: 'back',
                hidden: true,
                id: 'backDetails'
            },
            {
                iconCls: 'sort',
                id: 'sort'
            },
            {
                iconCls: 'bookmark',
                id: 'bookmark'
            },
            {
                iconCls: 'settings',
                id: 'settings'
            },
        ]
    },

    setParent: function(parent) {
        this.callParent(arguments);
        this.maskCmp = parent.add({
            xtype   : 'component',
            cls     : 'mainmenu-mask',
            top     : 0,
            zIndex  : 5000,
            hidden  : true,
            width   : 9999,
            left    : this.getWidth(),
            bottom  : 0
        });

        this.maskCmp.element.on({
            scope   : this,
            touchend: 'onMaskRelease'
        });
    },

    onMaskRelease: function() {
        this.setOpen(false);
    },

    onDertstroy: function() {
        this.maskCmp.destroy();
        delete this.maskCmp;

        this.callParent(arguments);
    },

    toggle: function() {
        this.setOpen(!this.getOpen());
    },

    updateOpen: function(open) {
        var targetEl,
            parentCt = this.up();

        if (!parentCt) {
            return;
        }

        targetEl = parentCt.innerElement;

        if (open) {
            targetEl.translate(this.getWidth(), 0, 0);
            this.maskCmp.show();
        }
        else {
            targetEl.translate(0, 0, 0);
            this.maskCmp.hide();
        }
    }
});