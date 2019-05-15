/**
 * Created by winnerlbm on 2018/5/12.
 */
Ext.define('jxgisapp.view.map.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.map',
    requires: [
        'Ext.window.Window',
        'Ext.ux.IFrame'
    ],
    labelInfoWindow: null,
    initMap: function (mapId) {
        let me = this;
        require(
            [
                "esri/Map",
                "esri/views/MapView",
                "esri/layers/TileLayer",
                "esri/geometry/SpatialReference",
                "esri/geometry/Extent",
                "esri/config",
                "esri/layers/MapImageLayer",
                "esri/geometry/Point",
                "dojo/domReady!"
            ], function (Map, MapView, TileLayer, SpatialReference, Extent, esriConfig, MapImageLayer, Point) {
                var appMap = new Map(
                    /*{
                        basemap: 'satellite'
                    }*/
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
                    /*,
                    spatialReference: new SpatialReference(4490)*/
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

                // Get the screen point from the view's click event
                mapView.on("click", function (event) {
                    let screenPoint = {
                        x: event.x,
                        y: event.y
                    };

                    let mapPot = mapView.toMap(screenPoint);
                    console.log("x=" + mapPot.x + ",y=" + mapPot.y);

                    // Search for graphics at the clicked location
                    mapView.hitTest(screenPoint).then(function (response) {
                        if (response.results.length) {
                            let graphic = response.results.filter(function (result) {
                                // check if the graphic belongs to the layer of interest
                                return result.graphic.layer === cu.layer.labelLayer;
                            })[0].graphic;
                            // do something with the result graphic
                            console.log(graphic.attributes);
                            let attrs = graphic.attributes;
                            if (attrs) {
                                let name = attrs['name'], url = attrs['url'];
                                //me.createPopupWindow(name, url, '加载中...', 1000, me);
                                window.open(url, '_self');
                            }
                        }
                    });
                });
            });
    },
    loadHtmlContent: function (iframe, url, mask, message, millisecond) {
        if (mask) {
            let loadMask = new Ext.LoadMask(iframe, {
                msg: message,
                style: {
                    width: '100%',
                    height: '100%',
                    background: '#FFFFFF'
                }
            });
            loadMask.show();
            Ext.defer(function () {
                loadMask.hide();
            }, millisecond);
        }

        iframe.load(url);
    },
    createPopupWindow: function (name, url, msg, time, me) {
        if (me.labelInfoWindow == null) {
            me.labelInfoWindow = Ext.create('Ext.window.Window', {
                ui: 'window-panel-ui',
                iconCls: 'fa fa-info-circle',
                closeToolText: '关闭',
                layout: 'fit',
                bodyPadding: 0,
                header: {
                    padding: '0 5 0 0'
                },
                border: false,
                frame: false,
                modal: true,
                scrollable: false,
                resizable: false,
                constrain: true,
                closable: true,
                draggable: false,
                closeAction: 'hide',
                items: [
                    {
                        xtype: 'uxiframe',
                        id: 'labelInfoFrameId',
                        loadMask: true,
                        listeners: {
                            afterrender: function (uxif, eOpts) {
                                me.loadHtmlContent(uxif, url, true, msg, time);
                                uxif.updateLayout();
                            },
                            scope: this
                        }
                    }
                ],
                listeners: {
                    close: function () {
                        let uxif = Ext.getCmp('labelInfoFrameId');
                        me.loadHtmlContent(uxif, 'about:blank', true, '', 0);
                        uxif.updateLayout();
                    }
                }
            });
        } else {
            let uxif = Ext.getCmp('labelInfoFrameId');
            me.loadHtmlContent(uxif, url, true, msg, time);
            uxif.updateLayout();
        }

        let bodyDom = Ext.getBody().dom;
        me.labelInfoWindow.setWidth(bodyDom.clientWidth);
        me.labelInfoWindow.setHeight(bodyDom.clientHeight);
        me.labelInfoWindow.setTitle(name);
        me.labelInfoWindow.show();
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

        if (this.labelInfoWindow) {
            this.labelInfoWindow.setWidth(width);
            this.labelInfoWindow.setHeight(height);
        }
    },

    /**
     * Called when the view is created
     */
    init: function () {

    }
});