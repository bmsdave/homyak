import './core/utils/swissKnife';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Core from './core';
import appComponent from './app.component';
import appLayout from './layout';
import appComponents from './component';

const appModule = angular.module('app', [
  uiRouter,
  Core,
  appLayout,
  appComponents
])

  .config(($locationProvider) => {
    //noinspection BadExpressionStatementJS
    'ngInject';

    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('');
  })

  .component('app', appComponent)

  .name;

export default appModule;
