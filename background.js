"use strict";

// var activated=true;
/*
This is the page for which we want to rewrite the User-Agent header.
*/
var targetPage = "<all_urls>";

/*
Map browser names to UA strings.
*/
var uaStrings = {
  "Windows": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36",
  "Linux": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/74.0.3729.157 Safari/537.36",
  "macOS": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
  "Android": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G930F Build/R16NW; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.157 Mobile Safari/537.36"
}

/*
Initialize the UA to Firefox 41.
*/
var ua = uaStrings["Windows"];

/*
Rewrite the User-Agent header to "ua".
*/
function rewriteUserAgentHeader(e) {
  for (var header of e.requestHeaders) {
    if (header.name.toLowerCase() === "user-agent") {
      header.value = ua;
    }
  }
  return {requestHeaders: e.requestHeaders};
}

/*
Add rewriteUserAgentHeader as a listener to onBeforeSendHeaders,
only for the target page.

Make it "blocking" so we can modify the headers.
*/
browser.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeader,
                                          {urls: [targetPage]},
                                          ["blocking", "requestHeaders"]);

/*
Update ua to a new value, mapped from the uaString parameter.
*/
function setUaString(uaString) {
  ua = uaStrings[uaString];
}

