## What's this ?

A dependency of the chrome extension that extracts the text from a Google Docs page.

## How it works

It is complex! It uses a lot of different techniques to achieve the goal.

### Extracting the text - the page global script

There is some **black magic** involved in this process; it is all in the file `walk_kix_app/src/walk_kix_app.ts`,
also called the <span style="color:orange;">page global script</span>.

The global `window` Object has a property which name ends with `_kixApp`.
The magic object behind this property is retrieved using the `get_kix_app()` function.

This is a complex undocumented object... but which contains the text in a property which string value starts with `0x03`.
The `walk_kx_kix_app()` function recursively walks the object to find the property and extracts the text.

### Generating and loading the page global script

Unfortunately, this magic object is not available in the sandboxed <span style="color:blue;">content script</span> environment.

To load the <span style="color:orange;">page global script</span> so it can access the full `window` object, there is another trick:
we compile the <span style="color:orange;">page global script</span> to a non-module js file and load it in the <span style="color:blue;">content script</span> as we would with any js file.

Since the <span style="color:orange;">page global script</span> will be loaded using a script tag, the generated javascript
cannot be packaged as module. This is the reason why the `walk_kix_app` <span style="color:orange;">page global script</span> has a custom `tsconfig.json` file to generate a non-module javascript file.

(version 2.0 update) The transpiled Js code is now emitted to the local dist folder by default. The chrome extension is configured to emit it in under `public/page` folder instead (vite makes this folder available to the extension at runtime by statically serving it). This approach is subject to change.

```json
  "scripts": {
    "build": "npm run build:extension_ui && npm run build:walk_kix_app && npm run build:chrome",
    "build:chrome": "vite build --config vite.config.mts",
    "build:walk_kix_app": "tsc --project ./walk_kix_app/tsconfig.json --outDir ./public/page",
    ...
    },
```

The code loading the <span style="color:orange;">page global script</span> using a script tag is visible at the top of the `extension/src/content_script.ts` file.
Since the <span style="color:orange;">page global script</span> is loaded by the <span style="color:blue;">content script</span>, it must be made accessible to the <span style="color:blue;">content script</span>
in the `manifest.json` file using an entry

```json
  "web_accessible_resources": [
    {
      "resources": ["page/*"],
      "matches": ["https://docs.google.com/*"]
    }
  ],
```

### Communicating between the scripts

We now have 3 scripts:

- the <span style="color:blue;">content script</span>, which is sandboxed
- the <span style="color:orange;">page global script</span>, which has access to the full `window` object and has been loaded from the <span style="color:blue;">content script</span>
- the<span style="color:green;"> panel script</span>, which controls the panel window

We want the<span style="color:green;"> panel script</span> to receive the text when a button is clicked in the panel window.

Message passing is done from Panel script to Content script to Page global script and back.

- from Panel Script to Content Script: this is done using `chrome.tabs.sendMessage()`
- from Content Script to Page Global Script: this is done using `document.dispatchEvent(()`

Since we do not want to add a new listener to the `document` object each time the panel button is clicked,
the <span style="color:blue;">content script</span> only adds a document listener once, when it is loaded.

- The <span style="color:blue;">content script</span> generates a random message ID for every call it makes to the <span style="color:orange;">page global script</span>,
  and keeps track of the<span style="color:green;"> panel script</span> callback for each message ID.
- The <span style="color:orange;">page global script</span> sends back the message ID with the extracted text.
- The content recovers the panel callback from the message ID, and calls it with the text.

The map of message IDs to callbacks is stored in the `panel_responses` object of the <span style="color:blue;">content script</span>.

## Next

The next thing to do now is to pass the text from the Panel script to a background worker
of the extension. The background worker will then be able to send the text to the
Cosmian VM running the summary model.
