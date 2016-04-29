require.config({
    baseUrl:"asset/js/",
    paths: {
        jquery: 'lib/jquery-1.7.2',
        leaflet: 'lib/leaflet',
        ctp: 'src/leaflet.ChineseTmsProviders'//扩展地图

    }
});
//http://leafletjs.com/  leaflet官网
//https://github.com/Leaflet/Leaflet  //leaflet github地址
//http://lbs.amap.com/console/show/picker   //高德地图地图坐标拾取器
require(['jquery', 'leaflet', 'ctp'], function ($, L) {
    if (!window.app) {
        window['app'] = {
            map: null,
            init: function () {
               L.Icon.Default.imagePath = "asset/css/images";
                //高德地图
                var gdN = this.gaoDeNormal();//高德地形图
                var gdS = this.gaoDeSatellite();//高德影像图
                var gdA = this.gaoDeAnnotion();//高德标注

                //天地图
                var tdtN = this.tianDiTuNormal();
                var tdtNA = this.tianDiTuNormalAnnotion();
                var tdtS = this.tianDiTuSatellite();
                var tdtSA = this.tianDiTuStelliteAnnotion();

                var bgdN = L.layerGroup([gdN]);
                var bgdI = L.layerGroup([gdS, gdA]);

                var btdtN = L.layerGroup([tdtN, tdtNA]);
                var btdtI = L.layerGroup([tdtS, tdtSA]);

                var baseLayers = {
                    "高德地图": bgdN,
                    "高德影像": bgdI,
                    "天地图地图": btdtN,
                    "天地图影像": btdtI
                }

                this.map = L.map("map", {
                    //	center:[39.969753,116.674805],//北京
                    center: [43.861832, 126.572166],
                    zoom: 12,
                    layers: [bgdN],
                    zoomControl: false
                });

                L.control.layers(baseLayers, null).addTo(this.map);
                L.control.zoom({zoomInTitle: '放大', zoomOutTitle: '缩小'}).addTo(this.map);
              //  this.addStations();
                this.addMarkers();
            },
            //高德地形图
            gaoDeNormal: function () {
                var t = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {maxZoom: 18, minZoom: 5});
                return t;
            },
            //高德卫星图
            gaoDeSatellite: function () {
                var t = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {maxZoom: 18, minZoom: 5});
                return t;
            },
            //高德标注
            gaoDeAnnotion: function () {
                var t = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {maxZoom: 18, minZoom: 5});
                return t;
            },
            //天地图地形图
            tianDiTuNormal: function () {
                var t = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {maxZoom: 18, minZoom: 5});
                return t;
            },
            //天地图地形图标注
            tianDiTuNormalAnnotion: function () {
                var t = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {maxZoom: 18, minZoom: 5});
                return t;
            },
            //天地图影像
            tianDiTuSatellite: function () {
                var t = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {maxZoom: 18, minZoom: 5});
                return t;
            },
            //天地图影像标注
            tianDiTuStelliteAnnotion: function () {
                var t = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {maxZoom: 18, minZoom: 5});
                return t;
            },
            addStations: function () {
                $.ajax({
                    // url: 'http://localhost:8060/geoserver/geo/ows?',
                    // data:{
                    // 	service:'WFS',
                    // version:'1.0.0',
                    // 	request:'GetFeature',
                    // 'typeName':'geo:geo_station_v',
                    // maxFeatures:50,
                    // outputFormat:''
                    // },
                    //  url: 'http://localhost:8060/geoserver/geo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geo:geo_station_v&maxFeatures=50&outputFormat=application%2Fjson',
                    url: 'http://192.168.88.89:8080/smartcity/house',
                    type: 'POST',
                    dataType: 'json',
                    success: function (response) {
                        if (response.features) {
                            var marker = {
                                radius: 8,
                                fillColor: "#ff7800",
                                color: "#000",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.8
                            };
                            var l = L.geoJson(response.features, {
                                pointToLayer: function (feature, latlng) {
                                    return L.circleMarker(latlng, marker);
                                }
                            }).addTo(this.map);
                            console.log(JSON.stringify(response.features));
                        }
                    }.bind(this)
                });

            },
            getEventHandler: function (i,ev) {
                return function (ev) {
                    console.log('Event on marker ' + i + ': ' + ev.type);
                }
            },
            addMarkers: function () {
                var markers = new L.FeatureGroup();

                for (var i = 0; i < 100; i++) {
                    var latRadom = Math.random() * 0.1;
                    var lngRadom = Math.random() * 0.1;
                    var latlng = [43.861832 + latRadom, 126.572166 + lngRadom];
                    L.marker(latlng).addTo(markers).on('dblclick', function (e) {
                        this.getEventHandler(i,e)
                    }.bind(this));
                }
                markers.addTo(this.map);
            }
        };
    }
    app.init();
});
