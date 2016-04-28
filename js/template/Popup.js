/**
 * Created by DR16 on 2016/4/28.
 */
define("template/Popup".split(" "),function(){
    return {
        createPopup:function(attr,keyCode){
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
            for(var ky in attr.properties){
                if(ky === "lng" || ky === "lat")
                    continue;
                if(txt === "")
                    txt = ky + "：" + attr.properties[ky];
                else
                    txt += "\n\r" + ky + "：" + attr.properties[ky];
            }
            messageElement.innerText = txt.replace("id","ID").replace("name","名称").replace("address","地址").replace("city","城市").replace("adcode","城市编码");


            var qCodeElement = document.createElement("div");
            qCodeElement.style.height="210px";
            qCodeElement.style.width="40%";
            qCodeElement.style.float = "right";

            messagePanel.appendChild(messageElement);
            messagePanel.appendChild(qCodeElement);

            new QRCode(qCodeElement,{
                text:"http://192.168.88.55/construcity/1.html" + "?id=" + keyCode,
                height:190,
                width:190
            });

            var qCodeInnerText = document.createElement("div");
            qCodeInnerText.style.height="20px";
            qCodeInnerText.innerText = "扫描二维码";
            qCodeInnerText.style.textAlign="center";
            qCodeInnerText.style.fontSize="16px";
            qCodeElement.appendChild(qCodeInnerText);

            return panel;
        }
    }
})