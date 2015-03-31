function ipConfig(ip) {

    return {
        "id": null,
        "title": "Meleors",
        "originalTitle": "Meleors",
        "tags": [],
        "style": "dark",
        "timezone": "browser",
        "editable": true,
        "hideControls": false,
        "sharedCrosshair": false,
        "rows": [
            {
                "title": "New row",
                "height": "150px",
                "collapse": false,
                "editable": false,
                "panels": [
                    {
                        "id": 1,
                        "span": 3,
                        "editable": true,
                        "type": "text",
                        "mode": "html",
                        "content": "<div class=\"text-center\" style=\"padding-top: 15px\">\n<img src=\"http://honey.hunantv.com/hunantv.imgotv/image/header/logo-index.png\"> \n</div>",
                        "style": {},
                        "title": "Welcome to",
                        "links": []
                    },
                    {
                        "title": "User CPU Usage",
                        "error": false,
                        "span": 3,
                        "editable": true,
                        "type": "singlestat",
                        "id": 4,
                        "links": [],
                        "maxDataPoints": 100,
                        "interval": null,
                        "targets": [
                            {
                                "function": "last",
                                "column": "user",
                                "series": ""+ip+"_cpu",
                                "query": "select last(user) from \""+ip+"_cpu\" where $timeFilter group by time($interval) order asc",
                                "hide": false
                            }
                        ],
                        "cacheTimeout": null,
                        "format": "percent",
                        "prefix": "Last Usage",
                        "postfix": " ",
                        "nullText": null,
                        "valueMaps": [
                            {
                                "value": "null",
                                "op": "=",
                                "text": "N/A"
                            }
                        ],
                        "nullPointMode": "connected",
                        "valueName": "avg",
                        "prefixFontSize": "30%",
                        "valueFontSize": "50%",
                        "postfixFontSize": "30%",
                        "thresholds": "50",
                        "colorBackground": false,
                        "colorValue": false,
                        "colors": [
                            "rgba(244, 55, 55, 0.9)",
                            "rgba(237, 129, 40, 0.89)",
                            "rgba(50, 172, 45, 0.97)"
                        ],
                        "sparkline": {
                            "show": true,
                            "full": true,
                            "lineColor": "rgb(31, 120, 193)",
                            "fillColor": "rgba(31, 118, 189, 0.18)"
                        }
                    },
                    {
                        "title": "Sys CPU Usage",
                        "error": false,
                        "span": 3,
                        "editable": true,
                        "type": "singlestat",
                        "id": 5,
                        "links": [],
                        "maxDataPoints": 100,
                        "interval": null,
                        "targets": [
                            {
                                "function": "last",
                                "column": "sys",
                                "series": ip+"_cpu",
                                "query": "select last(sys) from \""+ip+"_cpu\" where $timeFilter group by time($interval) order asc",
                                "hide": false
                            }
                        ],
                        "cacheTimeout": null,
                        "format": "percent",
                        "prefix": "Last Usage",
                        "postfix": " ",
                        "nullText": null,
                        "valueMaps": [
                            {
                                "value": "null",
                                "op": "=",
                                "text": "N/A"
                            }
                        ],
                        "nullPointMode": "connected",
                        "valueName": "avg",
                        "prefixFontSize": "30%",
                        "valueFontSize": "50%",
                        "postfixFontSize": "30%",
                        "thresholds": "50",
                        "colorBackground": false,
                        "colorValue": false,
                        "colors": [
                            "rgba(244, 55, 55, 0.9)",
                            "rgba(237, 129, 40, 0.89)",
                            "rgba(50, 172, 45, 0.97)"
                        ],
                        "sparkline": {
                            "show": true,
                            "full": true,
                            "lineColor": "rgb(31, 120, 193)",
                            "fillColor": "rgba(31, 118, 189, 0.18)"
                        }
                    },
                    {
                        "title": "Free Memory",
                        "error": false,
                        "span": 3,
                        "editable": true,
                        "type": "singlestat",
                        "id": 6,
                        "links": [],
                        "maxDataPoints": 100,
                        "interval": null,
                        "targets": [
                            {
                                "function": "last",
                                "column": "free",
                                "series": ""+ip+"_mem",
                                "query": "select last(free) from \""+ip+"_mem\" where $timeFilter group by time($interval) order asc",
                                "hide": false
                            }
                        ],
                        "cacheTimeout": null,
                        "format": "bytes",
                        "prefix": "Current Free Space",
                        "postfix": " ",
                        "nullText": null,
                        "valueMaps": [
                            {
                                "value": "null",
                                "op": "=",
                                "text": "N/A"
                            }
                        ],
                        "nullPointMode": "connected",
                        "valueName": "avg",
                        "prefixFontSize": "30%",
                        "valueFontSize": "50%",
                        "postfixFontSize": "30%",
                        "thresholds": "50",
                        "colorBackground": false,
                        "colorValue": false,
                        "colors": [
                            "rgba(244, 55, 55, 0.9)",
                            "rgba(237, 129, 40, 0.89)",
                            "rgba(50, 172, 45, 0.97)"
                        ],
                        "sparkline": {
                            "show": true,
                            "full": true,
                            "lineColor": "rgb(31, 120, 193)",
                            "fillColor": "rgba(31, 118, 189, 0.18)"
                        }
                    }
                ],
                "showTitle": false
            },
            {
                "title": "Welcome to Meleors",
                "height": "210px",
                "collapse": false,
                "editable": true,
                "panels": [
                    {
                        "title": "Swap",
                        "error": false,
                        "span": 6,
                        "editable": true,
                        "type": "graph",
                        "id": 9,
                        "datasource": null,
                        "renderer": "flot",
                        "x-axis": true,
                        "y-axis": true,
                        "y_formats": [
                            "short",
                            "short"
                        ],
                        "grid": {
                            "leftMax": null,
                            "rightMax": null,
                            "leftMin": null,
                            "rightMin": null,
                            "threshold1": null,
                            "threshold2": null,
                            "threshold1Color": "rgba(216, 200, 27, 0.27)",
                            "threshold2Color": "rgba(234, 112, 112, 0.22)",
                            "thresholdLine": false
                        },
                        "lines": true,
                        "fill": 0,
                        "linewidth": 1,
                        "points": false,
                        "pointradius": 5,
                        "bars": false,
                        "stack": true,
                        "percentage": false,
                        "legend": {
                            "show": true,
                            "values": false,
                            "min": false,
                            "max": false,
                            "current": false,
                            "total": false,
                            "avg": false,
                            "alignAsTable": false
                        },
                        "nullPointMode": "connected",
                        "steppedLine": true,
                        "tooltip": {
                            "value_type": "cumulative",
                            "shared": false
                        },
                        "timeFrom": null,
                        "timeShift": null,
                        "targets": [
                            {
                                "function": "mean",
                                "column": "value",
                                "rawQuery": true,
                                "query": "select util from "+ip+"_swap"
                            },
                            {
                                "function": "mean",
                                "column": "value",
                                "rawQuery": true,
                                "query": "select swpout from "+ip+"_swap"
                            },
                            {
                                "function": "mean",
                                "column": "value",
                                "rawQuery": true,
                                "query": "select swpin from "+ip+"_swap"
                            }
                        ],
                        "aliasColors": {},
                        "seriesOverrides": [],
                        "links": []
                    },
                    {
                        "title": "UDP",
                        "error": false,
                        "span": 6,
                        "editable": true,
                        "type": "graph",
                        "id": 10,
                        "datasource": null,
                        "renderer": "flot",
                        "x-axis": true,
                        "y-axis": true,
                        "y_formats": [
                            "short",
                            "short"
                        ],
                        "grid": {
                            "leftMax": null,
                            "rightMax": null,
                            "leftMin": null,
                            "rightMin": null,
                            "threshold1": null,
                            "threshold2": null,
                            "threshold1Color": "rgba(216, 200, 27, 0.27)",
                            "threshold2Color": "rgba(234, 112, 112, 0.22)"
                        },
                        "lines": true,
                        "fill": 0,
                        "linewidth": 1,
                        "points": false,
                        "pointradius": 5,
                        "bars": false,
                        "stack": false,
                        "percentage": false,
                        "legend": {
                            "show": true,
                            "values": false,
                            "min": false,
                            "max": false,
                            "current": false,
                            "total": false,
                            "avg": false
                        },
                        "nullPointMode": "connected",
                        "steppedLine": false,
                        "tooltip": {
                            "value_type": "cumulative",
                            "shared": false
                        },
                        "timeFrom": null,
                        "timeShift": null,
                        "targets": [
                            {
                                "function": "mean",
                                "column": "value",
                                "rawQuery": true,
                                "query": "select idgm from  "+ip+"_udp"
                            }
                        ],
                        "aliasColors": {},
                        "seriesOverrides": [],
                        "links": [],
                        "height": ""
                    }
                ]
            },
            {
                "title": "test",
                "height": "250px",
                "editable": true,
                "collapse": false,
                "panels": [
                    {
                        "title": "Traffic",
                        "error": false,
                        "span": 6,
                        "editable": true,
                        "type": "graph",
                        "id": 7,
                        "datasource": null,
                        "renderer": "flot",
                        "x-axis": true,
                        "y-axis": true,
                        "y_formats": [
                            "short",
                            "short"
                        ],
                        "grid": {
                            "leftMax": null,
                            "rightMax": null,
                            "leftMin": null,
                            "rightMin": null,
                            "threshold1": null,
                            "threshold2": null,
                            "threshold1Color": "rgba(216, 200, 27, 0.27)",
                            "threshold2Color": "rgba(234, 112, 112, 0.22)"
                        },
                        "lines": true,
                        "fill": 0,
                        "linewidth": 1,
                        "points": false,
                        "pointradius": 5,
                        "bars": false,
                        "stack": false,
                        "percentage": false,
                        "legend": {
                            "show": true,
                            "values": false,
                            "min": false,
                            "max": false,
                            "current": false,
                            "total": false,
                            "avg": false
                        },
                        "nullPointMode": "connected",
                        "steppedLine": false,
                        "tooltip": {
                            "value_type": "cumulative",
                            "shared": false
                        },
                        "timeFrom": null,
                        "timeShift": null,
                        "targets": [
                            {
                                "function": "mean",
                                "column": "value",
                                "rawQuery": true,
                                "query": "select bytin from "+ip+"_traffic "
                            },
                            {
                                "target": "",
                                "function": "mean",
                                "column": "value",
                                "rawQuery": true,
                                "query": "select bytout from "+ip+"_traffic "
                            }
                        ],
                        "aliasColors": {},
                        "seriesOverrides": [],
                        "links": []
                    },
                    {
                        "title": "Load",
                        "error": false,
                        "span": 6,
                        "editable": true,
                        "type": "graph",
                        "id": 8,
                        "datasource": null,
                        "renderer": "flot",
                        "x-axis": true,
                        "y-axis": true,
                        "y_formats": [
                            "short",
                            "short"
                        ],
                        "grid": {
                            "leftMax": null,
                            "rightMax": null,
                            "leftMin": null,
                            "rightMin": null,
                            "threshold1": null,
                            "threshold2": null,
                            "threshold1Color": "rgba(216, 200, 27, 0.27)",
                            "threshold2Color": "rgba(234, 112, 112, 0.22)"
                        },
                        "lines": true,
                        "fill": 1,
                        "linewidth": 1,
                        "points": false,
                        "pointradius": 5,
                        "bars": false,
                        "stack": true,
                        "percentage": false,
                        "legend": {
                            "show": true,
                            "values": false,
                            "min": false,
                            "max": false,
                            "current": false,
                            "total": false,
                            "avg": false,
                            "alignAsTable": false
                        },
                        "nullPointMode": "connected",
                        "steppedLine": false,
                        "tooltip": {
                            "value_type": "cumulative",
                            "shared": false
                        },
                        "timeFrom": null,
                        "timeShift": null,
                        "targets": [
                            {
                                "function": "mean",
                                "column": "value",
                                "rawQuery": true,
                                "query": "select load1 from "+ip+"_load"
                            },
                            {
                                "target": "",
                                "function": "mean",
                                "column": "value",
                                "rawQuery": true,
                                "query": "select load5 from "+ip+"_load"
                            },
                            {
                                "target": "",
                                "function": "mean",
                                "column": "value",
                                "rawQuery": true,
                                "query": "select load15 from "+ip+"_load"
                            }
                        ],
                        "aliasColors": {},
                        "seriesOverrides": [],
                        "links": []
                    }
                ]
            }
        ],
        "nav": [
            {
                "type": "timepicker",
                "collapse": false,
                "enable": true,
                "status": "Stable",
                "time_options": [
                    "5m",
                    "15m",
                    "1h",
                    "6h",
                    "12h",
                    "24h",
                    "2d",
                    "7d",
                    "30d"
                ],
                "refresh_intervals": [
                    "5s",
                    "10s",
                    "30s",
                    "1m",
                    "5m",
                    "15m",
                    "30m",
                    "1h",
                    "2h",
                    "1d"
                ],
                "now": true,
                "notice": false
            }
        ],
        "time": {
            "from": "now-1h",
            "to": "now"
        },
        "templating": {
            "list": []
        },
        "annotations": {
            "list": []
        },
        "version": 6,
        "hideAllLegends": false
    };

}

exports.ipConfig = ipConfig;
