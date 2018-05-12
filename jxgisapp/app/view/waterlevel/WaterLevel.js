/**
 * Created by winnerlbm on 2018/5/12.
 */
Ext.define('jxgisapp.view.waterlevel.WaterLevel', {
    extend: 'Ext.Container',

    requires: [
        'jxgisapp.view.waterlevel.WaterLevelModel',
        'jxgisapp.view.waterlevel.WaterLevelController'
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