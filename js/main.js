/**
 * Created by DR16 on 2016/4/25.
 */
require.config({
    baseUrl:location.pathname.replace(/\/[^/]+$/, "")+"/js",
    paths:{
        leaflet:"util/leaflet",
        esriLeaflet:"util/esri-leaflet",
        qrcode:"util/qrcode",
        jquery:"util/jquery",
        iScroll:"util/iScroll",
        template:"./template",
        tools:"./tools"
    }
});
require("jquery leaflet esriLeaflet iScroll qrcode template/BaseLayer tools/VertialScroll".split(" "),function($,leaflet,esriLeaflet,iScroll,qrcode,baseLayer,vertialScroll){
    L.esri = esriLeaflet;
    L.Icon.Default.imagePath = "images";

    var geo = getJsonData("config/geojson.json","GET");

    map = baseLayer.init(geo);

    var wrapperELement = vertialScroll.createElement(geo);
    document.querySelector(".content-manager").appendChild(wrapperELement);
    var myScroll = new iScroll(wrapperELement, { bounceEasing: 'elastic', bounceTime: 1200,scrollbars:true,mouseWheel:true });

    function getJsonData(url, type, params){
        var rtValue = null;
        var contentType = "application/json";
        if (params != null)
            contentType = params.contenttype;
        $.ajax({
            url:url,
            type:type,
            async: false,
            dataType:"json",
            success:function(result){
                if (contentType == undefined || contentType == "text/xml") {
                    if (typeof (result) == "string")
                        rtValue = result;
                    else
                        rtValue = result.xml;
                }
                else if (contentType == "application/json")
                    rtValue = result;
            },
            error:function(error){
                console.log(error);
                rtValue = "";
            }
        });
        return rtValue;
    }
});