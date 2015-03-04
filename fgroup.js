module.exports = function (children) {
    var _children = children || '_';
    var _by;
    var _include;
    var _details;
    var _notnull;

    function group(items) {
        if (typeof items === 'function') {
            return function (err, data) {
                if (err) {
                    items(err);
                } else {
                    items(null, group(data));
                }
            };
        }
        var results = [],
            grouped = {};
        items.forEach(function (item) {
            var key = item[_by];
            if (typeof key === 'undefined') {
                results.push(item);
            } else {
                var group = grouped[key];
                if (!group) {
                    group = extract(_include || [_by], item);
                    group[_children] = [];
                    grouped[key] = group;
                    results.push(group);
                }
                if (!_notnull || item[_notnull] !== null) {
                    group[_children].push(extract(_details, item));
                }
            }
        });
        return results;
    }

    function by(arg) {
        _by = arg;
        return group;
    }

    function include() {
        _include = Array.prototype.slice.call(arguments);
        return group;
    }

    function details() {
        _details = Array.prototype.slice.call(arguments);
        return group;
    }

    function notnull(arg) {
        _notnull = arg;
        return group;
    }

    group.by = by;
    group.include = include;
    group.details = details;
    group.notnull = notnull;

    return group;
};


function extract(keys, src) {
    keys = keys || Object.keys(src);
    var obj = {};
    keys.forEach(function (key) {
        obj[key] = src[key];
    });
    return obj;
}
