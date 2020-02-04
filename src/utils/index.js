export function createContent(element, properties) {
    if (element == null) {
        throw new Error("You have to provide a DOM element where to load the embeddable content");
    }

    const iframe = document.createElement('iframe');
    iframe.src = properties.url;
    iframe.className = 'chy-embeddable-frame loading';
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    iframe.addEventListener('load', function() {
        console.info('load');
        iframe.classList.remove('loading');
    });

    element.appendChild(iframe);
}
