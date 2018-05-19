/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.flow.Flow', {
    extend: 'Ext.Container',

    requires: [
        'jxgisapp.view.module.flow.FlowModel',
		'jxgisapp.view.module.flow.FlowController'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'flow',

    viewModel: {
        type: 'flow'
    },

    controller: 'flow',

    items: [
        /* include child components here */
    ]
});