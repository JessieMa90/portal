/**
 * Created by DR16 on 2016/4/25.
 */
define("baseLayer".split(" "),function(){
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
                            iconUrl:'asset/images/marker-icon.png',
                            popupAnchor: [12, 0]
                        })
                    });
                }
            }).addTo(map);
            trees.bindPopup(this.getTemplate);
            return map;
        },
        getTemplate:function(evt){
            map.setView(evt.feature.properties);
            var panel = document.createElement("div");
            panel.style.width = "540px";
            panel.style.height = "240px";

            var titlePanel = document.createElement("div");
            titlePanel.style.height="30px";
            titlePanel.style.textAlign="center";
            titlePanel.style.fontSize="24px";
            titlePanel.innerText = "吉林省住房和城乡建设";

            var messagePanel = document.createElement("div");
            messagePanel.style.height="210px";

            panel.appendChild(titlePanel);
            panel.appendChild(messagePanel);

            var messageElement = document.createElement("div");
            messageElement.style.height="210px";
            messageElement.style.width="60%";
            messageElement.style.float = "left";

            var qCodeElement = document.createElement("div");
            qCodeElement.style.height="210px";
            qCodeElement.style.width="40%";
            qCodeElement.style.float = "right";

            messagePanel.appendChild(messageElement);
            messagePanel.appendChild(qCodeElement);

            new QRCode(qCodeElement,{
                text:"http://192.168.88.55/construcity/1.html",
                height:210,
                width:210
            });

            return panel;
        }
    }
});