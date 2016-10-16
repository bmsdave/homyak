import Stickyfill from 'stickyfill';

function stickyfillDirective() {

  const stickyfill = Stickyfill();

  return  {
    link,
    restrict: 'A'
  };

  function link(scope, element) {
    if (typeof stickyfill !== 'object') {
      throw new Error('stickyfill.js not loaded');
    }

    stickyfill.add(element[0]);

    scope.$on('$destroy', () => {
      stickyfill.remove(element[0]);
    });
  }
}

export default stickyfillDirective;
