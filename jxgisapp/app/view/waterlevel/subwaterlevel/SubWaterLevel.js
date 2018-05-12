/**
 * Created by winnerlbm on 2018/5/12.
 */
Ext.define('jxgisapp.view.waterlevel.subwaterlevel.SubWaterLevel', {
    extend: 'Ext.Container',

    requires: [
        'jxgisapp.view.waterlevel.subwaterlevel.SubWaterLevelModel',
        'jxgisapp.view.waterlevel.subwaterlevel.SubWaterLevelController'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'subwaterlevel',


    viewModel: {
        type: 'subwaterlevel'
    },

    controller: 'subwaterlevel',

    items: [
        /* include child components here */
        {
            html: '水位信息子模块'
        }
    ]
});