var group = require('./group'),
    sample = require('./sample'),
    util = require('util');

var groupByRegionId = group('people').by('regionId')
    .include('regionId', 'regionName')
    .details('salesRep', 'sales')
    .notnull('salesRep');

var groupByRegionName = group().by('regionName');

output(groupByRegionId(sample));

output(groupByRegionName(sample));

function output(data) {
    console.log(util.inspect(data, {
        depth: 5
    }));
}
