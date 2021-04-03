const toggleSwitch = document.getElementById("toggle");
const hideAnswers = document.getElementById("hide");
const showAnswers = document.getElementById("show");

let contentScriptRegistered = null;
let testValue = 0;

//toggle switch to load content scripts
toggleSwitch.addEventListener('input', (elem) => {
    if (elem.target.checked) {
        browser.tabs.executeScript({
            file: "/content_scripts/re-assign.js"
        });
    }
});

//send hideAnswers message which will be picked up content script
hideAnswers.addEventListener("click", () => {
    browser.tabs.query({active: true, currentWindow: true})
            .then((tabs) => {
                browser.tabs.sendMessage(tabs[0].id, {command: "re_assign_nptel_hideAnswers"});
            });
});

//send showAnswers message which will be picked up content script
showAnswers.addEventListener("click", () => {
    browser.tabs.query({active: true, currentWindow: true})
            .then((tabs) => {
                browser.tabs.sendMessage(tabs[0].id, {command: "re_assign_nptel_showAnswers"});
            });
});