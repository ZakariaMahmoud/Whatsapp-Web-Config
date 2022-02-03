chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
	var url = tab[0].url;
	if (url.search("web.whatsapp.com") == -1) {
		window.open('https://web.whatsapp.com/', '_blank');
	}
});
init()

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
		func: execute_whatsapp_config_blur_conversation_messages,
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
		func: execute_whatsapp_config_blur_recent_messages,
	});
});

function init() {
	chrome.storage.sync.get(["whatsapp_config_blur_names", "whatsapp_config_sidebar", "whatsapp_config_blur_photos", "whatsapp_config_blur_recent_messages", "whatsapp_config_blur_conversation_messages"], function (items) {
		checkbox(items["whatsapp_config_sidebar"], "check_hide")
		checkbox(items["whatsapp_config_blur_names"], "check_blur_names")
		checkbox(items["whatsapp_config_blur_photos"], "check_blur_photos")
		checkbox(items["whatsapp_config_blur_recent_messages"], "check_blur_recent_messages")
		checkbox(items["whatsapp_config_blur_conversation_messages"], "check_blur_conversation_messages")
	});
}

function checkbox(item, element) {
	if (item == 1)
		document.getElementById(element).checked = true
	else if (item == 0)
		document.getElementById(element).checked = false
}