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

// CSS Selectors
const SELECTORS = {
  DEFAULT_USER: '[data-testid="default-user"]',
  PANE_SIDE_CONTACTS: '#pane-side > div > div > div',
  BODY: 'body',
  SIDE_ELEMENT: '#side',
  MAIN_HEADER: '#main > header > div:nth-child(2) > div > div',
  CELL_FRAME_CONTAINER: '[data-testid="cell-frame-container"]',
  GRIDCELL_DIV: '[role="gridcell"] div',
  APP_MAIN_DIV: '//*[@id="app"]/div[1]/div[1]',
  ICON_HIDE_XPATH: '//*[@id="app"]/div/div/div[3]/header/div[2]/div/span',
  HEADER_DIV: '#main > header > div > div'
};

// Element IDs
const ELEMENT_IDS = {
  CHECK_HIDE: 'check_hide',
  CHECK_DARK_THEME: 'check_dark_theme',
  CHECK_BLUR_NAMES: 'check_blur_names',
  CHECK_BLUR_PHOTOS: 'check_blur_photos',
  CHECK_BLUR_CONVERSATION_MESSAGES: 'check_blur_conversation_messages',
  CHECK_BLUR_RECENT_MESSAGES: 'check_blur_recent_messages',
  OPACITY_SLIDER: 'opacity',
  STATE_HIDE: 'stateHide',
  STATE_SHOW: 'stateShow',
  DARK_THEME_STYLE: 'DarkTheme',
  BLUR_NAMES_STYLE: 'BlurNames',
  BLUR_PHOTOS_STYLE: 'BlurPhotos',
  BLUR_CONVERSATION_MESSAGES_STYLE: 'BlurConversationMessages',
  BLUR_RECENT_MESSAGES_STYLE: 'BlurRecentMessages'
};

// Blur opacity value
const BLUR_OPACITY = 5;

// Sleep delay values
const SLEEP_DELAYS = {
  SHORT: 100,
  MEDIUM: 500,
  LONG: 1000
};