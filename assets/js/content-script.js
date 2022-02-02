const sleep = time => {
	return new Promise(resolve => {
		setTimeout(resolve, time);
	})
}

initStorage()

chrome.storage.sync.get(["whatsapp_config_sidebar", "whatsapp_config_blur_names", "whatsapp_config_blur_photos"], async function (items) {
	let element;
	while (!(element = document.querySelector('[data-testid="default-user"]')))
		await sleep(100);

	initialization()
	if (items["whatsapp_config_sidebar"] == 0)
		showSidebar();
	else if (items["whatsapp_config_sidebar"] == 1)
		hideSidebar();

	if (items["whatsapp_config_blur_names"] == 1)
		BlurNames();
	if (items["whatsapp_config_blur_photos"] == 1)
		BlurPhotos();
	setIconHide()
	setIconShow()
});

function getElementByXpath(path) {
	element = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
	if (element && element.outerHTML.search("menu") > -1)
		return (document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
}

function createElementFromHTML(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return div.firstChild;
}

function hideSidebar() {
	var element = document.getElementById('side')
	element = element.parentElement
	element.style.display = 'none';
	var stateHide = document.getElementById("stateHide")
	stateHide.style.display = 'none';
	var stateHide = document.getElementById("stateShow")
	stateHide.style.display = '';
	chrome.storage.sync.set({ "whatsapp_config_sidebar": 1 })

}

function showSidebar() {
	var element = document.getElementById('side')
	element = element.parentElement
	element.style.display = '';
	var stateHide = document.getElementById("stateShow")
	stateHide.style.display = 'none';
	var stateHide = document.getElementById("stateHide")
	stateHide.style.display = '';
	chrome.storage.sync.set({ "whatsapp_config_sidebar": 0 })
}

function setIconHide() {
	var state = document.getElementById("stateHide");
	state.addEventListener("click", () => {
		hideSidebar()
	});
}

function BlurNames() {
	let element = document.querySelector('[aria-label="Chat list"]').querySelectorAll(":scope > div")
	for (let i = 0; i < element.length; i++)
		element[i].querySelector('[role="gridcell"]').querySelector("div").classList.toggle("blur")
}
function BlurPhotos() {
	let element = document.querySelector('[aria-label="Chat list"]').querySelectorAll(":scope > div")
	for (let i = 0; i < element.length; i++)
		element[i].querySelector('[data-testid="cell-frame-container"]').querySelector(":scope > div").querySelector(":scope > div").classList.toggle("blur-photo")
}

function setIconShow() {
	var state = document.getElementById("stateShow");
	state.addEventListener("click", () => {
		showSidebar();
	});
}

function initialization() {
	var icon_hide = getElementByXpath('//*[@id="side"]/header/div[2]/div/span')
	icon_hide.prepend(createElementFromHTML(`
	<div style="margin-right: 15px;display:none" id="stateHide" >
		<div aria-disabled="false" role="button" tabindex="0"  title="Hide Sidebar" aria-label="Hide Sidebar" >
			<span>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="3" y="3" width="20" height="2" rx="1" fill="#54656F"></rect>
					<rect x="3" y="19" width="20" height="2" rx="1" fill="#54656F"></rect>
					<rect x="14" y="7" width="9" height="2" rx="1" fill="#54656F"></rect>
					<rect x="14" y="11" width="9" height="2" rx="1" fill="#54656F"></rect>
					<rect x="3.10518" y="11.8913" width="7.78259" height="2.15949" rx="1.07975"
						transform="rotate(-30 3.10518 11.8913)" fill="#54656F"></rect>
					<path
						d="M9.66079 16.028C9.07995 16.028 8.60909 15.5571 8.60909 14.9763V9.50744C8.60909 8.9266 9.07995 8.45574 9.66079 8.45574V8.45574C10.2416 8.45574 10.7125 8.9266 10.7125 9.50744V14.9763C10.7125 15.5571 10.2416 16.028 9.66079 16.028V16.028Z"
						fill="#54656F"></path>
					<rect x="4.15688" y="10.7802" width="7.90178" height="2.31374" rx="1.15687"
						transform="rotate(30 4.15688 10.7802)" fill="#54656F"></rect>
					<rect x="14" y="15" width="9" height="2" rx="1" fill="#54656F"></rect>
				</svg>
			</span>
		</div>
	</div>
	`));
	var icon_show = getElementByXpath('//*[@id="app"]/div[1]/div[1]')
	icon_show.prepend(createElementFromHTML(`
	<div id="stateShow" style="display:none;z-index: 9999;position: fixed;margin-left: -36px;padding: 5px;background-color: #f8f8f8;border-top-left-radius: 10px;border-bottom-left-radius: 10px;">
    	<div aria-disabled="false" role="button" tabindex="0" title="Show Sidebar" aria-label="Show Sidebar">
			<span>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="3" y="3" width="20" height="2" rx="1" fill="#54656F"/>
					<rect x="3" y="19" width="20" height="2" rx="1" fill="#54656F"/>
					<rect x="3" y="7" width="9" height="2" rx="1" fill="#54656F"/>
					<rect x="3" y="11" width="9" height="2" rx="1" fill="#54656F"/>
					<rect x="3" y="15" width="9" height="2" rx="1" fill="#54656F"/>
					<rect width="7.78258" height="2.15949" rx="1.07975" transform="matrix(-0.866025 0.500001 -0.499999 -0.866026 21.8948 12.4087)" fill="#54656F"/>
					<path d="M15.3392 8.272C15.9201 8.272 16.3909 8.74286 16.3909 9.3237L16.3909 14.7926C16.3909 15.3734 15.9201 15.8443 15.3392 15.8443V15.8443C14.7584 15.8443 14.2875 15.3734 14.2875 14.7926L14.2875 9.3237C14.2875 8.74286 14.7584 8.272 15.3392 8.272V8.272Z" fill="#54656F"/>
					<rect width="7.90177" height="2.31374" rx="1.15687" transform="matrix(-0.866025 -0.500001 0.499999 -0.866026 20.8431 13.5198)" fill="#54656F"/>
				</svg>
			</span>
		</div>
	</div>
	`));
}


function initStorage() {

	chrome.storage.sync.get(["whatsapp_config_sidebar", "whatsapp_config_blur_names", "whatsapp_config_blur_photos"], async function (items) {
		if (items["whatsapp_config_sidebar"] === undefined) chrome.storage.sync.set({ "whatsapp_config_sidebar": 0 })
		if (items["whatsapp_config_blur_names"] === undefined) chrome.storage.sync.set({ "whatsapp_config_blur_names": 0 })
		if (items["whatsapp_config_blur_photos"] === undefined) chrome.storage.sync.set({ "whatsapp_config_blur_photos": 0 })
	});
}