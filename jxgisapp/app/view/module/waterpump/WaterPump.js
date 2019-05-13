/**
 */
Ext.define('jxgisapp.view.module.waterpump.WaterPump', {
    extend: 'Ext.Container',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.data.TreeStore',
        'Ext.data.proxy.Ajax',
        'Ext.form.FieldSet',
        'Ext.form.Label',
        'Ext.form.field.Date',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.selection.RowModel',
        'jxgisapp.view.module.waterpump.WaterPumpController',
        'jxgisapp.view.module.waterpump.WaterPumpModel'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'waterpump',

    viewModel: {
        type: 'waterpump'
    },

    controller: 'waterpump',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    margin: '5 5 5 5',
    items: [
    ],
    listeners:
        {
            afterrender: 'afterrenderHandler',
        }
});