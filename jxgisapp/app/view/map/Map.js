/**
 * Created by winnerlbm on 2018/5/12.
 */
Ext.define('jxgisapp.view.map.Map', {
    extend: 'Ext.Container',

    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Fit',
        'jxgisapp.view.map.MapController',
        'jxgisapp.view.map.MapModel'
    ],

    /*
    Uncomment to give this component an xtype */
    xtype: 'map',

    viewModel: {
        type: 'map'
    },

    controller: 'map',
    layout: 'fit',
    items: [
        /* include child components here */
        {
            xtype: 'container',
            id: 'mapParentContainerId',
            html: '<div id="mapContainerId" style="width: 100%;height: 100%;overflow: hidden;margin:0;position: relative;border: hidden;"></div>',
            margin: '0 0 0 0'
        }
    ],
    listeners: {
        afterrender: 'afterrenderHandler',
        resize: 'resizeHandler'
    }
});