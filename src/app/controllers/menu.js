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

        module.controller('MenuCtrl', ['$scope', '$http', function($scope, $http) {

            $http.get('/meleors/machinetree').success(function(departments, status) {
                function parseDepartment(d) {
                    return {
                        icon: 'down'
                        , label: d.name
                        , _id: d._id
                        , children: _.map(d.services, parseService)
                    }
                }

                function parseService(d) {
                    return {
                        icon: 'down'
                        , label: d.name
                        , _id: d._id
                        , children: _.map(d.modules, parseModules)
                    }
                }

                function parseModules(d) {
                    return {
                        icon: 'down'
                        , label: d.name
                        , _id: d._id
                        , children: _.map(d.machines, parseMachines)
                    }
                }

                function parseMachines(m) {
                    return {
                        icon: 'down'
                        , label: m.ip
                        , _id: m._id
                        , isLinkDirectly: true
                    };
                }

                $scope.trees = _.map(departments, parseDepartment);
            });

            //$scope.trees = [{icon: 'down', label: 'Platform', children:[
            //    { label: 'Passport', children: [
            //        {label: '10.1.201.223', children:[]},
            //        {label: '10.1.201.224', children:[]}
            //    ]}
            //]}];


            $scope.menuClass = 'closed';

            $scope.getIconClass = function() {
                return $scope.menuClass == 'closed' ? 'right' : 'left';
            }

            $scope.getTreeIconClass = function(tree) {
                if (isLeaf(tree)) {
                    return '';
                }

                return isClosed(tree) ?
                    'icon-chevron-down':'icon-chevron-up';
            }

            function isLeaf(tree) {
                return !tree || !tree.children || !tree.children.length ;
            }

            function isClosed(tree) {
                return !tree.class || tree.class === 'closed';
            }

            $scope.clickTree = function() {
                if (this.tree.isLinkDirectly) {
                    return jumpToMachine(this.tree.label/*IP address*/);
                }

                if (this.tree.class == 'open') {
                    this.tree.class = 'closed';
                } else {
                    this.tree.class = 'open';
                }
            }

            $scope.clickIconShow = function() {
                $scope.menuClass = $scope.menuClass == 'closed' ? 'show' : 'closed';
            }

            function jumpToMachine(ip) {
                ip = ip.replace(/\./g, '-');
                location.hash = '/dashboard/file/'+ip+'.json';
            }

        }]);
    });
