class SidebarController {
  constructor() {
    this.name = 'sidebar';
    this.hide = false;
    this.toggle = toggle;
    function toggle() {
      this.hide = !this.hide; //eslint-disable-line no-invalid-this
    }
  }
}

export default SidebarController;
