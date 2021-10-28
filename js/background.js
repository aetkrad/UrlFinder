
var netWorksList=new Array();


chrome.webRequest.onBeforeRequest.addListener(
    function (request){
        let urlName;
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            let currentTab = tabs[0];
            if (typeof(currentTab.url) == "undefined"||typeof(currentTab) == "undefined"){
                return;
            }
            urlName=currentTab.url;
            let {url,initiator}=request;
            if (typeof (initiator) == "undefined") {
                initiator = url;
            }
            let requestURL=new URL(url);
            let initiatorURL=new URL(initiator);
            if(requestURL.host!=initiatorURL.host||requestURL.protocol!=initiatorURL.protocol){
                addData(urlName,'crossOrigin',url);
            }else if(!url.startsWith("chrome-extension")&&!url.endsWith(".css")){
                addData(urlName,'netWork',url);
            }
            return;
        });

},{urls:["<all_urls>"]},["blocking"]);

function addData(urlName,listName,data){
    if(typeof(urlName) != "undefined"){
        let netWorkUrls=new Array();
        let crossOrginUrls=new Array();
        if (typeof(netWorksList) == "undefined"){
            if (listName=="netWork"){
                netWorkUrls.push(data);
            }else {
                crossOrginUrls.push(data);
            }
            netWorksList.push({urlName:urlName,netWorksUrls:netWorkUrls,crossOrginUrls:crossOrginUrls});
        }else {
            if (findUrlName(urlName)){
                for (var i=0;i<netWorksList.length;i++){
                    if (netWorksList[i].urlName==urlName){
                        if (listName=="netWork"){
                            netWorksList[i].netWorksUrls.push(data);
                        }else {
                            netWorksList[i].crossOrginUrls.push(data);
                        }
                    }
                }
            }else {
                if (listName=="netWork"){
                    netWorkUrls.push(data);
                }else {
                    crossOrginUrls.push(data);
                }
                netWorksList.push({urlName:urlName,netWorksUrls:netWorkUrls,crossOrginUrls:crossOrginUrls});
            }

        }
    }
}

function getDatas(urlName){
    for (var i=0;i<netWorksList.length;i++){
        if (netWorksList[i].urlName==urlName){
            return netWorksList[i];
        }
    }
}

function findUrlName(urlName){
    for (var i=0;i<netWorksList.length;i++){
        if (netWorksList[i].urlName==urlName){
            return true;
        }
    }
    return false;
}
