async function execute_sidebar() {
	let element;
	while (!(element = document.getElementById('side')))
		await sleep(100);
	element = element.parentElement
	if (location.hostname == "web.whatsapp.com") {
		if (element.style.display != 'none')
			hideSidebar();
		else
			showSidebar();
	}
}

async function execute_blur_names() {
	let element;
	while (!(element = document.querySelector('[aria-label="Chat list"]').querySelectorAll(":scope > div")))
		await sleep(100);
	BlurNames();
}


async function execute_blur_photos() {
	let element;
	while (!(element = document.querySelector('[aria-label="Chat list"]').querySelectorAll(":scope > div")))
		await sleep(100);
	BlurPhotos();
}

