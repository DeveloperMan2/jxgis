/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.waterlevel.WaterLevelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.waterlevel',

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
        this.afterMapViewLoaded(this.moduleInit);
    },
    //todo-只要init属性设置为true的模块需要采用时间器的方式获取地图对象，其他模块均采用正常方式，在模块的afterrender事件中执行初始化等,补充说明：其他需要单独对接系统子模块，因此每个模块都需要通过moduleInit的方式初始化.
    afterMapViewLoaded: function (handler) {
        var me = this;
        var task = {
            run: function () {
                if (cu.mapView) {
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
    //模块初始化（重写）
    moduleInit: function (me) {
        me.queryWaterLevelData();
    },
    //根据选择的时间，查询水位数据
    queryWaterLevelData: function () {
        var me = this;
        //加载统计信息
        var meView = this.getView();
        var time = meView.lookupReference('queryDate').getRawValue();
        var keywords = Ext.getCmp('waterLevelKeyWordId').getValue();

        var treeCom = Ext.getCmp('waterLevelGrid');

        var store = treeCom.getStore();
        // store.proxy.url = conf.rtmdataUrl + 'rtmdata';//TODO 2018-04-23---本地数据加载暂时屏蔽，若需要加载后台服务数据，需要解除注释
        store.proxy.url = 'resources/json/waterlevel.json';
        store.load({
            params: {
                time: time,
                keywords: keywords
            }, //参数

            callback: function (records, options, success) {
                if (success) {
                    store.loadData(records);
                    treeCom.updateLayout();
                    me.loadWaterLevelLayer(records);
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
                const popupTemplate = {
                    title: "水位站信息 ",
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
                            label: "水位",
                            format: {
                                places: 0,
                                digitSeparator: true
                            }
                        }, {
                            fieldName: "xxlevel",
                            label: "汛限水位",
                            format: {
                                places: 0,
                                digitSeparator: true
                            }
                        }, {
                            fieldName: "warnlevel",
                            label: "警戒水位",
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
                                            symbol.angle = ft.getAttribute('angle');
                                            symbol.height = flsymbol.height;
                                            symbol.width = flsymbol.width;
                                            symbol.xoffset = flsymbol.xoffset;
                                            symbol.yoffset = flsymbol.yoffset;
                                            symbol.type = flsymbol.type;
                                            symbol.url = 'resources/img/normal.png';
                                            if (rd.data.level > rd.data.warnlevel) {
                                                symbol.url = 'resources/img/blue.png';
                                            }
                                            if (rd.data.level > rd.data.xxlevel) {
                                                symbol.url = 'resources/img/orange.png';
                                            }
                                            ft.symbol = symbol;

                                            //添加测站水位
                                            var leveltextSymbol = {
                                                type: "text",  // autocasts as new TextSymbol()
                                                color: "white",
                                                haloColor: "black",
                                                haloSize: "1px",
                                                text: "You are here",
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