/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.watergate.WaterGate', {
    extend: 'Ext.Container',

    requires: [
        'jxgisapp.view.module.watergate.WaterGateModel',
		'jxgisapp.view.module.watergate.WaterGateController'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'watergate',

    viewModel: {
        type: 'watergate'
    },

    controller: 'watergate',

    items: [
        /* include child components here */
        {
            html:'闸门监测'
        }
    ]
});