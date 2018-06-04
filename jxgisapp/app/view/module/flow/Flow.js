/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.flow.Flow', {
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
        'jxgisapp.view.module.flow.FlowController',
        'jxgisapp.view.module.flow.FlowModel'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'flow',

    viewModel: {
        type: 'flow'
    },

    controller: 'flow',
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
            reference: 'queryFlowStartDate',
            emptyText: '请选择起始时间',
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
                    id: 'flowKeyWordId',
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
            title: '流量列表[单位:m³/s]',
            id: "flowGrid",
            flex: 1,
            scrollable: true,
            columns: [
                {text: '测站', dataIndex: 'name', flex: 1},
                {text: '流量', dataIndex: 'rate', flex: 1},
            ],
            store: {
                proxy: {
                    type: 'ajax',
                    url: 'resources/json/flow.json'//TODO 2018-04-23---测试本地数据加载，加载后台服务需要屏蔽该行代码。
                    //  url: conf.serviceRootUrl+'rtmdata'
                },
                autoLoad: false,
            },
            selModel: 'rowmodel',
            listeners: {
                rowclick: 'rowclickHandler'
            }
        }
    ],
    listeners:
        {
            afterrender: 'afterrenderHandler',
        }
});