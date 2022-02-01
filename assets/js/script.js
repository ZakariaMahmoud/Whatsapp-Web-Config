async function check() {
	let element;
	while (!(element = document.getElementById('side')))
		await sleep(500);
	element = element.parentElement
	if (location.hostname == "web.whatsapp.com") {
		if (element.style.display != 'none')
			hideSidebar();
		else
			showSidebar();
	}
}
check()

