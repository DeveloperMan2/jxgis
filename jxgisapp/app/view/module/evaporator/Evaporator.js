/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.evaporator.Evaporator', {
    extend: 'Ext.Container',

    requires: [
        'jxgisapp.view.module.evaporator.EvaporatorModel',
		'jxgisapp.view.module.evaporator.EvaporatorController'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'evaporator',

    viewModel: {
        type: 'evaporator'
    },

    controller: 'evaporator',

    items: [
        /* include child components here */
    ]
});