function headUpDirective() {
  return {
    restrict: 'A',
    controller,
    controllerAs: 'headUpCtrl',
    compile
  };
}

class controller {
  constructor($window) {
    this.name = 'headUpCtrl';
    this.scroll = {
      goingDown: false,
      delay: 300,
      sensitivity: 20,
      oldScrollY: 0,
      winHeight: undefined
    };
    this.win = $window;
  }
}
controller.$inject = ['$window'];

function compile(element, attributes) {
  return {
    pre: function (scope, element, attributes, controller, transcludeFn) {
      if (typeof controller.win !== 'object') {
        throw new Error(`$window required for controller with name="${controller.name}"`);
      }
    },
    post: function (scope, element, attributes, controller, transcludeFn) {
      angular.element(controller.win).bind("scroll", throttle(() => {
        // Scoped variables
        const opts = controller.scroll;

        const newScrollY = controller.win.pageYOffset;
        const docHeight = controller.win.document.body.scrollHeight;
        const pastDelay = newScrollY > opts.delay;
        const goingDown = newScrollY > opts.oldScrollY;
        const fastEnough = newScrollY < opts.oldScrollY - opts.sensitivity;
        const rockBottom = newScrollY < 0 || newScrollY + opts.winHeight >= docHeight;

        // Where the magic happens
        if (pastDelay && goingDown) {
          opts.goingDown = true;
          element.addClass('heads-up');
        } else if (!goingDown && fastEnough && !rockBottom || !pastDelay) {
          opts.goingDown = false;
          element.removeClass('heads-up');
        }
        opts.oldScrollY = newScrollY;
        scope.$apply();
      }, 100));


      angular.element(controller.win).bind("resize", throttle(() => {
        controller.scroll.winHeight = controller.win.innerHeight;
        return controller.scroll.winHeight;
      }));

    }
  };
}

/**
 * Throttle function (http://bit.ly/1eJxOqL)
 * it is wrapper for some function (fn)
 * @this throttle, clearTimeout, setTimeout
 * @param fn
 * @param threshhold - is delay
 * @param scope
 * @returns {function()}
 */
function throttle(fn, threshhold, scope) {
  let previous = undefined;
  let deferTimer = undefined;
  threshhold || ( threshhold = 250 );
  return () => {
    const context = scope || this;
    const current = Date.now();
    const args = arguments;
    if (previous && current < previous + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        previous = current;
        fn.apply(context, args);
      }, threshhold);
    } else {
      previous = current;
      fn.apply(context, args);
    }
  };
}

export default headUpDirective;
