/**
 * Created by winnerlbm on 2018/5/19.
 */

//用于测试的数据服务
//http://localhost:8090/ajs/doc/sdk/sample-code/layers-featurelayer-collection/live/data/week.geojson
Ext.define('jxgisapp.view.module.waterlevel.WaterLevelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.waterlevel',

    /**
     * Called when the view is created
     */
    init: function () {

    },
    /**todo-只要init属性设置为true的模块需要采用时间器的方式获取地图对象，其他模块均采用正常方式，在模块的afterrender事件中执行初始化等*/
    afterMapViewLoaded: function (handler) {
        var task = {
            run: function () {
                if (cu.mapView) {
                    handler();
                    //销毁当前任务
                    Ext.TaskManager.stop(task);
                    task = null;
                }
            },
            interval: 100
        };

        Ext.TaskManager.start(task);
    },
    afterrenderHandler: function () {
        this.afterMapViewLoaded(this.moduleInit);
    },
    moduleInit: function () {
        alert('当主模块地图初始化完成之后执行该模块初始化，如模块对应的图层加载、数据查询等。。。');
    }
});