/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.waterpump.WaterPumpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.waterpump',

    requires: [
        'Ext.util.TaskManager'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },
    afterrenderHandler: function () {
        //主模块地图加载完成之后执行当前模块初始化
        // var rightWrap = Ext.getCmp('rightConditionWrapId');
        // rightWrap.hidden = true;
        // rightWrap.setVisibility = false;
        // rightWrap.updateLayout();
        this.afterMapViewLoaded(this.moduleInit);
    },
    afterMapViewLoaded: function (handler) {
        var me = this;
        var task = {
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
    rowclickHandler: function (gp, record, element, rowIndex, e, eOpts) {
        //window.open('http://www.baidu.com');//todo 跳转页面
    },
    //模块初始化（重写）
    moduleInit: function (me) {
        //todo 2018-08-26 因测试需要暂时隐藏
        me.getWaterPumpData('resources/json/waterpump.json');
    },
    //根据配置创建水闸图层
    getWaterPumpData: function (url) {
        let params = {};

        //执行成功回调
        function successCallBack(response, opts) {
            //查询结果转json对象
            let result = Ext.JSON.decode(decodeURIComponent(response.responseText), true);
            if (result) {
                //地图标绘企业点
                let pumps = geoUtil.json2geo(result, "geometry", "name");
                if (pumps && pumps.length > 0) {
                    geoUtil.drawPoint4WaterPump(pumps, true);
                }
            }
        }

        //执行失败回调
        function failureCallBack(response, opts) {
        }

        ajax.fn.execute(params, 'GET', url, successCallBack, failureCallBack);
    }

});