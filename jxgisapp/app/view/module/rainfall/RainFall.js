/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.rainfall.RainFall', {
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
        'jxgisapp.view.module.rainfall.RainFallController',
        'jxgisapp.view.module.rainfall.RainFallModel'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'rainfall',

    viewModel: {
        type: 'rainfall'
    },

    controller: 'rainfall',
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
            reference: 'querywlStartDate',
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
            reference: 'querywlEndDate',
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
                    id: 'rainfallKeyWordId',
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
            items: [
                {
                    xtype: 'image',
                    src: 'resources/img/10.png',
                    width: 15,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: '10',
                    margin: '0 5 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/25.png',
                    width: 15,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: '25',
                    margin: '0 5 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/50.png',
                    width: 15,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: '50',
                    margin: '0 5 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/100.png',
                    width: 15,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: '100',
                    margin: '0 5 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/250.png',
                    width: 15,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: '250',
                    margin: '0 5 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/500.png',
                    width: 15,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: '>250',
                }
            ]
        },
        {
            xtype: 'gridpanel',
            title: '雨量列表[单位:毫米]',
            id: "rainfallGrid",
            flex: 1,
            scrollable: true,
            columns: [
                {text: '测站', dataIndex: 'name', flex: 1},
                {text: '雨量', dataIndex: 'level', flex: 1},
            ],
            store: {
                proxy: {
                    type: 'ajax',
                    url: 'resources/json/rainfall.json'//TODO 2018-04-23---测试本地数据加载，加载后台服务需要屏蔽该行代码。
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
})
;