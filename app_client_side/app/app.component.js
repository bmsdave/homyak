import template from './app.html';
import controller from './app.controller';
import './app.sass';

const appComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default appComponent;
