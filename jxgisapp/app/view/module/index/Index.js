/**
 * Created by winnerlbm on 2019/5/13.
 */
Ext.define('jxgisapp.view.module.index.Index', {
    extend: 'Ext.Container',

    requires: [
        'jxgisapp.view.module.index.IndexModel',
        'jxgisapp.view.module.index.IndexController'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'index',

    viewModel: {
        type: 'index'
    },

    controller: 'index',

    items: [
        /* include child components here */
    ],
    listeners:
        {
            afterrender: 'afterrenderHandler'
        }
});