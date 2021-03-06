# fgroup

Fluent interface for grouping object arrays

## Installation

    npm install fgroup --save

## Usage

```javascript
var group = require('fgroup');
```

This creates and returns a function. Calling this function sets up the chaining feature and creates another function that is bound to your grouping parameters. This is the function you call on your dataset.

The following is a grouping function that is useful for the sample data included in this project.

```javascript
var group = require('fgroup');

var groupByRegion = group('people')        // the name of each array of grouped objects
        .by('regionId')                    // the property by which to group
        .include('regionId', 'regionName') // what to include in each group
        .details('salesRep', 'sales')      // what to include in each of the grouped objects
        .notnull('salesRep');              // skip it if this property is null

var data = require('./sample');

var groupedData = groupByRegion(data);
```

The `notnull` parameter is useful when dealing with data retrieved from a database using on an outer join. In that case, you will typically get back data that has one parent record with the child fields set to null. You would want to group this as a parent record with an empty children array and *not* a parent record with a child array of length one and that one grouped object containing only null values.

The chained parameter functions can be called in any order. They can also be omitted. If `include` is not called, then only the grouping property is included. If `details` is not called, then all properties in the grouped object are included. If you forget to call the `by` function, then no grouping is done and you will get back your input data.

The intent is to create a grouping function once in your code and then reuse it. You could create it dynamically, but typically, when dealing with data from a database, you will know what columns you need to group for each select.

### As a callback

If the created grouping function is called with another function, then it is assumed to be a callback function having the standard `callback(err, data)` signature. The grouping function now becomes the new callback function. Here is a SQLite example:

```javascript
function getRegionalSales(db, callback) {
    db.all('SELECT * FROM [regionalSalesView]', groupByRegion(callback));
    // Assume this view is a left outer join between regions and sales staff.
}
```

This is a convenience feature but it does add to the overall readability of the code and makes the intent clear.

----

I hope you find fgroup useful. This is unlicensed software. Just do with it what you want or need.

