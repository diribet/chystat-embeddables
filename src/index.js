import "core-js/stable";
import {createContent} from "./utils";

const EMBEDDABLE_PATH = '/embeddable';

function graphic(element, properties) {
    properties.url += EMBEDDABLE_PATH + '?type=graphic';
    createContent(element, properties);
}

export {
    graphic
};
