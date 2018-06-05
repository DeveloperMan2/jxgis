/**
 * Created by winnerlbm on 2018/5/12.
 */
Ext.define('jxgisapp.view.map.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.map',

    initMap: function (mapId) {
        var me = this;
        require(
            [
                "esri/Map",
                "esri/views/MapView",
                "esri/layers/TileLayer",
                "esri/geometry/SpatialReference",
                "esri/geometry/Extent",
                "dojo/domReady!"
            ], function (Map, MapView,TileLayer,SpatialReference,Extent) {
                var appMap = new Map({
                  //  basemap: 'satellite'
                });
                //二维地图
                var mapView = new MapView({
                    container: mapId,
                    map: appMap,
                    // zoom: 10,
                    // center: [115.89, 28.68],
                    constraints: {
                        rotationEnabled: false
                    }
                });

                var baseLayer = new TileLayer({url:cu.baseMapUrl});
                var ext = new Extent({
                    xmin: cu.extentLeft,
                    ymin: cu.extentBottom,
                    xmax: cu.extentRight,
                    ymax: cu.extentTop,
                });
                mapView.extent = ext;
                appMap.add(baseLayer);
                //去掉默认的地图缩放工具及地图底部版权信息
                mapView.ui.remove(["zoom", 'attribution']);

                //全局存储
                cu.map = appMap;
                cu.mapView = mapView;
            });
    },

    afterrenderHandler: function () {
        this.initMap('mapContainerId');
    },
    resizeHandler: function (con, width, height, oldWidth, oldHeight, eOpts) {
        //更新地图尺寸
        var mainMapDom = Ext.getDom('mapContainerId');
        if (mainMapDom) {
            mainMapDom.style.width = width + 'px';
            mainMapDom.style.height = height + 'px';
        }
    },

    /**
     * Called when the view is created
     */
    init: function () {

    }
});