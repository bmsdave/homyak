import angular from 'angular';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';

const layoutModule = angular.module('app.layout', [
  Header,
  Sidebar,
  Footer
])

.name;

export default layoutModule;
