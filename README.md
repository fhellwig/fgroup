# group

Fluent interface for grouping arrays of objects

## Installation

    npm install group --save

## Usage

Requiring the module returns a function. Calling this function sets up the ability to chain the functions together. The end result is another function that can be called on your dataset. The following is a grouping function that is useful for the sample data included in this project.

```javascript
var group = require('group');

var groupByRegion = group('people')            // the name of array of grouped objects
        .by('regionId')// the property by which to group
        .include('regionId', 'regionName') // what to include in each group
        .details('salesRep', 'sales') // what to include in each of the grouped objects
        .notnull('salesRep'); // skip it if this property is null

var data = require('./sample');

var groupedData = groupByRegion(data);
```
