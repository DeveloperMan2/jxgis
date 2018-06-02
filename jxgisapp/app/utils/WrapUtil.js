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
        me.minHeight = height - 30 ;//todo: 正式部署时当隐藏顶部的菜单栏，此处的30需要改为0
        me.callParent(arguments);
    }
});
