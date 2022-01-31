function getElementByXpath(path) {
	return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function hide(element) {
	element.style.display = 'none';
}

function show(element) {
	element.style.display = '';
}

function check() {
	var element = getElementByXpath('//*[@id="app"]/div[1]/div[1]/div[3]')
	if (location.hostname == "web.whatsapp.com") {
		if (element.style.display != 'none')
			hide(element);
		else
			show(element);
	}
}
check()