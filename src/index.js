const EMBEDDABLE_PATH = '/embeddable';

let embeddableIdSequence = 0;

function graphic(element, properties) {
    properties.url += EMBEDDABLE_PATH;
    properties.type = 'graphic';

    createContent(element, properties);
}

function createContent(element, properties) {
    if (element == null) {
        throw new Error('You have to provide a DOM element where to load the embeddable content');
    }

    const embeddableId = embeddableIdSequence;
    embeddableIdSequence++;
    const iframeUrl = properties.url + "#id=" + embeddableId;

    const iframe = document.createElement('iframe');
    iframe.src = iframeUrl;
    iframe.className = 'chy-embeddable-frame';
    iframe.style.margin = '0';
    iframe.style.padding = '0';
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    window.addEventListener('message', function(event) {
        if (event.data.type === "embeddable-loaded" && event.data.embeddableId == embeddableId) {
            const message = {
                type: "embeddable-settings",
                settings: properties
            };
            iframe.contentWindow.postMessage(message, '*');
        }
    });

    element.appendChild(iframe);
}

export {
    graphic
};
