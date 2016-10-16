import angular from 'angular';
import uiRouter from 'angular-ui-router';
import footerComponent from './footer.component';

const footerModule = angular.module('app.layout.footer', [
  uiRouter
])

.component('appFooter', footerComponent)

.name;

export default footerModule;
