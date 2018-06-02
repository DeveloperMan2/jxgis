/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.evaporator.Evaporator', {
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
        'jxgisapp.view.module.evaporator.EvaporatorController',
        'jxgisapp.view.module.evaporator.EvaporatorModel'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'evaporator',

    viewModel: {
        type: 'evaporator'
    },

    controller: 'evaporator',

    layout: {
        type: 'vbox',
        align: 'left'
    },
    margin: '5 5 5 5',
    items: [
        {
            xtype: 'datefield',
            fieldLabel: '开始时间',
            format: 'Y-m-d',
            labelWidth: 60,
            reference: 'queryDate',
            emptyText: '请选择起始时间',
            allowBlank: false,
            value: new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate())-1),
            maxValue: new Date()
        },
        {
            xtype: 'datefield',
            fieldLabel: '结束时间',
            format: 'Y-m-d',
            labelWidth: 60,
            reference: 'queryDate',
            emptyText: '请选择起始时间',
            allowBlank: false,
            value: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            maxValue: new Date()
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    html: '测站名称:',
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'textfield',
                    id: 'waterLevelKeyWordId',
                    name: 'stationNm',
                    width: 170,
                    margin: '0 10 0 0'
                }
            ]
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'center',
            },
            width: '100%',
            items: [
                {
                    xtype: 'button',
                    html: '查询',
                    margin: '10 0 10 0 '
                }
            ]
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'center',
            },
            width: '100%',
            items: [
                {
                    xtype: 'image',
                    src: 'resources/img/zf/40.png',
                    width: 15,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: '40',
                    margin: '0 5 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/zf/50.png',
                    width: 15,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: '50',
                    margin: '0 5 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/zf/60.png',
                    width: 15,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: '60',
                    margin: '0 5 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/zf/70.png',
                    width: 15,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: '70',
                    margin: '0 5 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/zf/80.png',
                    width: 15,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: '>70',
                    margin: '0 5 0 0 '
                }
            ]
        }, {
            xtype: 'grid',
            title: '蒸发量列表[单位:毫米]',
            id: "waterLevelGrid",
            columns: [
                {text: '测站', dataIndex: 'name', flex: 1},
                {text: '蒸发量', dataIndex: 'level', flex: 1},
            ],
            autoLoad: false,
            store: {
                proxy: {
                    type: 'ajax',
                    url: 'resources/json/waterlevel.json'//TODO 2018-04-23---测试本地数据加载，加载后台服务需要屏蔽该行代码。
                    //  url: conf.serviceRootUrl+'rtmdata'
                },
                autoLoad: false,
            },
            height: '100%',
            width: '100%',
            selModel: 'rowmodel'
        }
    ],
    listeners:
        {
            afterrender: 'afterrenderHandler',
        }
})
;