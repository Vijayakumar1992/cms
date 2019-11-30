import { Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    this.http.get('https://davidcms-project.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documents.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
          this.documentChangedEvent.next(this.documents.slice());
        }, (error: any) => {
          console.log('something bad happened...');
        }
      );
  }

  //getting the list of documents and a single document respectively. 
  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
      return null;
    }
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

    for (let document of this.documents) {
      const currentId = parseInt(document.id, 15);
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

  storeDocments() {
    this.documents = JSON.parse(JSON.stringify(this.documents));
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put('http://localhost:3000/documents', this.documents, { headers: header})
      .subscribe(
        (documents: Document[]) => {
          this.documentChangedEvent.next(this.documents.slice());
        }
      );
  }

}
