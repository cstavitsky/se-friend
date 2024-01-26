## What is this?

I wanted to see if we could automate some simple minor tasks for the SE team that are annoying but not problematic enough to spend significant resources on. For example, it would be nice for no SE to have to remember the key/value pairs of query parameters to pass in during a demo.

I generated this chrome extension scaffolding with ChatGPT, and then made some changes myself. The original prompt was:

>Write a chrome extension using react for the ui component. The extension should modify the url in a browser and, if a text field labeled "SE" is filled in with a string,  append a query parameter to the URL with key 'se' and value equal to that string.
>There should also be a set of radio buttons available; if the first radio button, labeled "FE+BE slowdown" is selected, do nothing. If the second radio button, labeled "Frontend Only Slowdown" is selected, append a query parameter to the URL with key "frontendSlowdown" and value "true".
>There should also be another set of radio buttons available.  For each of the following, add a radio button: ['flask', 'express', 'springboot', 'aspnetcore', 'laravel', 'ruby', 'rails']. If that radio button is selected, add a query parameter to the url where key is "backend" and value is the value of the radio button.

I had to prompt it to work with localstorage:

>Instead of clicking a button to update the URL, please have the Popup component store the value from each setting (any text fields, radio buttons, checkboxes) in localstorage and applied automatically to each url when the page loads.

There might have been some minor tweaks.

## Running it Locally

clone repo, and `cd` into it

```
$ npm install react-scripts
$ npm run build
```

1. Open Chrome and navigate to chrome://extensions/
2. Enable “Developer mode”
3. Click “Load unpacked” and select the build folder of your React app
4. Pin the extension to your toolbar
5. Navigate to the demo app
6. Click the extension icon in your toolbar and select whatever values

## Screenshots

### Before
![Screenshot 2024-01-26 at 2 33 09 PM](https://github.com/cstavitsky/se-friend/assets/12092849/52929c42-009a-410f-8b59-2e1f95d43f7b)

### After
Clicking the popup will trigger the javascript and cause the URL to be updated with the stored query parameter values.

![Screenshot 2024-01-26 at 2 33 26 PM](https://github.com/cstavitsky/se-friend/assets/12092849/5c8ffdc8-3fe7-4f28-8986-ad201c48c06d)

