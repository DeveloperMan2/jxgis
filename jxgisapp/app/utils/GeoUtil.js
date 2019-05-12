/**
 * Created by winnerlbm on 2018/7/19.
 * 地理数据处理工具类
 */
Ext.define('jxgisapp.utils.GeoUtil', {
    /**
     * 将常规json对象转化为geoJson对象
     * @param data : 待转json对象
     * @param geomField : 要素几何字段
     * @param descField : 描述字段
     * @returns {Array} : geoJson对象数组
     */
    json2geo: function (data, geomField, descField) {
        let geojson = [];
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let geoItem = {};
                let item = data[i];

                //add type, only consider Feature, FeatureCollection is not consider.
                geoItem["type"] = "Feature";

                //add id
                geoItem["id"] = item[descField];

                //add properties
                geoItem["properties"] = {};
                for (let key in item) {
                    if (geomField !== key) {
                        geoItem["properties"][key] = item[key];
                    }
                }

                //add geometry
                geoItem["geometry"] = item[geomField];

                geojson.push(geoItem);
            }
        }
        return geojson;
    },
    //根据geojson绘制矢量图层
    drawPoint4WaterPump: function (geoDatas, isJump) {
        let start = Date.now();
        require(
            [
                "esri/Map",
                "esri/views/SceneView",
                "esri/geometry/Geometry",
                "esri/Graphic",
                "esri/symbols/SimpleLineSymbol",
                "esri/symbols/SimpleFillSymbol",
                "esri/Color",
                "esri/geometry/support/jsonUtils",
                "esri/layers/GraphicsLayer",
                "esri/geometry/SpatialReference",
                "dojo/domReady!"
            ], function (Map, SceneView, Geometry, Graphic, SimpleLineSymbol, SimpleFillSymbol, Color, jsonUtils, GraphicsLayer,SpatialReference) {
                let gfxs = [];
                for (let i = 0; i < geoDatas.length; i++) {
                    let geo = geoDatas[i];

                    // convert for display to an arcgis object
                    let arcgis = Terraformer.ArcGIS.convert(geo);

                    // convert to an esri geometry
                    let geometry = jsonUtils.fromJSON(arcgis.geometry);
                    geometry.spatialReference = new SpatialReference(4490);

                    let pumpName = geo['properties']['name'];

                    let markerSymbol = {
                        type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
                        url: "resources/img/pump.png",
                        width: "24px",
                        height: "24px"
                    };

                    let textSymbol = {
                        type: "text",  // autocasts as new TextSymbol()
                        color: "black",
                        haloColor: "black",
                        haloSize: "1px",
                        text: pumpName,
                        xoffset: 0,
                        yoffset: -20,
                        font: {  // autocast as new Font()
                            size: 8,
                            family: "sans-serif",
                            weight: "normal"
                        }
                    };

                    let pTemplate = {  // autocasts as new PopupTemplate()
                        title: "{name}",
                        content: [{
                            type: "fields",
                            fieldInfos: [
                                {
                                    fieldName: "name",
                                    label: "项目名称",
                                    visible: true
                                }, {
                                    fieldName: "type",
                                    label: "项目类型",
                                    visible: true
                                }, {
                                    fieldName: "invest",
                                    label: "批复总投资",
                                    visible: true
                                }, {
                                    fieldName: "time",
                                    label: "批复工期",
                                    visible: true
                                }, {
                                    fieldName: "level",
                                    label: "工程等级",
                                    visible: true
                                }, {
                                    fieldName: "date",
                                    label: "计划开工时间",
                                    visible: true
                                }, {
                                    fieldName: "status",
                                    label: "工程状态",
                                    visible: true
                                }
                            ]
                        }]
                    };

                    // make a new graphic for the map
                    let pointGraphic = new Graphic({
                        geometry: geometry,
                        symbol: markerSymbol,
                        popupTemplate: pTemplate,
                        attributes: geo["properties"]
                    });

                    let textGraphic = new Graphic({
                        geometry: geometry,
                        symbol: textSymbol,
                        attributes: geo["properties"]
                    });

                    // add the graphic to the map
                    gfxs.push(pointGraphic, textGraphic);
                }

                if (cu.layer.pumpLayer == null) {
                    let graphicsLayer = new GraphicsLayer();
                    cu.map.add(graphicsLayer);
                    //全局存储
                    cu.layer.pumpLayer = graphicsLayer;
                }

                cu.layer.pumpLayer.graphics.addMany(gfxs);

                //场景定位
                if (isJump) {
                    if (cu.layer.pumpLayer) {
                        cu.mapView.goTo(cu.layer.pumpLayer.graphics);
                    }
                }
            });
        let end = Date.now();
        let elapsed = end - start; // time in milliseconds
        console.log('本次渲染耗时' + elapsed + '毫秒');
    }
});

let geoUtil = new jxgisapp.utils.GeoUtil();