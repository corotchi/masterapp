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

    onMainInit: function (viewport) {
        viewport.element.dom.addEventListener('click', function(e) {

            var target = Ext.get(e.target);
            var targetLink = (target.getAttribute('href')) ? e.target : target.parent('a', true);
            if (!targetLink) return;

            var targetLinkUrl = (targetLink.href) ? targetLink.href : false;

            if (targetLinkUrl) {
                var nativeHref;
                // Pdf viewer android
                if ( Ext.os.name.toLowerCase() === 'android' && targetLinkUrl.toLowerCase().indexOf('.pdf') != -1 ) {
                    targetLinkUrl = 'http://docs.google.com/viewer?url=' + targetLinkUrl;
                }
                else {
                    // Native links detection
                    var nativeHrefAttrs = [
                        'webcal:',
                        'mailto:',
                        'tel:',
                        'http://maps',
                        'DownloadICal'
                    ];
                    Ext.each(nativeHrefAttrs, function( attr, index ) {
                        if( targetLinkUrl.indexOf(attr) != -1 ) {
                            nativeHref = true;
                            return;
                        }
                    });
                }
                if( !nativeHref ) {
                    e.preventDefault();
                    var ref = window.open(targetLinkUrl, '_blank', 'location=yes');
                }
            }
        }, false);
    }

});