/**
 * Created by LBM on 2018/2/8.
 */
Ext.define('jxgisapp.view.welcome.Welcome', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.Label',
        'Ext.layout.container.Fit',
        'jxgisapp.view.welcome.WelcomeController',
        'jxgisapp.view.welcome.WelcomeModel'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'welcome',

    viewModel: {
        type: 'welcome'
    },

    controller: 'welcome',
    layout: 'fit',
    margin: '0 0 0 0',
    bodyPadding: 0,
    items: [
        /* include child components here */
        {
            xtype: 'label',
            html: '<h1>欢迎使用GIS功能系统！</h1>'
        }
    ]
});