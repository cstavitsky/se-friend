/*global chrome*/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "updateUrl") {
    const { salesEngineer, slowdownOption, backendOption } = message;
    let newUrl = new URL(window.location.href);

    if (salesEngineer) {
      newUrl.searchParams.set("se", salesEngineer);
    }

    if (slowdownOption === "frontend") {
      newUrl.searchParams.set("frontendSlowdown", "true");
    } else if (slowdownOption === "fe+be") {
      newUrl.searchParams.set("frontendSlowdown", "false");
    }

    if (backendOption) {
      newUrl.searchParams.set("backend", backendOption);
    }

    window.history.replaceState({}, "", newUrl.toString());
  }
});
