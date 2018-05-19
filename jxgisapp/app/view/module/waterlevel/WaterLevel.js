/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.waterlevel.WaterLevel', {
    extend: 'Ext.Container',

    requires: [
        'jxgisapp.view.module.waterlevel.WaterLevelModel',
		'jxgisapp.view.module.waterlevel.WaterLevelController'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'waterlevel',

    viewModel: {
        type: 'waterlevel'
    },

    controller: 'waterlevel',

    items: [
        /* include child components here */
        {
            html:'水位信息'
        }
    ]
});