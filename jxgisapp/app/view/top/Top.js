/**
 * Created by winnerlbm on 2018/5/12.
 */
Ext.define('jxgisapp.view.top.Top', {
    extend: 'Ext.Container',

    requires: [
        'Ext.button.Segmented',
        'Ext.layout.container.HBox',
        'jxgisapp.view.top.TopController',
        'jxgisapp.view.top.TopModel'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'top',

    viewModel: {
        type: 'top'
    },

    controller: 'top',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'middle'
    },
    items: [
        /* include child components here */
        {
            xtype: 'segmentedbutton',
            flex: 1,
            reference: 'sysMenuRef',
            allowMultiple: false,
            defaults: {
                scale: 'small',
                border: false
            },
            items: []
        }
    ]
});