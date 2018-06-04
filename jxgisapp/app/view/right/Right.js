/**
 * Created by LBM on 2018/2/7.
 */
Ext.define('jxgisapp.view.right.Right', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.layout.container.Card',
        'Ext.layout.container.VBox',
        'jxgisapp.utils.WrapUtil',
        'jxgisapp.view.right.RightController',
        'jxgisapp.view.right.RightModel'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'right',
    border: true,
    width: 300,

    viewModel: {
        type: 'right'
    },

    controller: 'right',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'warputil',
            flex: 1,
            reference: 'rightModuleContainerWrap',
            layout: {
                type: 'card',
                anchor: '100%'
            }
        }
    ]
});