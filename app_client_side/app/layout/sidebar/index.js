import angular from 'angular';
import uiRouter from 'angular-ui-router';
import sidebarComponent from './sidebar.component';

const sidebarModule = angular.module('sidebar', [
  uiRouter
])

.component('appSidebar', sidebarComponent)

.name;

export default sidebarModule;
