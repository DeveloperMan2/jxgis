/**
 * Created by winnerlbm on 2019/5/13.
 */
Ext.define('jxgisapp.view.module.index.IndexController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.index',
    requires: [
        'Ext.util.TaskManager'
    ],
    /**
     * Called when the view is created
     */
    init: function () {

    },
    afterrenderHandler: function () {
        this.afterMapViewLoaded(this.moduleInit);
    },
    afterMapViewLoaded: function (handler) {
        let me = this;
        let task = {
            run: function () {
                if (cu.mapView && task) {
                    handler(me);
                    //销毁当前任务
                    Ext.TaskManager.stop(task);
                    task = null;
                }
            },
            interval: 100
        };

        Ext.TaskManager.start(task);
    },
    moduleInit: function (me) {
        me.queryLabelData();
    },
    queryLabelData: function () {
        let params = {};

        function successCallBack(response, opts) {
            //查询结果转json对象
            let result = Ext.JSON.decode(decodeURIComponent((response.responseText)), true);
            if (result) {
                //地图首页标绘
                let labels = geoUtil.json2geo(result, "geometry", "name");
                if (labels && labels.length > 0) {
                    geoUtil.drawPoint4Label(labels, true);
                }
            }
        }

        function failureCallBack(response, opts) {
        }

        ajax.fn.execute(params, 'GET', 'resources/json/label.json', successCallBack, failureCallBack);
    }
});