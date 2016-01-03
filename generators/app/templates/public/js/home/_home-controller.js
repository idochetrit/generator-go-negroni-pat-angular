'use strict';
var app = angular.module('<%= baseName %>');
app.controller('HomeController', [function () {
  var self = this;
  self.sampleVariable = 'Stam';
}]);
