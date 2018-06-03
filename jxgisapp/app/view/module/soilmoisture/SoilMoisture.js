/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.soilmoisture.SoilMoisture', {
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
        'jxgisapp.view.module.soilmoisture.SoilMoistureController',
        'jxgisapp.view.module.soilmoisture.SoilMoistureModel'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'soilmoisture',

    viewModel: {
        type: 'soilmoisture'
    },

    controller: 'soilmoisture',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    margin: '5 5 5 5',
    items: [
        {
            xtype: 'datefield',
            fieldLabel: '开始时间',
            format: 'Y-m-d',
            labelWidth: 60,
            reference: 'querySoilMStartDate',
            emptyText: '请选择起始时间',
            allowBlank: false,
            value: new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate()) - 1),
            maxValue: new Date()
        },
        {
            xtype: 'datefield',
            fieldLabel: '结束时间',
            format: 'Y-m-d',
            labelWidth: 60,
            reference: 'querySoilMEndDate',
            emptyText: '请选择起始时间',
            allowBlank: false,
            value: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
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
                    id: 'soilMKeyWordId',
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
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'center',
            },
            defaults: {
                width: 30,
                height: 20
            },
            items: [
                {
                    xtype: 'label',
                    html: '40',
                    margin: '1 1 1 1',
                    style: {
                        background: '#11ff65',
                        color: '#ffffff',
                        textAlign: 'center',
                        paddingTop: '2px'
                    }
                },
                {
                    xtype: 'label',
                    html: '50',
                    margin: '1 1 1 1',
                    style: {
                        background: '#1771ff',
                        color: '#ffffff',
                        textAlign: 'center',
                        paddingTop: '2px'
                    }
                },
                {
                    xtype: 'label',
                    html: '60',
                    margin: '1 1 1 1',
                    style: {
                        background: '#ffbc06',
                        color: '#ffffff',
                        textAlign: 'center',
                        paddingTop: '2px'
                    }
                },
                {
                    xtype: 'label',
                    html: '70',
                    margin: '1 1 1 1',
                    style: {
                        background: '#ff0dde',
                        color: '#ffffff',
                        textAlign: 'center',
                        paddingTop: '2px'
                    }
                },
                {
                    xtype: 'label',
                    html: '>70',
                    margin: '1 1 1 1',
                    style: {
                        background: '#ff0000',
                        color: '#ffffff',
                        textAlign: 'center',
                        paddingTop: '2px'
                    }
                }
            ]
        },
        {
            xtype: 'gridpanel',
            title: '测站列表[单位:百分比]',
            id: "soilMGrid",
            flex: 1,
            scrollable: true,
            columns: [
                {text: '测站', dataIndex: 'name', flex: 1},
                {text: '干旱指数', dataIndex: 'rate', flex: 1},
            ],
            store: {
                proxy: {
                    type: 'ajax',
                    url: 'resources/json/soilm.json'//TODO 2018-04-23---测试本地数据加载，加载后台服务需要屏蔽该行代码。
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