const EMBEDDABLE_PATH = '/embeddable';

let embeddableIdSequence = 0;

function graphic(elementOrId, options) {
    if (options.graphicId == null) {
        throw new Error("The graphicId option is required.");
    }

    if (options.query == null && options.simpleQuery == null) {
        throw new Error("One of the query or simpleQuery options is required.");
    }

    const properties = {
        type: 'graphic',
        url: options.url + EMBEDDABLE_PATH,
        graphicId: options.graphicId,
        locale: options.locale,
        query: options.query,
        simpleQuery: options.simpleQuery,
        graphicParameters: options.graphicParameters
    };
    const element = resolveElement(elementOrId);
    createContent(element, properties);
}

function resolveElement(elementOrId) {
    if (typeof elementOrId === 'string') {
        return document.getElementById(elementOrId);
    }
    return elementOrId;
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