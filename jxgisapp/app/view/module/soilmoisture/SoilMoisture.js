/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.soilmoisture.SoilMoisture', {
    extend: 'Ext.Container',

    requires: [
        'jxgisapp.view.module.soilmoisture.SoilMoistureModel',
		'jxgisapp.view.module.soilmoisture.SoilMoistureController'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'soilmoisture',

    viewModel: {
        type: 'soilmoisture'
    },

    controller: 'soilmoisture',

    items: [
        /* include child components here */
        {
            html:'墒情信息'
        }
    ]
});