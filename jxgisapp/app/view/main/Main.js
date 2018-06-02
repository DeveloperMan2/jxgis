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
        'Ext.container.Container',
        'Ext.layout.container.Border',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.panel.Panel',
        'Ext.plugin.Viewport',
        'jxgisapp.utils.WrapUtil',
        'jxgisapp.view.main.MainController',
        'jxgisapp.view.main.MainModel',
        'jxgisapp.view.map.Map',
        'jxgisapp.view.right.Right',
        'jxgisapp.view.top.Top'
    ],
    controller: 'main',
    viewModel: 'main',
    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'top',
            hidden: false //todo: 正式部署时需要隐藏顶部的菜单栏，通过模块ID路由
        },
        {
            region: 'center',
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'map',
                            flex: 1
                        },
                        {
                            xtype: 'panel',
                            id: 'bottomModuleContainerWrapId',
                            hidden: false
                        }
                    ]
                },
                {
                    xtype: 'right'
                }
            ]
        }
    ]
});
