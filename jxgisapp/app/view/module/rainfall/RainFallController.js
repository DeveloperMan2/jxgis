/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.rainfall.RainFallController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rainfall',


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
    moduleInit: function (me) {
        me.queryRainFallData()
    },
    //根据选择的时间，查询水位数据
    queryRainFallData: function () {
        var me = this;
        //加载统计信息
        var meView = this.getView();
        var st = meView.lookupReference('querywlStartDate').getRawValue();
        var et = meView.lookupReference('querywlEndDate').getRawValue();
        var keywords = Ext.getCmp('rainfallKeyWordId').getValue();

        var gridCom = Ext.getCmp('rainfallGrid');

        var store = gridCom.getStore();
        // store.proxy.url = conf.rtmdataUrl + 'rtmdata';//TODO 2018-04-23---本地数据加载暂时屏蔽，若需要加载后台服务数据，需要解除注释
        store.proxy.url = 'resources/json/rainfall.json';
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
                    me.loadRainFallLayer(records);
                }
            },
            scope: store,
            add: false
        });
    },
    loadRainFallLayer: function (features) {
        require(
            [
                "esri/layers/FeatureLayer",
                "esri/symbols/PictureMarkerSymbol",
                "esri/Graphic",
                "esri/layers/GraphicsLayer",
                "esri/tasks/QueryTask",
                "esri/tasks/support/Query",
                "dojo/domReady!"
            ], function (FeatureLayer, PictureMarkerSymbol, Graphic, GraphicsLayer, QueryTask, Query) {
                var queryTask = new QueryTask({
                    url: cu.config.rainfallMapUrl
                });
                var query = new Query();
                query.returnGeometry = true;
                query.outFields = ['*'];
                query.where = " 1 = 1";
                queryTask.execute(query).then(function (results) {
                    console.log(results.features);
                    var graphicsLayer = new GraphicsLayer();
                    cu.map.add(graphicsLayer);
                    Ext.Array.each(results.features, function (ft) {
                        //添加测站名称
                        var textSymbol = {
                            type: "text",
                            color: "black",
                            haloColor: "black",
                            haloSize: "1px",
                            text: "",
                            xoffset: 0,
                            yoffset: -20,
                            font: {
                                size: 10,
                                family: "宋体",
                                weight: "normal"
                            }
                        };
                        textSymbol.text = ft.getAttribute(cu.config.fieldName);
                        var label = new Graphic(ft.geometry, textSymbol);
                        graphicsLayer.add(label);

                        Ext.Array.each(features, function (rd) {
                            if (ft.getAttribute(cu.config.fieldID).toString() == rd.data.id.toString()) {
                                var symbol = new PictureMarkerSymbol();
                                symbol.height = 10;
                                symbol.width = 10;
                                if (rd.data.level < 10) {
                                    symbol.url = 'resources/img/10.png';
                                } else if (rd.data.level < 25) {
                                    symbol.url = 'resources/img/25.png';
                                } else if (rd.data.level < 50) {
                                    symbol.url = 'resources/img/50.png';
                                } else if (rd.data.level < 100) {
                                    symbol.url = 'resources/img/100.png';
                                } else if (rd.data.level < 250) {
                                    symbol.url = 'resources/img/250.png';
                                } else if (rd.data.level >= 250) {
                                    symbol.url = 'resources/img/500.png';
                                }
                                ft.symbol = symbol;
                                graphicsLayer.add(ft);
                                //添加测站水位
                                var leveltextSymbol = {
                                    type: "text",
                                    color: "black",
                                    haloColor: "black",
                                    haloSize: "1px",
                                    text: "",
                                    xoffset: 0,
                                    yoffset: 10,
                                    font: {
                                        size: 10,
                                        family: "宋体",
                                        weight: "normal"
                                    }
                                };
                                leveltextSymbol.text = rd.data.level;
                                var levellabel = new Graphic(ft.geometry, leveltextSymbol);
                                graphicsLayer.add(levellabel);

                                Ext.apply(ft.attributes, rd.data);
                                return false;
                            }
                        })
                    })
                });
                cu.mapView.on("click", function (event) {
                    var screenPoint = {
                        x: event.x,
                        y: event.y
                    };
                    cu.mapView.hitTest(screenPoint).then(function (response) {
                        if (response.results.length) {
                            var graphic = response.results.filter(function (result) {
                                // check if the graphic belongs to the layer of interest
                                return true;
                            })[0].graphic;
                            var title = graphic.getAttribute(cu.config.fieldName);
                            cu.createPopupWindow(title, cu.config.rainfallWinowUrl, '信息加载中...', 1000);
                        }
                    });
                });

            });
    }
})