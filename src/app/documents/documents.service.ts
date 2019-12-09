import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentChangedEvent = new Subject<Document[]>();

  private documents: Document[] = [];

  constructor(private http: HttpClient) { }

  sortAndSend() {
    this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    this.documentChangedEvent.next(this.documents.slice());
  }

  getDocuments() {
    this.http.get<{ message: string, documents: Document[] }>('http://localhost:3000/documents')
      .subscribe(
        (documentData) => {
          this.documents = documentData.documents;
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  //getting the list of documents and a single document respectively. 
  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }  

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    //make sure id of the new document is empty
    document.id = '';

    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const strDocument = JSON.stringify(document);


    //add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents', strDocument, { headers: headers })
      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);
          this.sortAndSend();
        }),
        (error: any) => {
          console.log(error);
        };
  }



  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    //set the if of the new document to the id of the old document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});    

    this.http.put('http://localhost:3000/documents/' + originalDocument.id, newDocument, { headers: headers })
   .subscribe(
    (response: Document) => {
      this.documents[pos] = newDocument;
      this.sortAndSend();
    }),
    (error: any) => {
      console.log(error);
    };
  }
}
