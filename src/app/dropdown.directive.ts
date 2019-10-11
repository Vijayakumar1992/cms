import { Directive, HostBinding, HostListener } from '@angular/core';

//we use @directive Decarator and we add this in the header 
@Directive({
  selector: '[cmsDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}
