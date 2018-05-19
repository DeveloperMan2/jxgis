/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.watersupply.WaterSupply', {
    extend: 'Ext.Container',

    requires: [
        'jxgisapp.view.module.watersupply.WaterSupplyModel',
		'jxgisapp.view.module.watersupply.WaterSupplyController'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'watersupply',

    viewModel: {
        type: 'watersupply'
    },

    controller: 'watersupply',

    items: [
        /* include child components here */
    ]
});