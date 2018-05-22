/**
 * Created by LBM on 2018/2/7.
 */
Ext.define('jxgisapp.view.right.Right', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.data.TreeStore',
        'Ext.data.proxy.Ajax',
        'Ext.layout.container.Card',
        'Ext.layout.container.Fit',
        'Ext.layout.container.VBox',
        'Ext.tree.Panel',
        'jxgisapp.utils.WrapUtil',
        'jxgisapp.view.right.RightController',
        'jxgisapp.view.right.RightModel'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'right',
    border: true,

    viewModel: {
        type: 'right'
    },

    controller: 'right',

    layout: {
        type: 'fit'
    },
    items: [
        {
            xtype: 'warputil',
            reference: 'rightModuleContainerWrap',
            layout: {
                type: 'card',
                anchor: '100%'
            }
        }
    ]
});