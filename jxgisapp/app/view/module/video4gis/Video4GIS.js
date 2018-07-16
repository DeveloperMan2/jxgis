/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.video4gis.Video4GIS', {
    extend: 'Ext.Container',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.data.proxy.Ajax',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.selection.RowModel',
        'jxgisapp.view.module.video4gis.Video4GISController',
        'jxgisapp.view.module.video4gis.Video4GISModel'
    ],

    /*
    Uncomment to give this component an xtype */
    xtype: 'video4gis',

    viewModel: {
        type: 'video4gis'
    },

    controller: 'video4gis',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    margin: '5 5 5 5',
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'label',
                    html: '视频站名称:',
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'textfield',
                    id: 'videoKeyWordId',
                    flex: 1
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'center',
            },
            items: [
                {
                    xtype: 'button',
                    html: '查询',
                    margin: '10 0 10 0 '
                }
            ]
        },
        {
            xtype: 'gridpanel',
            title: '视频列表',
            id: "videoGrid",
            flex: 1,
            scrollable: true,
            columns: [
                {text: '测站', dataIndex: 'name', flex: 1},
                {text: 'IP', dataIndex: 'ip', flex: 1},
            ],
            store: {
                proxy: {
                    type: 'ajax',
                    url: 'resources/json/video4gis.json'//TODO 2018-04-23---测试本地数据加载，加载后台服务需要屏蔽该行代码。
                    //  url: conf.serviceRootUrl+'rtmdata'
                },
                autoLoad: false,
            },
            selModel: 'rowmodel'
        }
    ],
    listeners:
        {
            afterrender: 'afterrenderHandler',
        }
});