# chy.stat Embeddables

[![npm (scoped)](https://img.shields.io/npm/v/@diribet/chystat-embeddables)](https://www.npmjs.com/package/@diribet/chystat-embeddables)

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

### JavaScript

```javascript
ChyEmbeddables.graphic([ element | elementId ], options)
```

### HTML

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
    simpleDataQuery: {
        K1001: "shaft",
        K2001: "diameter"
    },
    simpleHistoricalDataQuery: {
        K0063: 5
    },
    graphicParameters: {
        "dataHistory.type": "totalValues",
        "dataHistory.numberOfValues": 100
    }
});
```

### Browser

```html
<script src="https://unpkg.com/@diribet/chystat-embeddables/dist/chystat-embeddables.js"></script>

<script type="text/javascript">
  (function() {
    ChyEmbeddables.graphic("embed-graphic", {
        url: "https://chystat.instance.url",
        graphicId: "bcc44e3a-a6fc-4db1-adfc-f2ad8bb0af55",
        locale: "en",
        simpleDataQuery: {
            K1001: "shaft",
            K2001: "diameter"
        },
        simpleHistoricalDataQuery: {
            K0063: 5
        },
    });
  })();
</script>
```

### Options

| Option                    | Description   | Required |
| ------------------------- | ------------- | -------- |
| url                       | URL of chy.stat | true |
| graphicId                 | Id of the embeddable graphic that should be rendered | true |
| locale                    | ISO 639-1 language code | false |
| simpleDataQuery           | Query object containing a K-key: value pairs. Multiple conditions will be combined using the logical AND operator. | false* |
| dataQuery                 | Query object with complex K-key rules. See [documentation](https://apidocs.chystat.com/current#kkey-query) for more information. | false* |
| simpleHistoricalDataQuery | Query object containing a K-key: value pairs. Multiple conditions will be combined using the logical AND operator. | true* |
| historicalDataQuery       | Query object with complex K-key rules. See [documentation](https://apidocs.chystat.com/current#kkey-query) for more information. | true* |
| graphicParameters         | Graphic parameters that will override default graphic configuration. | false |

__*__ You can use either `simple[Data|HistoricalData]Query` or `[data|historicalData]Query` version.

#### Query

Looking for data is performed in two possible ways:

* You provide both `[simple]dataQuery` and `[simple]historicalDataQuery`.<br>
  Then data query will be used to find data and after that historical query will be used to find historical data (if necessary).

* You privide only `[simple]dataQuery`<br>
  Then the data query will be used to find data without any additional history lookup.

## License

[MIT](LICENSE) © Diribet
