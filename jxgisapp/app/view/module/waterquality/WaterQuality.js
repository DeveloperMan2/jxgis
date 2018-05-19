/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.waterquality.WaterQuality', {
    extend: 'Ext.Container',

    requires: [
        'jxgisapp.view.module.waterquality.WaterQualityModel',
		'jxgisapp.view.module.waterquality.WaterQualityController'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'waterquality',

    viewModel: {
        type: 'waterquality'
    },

    controller: 'waterquality',

    items: [
        /* include child components here */
    ]
});