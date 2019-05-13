/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.waterlevel.WaterLevel', {
    extend: 'Ext.Container',

    requires: [
        'Ext.Img',
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.data.proxy.Ajax',
        'Ext.form.Label',
        'Ext.form.field.Date',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.layout.container.HBox',
        'Ext.selection.RowModel',
        'jxgisapp.view.module.waterlevel.WaterLevelController',
        'jxgisapp.view.module.waterlevel.WaterLevelModel'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'waterlevel',

    viewModel: {
        type: 'waterlevel'
    },

    controller: 'waterlevel',
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
            formatText:'时间格式必须为:年-月-日',
            labelWidth: 60,
            reference: 'querywlDate',
            emptyText: '请选择起始时间',
            allowBlank: false,
            value: new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate())),
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
                    flex: 1,
                    margin: '0 0 0 0'
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
                    src: 'resources/img/normal.png',
                    margin: '0 10 0 0 ',
                    width: 6,
                    height: 18
                },
                {
                    xtype: 'label',
                    html: '正常',
                    margin: '0 10 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/blue.png',
                    html: '超警戒',
                    margin: '0 10 0 0 ',
                    width: 6,
                    height: 18
                },
                {
                    xtype: 'label',
                    html: '超警戒',
                    margin: '0 10 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/orange.png',
                    html: '超保证',
                    margin: '0 10 0 0 ',
                    width: 6,
                    height: 18
                },
                {
                    xtype: 'label',
                    html: '超保证',
                    margin: '0 10 0 0 '
                }
            ]
        },
        {
            xtype: 'gridpanel',
            title: '水位列表[单位:米]',
            id: "waterLevelGrid",
            flex: 1,
            scrollable: true,
            columns: [
                {
                    text: '测站', dataIndex: 'stnm', flex: 1,
                    menuDisabled: true,
                    resizable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    text: '时间', dataIndex: 'tm', flex: 1,
                    menuDisabled: true,
                    resizable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    text: '水位', dataIndex: 'z', flex: 1,
                    menuDisabled: true,
                    resizable: false,
                    sortable: false,
                    align: 'center'
                },
                {
                    text: '流量', dataIndex: 'q', flex: 1,
                    menuDisabled: true,
                    resizable: false,
                    sortable: false,
                    align: 'center'
                }
            ],
            store: {
                proxy: {
                    type: 'ajax'
                },
                autoLoad: false,
            },
            viewConfig: {
                // getRowClass: function (record, rowIndex, rowParams, store) {
                //     var cls = "";
                //     var level = record.get("level");
                //     var warnLevel = record.get("warnlevel");
                //     var xxLevel = record.get("xxlevel");
                //     if (level > warnLevel) {
                //         cls = 'x-grid-row-blue';
                //     }
                //     if (level > xxLevel) {
                //         cls = 'x-grid-row-orange'
                //     }
                //     return cls;
                // }
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