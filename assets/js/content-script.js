chrome.storage.sync.get(["extension_whatsapp_state"], async function (items) {
	var element = await getElementByXpath('//*[@id="app"]/div[1]/div[1]/div[3]')
	if (items["extension_whatsapp_state"] == 0)
		show(element);
	else if (items["extension_whatsapp_state"] == 1)
		hide(element);
});

function getElementByXpath(path) {
	return new Promise(resolve => {
		setInterval(function () {
			element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
			if (element && element.outerHTML.search("menu") > -1)
				resolve(document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
		}, 100);
	});
}

function hide(element) {
	element.style.display = 'none';
}

function show(element) {
	element.style.display = '';
}