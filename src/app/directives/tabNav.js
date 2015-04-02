define([
  'angular'
],
function (angular) {
  'use strict';

    function template(uri) {
        return function() {
            return {
                templateUrl: uri
            };
        }
    }

  angular
      .module('grafana.directives')
      .directive('tabNav', template('static/tab-nav.html'))
      .directive('manageRecords', template('static/manage-records.html'))
      .directive('formButtons', template('static/form-btns.html'));

});