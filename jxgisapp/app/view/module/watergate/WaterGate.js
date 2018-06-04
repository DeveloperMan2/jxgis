/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.watergate.WaterGate', {
    extend: 'Ext.Container',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.data.proxy.Ajax',
        'Ext.form.Label',
        'Ext.form.field.Date',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.selection.RowModel',
        'jxgisapp.view.module.watergate.WaterGateController',
        'jxgisapp.view.module.watergate.WaterGateModel'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'watergate',

    viewModel: {
        type: 'watergate'
    },

    controller: 'watergate',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    margin: '5 5 5 5',
    items: [
        {
            xtype: 'datefield',
            fieldLabel: '时间',
            format: 'Y-m-d',
            labelWidth: 60,
            reference: 'queryGateStartDate',
            emptyText: '请选择时间',
            allowBlank: false,
            value: new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate()) - 1),
            maxValue: new Date()
        },
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
                    html: '测站名称:',
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'textfield',
                    id: 'gateKeyWordId',
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
            title: '闸门列表',
            id: "gateGrid",
            flex: 1,
            scrollable: true,
            columns: [
                {text: '测站', dataIndex: 'name', flex: 1},
                {text: '开启度(m)', dataIndex: 'level', flex: 1},
                {text: '闸上水位(m)', dataIndex: 'warnlevel', flex: 1},
                {text: '闸下水位(m)', dataIndex: 'xxlevel', flex: 1},
                {text: '流量(m³/s)', dataIndex: 'rate', flex: 1},
            ],
            store: {
                proxy: {
                    type: 'ajax',
                    url: 'resources/json/watergate.json'//TODO 2018-04-23---测试本地数据加载，加载后台服务需要屏蔽该行代码。
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