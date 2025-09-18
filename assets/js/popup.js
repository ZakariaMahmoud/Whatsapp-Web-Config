// Check if current tab is WhatsApp Web, if not open it
chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
	const url = tab[0]?.url;
	if (url && !url.includes("web.whatsapp.com")) {
		window.open('https://web.whatsapp.com/', '_blank');
	}
});

// Initialize the popup
init();
// Configuration object for checkboxes
const CHECKBOX_CONFIG = {
	[ELEMENT_IDS.CHECK_HIDE]: {
		configKey: CONFIG_KEYS.SIDEBAR,
		executeFunc: execute_sidebar
	},
	[ELEMENT_IDS.CHECK_DARK_THEME]: {
		configKey: CONFIG_KEYS.DARK_THEME,
		executeFunc: execute_dark_theme
	},
	[ELEMENT_IDS.CHECK_BLUR_NAMES]: {
		configKey: CONFIG_KEYS.BLUR_NAMES,
		executeFunc: execute_blur_names
	},
	[ELEMENT_IDS.CHECK_BLUR_PHOTOS]: {
		configKey: CONFIG_KEYS.BLUR_PHOTOS,
		executeFunc: execute_blur_photos
	},
	[ELEMENT_IDS.CHECK_BLUR_CONVERSATION_MESSAGES]: {
		configKey: CONFIG_KEYS.BLUR_CONVERSATION_MESSAGES,
		executeFunc: execute_blur_conversation_messages
	},
	[ELEMENT_IDS.CHECK_BLUR_RECENT_MESSAGES]: {
		configKey: CONFIG_KEYS.BLUR_RECENT_MESSAGES,
		executeFunc: execute_blur_recent_messages
	}
};

// Setup event listeners for all checkboxes
Object.entries(CHECKBOX_CONFIG).forEach(([elementId, config]) => {
	const element = document.getElementById(elementId);
	if (element) {
		element.addEventListener("change", async (event) => {
			await handleCheckboxChange(event, config.configKey, config.executeFunc);
		});
	}
});

// Opacity slider
const slider = document.getElementById(ELEMENT_IDS.OPACITY_SLIDER);

if (slider) {
	slider.oninput = async function () {
		setConfigValue(CONFIG_KEYS.OPACITY, this.value);
		await executeInCurrentTab(execute_opacity);
	};
}


/**
 * Initialize the popup by loading stored configuration values
 */
function init() {
	const configKeys = Object.values(CONFIG_KEYS);
	
	chrome.storage.local.get(configKeys, function (items) {
		// Set checkbox states based on stored values
		Object.entries(CHECKBOX_CONFIG).forEach(([elementId, config]) => {
			const value = items[config.configKey];
			setCheckboxState(value, elementId);
		});
		
		// Set opacity slider value
		const opacityValue = items[CONFIG_KEYS.OPACITY];
		if (opacityValue !== undefined && slider) {
			slider.value = opacityValue;
		}
	});
}