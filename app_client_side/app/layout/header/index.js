import angular from 'angular';
import uiRouter from 'angular-ui-router';
import headerComponent from './header.component';

const headerModule = angular.module('app.layout.header', [
  uiRouter
])

.component('appHeader', headerComponent)

.name;

export default headerModule;
