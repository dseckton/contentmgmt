import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];
  maxDocumentId: number;
  FBUrl = "https://cms-project-28f1e.firebaseio.com/documents.json"

  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    // this.documents = this.getDocuments();
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): any {
    this.http.get<Document[]>(this.FBUrl).subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        documents.sort((a: Document, b: Document) => parseInt(a.id) - parseInt(b.id));
        this.documentListChangedEvent.next(documents.slice());
      },
      (error: any) => {
        console.log(error);
      })
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  addDocument(newDocument: Document) {
    if (!newDocument || newDocument === null) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.storeDocuments();
  }

  storeDocuments() {
    let documentsList = JSON.stringify(this.documents);
    this.http.put(this.FBUrl, documentsList, {headers: new HttpHeaders({'type': 'application/json'})}).subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice())
    })
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if ((!originalDocument || originalDocument === null) || (!newDocument || newDocument === null)) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.storeDocuments();
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
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
