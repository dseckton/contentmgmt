import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {

  @Input() document: Document;
  @Input() index: number;

  constructor(public documentsService: DocumentsService) { }

  ngOnInit() {
  }

  // onSelected() {
  //   this.documentsService.documentSelectedEvent.emit(this.document);
  // }
}
