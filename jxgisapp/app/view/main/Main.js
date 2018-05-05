/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('jxgisapp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'main',

    requires: [
        'Ext.layout.container.Border',
        'Ext.layout.container.Card',
        'Ext.plugin.Viewport',
        'jxgisapp.view.left.Left',
        'jxgisapp.view.main.MainContainerWrap',
        'jxgisapp.view.main.MainController',
        'jxgisapp.view.main.MainModel'
    ],
    controller: 'main',
    viewModel: 'main',
    listeners: {
        render: 'onMainViewRender'
    },
    layout: 'border',
    items: [
        {
            region: 'east',
            xtype: 'left',
            width: 300
        },
        {
            region: 'center',
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            layout: {
                type: 'card',
                anchor: '100%'
            }
        }
    ]
});
