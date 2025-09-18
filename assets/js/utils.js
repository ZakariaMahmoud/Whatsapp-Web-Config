// Utility functions for Chrome extension

/**
 * Get the current active tab
 * @returns {Promise<chrome.tabs.Tab>} The active tab
 */
async function getCurrentTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
  } catch (error) {
    console.error('Error getting current tab:', error);
    throw error;
  }
}

/**
 * Set a configuration value in Chrome storage
 * @param {string} key - The configuration key
 * @param {number} value - The value to set (0 or 1)
 */
function setConfigValue(key, value) {
  try {
    chrome.storage.local.set({ [key]: value });
  } catch (error) {
    console.error(`Error setting config ${key}:`, error);
  }
}

/**
 * Execute a script in the current tab
 * @param {Function} func - The function to execute
 */
async function executeInCurrentTab(func) {
  try {
    const tab = await getCurrentTab();
    if (tab && tab.id) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: func,
      });
    }
  } catch (error) {
    console.error('Error executing script in tab:', error);
  }
}

/**
 * Handle checkbox change event
 * @param {Event} event - The change event
 * @param {string} configKey - The configuration key
 * @param {Function} executeFunc - The function to execute
 */
async function handleCheckboxChange(event, configKey, executeFunc) {
  const isChecked = event.target.checked;
  const value = isChecked ? 1 : 0;
  
  setConfigValue(configKey, value);
  await executeInCurrentTab(executeFunc);
}

/**
 * Set checkbox state based on stored value
 * @param {number|undefined} value - The stored value (0, 1, or undefined)
 * @param {string} elementId - The element ID
 */
function setCheckboxState(value, elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.checked = value === 1;
  }
}

/**
 * Sleep utility function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Safely get element by ID with retry
 * @param {string} id - Element ID
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise<HTMLElement|null>}
 */
async function safeGetElementById(id, maxRetries = 10, delay = 100) {
  for (let i = 0; i < maxRetries; i++) {
    const element = document.getElementById(id);
    if (element) {
      return element;
    }
    await sleep(delay);
  }
  console.warn(`Element with ID '${id}' not found after ${maxRetries} retries`);
  return null;
}

/**
 * Safely query selector with retry
 * @param {string} selector - CSS selector
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise<Element|null>}
 */
async function safeQuerySelector(selector, maxRetries = 10, delay = 100) {
  for (let i = 0; i < maxRetries; i++) {
    const element = document.querySelector(selector);
    if (element) {
      return element;
    }
    await sleep(delay);
  }
  console.warn(`Element with selector '${selector}' not found after ${maxRetries} retries`);
  return null;
}