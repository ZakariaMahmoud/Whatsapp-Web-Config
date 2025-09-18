// Configuration constants
const CONFIG_KEYS = {
  SIDEBAR: 'whatsapp_config_sidebar',
  BLUR_NAMES: 'whatsapp_config_blur_names',
  BLUR_PHOTOS: 'whatsapp_config_blur_photos',
  BLUR_RECENT_MESSAGES: 'whatsapp_config_blur_recent_messages',
  BLUR_CONVERSATION_MESSAGES: 'whatsapp_config_blur_conversation_messages',
  DARK_THEME: 'whatsapp_config_dark_theme',
  OPACITY: 'whatsapp_config_opacity'
};

// Default values
const DEFAULT_VALUES = {
  [CONFIG_KEYS.SIDEBAR]: 0,
  [CONFIG_KEYS.BLUR_NAMES]: 0,
  [CONFIG_KEYS.BLUR_PHOTOS]: 0,
  [CONFIG_KEYS.BLUR_RECENT_MESSAGES]: 0,
  [CONFIG_KEYS.BLUR_CONVERSATION_MESSAGES]: 0,
  [CONFIG_KEYS.DARK_THEME]: 0,
  [CONFIG_KEYS.OPACITY]: 5
};

/**
 * Initialize default configuration values on extension install
 */
chrome.runtime.onInstalled.addListener(() => {
	const configKeys = Object.values(CONFIG_KEYS);
	
	chrome.storage.local.get(configKeys, function (items) {
		// Set default values for any undefined configuration keys
		const updates = {};
		
		Object.entries(DEFAULT_VALUES).forEach(([key, defaultValue]) => {
			if (items[key] === undefined) {
				updates[key] = defaultValue;
			}
		});
		
		// Apply updates if any
		if (Object.keys(updates).length > 0) {
			chrome.storage.local.set(updates);
		}
	});
});
