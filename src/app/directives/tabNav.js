define([
  'angular'
],
function (angular) {
  'use strict';

  angular
    .module('grafana.directives')
    .directive('tabNav', function template() {
        return {
          templateUrl: 'tab-nav.html'
        };
    });

});