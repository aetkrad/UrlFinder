console.log('linkFind.js');


function scriptDatas(){

	let datas=[]
	let localUrlDatas=[]
	sendDatas('jsDatas',datas);
	sendDatas('localUrlDatas',localUrlDatas.concat(extract_URL(document.documentElement.outerHTML)));
}

function sendDatas(dataName,datas){
	chrome.runtime.sendMessage({dataName:dataName,datas:datas}, function(response) {

	});
}

function extract_URL(htmlDatas){
	return htmlDatas.match(/(?:"|')(((?:[a-zA-Z]{1,10}:\/\/|\/\/)[^"'/]{1,}\.[a-zA-Z]{2,}[^"']{0,})|((?:\/|\.\.\/|\.\/)[^"'><,;| *()(%%$^\/\\\[\]][^"'><,;|()]{1,})|([a-zA-Z0-9_\-/]{1,}\/[a-zA-Z0-9_\-/]{1,}\.(?:[a-zA-Z]{1,4}|action)(?:[\?|\/][^"|']{0,}|))|([a-zA-Z0-9_\-]{1,}\.(?:php|asp|aspx|jsp|json|action|html|js|txt|xml)(?:\?[^"|']{0,}|)))(?:"|')/g);

}

scriptDatas();