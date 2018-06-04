/**
 * Created by LBM on 2018/2/8.
 */
var cu = {
    title: '江西GIS功能',//系统标题
    serviceUrl: 'http://localhost:7080/jxgisapp/',//系统服务地址
    moduleList: null,//系统模块列表
    pageSize: 10,//分页查询页面大小
    sysConfigUrl: 'resources/config/SystemConfig.json',
    sysModuleUrl: 'resources/config/SystemModule.json',
    map: null,//地图对象
    mapView: null//地图视图对象
};
Ext.define('jxgisapp.utils.ConstUtil', {});