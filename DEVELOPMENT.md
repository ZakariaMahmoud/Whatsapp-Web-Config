# Code Structure Documentation

## Overview
This Chrome extension provides various privacy and usability features for WhatsApp Web. The codebase has been refactored to improve maintainability, reduce code duplication, and follow modern JavaScript best practices.

## File Structure

### Core Files
- **`constants.js`** - Centralized configuration keys, default values, and constants
- **`utils.js`** - Reusable utility functions for common operations
- **`popup.js`** - Popup interface logic with configuration-driven event handling
- **`background.js`** - Service worker for extension initialization
- **`content-script.js`** - Main content script that runs on WhatsApp Web
- **`execute.js`** - Functions executed in the page context

### Configuration System
The extension uses a centralized configuration system defined in `constants.js`:

```javascript
const CONFIG_KEYS = {
  SIDEBAR: 'whatsapp_config_sidebar',
  BLUR_NAMES: 'whatsapp_config_blur_names',
  // ... other keys
};
```

### Key Improvements Made

#### 1. Code Deduplication
- **Before**: Repetitive event listeners with copy-pasted code
- **After**: Configuration-driven approach using `CHECKBOX_CONFIG` object

#### 2. Better Error Handling
- Added null checks before DOM operations
- Implemented retry mechanisms for element queries
- Added console warnings for debugging

#### 3. Improved Variable Naming
- Replaced `var` with `const`/`let`
- Used descriptive variable names
- Eliminated variable shadowing issues

#### 4. Utility Functions
- `getCurrentTab()` - Centralized tab management
- `setConfigValue()` - Standardized storage operations
- `executeInCurrentTab()` - Simplified script execution
- `safeGetElementById()` - Robust element querying with retries

#### 5. Performance Optimizations
- Reduced repeated `chrome.tabs.query` calls
- Implemented element caching where appropriate
- Added configurable retry delays

## Usage Patterns

### Adding New Features
1. Add configuration key to `CONFIG_KEYS` in `constants.js`
2. Add default value to `DEFAULT_VALUES`
3. Create execution function in `execute.js`
4. Add checkbox configuration to `CHECKBOX_CONFIG` in `popup.js`

### Error Handling
Always use the utility functions for DOM operations:
```javascript
// Good
const element = await safeGetElementById('myId');
if (element) {
  // Safe to use element
}

// Avoid
const element = document.getElementById('myId'); // Might be null
```

### Configuration Management
Use the centralized storage functions:
```javascript
// Good
setConfigValue(CONFIG_KEYS.SIDEBAR, 1);

// Avoid
chrome.storage.local.set({ "whatsapp_config_sidebar": 1 });
```

## Testing
The extension can be tested by:
1. Loading as unpacked extension in Chrome
2. Navigating to WhatsApp Web
3. Testing each feature through the popup interface

## Future Improvements
- Add TypeScript for better type safety
- Implement unit tests for utility functions
- Add configuration validation
- Consider using Chrome's declarative content scripts