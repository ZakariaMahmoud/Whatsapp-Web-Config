chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
	var url = tab[0].url;
	if (url.search("web.whatsapp.com") == -1) {
		window.open('https://web.whatsapp.com/', '_blank');
	}
});
init()

const sleep = time => {
	return new Promise(resolve => {
		setTimeout(resolve, time);
	})
}
// Slider
var slider = document.getElementById("opacity");
var count = 0;
slider.oninput = async function () {
	if (count >= 30) {
		document.getElementById("opacity").hidden = true
		document.getElementById("message").innerHTML =
			`<div class="col-12 d-flex align-items-center justify-content-center">
				<span class="h5 color-grey">Are you happy now ?</span>
		</div>
		`
	}
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	await sleep(100);
	chrome.storage.sync.set({ "whatsapp_config_opacity": this.value });
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: execute_opacity,
	});
	count++;
}



document.getElementById("check_hide").addEventListener("change", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	if (document.getElementById("check_hide").checked)
		chrome.storage.sync.set({ "whatsapp_config_sidebar": 1 });
	else
		chrome.storage.sync.set({ "whatsapp_config_sidebar": 0 });
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: execute_sidebar,
	});
});

document.getElementById("check_dark_theme").addEventListener("change", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	if (document.getElementById("check_dark_theme").checked)
		chrome.storage.sync.set({ "whatsapp_config_dark_theme": 1 });
	else
		chrome.storage.sync.set({ "whatsapp_config_dark_theme": 0 });
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: execute_dark_theme,
	});
});

document.getElementById("check_blur_names").addEventListener("change", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	if (document.getElementById("check_blur_names").checked)
		chrome.storage.sync.set({ "whatsapp_config_blur_names": 1 });
	else
		chrome.storage.sync.set({ "whatsapp_config_blur_names": 0 });
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: execute_blur_names,
	});
});

document.getElementById("check_blur_photos").addEventListener("change", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	if (document.getElementById("check_blur_photos").checked)
		chrome.storage.sync.set({ "whatsapp_config_blur_photos": 1 });
	else
		chrome.storage.sync.set({ "whatsapp_config_blur_photos": 0 });
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: execute_blur_photos,
	});
});

document.getElementById("check_blur_conversation_messages").addEventListener("change", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	if (document.getElementById("check_blur_conversation_messages").checked)
		chrome.storage.sync.set({ "whatsapp_config_blur_conversation_messages": 1 });
	else
		chrome.storage.sync.set({ "whatsapp_config_blur_conversation_messages": 0 });
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: execute_blur_conversation_messages,
	});
});

document.getElementById("check_blur_recent_messages").addEventListener("change", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	if (document.getElementById("check_blur_recent_messages").checked)
		chrome.storage.sync.set({ "whatsapp_config_blur_recent_messages": 1 });
	else
		chrome.storage.sync.set({ "whatsapp_config_blur_recent_messages": 0 });
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: execute_blur_recent_messages,
	});
});

function init() {
	chrome.storage.sync.get(["whatsapp_config_blur_names", "whatsapp_config_sidebar", "whatsapp_config_blur_photos", "whatsapp_config_blur_recent_messages", "whatsapp_config_blur_conversation_messages", "whatsapp_config_dark_theme", "whatsapp_config_opacity"], function (items) {
		checkbox(items["whatsapp_config_sidebar"], "check_hide")
		checkbox(items["whatsapp_config_blur_names"], "check_blur_names")
		checkbox(items["whatsapp_config_blur_photos"], "check_blur_photos")
		checkbox(items["whatsapp_config_blur_recent_messages"], "check_blur_recent_messages")
		checkbox(items["whatsapp_config_blur_conversation_messages"], "check_blur_conversation_messages")
		checkbox(items["whatsapp_config_dark_theme"], "check_dark_theme")
		if (items["whatsapp_config_opacity"] != undefined) slider.value = items["whatsapp_config_opacity"]
	});
}

function checkbox(item, element) {
	if (item == 1)
		document.getElementById(element).checked = true
	else if (item == 0)
		document.getElementById(element).checked = false
}