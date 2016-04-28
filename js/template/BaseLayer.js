/**
 * Created by DR16 on 2016/4/25.
 */
define("template/BaseLayer template/Popup".split(" "),function(BaseLayer,Popup){
    return {
        init:function(geo){
            var map = L.map('map').setView([43.84237,126.5925], 14);// 31.14,121.29
            L.esri.tiledMapLayer({
                url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer"
            }).addTo(map);

            var trees = L.geoJson(geo,{
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: L.icon({
                            iconUrl:'images/marker-icon.png',
                            popupAnchor: [12, 0]
                        })
                    });
                }
            }).addTo(map);
            trees.bindPopup(this.getTemplate);
            return map;
        },
        getTemplate:function(evt){
            var attr = evt.feature;
            map.setView(attr.properties);
            var panel = Popup.createPopup(attr,attr.properties["id"]);
            return panel;
        }
    }
});