/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.watergate.WaterGateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.watergate',

    requires: [
        'Ext.util.TaskManager'
    ],

    /**
     * Called when the view is created
     */
    init: function() {

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
        me.queryGateData();
    },
    //查询数据
    queryGateData: function () {
        var me = this;
        //加载统计信息
        var meView = this.getView();
        var st = meView.lookupReference('queryGateStartDate').getRawValue();
        var keywords = Ext.getCmp('gateKeyWordId').getValue();

        var gridCom = Ext.getCmp('gateGrid');

        var store = gridCom.getStore();
        store.proxy.url = cu.config.watergateListQueryUrl;//TODO 2018-04-23---本地数据加载暂时屏蔽，若需要加载后台服务数据，需要解除注释
        // store.proxy.url = 'resources/json/watergate.json';
        store.load({
            params: {
                st: st,
                keywords: keywords
            }, //参数

            callback: function (records, options, success) {
                if (success) {
                    store.loadData(records);
                    gridCom.updateLayout();
                    me.loadGateLayer(records);
                }
            },
            scope: store,
            add: false
        });
    },
    //加载图层数据
    loadGateLayer: function (features) {
        require(
            [
                "esri/layers/FeatureLayer",
                "esri/symbols/PictureMarkerSymbol",
                "esri/Graphic",
                "esri/layers/GraphicsLayer",
                "dojo/domReady!"
            ], function (FeatureLayer, PictureMarkerSymbol, Graphic, GraphicsLayer) {
                // Create the PopupTemplate
                var popupTemplate = {
                    title: "闸门信息 ",
                    content: [{
                        type: "fields",
                        fieldInfos: [{
                            fieldName: "id",
                            label: "闸门编码",
                            format: {
                                places: 0,
                                digitSeparator: true
                            }
                        }, {
                            fieldName: "name",
                            label: "闸门名称",
                            format: {
                                places: 0,
                                digitSeparator: true
                            }
                        }, {
                            fieldName: "level",
                            label: "开启度(m)",
                            format: {
                                places: 0,
                                digitSeparator: true
                            }
                        }, {
                            fieldName: "warnlevel",
                            label: "闸上水位(m)",
                            format: {
                                places: 0,
                                digitSeparator: true
                            }
                        }, {
                            fieldName: "xxlevel",
                            label: "闸下水位(m)",
                            format: {
                                places: 0,
                                digitSeparator: true
                            }
                        }, {
                            fieldName: "rate",
                            label: "流量(m³/s)",
                            format: {
                                places: 0,
                                digitSeparator: true
                            }
                        }]
                    }]
                };
                // points to the states layer in a service storing U.S. census data
                var stationLayer = new FeatureLayer({
                    url: cu.config.watergateMapUrl,
                    popupTemplate: popupTemplate
                });
                var graphicsLayer = new GraphicsLayer({
                    popupTemplate: popupTemplate
                });
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
                                        color: "black",
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

                                    var symbol = new PictureMarkerSymbol();
                                    var flsymbol = stationLayer.renderer.symbol;
                                    symbol.height = 15;
                                    symbol.width = 15;
                                    symbol.type = flsymbol.type;
                                    symbol.angle = ft.getAttribute('angle');
                                    symbol.url = 'resources/img/gate.png';
                                    var gateFt = new Graphic(ft.geometry, symbol);
                                    graphicsLayer.add(gateFt);

                                    Ext.Array.each(features, function (rd) {
                                        if (ft.getAttribute('Id') != null &&
                                            rd.data.id != null
                                            &&ft.getAttribute('Id').toString() == rd.data.id.toString()) {
                                            var leveltextSymbol = {
                                                type: "text",  // autocasts as new TextSymbol()
                                                color: "black",
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
                            stationLayer.visible = false;
                            lyrView.layer.refresh();
                        }
                    });
                });
            })
    }
});