import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'CIT 260 - Object Oriented Programing', ' Test1', ' https://content.byui.edu/fileb7c3e5ed-6947-497f-9d32-4e5b397cac/1/CIT 260 course description.pdf', null),
    new Document('2', 'CIT 425 - Data Warehouse', ' Test2', ' https://content.byui.edu/fileb7c3e5ed-6947-497f-9d32-4e5b397cac/1/CIT 425 course description.pdf', null),
    new Document('3', 'CIT 366 - Full Web Stack Development', ' Test3', ' https://content.byui.edu/fileb7c3e5ed-6947-497f-9d32-4e5b397cac/1/CIT 366 course description.pdf', null),
    new Document('4', 'CIT 460 - Enterprise Development', ' Test4',  ' https://content.byui.edu/fileb7c3e5ed-6947-497f-9d32-4e5b397cac/1/CIT 460 course description.pdf', null),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }


  constructor() { }

  ngOnInit() {
  }



}
