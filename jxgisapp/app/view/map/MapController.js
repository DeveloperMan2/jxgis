/**
 * Created by winnerlbm on 2018/5/12.
 */
Ext.define('jxgisapp.view.map.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.map',

    initMap: function (mapId) {
        require(
            [
                "esri/Map",
                "esri/views/MapView",
                "esri/layers/TileLayer",
                "esri/geometry/SpatialReference",
                "esri/geometry/Extent",
                "esri/config",
                "esri/layers/MapImageLayer",
                "dojo/domReady!"
            ], function (Map, MapView, TileLayer, SpatialReference, Extent, esriConfig, MapImageLayer) {
                var appMap = new Map(
                //     {
                //     basemap: 'satellite'
                // }
                );
                //二维地图
                var mapView = new MapView({
                    container: mapId,
                    map: appMap,
                    /*zoom: 10,
                    center: [115.89, 28.68],*/
                    constraints: {
                        rotationEnabled: false
                    }
                });

                //todo 2018-08-26 暂时注释
                if (cu.config.baseMapUrl.length > 0) {
                    Ext.Array.forEach(cu.config.baseMapUrl, function (item, index, all) {
                        var baseLayer = null;
                        if (item.tile == true) {
                            baseLayer = new TileLayer({url: item.url});
                        } else {
                            baseLayer = new MapImageLayer({url: item.url});
                        }
                        appMap.add(baseLayer);
                    })

                }

                var ext = new Extent({
                    xmin: cu.config.extentLeft,
                    ymin: cu.config.extentBottom,
                    xmax: cu.config.extentRight,
                    ymax: cu.config.extentTop,
                    spatialReference: {
                         wkid: 4490
                        //wkid: 4326
                    }
                });
                mapView.extent = ext;
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