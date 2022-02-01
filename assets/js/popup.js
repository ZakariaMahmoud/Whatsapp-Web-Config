let state = document.getElementById("state");

checkSave()
state.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	if (document.getElementById("msg").textContent == "Hide")
		chrome.storage.sync.set({ "extension_whatsapp_state": 1 }, () => show());
	else
		chrome.storage.sync.set({ "extension_whatsapp_state": 0 }, () => hide());
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ['assets/js/script.js'],
	});
});

function checkSave() {
	chrome.storage.sync.get(["extension_whatsapp_state"], function (items) {
		if (items["extension_whatsapp_state"] == 1)
			show();
		else if (items["extension_whatsapp_state"] == 0)
			hide();
	});
}
function show() {
	document.getElementById("msg").textContent = "Show"
	document.getElementById("img").src = "./images/hidden.png";
}

function hide() {
	document.getElementById("msg").textContent = "Hide"
	document.getElementById("img").src = "./images/eye.png";
}


chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
	var url = tab[0].url;
	if (url.search("web.whatsapp.com") == -1) {
		window.open('https://web.whatsapp.com/', '_blank');
	}
});