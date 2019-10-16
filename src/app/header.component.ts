import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //property is a variable
 @Output() selectedFeatureEvent = new EventEmitter<string>();

  //pass in dependency injection anything we want to pass
  constructor() { }

  //
  ngOnInit() {
  }
 

 onSelected(selectedEvent: string) {
  this.selectedFeatureEvent.emit(selectedEvent);
 }
}
