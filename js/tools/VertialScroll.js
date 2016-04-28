/**
 * Created by DR16 on 2016/4/27.
 */
define("tools/VertialScroll template/Popup".split(" "),function(vertialScroll,Popup){
    return {
        liElement:"<div class='scroll-img'><img src='images/1.jpg' /></div><dl class='scroll-dl'><dd>名称:<strong>{NAME}</strong></dd><dd>地址：{ADD}</dd></dl>",
        createElement:function(geo){
            var wrapper = document.createElement("div");
            wrapper.className = "wrapper";
            wrapper.id = "wrapper";

            var scroller = document.createElement("div");
            wrapper.className = "scroller";
            scroller.id = "scroller";

            wrapper.appendChild(scroller);

            var scrollUl = document.createElement("ul");
            for(var key in geo.features){
                var item  = geo.features[key];
                var location = item.geometry.coordinates;
                var li = document.createElement("li");
                li.setAttribute("data-location",location[1] + "," + location[0]);
                li.setAttribute("id",item.id);
                li.addEventListener("mouseover",function(evt){
                    this.liMouseOver(evt,item);
                }.bind(this),false);
                li.addEventListener("click",function(evt){
                    this.liClick(evt,item);
                }.bind(this),false);
                li.innerHTML = this.liElement.replace(/\{NAME\}/g,item.properties.name).replace("{ADD}",item.properties.address);
                scrollUl.appendChild(li);
            }

            scroller.appendChild(scrollUl);

            return wrapper;
        },
        liClick:function(evt,attr){
            document.querySelector('#flip-toggle').classList.toggle('hover');
        },
        liMouseOver:function(evt,attr){
            var panel = Popup.createPopup(attr,"id");
            L.popup({
                    offset:[12,9]
            }).setLatLng(evt.currentTarget.getAttribute("data-location").split(',')).setContent(panel)
                .openOn(map);
            map.setView(evt.currentTarget.getAttribute("data-location").split(','));
            //L.marker(evt.currentTarget.getAttribute("data-location").split(',')).bindPopup("<div>adf</div>").addTo(map).openPopup();
            //alert(evt.currentTarget.getAttribute("data-location"));
        }
    }
});