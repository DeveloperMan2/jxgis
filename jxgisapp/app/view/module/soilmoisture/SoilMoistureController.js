/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.soilmoisture.SoilMoistureController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.soilmoisture',

    requires: [
        'Ext.util.TaskManager'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },
    //模块组件渲染完成
    afterrenderHandler: function () {
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
    //异步组件加载完成执行模块初始化
    moduleInit: function (me) {
        me.querySoilMData();
    },
    //查询数据
    querySoilMData: function () {
        var me = this;
        //加载统计信息
        var meView = this.getView();
        var st = meView.lookupReference('querySoilMStartDate').getRawValue();
        var et = meView.lookupReference('querySoilMEndDate').getRawValue();
        var keywords = Ext.getCmp('soilMKeyWordId').getValue();

        var gridCom = Ext.getCmp('soilMGrid');

        var store = gridCom.getStore();
        // store.proxy.url = conf.rtmdataUrl + 'rtmdata';//TODO 2018-04-23---本地数据加载暂时屏蔽，若需要加载后台服务数据，需要解除注释
        store.proxy.url = 'resources/json/soilm.json';
        store.load({
            params: {
                st: st,
                et: et,
                keywords: keywords
            }, //参数

            callback: function (records, options, success) {
                if (success) {
                    store.loadData(records);
                    gridCom.updateLayout();
                    me.loadSoilMLayer(records);
                }
            },
            scope: store,
            add: false
        });
    },
    //加载图层数据
    loadSoilMLayer: function (features) {
        require(
            [
                "esri/layers/FeatureLayer",
                "esri/symbols/PictureMarkerSymbol",
                "esri/Graphic",
                "esri/layers/GraphicsLayer",
                "dojo/domReady!"
            ], function (FeatureLayer, PictureMarkerSymbol, Graphic, GraphicsLayer) {
                // Create the PopupTemplate
                const popupTemplate = {
                    title: "蒸发站信息 ",
                    content: [{
                        type: "fields",
                        fieldInfos: [{
                            fieldName: "id",
                            label: "测站编码",
                            format: {
                                places: 0,
                                digitSeparator: true
                            }
                        }, {
                            fieldName: "name",
                            label: "测站名称",
                            format: {
                                places: 0,
                                digitSeparator: true
                            }
                        }, {
                            fieldName: "level",
                            label: "蒸发量",
                            format: {
                                places: 0,
                                digitSeparator: true
                            }
                        }]
                    }]
                };
                // points to the states layer in a service storing U.S. census data
                var stationLayer = new FeatureLayer({
                    url: cu.waterlevelMapUrl,
                    popupTemplate: popupTemplate
                });
                // var symbol = {
                //     type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                //     style: 'square',
                //     color: "blue",
                //     size: 8,
                //     outline: {  // autocasts as new SimpleLineSymbol()
                //         width: 0.5,
                //         color: "darkblue"
                //     }
                // }
                var graphicsLayer = new GraphicsLayer();
                cu.map.add(graphicsLayer);
                cu.map.add(stationLayer);  // adds the layer to the map
                // returns all the graphics from the layer view
                cu.mapView.whenLayerView(stationLayer).then(function (lyrView) {
                    lyrView.watch("updating", function (val) {
                        if (!val) {  // wait for the layer view to finish updating
                            lyrView.queryFeatures().then(function (results) {
                                Ext.Array.each(results, function (ft) {
                                    //添加测站名称
                                    var textSymbol = {
                                        type: "text",  // autocasts as new TextSymbol()
                                        color: "white",
                                        haloColor: "black",
                                        haloSize: "1px",
                                        text: "You are here",
                                        xoffset: 0,
                                        yoffset: -20,
                                        font: {  // autocast as new Font()
                                            size: 10,
                                            family: "宋体",
                                            weight: "normal"
                                        }
                                    };
                                    textSymbol.text = ft.getAttribute('name');
                                    var label = new Graphic(ft.geometry, textSymbol);
                                    graphicsLayer.add(label);

                                    Ext.Array.each(features, function (rd) {
                                        if (ft.getAttribute('Id').toString() == rd.data.id.toString()) {
                                            var symbol = new PictureMarkerSymbol();
                                            var flsymbol = stationLayer.renderer.symbol;
                                            symbol.height = 10;
                                            symbol.width = 10;
                                            symbol.type = flsymbol.type;
                                            if (rd.data.level < 40) {
                                                symbol.url = 'resources/img/zf/40.png';
                                            } else if (rd.data.level < 50) {
                                                symbol.url = 'resources/img/zf/50.png';
                                            } else if (rd.data.level < 60) {
                                                symbol.url = 'resources/img/zf/60.png';
                                            } else if (rd.data.level < 70) {
                                                symbol.url = 'resources/img/zf/70.png';
                                            } else if (rd.data.level > 70) {
                                                symbol.url = 'resources/img/zf/80.png';
                                            }
                                            ft.symbol = symbol;

                                            //添加测站水位
                                            var leveltextSymbol = {
                                                type: "text",  // autocasts as new TextSymbol()
                                                color: "white",
                                                haloColor: "black",
                                                haloSize: "1px",
                                                text: "",
                                                xoffset: 0,
                                                yoffset: 10,
                                                font: {  // autocast as new Font()
                                                    size: 10,
                                                    family: "宋体",
                                                    weight: "normal"
                                                }
                                            };
                                            leveltextSymbol.text = rd.data.level;
                                            var levellabel = new Graphic(ft.geometry, leveltextSymbol);
                                            graphicsLayer.add(levellabel);

                                            Ext.apply(ft.attributes, rd.data);
                                        }
                                    })
                                })
                            });
                        }
                    });
                });
            })
    }
});