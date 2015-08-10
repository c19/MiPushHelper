console.log("initing..");
chrome.tabs.onUpdated.addListener(function(a, b, c) {
	console.log("loading");
    if (c.url.indexOf('http://dev.xiaomi.com/') === 0) {
        chrome.pageAction.show(a);
    }
});