chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.get(["whatsapp_config_sidebar", "whatsapp_config_blur_names", "whatsapp_config_blur_photos", "whatsapp_config_blur_recent_messages", "whatsapp_config_blur_conversation_messages", "whatsapp_config_dark_theme"], async function (items) {
		if (items["whatsapp_config_sidebar"] === undefined) chrome.storage.sync.set({ "whatsapp_config_sidebar": 0 })
		if (items["whatsapp_config_blur_names"] === undefined) chrome.storage.sync.set({ "whatsapp_config_blur_names": 0 })
		if (items["whatsapp_config_blur_photos"] === undefined) chrome.storage.sync.set({ "whatsapp_config_blur_photos": 0 })
		if (items["whatsapp_config_blur_recent_messages"] === undefined) chrome.storage.sync.set({ "whatsapp_config_blur_recent_messages": 0 })
		if (items["whatsapp_config_blur_conversation_messages"] === undefined) chrome.storage.sync.set({ "whatsapp_config_blur_conversation_messages": 0 })
		if (items["whatsapp_config_dark_theme"] === undefined) chrome.storage.sync.set({ "whatsapp_config_dark_theme": 0 })

	});
});
