/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.waterquality.WaterQuality', {
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
        'Ext.layout.container.VBox',
        'Ext.selection.RowModel',
        'jxgisapp.view.module.waterquality.WaterQualityController',
        'jxgisapp.view.module.waterquality.WaterQualityModel'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'waterquality',

    viewModel: {
        type: 'waterquality'
    },

    controller: 'waterquality',
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
            reference: 'queryQualityStartDate',
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
                    id: 'qualityKeyWordId',
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
                    xtype: 'image',
                    src: 'resources/img/sz/1.png',
                    width: 18,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: 'I,II类',
                    margin: '0 10 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/sz/3.png',
                    width: 18,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: 'III类',
                    margin: '0 10 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/sz/4.png',
                    width: 18,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: 'IV类',
                    margin: '0 10 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/sz/5.png',
                    width: 18,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: 'V类',
                    margin: '0 10 0 0 '
                }, {
                    xtype: 'image',
                    src: 'resources/img/sz/6.png',
                    width: 18,
                    height: 15
                },
                {
                    xtype: 'label',
                    html: '>V类',
                    margin: '0 10 0 0 '
                }
            ]
        },
        {
            xtype: 'gridpanel',
            title: '测站列表',
            id: "qualityGrid",
            flex: 1,
            scrollable: true,
            columns: [
                {text: '测站', dataIndex: 'name', flex: 1},
                {text: '水质级别', dataIndex: 'rank', flex: 1}
            ],
            store: {
                proxy: {
                    type: 'ajax',
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