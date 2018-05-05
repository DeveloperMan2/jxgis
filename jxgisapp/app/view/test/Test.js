/**
 * Created by LBM on 2018/2/8.
 */
Ext.define('jxgisapp.view.test.Test', {
    extend: 'Ext.Container',

    requires: [
        'Ext.container.Container',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Fill',
        'jxgisapp.view.test.TestController',
        'jxgisapp.view.test.TestModel'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'test',

    viewModel: {
        type: 'test'
    },

    controller: 'test',

    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    margin: '0 0 0 0',
    items: [
        /* include child components here */
                                {
            xtype: 'gridpanel',
            title: '',
            ui: '',
            margin: '0 0 0 0',
            flex: 1,
            hidden: false,
            border: true,
            columnLines: true,
            reserveScrollbar: true,
            multiSelect: false,
            scrollable: 'y',
            viewConfig: {
                stripeRows: false
            },
            listeners: {
                afterrender: 'gridRenderHandler'
            },
            columns: [
             	             {
	             	text: '资源分类ID',
	                flex: 1,
	                dataIndex: 'cClassifyId',
	                hideable: false,
	                menuDisabled: true,
	                resizable: false,
	                sortable: false,
	                align: 'center'
	             },             	             {
	             	text: '存储桶名',
	                flex: 1,
	                dataIndex: 'cText',
	                hideable: false,
	                menuDisabled: true,
	                resizable: false,
	                sortable: false,
	                align: 'center'
	             },             	             {
	             	text: '资源类型标识',
	                flex: 1,
	                dataIndex: 'cCode',
	                hideable: false,
	                menuDisabled: true,
	                resizable: false,
	                sortable: false,
	                align: 'center'
	             },             	             {
	             	text: '存储桶标识',
	                flex: 1,
	                dataIndex: 'cName',
	                hideable: false,
	                menuDisabled: true,
	                resizable: false,
	                sortable: false,
	                align: 'center'
	             },             	             {
	             	text: '存储桶所在区域',
	                flex: 1,
	                dataIndex: 'cLocation',
	                hideable: false,
	                menuDisabled: true,
	                resizable: false,
	                sortable: false,
	                align: 'center'
	             },             	             {
	             	text: '存储桶图标',
	                flex: 1,
	                dataIndex: 'cIconcls',
	                hideable: false,
	                menuDisabled: true,
	                resizable: false,
	                sortable: false,
	                align: 'center'
	             },             	             {
	             	text: '备注',
	                flex: 1,
	                dataIndex: 'cDescription',
	                hideable: false,
	                menuDisabled: true,
	                resizable: false,
	                sortable: false,
	                align: 'center'
	             },             	             {
	             	text: '父节点ID',
	                flex: 1,
	                dataIndex: 'cParentId',
	                hideable: false,
	                menuDisabled: true,
	                resizable: false,
	                sortable: false,
	                align: 'center'
	             },             	             {
	             	text: '子节点ID',
	                flex: 1,
	                dataIndex: 'cChildrenId',
	                hideable: false,
	                menuDisabled: true,
	                resizable: false,
	                sortable: false,
	                align: 'center'
	             }                          , {
                    xtype: 'actioncolumn',
                    text: '操作',
                    align: 'center',
                    sortable: false,
                    menuDisabled: true,
                    items: [
                    	{
                            iconCls: 'fas fa-info-circle greenCls',
                            tooltip: '详情',
                            action: 'detail',
                            handler: 'onDetailClick'
                        },
                        {
                            iconCls: 'fas fa-edit yellowCls',
                            tooltip: '编辑',
                            action: 'edit',
                            handler: 'onEditClick'
                        },
                        {
                            iconCls: 'fas fa-plus-circle yellowCls',
                            tooltip: '增加',
                            action: 'add',
                            handler: 'onAddClick'
                        },
                        {
                            iconCls: 'fas fa-minus-circle redCls',
                            tooltip: '删除',
                            action: 'remove',
                            handler: 'onRemoveClick'
                        }
                    ]
               }
                          ],
            leadingBufferZone: 8,
            trailingBufferZone: 8
        }
            ]
});