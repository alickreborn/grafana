/**
 * Created by thomas on 15/4/2.
 */
var influx = require('influx');

var info = {
    server: {
        host: 'meleors.chinacloudapp.cn',
        port: 8086,
        username: 'root',
        password: 'root',
        timePrecision: 'ms'
    },
    db: {
        name: 'meleors',
        username: 'johnsmith',
        password: 'johnjohn'
    },
    series: {
        name: 'response_time'
    }
};


var client = influx({host : info.server.host,
    port: info.server.port,
    username: info.server.username,
    password : info.server.password,
    database : info.db.name});

var serverSet = [];

function hasServer(s) {
    return serverSet.indexOf(s) !== -1;
}

(function() {
    var seriesPattern = /^(.*)_[^_]+/; // more like: 192.168.0.1_cpu
    function loadSeries() {
        console.log("Loading influxdb series.");

        var s = [];
        client.getSeriesNames(info.db.name, function (err, series) {
            if (err) return console.error(err);

            series.forEach(function(k) {
                var m = seriesPattern.exec(k);
                if (!m) return;

                k = m[1];
                if (s.indexOf(k) === -1)
                    s.push(k);
            });
            serverSet = s;

            console.log("Influxdb series loaded, length = ", s.length );
        });
    }

    loadSeries();
    setInterval(loadSeries, 5 * 60 * 1000);

})();

exports.hasServer = hasServer;