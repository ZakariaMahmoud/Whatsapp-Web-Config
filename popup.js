// Initialize butotn with users's prefered color
let state = document.getElementById("state");

state.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (document.getElementById("msg").textContent == "Hide") {
			document.getElementById("msg").textContent = "Show"
      document.getElementById("img").src = "./images/eye.png";
	}
  else
  {
    document.getElementById("msg").textContent = "Hide"
    document.getElementById("img").src = "./images/hidden.png";
  }
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['script.js'],
  });

});