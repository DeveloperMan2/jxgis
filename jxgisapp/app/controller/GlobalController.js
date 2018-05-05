/**
 * Created by LBM on 2018/2/7.
 */
Ext.define('jxgisapp.controller.GlobalController', {
    extend: 'Ext.app.Controller',

    config: {
        //Uncomment to add references to view components
        refs: [
            {
                ref: 'leftView',
                selector: 'left'
            },
            {
                ref: 'mainView',
                selector: 'main'
            }
        ],
        //Uncomment to listen for events from view components
        control: {
            'left': {
                afterrender: function (view, eOpts) {
                    //加载配置文件
                    this.getModuleList(view);
                }

            },
            '#moduleTreeId': {
                itemclick: function (tree, record, item, index, e, eOpts) {
                    var mv = this.getMainView();
                    if (mv && record) {
                        var mvc = mv.getController();
                        var moduleType = record.get("url");
                        var isLeaf = record.get('leaf');
                        if (mvc && moduleType && isLeaf) {
                            mvc.redirectTo(moduleType);
                        }
                    }
                }
            }
        }
    },

    //加载配置信息
    getModuleList: function (view) {
        var params = {};

        var mask = ajax.fn.showMask(view, '模块加载中...');

        function successCallBack(response, opts) {
            ajax.fn.hideMask(mask);
            //查询结果转json对象
            var result = Ext.JSON.decode(decodeURIComponent((response.responseText)), true);
            if (result) {
                var title = result['title'];//系统标题
                var serviceUrl = result['serviceUrl'];//系统服务地址
                var startModuleId = result['startModuleId'];//系统初始化启动模块
                var pageSize = result['pageSize'];//分页查询页面大小

                //存储系统配置
                cu.title = title;
                cu.serviceUrl = serviceUrl;
                cu.startModuleId = startModuleId;
                cu.pageSize = pageSize;

                //执行系统配置
                view.setTitle(title);
                document.title = title;
            }
        }

        function failureCallBack(response, opts) {
            ajax.fn.hideMask(mask);
        }

        ajax.fn.execute(params, 'GET', cu.sysConfigUrl, successCallBack, failureCallBack);
    },

    /**
     * Called when the view is created
     */
    init: function () {

    }
})
;