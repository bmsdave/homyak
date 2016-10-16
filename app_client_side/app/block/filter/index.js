import angular from 'angular';
import uiRouter from 'angular-ui-router';
import filterComponent from './filter.component';

const filterModule = angular.module('filter', [
  uiRouter
])

.component('filter', filterComponent)

.name;

export default filterModule;
