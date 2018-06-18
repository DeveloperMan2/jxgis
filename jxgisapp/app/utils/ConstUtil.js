/**
 * Created by LBM on 2018/2/8.
 */
var cu = {
    config:null,//配置文件对象
    reservoirInfoWindow:null,
    moduleList: null,//系统模块列表
    sysConfigUrl: 'resources/config/SystemConfig.json',
    sysModuleUrl: 'resources/config/SystemModule.json',
    map: null,//地图对象
    mapView: null,//地图视图对象

    //TODO 2018-04-24---创建弹出面板
    createPopupWindow : function(name, url, msg, time) {
        var me = this;
        if (cu.reservoirInfoWindow == null) {
            cu.reservoirInfoWindow = Ext.create('Ext.window.Window', {
                iconCls : 'fa fa-info-circle',
                closeToolText : '关闭',
                layout : 'fit',
                bodyPadding : 0,
                header : {
                    padding : '0 5 0 0'
                },
                border : false,
                frame : false,
                modal : true,
                scrollable : false,
                resizable : false,
                constrain : true,
                closable : true,
                draggable : true,
                closeAction : 'hide',
                items : [{
                    xtype : 'uxiframe',
                    id : 'skInfoiFrameId',
                    loadMask : true,
                    listeners : {
                        afterrender : function(uxif, eOpts) {
                            me.loadHtmlContent(uxif, url, true, msg,
                                time);
                            uxif.updateLayout();
                        },
                        scope : this
                    }
                }],
                listeners : {
                    close : function() {
                        var uxif = Ext.getCmp('skInfoiFrameId');
                        me.loadHtmlContent(uxif, 'about:blank', true,
                            '', 0);
                        uxif.updateLayout();
                    }
                }
            });
        } else {
            var uxif = Ext.getCmp('skInfoiFrameId');
            me.loadHtmlContent(uxif, url, true, msg, time);
            uxif.updateLayout();
        }

        var bodyDom = Ext.getBody().dom;
        cu.reservoirInfoWindow.setWidth(bodyDom.clientWidth / 3 * 2);
        cu.reservoirInfoWindow.setHeight(bodyDom.clientHeight / 3 * 2);
        cu.reservoirInfoWindow.setTitle(name);
        cu.reservoirInfoWindow.show();
    },
    loadHtmlContent : function(iframe, url, mask, message, millisecond) {
        if (mask) {
            var loadMask = new Ext.LoadMask(iframe, {
                msg : message,
                style : {
                    width : '100%',
                    height : '100%',
                    background : '#FFFFFF'
                }
            });
            loadMask.show();
            Ext.defer(function() {
                loadMask.hide();
            }, millisecond);
        }

        iframe.load(url);
    }
};
Ext.define('jxgisapp.utils.ConstUtil', {});