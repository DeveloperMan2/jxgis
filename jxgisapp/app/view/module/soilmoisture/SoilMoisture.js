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
            fieldLabel: '时间',
            format: 'Y-m-d',
            labelWidth: 60,
            reference: 'querySoilMStartDate',
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
            xtype: 'gridpanel',
            title: '测站列表',
            id: "soilMGrid",
            flex: 1,
            scrollable: true,
            columns: [
                {text: '测站', dataIndex: 'name', flex: 1},
                {text: '平均含水量', dataIndex: 'level', flex: 1},
                {text: '10cm含水量', dataIndex: 'warnlevel', flex: 1},
                {text: '20cm含水量', dataIndex: 'xxlevel', flex: 1},
                {text: '100cm含水量', dataIndex: 'rate', flex: 1}
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