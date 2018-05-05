/**
 * Created by LBM on 2018/2/7.
 */
Ext.define('jxgisapp.view.left.Left', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.data.TreeStore',
        'Ext.data.proxy.Ajax',
        'Ext.layout.container.VBox',
        'Ext.tree.Panel',
        'jxgisapp.view.left.LeftController',
        'jxgisapp.view.left.LeftModel'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'left',
    title: '',
    iconCls: 'fas fa-align-justify',//这里fa5字体库图标，如需要可以配置字体库，已经打包在模版代码中。
    border: true,

    viewModel: {
        type: 'left'
    },

    controller: 'left',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    margin: '0 0 0 0',
    scrollable: 'y',
    items: [{
        xtype: 'treepanel',
        id: 'moduleTreeId',
        rootVisible: false,
        useArrows: true,
        frame: false,
        bufferedRenderer: false,
        animate: true,
        rowLines: true,
        columnLines: true,
        singleExpand: false,
        expanderOnly: true,
        expanderFirst: false,
        itemRipple: true,
        store: {
            type: 'tree',
            folderSort: false,
            proxy: {
                type: 'ajax',
                url: cu.sysModuleUrl
            }
        }
    }]
});