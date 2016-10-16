import ServisesModule from './servises'
import ServisesController from './servises.controller';
import ServisesComponent from './servises.component';
import ServisesTemplate from './servises.html';

describe('Servises', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ServisesModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ServisesController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(ServisesTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ServisesComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ServisesTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ServisesController);
      });
  });
});
