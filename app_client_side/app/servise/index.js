import uiRouter from 'angular-ui-router';
import servisesComponent from './servises.component';

const servisesModule = angular.module('servises', [
  uiRouter
])

.component('servises', servisesComponent)

.name;

export default servisesModule;
