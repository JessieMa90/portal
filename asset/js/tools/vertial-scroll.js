/**
 * Created by DR16 on 2016/4/27.
 */
define("vScroll".split(" "),function(){
    return {
        liElement:"<h3 class='scroll-h'>{NAME}</h3><div class='scroll-img'><img src='asset/images/1.jpg' /></div><dl class='scroll-dl'><dd>名称:<strong>{NAME}</strong></dd><dd>地址：{ADD}</dd></dl>",
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
            messageElement.style.fontSize = "16px";
            var txt = "";
            for(var key in attr.properties){
                if(key === "lng" || key === "lat")
                    continue;
                if(txt === "")
                    txt = key + "：" + attr.properties[key];
                else
                    txt += "\n\r" + key + "：" + attr.properties[key];
            }
            messageElement.innerText = txt.replace("id","ID").replace("name","名称").replace("address","地址").replace("city","城市").replace("adcode","城市编码");

            var qCodeElement = document.createElement("div");
            qCodeElement.style.height="210px";
            qCodeElement.style.width="40%";
            qCodeElement.style.float = "right";

            messagePanel.appendChild(messageElement);
            messagePanel.appendChild(qCodeElement);

            new QRCode(qCodeElement,{
                text:"http://192.168.88.55/construcity/1.html" + "?id=" + evt.currentTarget.getAttribute("id"),
                height:190,
                width:190
            });

            var qCodeInnerText = document.createElement("div");
            qCodeInnerText.style.height="20px";
            qCodeInnerText.innerText = "扫描二维码";
            qCodeInnerText.style.textAlign="center";
            qCodeInnerText.style.fontSize="16px";
            qCodeElement.appendChild(qCodeInnerText);

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