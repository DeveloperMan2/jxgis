/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.rainfall.RainFall', {
    extend: 'Ext.Container',

    requires: [
        'jxgisapp.view.module.rainfall.RainFallModel',
		'jxgisapp.view.module.rainfall.RainFallController'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'rainfall',

    viewModel: {
        type: 'rainfall'
    },

    controller: 'rainfall',

    items: [
        /* include child components here */
    ]
});