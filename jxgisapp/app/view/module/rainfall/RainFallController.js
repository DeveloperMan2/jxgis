/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.rainfall.RainFallController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rainfall',


    requires: [
        'Ext.util.TaskManager'

    ],
    results: null, //空间要素查询结果
    graphicsLayer: null,//地图标绘图层
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
        if (record.feature != null) {
            cu.mapView.goTo(record.feature.geometry);
            this.openBusinessInfoWindow(record.feature);
        }
    },
    openBusinessInfoWindow: function (feature) {
        var url = cu.config.rainfallWinowUrl;//基础查询地址
        var id = feature.getAttribute(cu.config.fieldID);//测站ID，来源于空间数据，cu.config.fieldID是systemconfig.json配置的空间数据ID字段名称
        var stationName = feature.getAttribute(cu.config.fieldName); //测站名称，来源于空间数据，和id配置相同
        var meView = this.getView();
        var st = meView.lookupReference('querywlStartDate').getRawValue(); //对应界面选择的时间
        var et = meView.lookupReference('querywlEndDate').getRawValue();
        var queryUrl = url + "?" + "id=" + id + "&st=" + st + "&et=" + et;
        cu.createPopupWindow(stationName, queryUrl, '信息加载中...', 1000);
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


        //示例
        var param = {};
        param["bt"] = st;
        param["et"] = et;
        var srchCluase = {};
        srchCluase["srchCluase"] = param;
        var reqBody = {};
        reqBody["reqBody"] = srchCluase;

        var store = gridCom.getStore();
        //左侧列表查询地址，需要根据业务系统请求地址，进行改造
        // store.proxy.url = cu.config.rainfallListQueryUrl + "?keywords=" + keywords + "&st=" + st + "&et=" + et;
        store.proxy.url = 'resources/json/rainfall.json';
        store.load({
            params: reqBody, //参数

            callback: function (records, options, success) {
                if (success) {
                    store.loadData(records);
                    gridCom.updateLayout();
                    me.loadRainFallLayer(records, me);
                }
            },
            scope: store,
            add: false
        });
    },
    loadRainFallLayer: function (features, me) {
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
                if (me.results == null) {
                    var queryTask = new QueryTask({
                        url: cu.config.rainfallMapUrl
                    });
                    var query = new Query();
                    query.returnGeometry = true;
                    query.outFields = ['*'];
                    query.where = " 1 = 1";
                    queryTask.execute(query).then(function (results) {
                        me.results = results;
                        me.graphicsLayer = new GraphicsLayer();
                        cu.map.add(me.graphicsLayer);
                        showFeature(results);
                    });
                } else {
                    me.graphicsLayer.removeAll();
                    showFeature(me.results);
                }

                function showFeature(results) {
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
                        me.graphicsLayer.add(label);

                        Ext.Array.each(features, function (rd) {
                            if (ft.getAttribute(cu.config.fieldID).toString() == rd.data.id.toString()) {
                                //将空间对象赋值到属性表格数据中
                                rd.feature = ft;
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
                                me.graphicsLayer.add(ft);
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
                                me.graphicsLayer.add(levellabel);
                                return false;
                            }
                        });
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
                                if (graphic != null) {
                                    me.openBusinessInfoWindow(graphic);
                                }
                            }
                        });
                    });
                }
            })
    }
})