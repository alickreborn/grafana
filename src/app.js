/**
 * Created by thomas on 15/3/24.
 */
"use strict";

var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , mongo = require('./lib/mongo')
    , ipConfig = require('./app/config/default').ipConfig
    , defaultConfig = require('./app/config/default_config');


function capitalize(s) {
    if (!s) return s;

    s = s.toLowerCase();
    return s.substring(0,1).toUpperCase() + s.substr(1);
}


var whitelist = ['machinetree'];
app.use('/meleors/:collection', function(req, res, next) {
    if (whitelist.indexOf(req.params.collection) >=0) {
        return next();
    }

    var collection = capitalize(req.params.collection);

    var Clazz = mongo[collection];
    if (!Clazz) {
        return res.status(405).end();
    }

    req._collectionClass = Clazz;
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/app/dashboards/:ip', function(req, res) {
    var ip = req.params.ip;
    ip = ip.split('.')[0].replace(/-/g, '.');
    if (ip == 'default.json') {
        return res.json(defaultConfig);
    }

    res.json(ipConfig(ip));
});

app.get('/meleors/:collection/:id', function (req, res) {

    var clazz = req._collectionClass;
    var promise = clazz.findById(req.params.id);

    if (clazz.schema.refs) {
        clazz.schema.refs.forEach(function(r) {
            promise.populate(r);
        });
    }

    promise.exec(function(err, r) {
            if (err) {
                console.error(err);
                return res.json({});
            }

            return res.json(r);
        });
});

app.get('/meleors/machinetree', function(req, res) {
    var count = 0;

    var ret = null;
    function findModule(err, services) {

        for (var i in services) {
            count ++;

            (function(s) {
                mongo.Module
                    .find({service: s})
                    .populate('machines')
                    .exec(function(err, d) {
                        count --;
                        if (err || d.length == 0) return;
                        s.modules = d;

                        if (count == 0) {
                            ret = JSON.parse(JSON.stringify(ret));
                            remainedFields(ret,
                                ['name', 'services', 'modules', '_id', 'ip', 'machines']);
                            res.json(ret);
                        }
                    });
            })(services[i]);

        }
    }

    function findService(err, dps) {
        ret = dps; // copyFields(dps, ['name']);
        for (var i in dps ) {
            count ++ ;
            (function(r) {
                mongo.Service
                    .find({department: r})
                    .exec(function(err, s) {
                        count --;
                        if (err || s.length == 0) return;
                        r.services = s
                        findModule.apply(this, arguments);
                    });
            })(dps[i]);

        }

    }

    function remainedFields(obj, keys) {
        if (obj.length != 'undefined') {
            return remainArrayFields(obj, keys);
        }

        remainedObjectFields(obj, keys);
    }

    function remainArrayFields(arr, keys) {
        for (var i in arr) {
            remainedObjectFields(arr[i], keys);
        }
    }

    function remainedObjectFields(obj, fields) {
        for (var k in obj) {
            if (fields.indexOf(k) != -1) {

                if (typeof (obj[k]) == "object") {
                    remainedFields(obj[k], fields);
                }

                continue;
            }

            delete obj[k];
        }
    }

    function copyFields(obj, fields) {
        if (obj.length != 'undefined') {
            return copyArrayFields(obj, fields);
        }

        return copyObjectFields(obj, fields);
    }

    function copyArrayFields(arr, keys) {
        var r = [];
        for (var i in arr) {
            r[i] = copyObjectFields(arr[i]);
        }

        return r;
    }

    function copyObjectFields(src, keys) {
        var r = {};
        for (var i in keys) {
            var k = keys[i];

            r[k] = src[k];
        }

        return r;
    }
    mongo.Department.find()
        .select('name')
        .exec(findService);
});

app.get('/meleors/:collection', function (req, res) {
    var q = req.body;
    var clazz = req._collectionClass;
    var promise = clazz.find(q);

    if (clazz.schema.refs) {
        clazz.schema.refs.forEach(function(r) {
            promise.populate(r);
        });
    }

    promise.exec(function(err, r) {
            if (err) {
                console.error(err);
                return res.json({});
            }

            return res.json(r);
        });
});
app.post('/meleors/:collection/?', function (req, res) {

    var coll = new req._collectionClass(req.body);

    coll.save(function(err, r) {
        return res.json(r);
    });
});

app.put('/meleors/:collection/:id', function(req, res) {
    var objId = req.params.id;
    delete req.body._id;
    delete req.body.__v;

    req._collectionClass.update({_id: objId}, req.body, function(err, r) {
        return res.json(r);
    });
});

app.delete('/meleors/:collection/:id', function(req, res) {
    var objId = req.params.id;

    var b = req.body;
    b._id = objId;

    var coll = new req._collectionClass(b);

    coll.remove(function(err, r) {
        if (err) {
            console.error("", err);
            return res.status(400).end(err);
        }
        return res.json({status: 'ok'});
    });
});


process.on('uncaughtException', function(e) {
    console.error('Uncaught Exception '+e);
})
app.listen(3000);
