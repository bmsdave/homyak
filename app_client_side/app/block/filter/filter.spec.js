import FilterModule from './filter';
import FilterController from './filter.controller';
import FilterComponent from './filter.component';
import FilterTemplate from './filter.html';

describe('Filter', () => {
  let $rootScope
  let makeController;

  beforeEach(window.module(FilterModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new FilterController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      const controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(FilterTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      const component = FilterComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(FilterTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(FilterController);
      });
  });
});
