import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[];
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;


  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();

  }

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

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentChangedEvent.next(this.documents.slice());
  }

  getMaxId(): number {
    let maxId = 0;
    let currentId = 0;

    for (let document of this.documents) {
      currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
      return maxId;
    }
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    const documentListClone = this.documents.slice();
    this.documentChangedEvent.next(documentListClone)
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument)
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentChangedEvent.next(documentsListClone);    
  }

}
