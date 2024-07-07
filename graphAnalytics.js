// Set these variables to your own GTM ID and site name
let analyticsSite = "Jays Audio", // Site name for attributing analytics events to your site
    analyticsGtmId = "G-PBQESZC8V4", // New GTM ID provided by Google
    logAnalytics = true; // If true, events are logged in console

// Load Google Tag Manager onto the page
function setupGraphAnalytics() {
    const gtmScriptUrl = "https://www.googletagmanager.com/gtag/js?id=" + analyticsGtmId;
    const gtmScriptContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${analyticsGtmId}');
    `;
    
    const pageHead = document.querySelector("head");
    const gtmScript = document.createElement("script");
    const inlineScript = document.createElement("script");

    gtmScript.async = true;
    gtmScript.src = gtmScriptUrl;
    inlineScript.textContent = gtmScriptContent;

    pageHead.appendChild(gtmScript);
    pageHead.appendChild(inlineScript);
}

setupGraphAnalytics();

/**
 * Pushes a phone-related event to the data layer.
 * @param {string} eventName - The name of the event.
 * @param {object} p - The phone object containing phone details.
 * @param {string} [trigger="user"] - The trigger for the event.
 */
function pushPhoneTag(eventName, p, trigger = "user") {
    let eventTrigger = trigger;
    let phoneBrand = p.dispBrand ? p.dispBrand : "Target";
    let phoneModel = p.phone;
    let phoneVariant = p.dispName;
    let value = 1;
    
    window.dataLayer.push({
        "event" : eventName,
        "trigger" : eventTrigger,
        "site": analyticsSite,
        "phoneBrand": phoneBrand,
        "phoneModel": phoneModel,
        "phoneVariant": phoneVariant,
        "phoneName" : `${phoneBrand} ${phoneModel}`,
        "value": value
    });
    
    if (logAnalytics) {
        console.log(`Event:      ${eventName}
                     Trigger:    ${eventTrigger}
                     Site:       ${analyticsSite}
                     Phone:      ${phoneBrand} ${phoneModel}
                     Variant:    ${phoneVariant}`);
    }
}

/**
 * Pushes a general event to the data layer.
 * @param {string} eventName - The name of the event.
 * @param {Window} targetWindow - The target window object.
 * @param {string} [other="null"] - Additional data for the event.
 * @param {string} [trigger="user"] - The trigger for the event.
 */
function pushEventTag(eventName, targetWindow, other = "null", trigger = "user") {
    let eventTrigger = trigger;
    let url = targetWindow.location.href;
    let par = "?share=";
    let value = 1;
    let activePhones = url.includes(par) ? decodeURI(url.replace(/_/g," ").split(par).pop().replace(/,/g, ", ")) : "null";
    let otherData = other;
    
    window.dataLayer.push({
        "event" : eventName,
        "trigger" : eventTrigger,
        "site": analyticsSite,
        "activePhones": activePhones,
        "other": otherData,
        "value": value
    });
    
    if (logAnalytics) {
        console.log(`Event:      ${eventName}
                     Trigger:    ${eventTrigger}
                     Site name:  ${analyticsSite}
                     Active:     ${activePhones}
                     Other:      ${otherData}`);
    }
}

if (logAnalytics) {
    console.log("... Analytics initialized ... ");
}
