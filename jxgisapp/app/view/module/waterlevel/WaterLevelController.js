Ext.define('jxgisapp.view.module.waterlevel.WaterLevelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.waterlevel',

    requires: [
        'Ext.util.TaskManager'
    ],
    afterrenderHandler: function () {
        //主模块地图加载完成之后执行当前模块初始化
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
        me.queryWaterLevelData();
    },
    //根据配置创建水闸图层
    getWaterPumpData: function (url) {
        var params = {};

        //执行成功回调
        function successCallBack(response, opts) {
            //查询结果转json对象
            var result = Ext.JSON.decode(decodeURIComponent(response.responseText), true);
            if (result) {
                //地图标绘点
                var pumps = geoUtil.json2geo(result, "geometry", "name");
                if (pumps && pumps.length > 0) {
                    geoUtil.drawPoint4WaterPump(pumps, true);
                }
            }
        }

        //执行失败回调
        function failureCallBack(response, opts) {
        }

        ajax.fn.execute(params, 'GET', url, successCallBack, failureCallBack);
    },

    //根据选择的时间，查询水位数据
    queryWaterLevelData: function () {
        var me = this;
        //加载统计信息
        var meView = this.getView();
        var st = meView.lookupReference('querywlDate').getRawValue();
        var keywords = Ext.getCmp('waterLevelKeyWordId').getValue();

        var gridCom = Ext.getCmp('waterLevelGrid');

        var store = gridCom.getStore();
        store.proxy.url = cu.config.waterlevelListQueryUrl;//TODO 2018-04-23---本地数据加载暂时屏蔽，若需要加载后台服务数据，需要解除注释
        // store.proxy.url = 'resources/json/waterlevel.json';
        store.load({
            params: {
                reqHeader: {
                    userInfo: {
                        username: "",
                        token: ""
                    }
                },
                reqBody: {
                    srchClause: {
                        // page:pageIndex,
                        // pageSize:cu.config.pageSize,
                        param: {
                            tm: st,
                            stcd: keywords
                        }
                    }
                }

            }, //参数

            callback: function (records, options, success) {
                if (success) {
                    var respBodySet = records[0].data.respHeader;
                    var recordSet = records[0].data.respBody.record;
                    store.loadData(recordSet);
                    gridCom.updateLayout();
                    me.loadWaterLevelLayer(recordSet);
                }
            },
            scope: store,
            add: false
        });
    },
    //加载水位信息图层
    loadWaterLevelLayer: function (features) {
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
                    title: "水位站信息 ",
                    content: [{
                        type: "fields",
                        fieldInfos: [{
                            fieldName: "stcd",
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
                            fieldName: "z",
                            label: "水位",
                            format: {
                                places: 0,
                                digitSeparator: true
                            }
                        }, {
                            fieldName: "q",
                            label: "流量",
                            format: {
                                places: 0,
                                digitSeparator: true
                            }
                        }]
                    }]
                };
                // points to the states layer in a service storing U.S. census data
                var stationLayer = new FeatureLayer({
                    url: cu.config.waterlevelMapUrl,
                    popupTemplate: popupTemplate
                });

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
                                        color: "black",
                                        haloColor: "black",
                                        haloSize: "1px",
                                        text: "",
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
                                        if (ft.getAttribute('STCD').toString() == rd.stcd.toString()) {
                                            var symbol = new PictureMarkerSymbol();
                                            var flsymbol = stationLayer.renderer.symbol;
                                            symbol.angle = ft.getAttribute('angle');
                                            symbol.height = flsymbol.height;
                                            symbol.width = flsymbol.width;
                                            symbol.xoffset = flsymbol.xoffset;
                                            symbol.yoffset = flsymbol.yoffset;
                                            symbol.type = flsymbol.type;
                                            symbol.url = 'resources/img/normal.png';
                                            // if (rd.data.level > rd.data.warnlevel) {
                                            //     symbol.url = 'resources/img/blue.png';
                                            // }
                                            // if (rd.data.level > rd.data.xxlevel) {
                                            //     symbol.url = 'resources/img/orange.png';
                                            // }
                                            ft.symbol = symbol;

                                            //添加测站水位
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
                                            leveltextSymbol.text = rd.z;
                                            var levellabel = new Graphic(ft.geometry, leveltextSymbol);
                                            graphicsLayer.add(levellabel);

                                            Ext.apply(ft.attributes, rd);
                                        }
                                    })
                                })
                            });
                            lyrView.layer.refresh();
                        }
                    });
                });
            })
    }
});