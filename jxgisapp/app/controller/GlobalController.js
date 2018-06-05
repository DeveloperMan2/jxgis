/**
 * Created by LBM on 2018/2/7.
 */
Ext.define('jxgisapp.controller.GlobalController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.button.Button'
    ],

    config: {
        //Uncomment to add references to view components
        refs: [
            {
                ref: 'rightView',
                selector: 'right'
            },
            {
                ref: 'topView',
                selector: 'top'
            },
            {
                ref: 'mainView',
                selector: 'main'
            }
        ],
        //Uncomment to listen for events from view components
        control: {
            'main': {
                afterrender: function (view, eOpts) {
                    //加载配置文件
                    this.getSystemConfig(this);
                }
            }
        }
    },

    //加载配置信息
    getSystemConfig: function (me) {
        var params = {};

        function successCallBack(response, opts) {
            //查询结果转json对象
            var result = Ext.JSON.decode(decodeURIComponent((response.responseText)), true);
            if (result) {
                var title = result['title'];//系统标题
                var serviceUrl = result['serviceUrl'];//系统服务地址
                var pageSize = result['pageSize'];//分页查询页面大小
                var waterlevelMapUrl = result['waterlevelMapUrl'];//站点查询地址
                var baseMapUrl = result['baseMapUrl'];//地图底图地址
                var extentLeft = result['extentLeft'];
                var extentBottom = result['extentBottom'];
                var extentRight = result['extentRight'];
                var extentTop = result['extentTop'];

                //存储系统配置
                cu.title = title;
                cu.serviceUrl = serviceUrl;
                cu.pageSize = pageSize;
                cu.waterlevelMapUrl = waterlevelMapUrl;
                cu.baseMapUrl = baseMapUrl;
                cu.extentLeft = extentLeft;
                cu.extentBottom = extentBottom;
                cu.extentRight = extentRight;
                cu.extentTop = extentTop;

                //设置系统标题
                document.title = cu.title;

                //加载模块列表
                me.getModuleList(me);
            }
        }

        function failureCallBack(response, opts) {
        }

        ajax.fn.execute(params, 'GET', cu.sysConfigUrl, successCallBack, failureCallBack);
    },
    //加载模块信息
    getModuleList: function (me) {
        var params = {};

        function successCallBack(response, opts) {
            //查询结果转json对象
            var result = Ext.JSON.decode(decodeURIComponent((response.responseText)), true);
            if (result) {
                cu.moduleList = result['sysMenus'];//全局存储模块列表
                me.initSystemMenu(result['sysMenus'], me);
            }
        }

        function failureCallBack(response, opts) {
        }

        ajax.fn.execute(params, 'GET', cu.sysModuleUrl, successCallBack, failureCallBack);
    },

    //初始化系统菜单
    initSystemMenu: function (menus, me) {
        var tv = me.getTopView();
        var sysMenuCmp = tv.down("segmentedbutton");
        if (menus && menus.length > 0) {
            var sysMenuItems = [];
            //解析系统菜单配置参数
            Ext.each(menus, function (rec) {
                if (rec != null) {
                    var menuItem = Ext.create('Ext.button.Button', {
                        id: rec['id'],
                        text: rec['text'],
                        value: rec['url'],
                        pressed: rec['selected'],
                        hidden: rec['hide'],
                        iconCls: rec['icon']
                    });
                    menuItem['init'] = rec['init'];
                    menuItem['moduleWidth'] = rec['width'];
                    if (rec['subModule']) {
                        menuItem['subModuleParams'] = rec['subModule'];
                    }
                    sysMenuItems.push(menuItem);

                    //若需要初始化模块
                    if (menuItem['init'] === true) {
                        var module = {
                            id: 'module_' + menuItem['id'],
                            text: menuItem['text'],
                            url: menuItem['value'],
                            width: menuItem['moduleWidth'],
                            moduleExtraParams: menuItem['subModuleParams'] != null ? menuItem['subModuleParams'] : null
                        };
                        me.loadModule(module);
                    }
                }
            });

            if (sysMenuCmp) {
                sysMenuCmp.removeAll();
                sysMenuCmp.add(sysMenuItems);
                sysMenuCmp.on('toggle', me.menuToggleHandler, me);
            }
        }
    },
    menuToggleHandler: function (container, button, pressed) {
        if (pressed) {
            var module = {
                id: 'module_' + button['id'],
                text: button['text'],
                url: button['value'],
                width: button['moduleWidth'],
                moduleExtraParams: button['subModuleParams'] != null ? button['subModuleParams'] : null
            };
            this.loadModule(module);
        }
    },
    loadModule: function (module) {
        //右侧面板加载模块
        var rv = this.getRightView();
        var rvc = rv.getController();
        rv.setWidth(module['width']);
        rvc.redirectTo(module['url']);
        rv.updateLayout();

        //加载子模块
        var subModule = module['moduleExtraParams'];
        if (subModule) {
            //设置面板高度
            var subPanel = Ext.getCmp('bottomModuleContainerWrapId');
            if (subPanel) {
                subPanel.setHeight(subModule['height']);
            }

            //隐藏主容器中已加载的模块
            if (subPanel.items.items && subPanel.items.items.length > 0) {
                for (var i = 0; i < subPanel.items.items.length; i++) {
                    var mWidget = subPanel.items.items[i];
                    mWidget.hide();
                }
            }

            if (subModule['init']) {
                var tempWidget = subPanel.getComponent(subModule['id']);
                if (tempWidget) {
                    tempWidget.show();
                } else {
                    tempWidget = new Ext.create('widget.' + subModule['url'], {id: subModule['id']});
                    subPanel.add(tempWidget);
                }
            } else {
                subPanel.setHidden(true);
            }


            subPanel.updateLayout();
        }
    },

    /**
     * Called when the view is created
     */
    init: function () {

    }
})
;