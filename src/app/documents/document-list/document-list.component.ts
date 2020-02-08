import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model'
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = [
  //   new Document('1', 'Memes', 'A bunch of memes', 'google.com', null), 
  //   new Document('2', 'Memes', 'A bunch of memes', 'google.com', null), 
  //   new Document('3', 'Memes', 'A bunch of memes', 'google.com', null), 
  //   new Document('4', 'Memes', 'A bunch of memes', 'google.com', null)
  ];

  // @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }

}
