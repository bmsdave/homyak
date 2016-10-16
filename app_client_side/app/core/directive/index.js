import Sticky from './sticky.directive';
import HeadUp from './headups.directive';

const CoreDirectives = angular.module('core.directive', [])
  .directive('sticky', Sticky)
  .directive('headUp', HeadUp)
  .name;

export default CoreDirectives;
