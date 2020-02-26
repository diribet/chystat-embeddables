# chy.stat Embeddables

> Embed [chy.stat](https://www.chystat.com) graphics to your website

## Table of Contents

* [Install](#install)
* [Usage](#usage)
  * [Node](#node)
  * [Browser](#browser)
  * [Options](#options)
* [License](#license)

## Install

```sh
npm install @diribet/chystat-embeddables
```


## Usage

```javascript
ChyEmbeddables.graphic([ element | elementId ], options)
```

**HTML**
```html
<div id="embed-graphic" />
```


### Node

```javascript
import * as ChyEmbeddables from "@diribet/chystat-embeddables";

ChyEmbeddables.graphic("embed-graphic", {
    url: "https://chystat.instance.url",
    graphicId: "bcc44e3a-a6fc-4db1-adfc-f2ad8bb0af55",
    locale: "en",
    simpleQuery: {
        K1001: "shaft",
        K2001: "diameter"
    },
    graphicParameters: {
        "dataHistory.type": "totalValues",
        "dataHistory.numberOfValues": 100
    }
});
```

### Browser

```html
<script src="https://unpkg.com/@diribet/chystat-embeddables/chystat-embeddables.js"></script>

<script type="text/javascript">
  (function() {
    ChyEmbeddables.graphic("embed-graphic", {
        url: "https://chystat.instance.url",
        graphicId: "bcc44e3a-a6fc-4db1-adfc-f2ad8bb0af55",
        locale: "en",
        simpleQuery: {
            K1001: "shaft",
            K2001: "diameter"
        }
    });
  })();
</script>
```

### Options

| Option                | Description   |
| ----------------------|-------------- |
| url                   | URL of chy.stat|
| graphicId             | Id of the embeddable graphic that should be rendered |
| locale                | ISO 639-1 language code |
| simpleQuery           | Object containing a K-key: value pairs. These conditions will be used to find data for the graphic. Multiple conditions will be combined using the logical AND operator.<br/>You can use either `simpleQuery` or `query`.|
| query                 | Query object used to find data for the graphic. See [documentation](https://apidocs.chystat.com/current#kkey-query) for more information.<br/>You can use either `simpleQuery` or `query`.|
| graphicParameters     | Graphic parameters that will override default graphic configuration.|


## License

[MIT](LICENSE) © Diribet
