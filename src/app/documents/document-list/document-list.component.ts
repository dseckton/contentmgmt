import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model'
import { DocumentsService } from '../documents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Document[] = [];
  subscription: Subscription;

  // @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    // this.documentService.documentChangedEvent.subscribe((documents)=>{this.documents = documents});
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documentsList) => {this.documents = documentsList});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
