export function createContent(element, properties) {
    if (element == null) {
        throw new Error('You have to provide a DOM element where to load the embeddable content');
    }

    const iframe = document.createElement('iframe');
    iframe.src = properties.url;
    iframe.className = 'chy-embeddable-frame';
    iframe.style.margin = '0';
    iframe.style.padding = '0';
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    iframe.addEventListener('load', function() {
        iframe.contentWindow.postMessage(properties, '*');
    });

    element.appendChild(iframe);
}
