Ext.define('jxgisapp.utils.WrapUtil', {
    extend: 'Ext.container.Container',
    xtype: 'warputil',

    requires: [
        'Ext.layout.container.HBox'
    ],
    scrollable: 'y',
    layout: {
        type: 'hbox',
        align: 'stretchmax',
        animate: true,
        animatePolicy: {
            x: true,
            width: true
        }
    },
    beforeLayout: function () {
        var me = this,
            height = Ext.Element.getViewportHeight();
        me.minHeight = height;
        me.callParent(arguments);
    }
});
