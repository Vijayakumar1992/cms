import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[];
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  //functions are responsible
  //getting the list of documents and a single document respectively. 
  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id)
        return document;
    }
    return null;
  }

  getDocuments(): Document[] {
    return this.documents.slice();

  }

}
