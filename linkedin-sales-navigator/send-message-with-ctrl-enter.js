// ==UserScript==
// @name         Send message with Enter
// @namespace    https://reweb.com.ar/
// @version      2024-11-20
// @description  Enable sending message using Ctrl+Enter in LinkedIn Sales Navigator
// @author       Joaquín Leonel Robles
// @match        https://*.linkedin.com/sales/inbox/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=linkedin.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sendLabels = ["Enviar", "Send"];

    let mainContentObserver = new MutationObserver(mutations => {
        let endOfList = false
        let observedElement = null

        for (let mutation of mutations) {
            observedElement = mutation.target;

            // if the message overlay appears
            if (mutation.type == "childList" && mutation.addedNodes.length > 0) {
                for (let node of mutation.addedNodes) {
                    if (node.nodeType === 1) {
                        if (node.tagName.toLowerCase() === "textarea" && Array.from(node.classList).some(e => e.startsWith('_message-field'))) {
                            node.addEventListener("keyup", onKeyUp)
                        }
                    }
                }
            }
        }
    })

    mainContentObserver.observe(document.body, {
        childList: true, subtree: true
    });

    function onKeyUp(e) {
        if (e.keyCode == 13 && e.ctrlKey) {
            let form = e.target.closest("form")
            let buttons = Array.from(form.querySelectorAll("button > span"))
            let submitButton = buttons.filter(sp => sendLabels.includes(sp.innerText))[0]

            submitButton.parentElement.click()
        }
    }

})();
