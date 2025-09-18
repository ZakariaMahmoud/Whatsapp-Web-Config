/**
 * Execute sidebar toggle functionality
 */
async function execute_sidebar() {
	const element = await safeGetElementById('side');
	if (element && element.parentElement) {
		const parentElement = element.parentElement;
		if (location.hostname === "web.whatsapp.com") {
			if (parentElement.style.display !== 'none') {
				hideSidebar();
			} else {
				showSidebar();
			}
		}
	}
}

/**
 * Execute blur names functionality
 */
async function execute_blur_names() {
	const element = await safeQuerySelector("#pane-side > div > div > div");
	if (element) {
		const childElements = element.querySelectorAll(":scope > div");
		if (childElements.length > 0) {
			BlurNames();
		}
	}
}

/**
 * Execute opacity change functionality
 */
async function execute_opacity() {
	await sleep(SLEEP_DELAYS.SHORT);
	Opacity();
}

/**
 * Execute dark theme toggle functionality
 */
async function execute_dark_theme() {
	const bodyElement = await safeQuerySelector("body");
	if (bodyElement) {
		const isDarkThemeEnabled = bodyElement.classList.contains("dark");
		if (!isDarkThemeEnabled) {
			EnableDarkTheme();
		} else {
			DisableDarkTheme();
		}
	}
}

/**
 * Execute blur photos functionality
 */
async function execute_blur_photos() {
	const element = await safeQuerySelector("#pane-side > div > div > div");
	if (element) {
		const childElements = element.querySelectorAll(":scope > div");
		if (childElements.length > 0) {
			BlurPhotos();
		}
	}
}

/**
 * Execute blur conversation messages functionality
 */
async function execute_blur_conversation_messages() {
	const element = await safeQuerySelector("#pane-side > div > div > div");
	if (element) {
		const childElements = element.querySelectorAll(":scope > div");
		if (childElements.length > 0) {
			BlurConversationMessages();
		}
	}
}

/**
 * Execute blur recent messages functionality
 */
async function execute_blur_recent_messages() {
	const element = await safeQuerySelector("#pane-side > div > div > div");
	if (element) {
		const childElements = element.querySelectorAll(":scope > div");
		if (childElements.length > 0) {
			BlurRecentMessages();
		}
	}
}

