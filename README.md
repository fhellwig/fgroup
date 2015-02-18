# group

A utility for grouping arrays of objects

Given an array of objects, groups them by a specified key. Uses a fluid interface for readability.

    npm install group --save

## Example

```javascript
var group = require('group');

var groupByRegion = group('people').by('regionId')
        .include('regionId', 'regionName')
        .details('salesRep', 'sales')
        .notnull('salesRep');

var data = [...];

var groupedByRegion = groupByRegion(data);
```
