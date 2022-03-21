//set default values
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        toggleSitesActive: false,
        toggleSitesList: 'example.com'
    }, () => { } 
    );
});
//setup the initial chrome storage values

let toggleSitesActive = false;
let toggleSitesList = 'example.com';

//replace the initailvalues above with one from synced storage

chrome.storage.sync.get([
    'toggleSitesActive',
    'toggleSitesList'

], (result) => {
    toggleSitesActive = result.toggleSitesActive;
    toggleSitesList= result.toggleSitesList;
})

//on each site request, block it if it in toggleSitesList

chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        //if toggle is inactive, dont block anathing
        if (!toggleSitesActive) {
            return {
                cancel: false
            };
        }
        //determine if the url is in toggleSitesList
        let cancel = toggleSitesList.split(/\n/)
            .some(site => {
                let url = new URL(details.url);

                return Boolean(url.hostname.indexOf(site) != -1);
            });
        
        return {
            cancel: cancel
        };
    },
    {
        urls: ["<all_urls>"]
    },
    [
        "blocking"
    ]
);

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace == 'sync') {
        if (changes.toggleSitesActive) {
            toggleSitesActive = changes.toggleSitesActive.newValue;
        }
        if (changes.toggleSitesList) {
            toggleSitesList = changes.toggleSitesList.newValue;
        }
    }
})
  