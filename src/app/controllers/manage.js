/**
 * Created by thomas on 15/3/25.
 */

define([
        'angular',
        'config',
        'lodash',
        'jquery',
        'store',
    ],
    function (angular, config, _, $, store) {
        "use strict";

        var module = angular.module('grafana.controllers');

        var labels = {
            name: "名称",
            service: "服务",
            department: "部门名称",
            module: "模块名称",
            ip: "IP地址",
            room: "所在机房",
            email: "邮件地址",
            position: "职位",
            phone: "手机号",
            contacts: "联系人列表",
            machines: "机器列表",
            env: "环境",
            public_ip: "公网IP",
            serial_number: "机器序列号",
            cabinet_number: "机柜号"
        };

        module.config(function($routeProvider) {
            $routeProvider.when('/department', {
                templateUrl: 'department.html'
            }).when('/service', {
                templateUrl: 'service.html'
            }).when('/module', {
                templateUrl: 'module.html'
            }).when('/employee', {
                templateUrl: 'employee.html'
            }).when('/machine', {
                templateUrl: 'machine.html'
            }).otherwise({
                redirectTo: 'machine.html'
            });
        });

        function Tablet(name, tkeys, selects) {
            selects = _.map(selects, toKey);

            function resouceIdUri(id) {
                return serviceUrl + '/' + id;
            }

            function toKey(s) {
                if (!s) {
                    throw Error("Empty key.");
                }

                if (s.charAt(s.length - 1) == 's') {
                    s = s.substring(0, s.length - 1);
                }

                return s;
            }

            function selectResourceUri(name) {
                name = toKey(name);
                return '/meleors/' + name;
            }

            var serviceUrl = selectResourceUri(name);

            return function($scope, $http) {
                var keys = tkeys;
                var obj = null;

                var records = [];



                function refresh(obj) {
                    var url = serviceUrl;
                    url += obj &&( '?' + $.param(refineObject(obj))) || '';

                    $http.get(url)
                        .success(function(data) {
                            $scope.records = data;
                    });
                }

                function refineObject(obj) {
                    // if (! selects) return obj;

                    _.each(obj, function(v, k) {
                        if (!v) {
                            delete obj[k];
                            return;
                        }

                        if (_.isArray(v)) {
                            for (var i in v) {
                                var o = v[i];
                                if (_.isObject(o)) {
                                    v[i] = o._id;
                                }
                            }
                        }

                        if ('employee' === k) {
                            obj.contacts = v;
                            return;
                        }

                        if ('machine' === k) {
                            obj.machines = v;
                        }

                        if (selects.indexOf(k) > -1) {
                            obj[k] = v._id;
                        }

                    });

                    return obj;
                }

                $scope.getDisplayName = function(key) {
                    return labels[key] || key;
                };

                $scope.addRecord = function(obj) {

                    if ($('.ng-invalid').length != 0) {
                        $('.ng-invalid').focus();
                        return ;
                    }

                    is_add = true;
                    var url = serviceUrl;

                    $http.post(url, refineObject(obj))
                        .success(function(data, status) {
                            if (status != 200) return;
                            alert("succeed.");
                            refresh();
                    });

                    $scope.obj = angular.copy(obj);
                };

                $scope.updateRecord = function(obj) {
                    if ($('.ng-invalid').length != 0) {
                        $('.ng-invalid').focus();
                        return;
                    }

                    $scope.obj = angular.copy(obj);
                    is_add = true;
                    var url = resouceIdUri( obj._id);

                    $http.put(url, refineObject(obj))
                        .success(function(_, status) {
                        if (status != 200) return;
                        alert("update succeed.");
                        refresh();
                    });
                };

                var is_add = true;
                $scope.isAdd = function() {
                    return is_add;
                };

                $scope.isUpdate = function() {
                    return !is_add;
                };

                $scope.update = function(record) {
                    $scope.obj = record;
                    is_add = false;
                };

                $scope.remove = function(record) {
                    var url = resouceIdUri( record._id);

                    $http.delete(url).success(function(data, status) {
                        if (status != 200) return;
                        refresh();
                    });

                };

                $scope.reset = function() {
                    is_add = true;
                    $scope.obj = emptyObj();
                }

                function emptyObj() {
                    var obj = {};
                    $.each(keys, function(_, k) {
                        obj[k] = '';
                    });

                    return obj;
                }

                $scope.getCellLabel = function (record, key) {
                    var v = record[key];
                    if (!v) return v;

                    if (_.isArray(v)) {
                        var l = _.map(v, function(r) {return r.name || r.ip || r.label;});
                        return l.join(', ')
                    }

                    if (!selects || selects.indexOf(key) === -1) return v;

                    return v.label || v.name ;
                }

                function bindSelect(slct) {
                    $http.get(selectResourceUri(slct))
                        .success(function(data, status) {
                            if (status != 200) {
                                return;
                            }

                            $scope[slct] = data;
                            $scope.obj[toKey(slct)] = data[0];
                    });

                }
                function initSelections() {
                    if (!selects) {
                        return;
                    }

                    _.each(selects, bindSelect);
                }

                function init() {
                    $scope.keys = keys;
                    $scope.obj = emptyObj();
                    $scope.records = records;

                    $scope.search = refresh;

                    initSelections();
                    refresh();

                    $('select.employee').select2();
                    $('select.machine').select2();
                }

                init();
            };
        };



        function makeController(ctlName, serviceName, keys, selects) {
            module.controller(ctlName,
                ['$scope', '$http', Tablet(serviceName, keys, selects)]);
        }

        makeController('DeptCtl', 'department', ['name']);
        makeController('ServiceCtl', 'service', ['name', 'department', 'env'], ['departments']);
        makeController('ModuleCtl', 'module',
            ['service', 'name', 'contacts', 'machines'],
            ['service', 'employee', 'machine']);
        makeController('EmployeeCtl', 'employee', ['name', 'position', 'email', 'phone']);
        makeController('MachineCtl', 'machine', ['ip', 'room', 'public_ip', 'serial_number', 'cabinet_number']);

        module.controller('TabCtl', ['$scope', '$route',
            function(_) {
                var routes = ['machine', 'service', 'department', 'module', 'employee'];
                if (location.pathname.indexOf('/manage.html') != -1 ) {
                    var groups = /#\/([^\.]+)/.exec(location.hash);
                    if (groups && routes.indexOf(groups[1]) > -1) {
                        return;
                    }
                    console.log(routes);
                    console.log(location.pathname);
                    console.log(location.hash);

                    location.hash='#/department';
                    location.reload();
                }
        }]);

    });
