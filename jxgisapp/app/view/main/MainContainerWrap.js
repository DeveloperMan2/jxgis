Ext.define('jxgisapp.view.main.MainContainerWrap', {
    extend: 'Ext.container.Container',
    xtype: 'maincontainerwrap',

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
