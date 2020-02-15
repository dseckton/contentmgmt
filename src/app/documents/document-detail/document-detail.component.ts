import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  id: string;
  nativeWindow: any;

  document: Document;

  constructor(private documentsService: DocumentsService, private router: Router, private activatedRoute: ActivatedRoute, private windRefService: WindRefService) {
    this.nativeWindow = windRefService.getNativeWindow();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {this.id = params['id'];
    this.document = this.documentsService.getDocument(this.id);});
    

  }

  onEditDocument() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentsService.deleteDocument(this.document);
    this.router.navigate(['/documents'], {relativeTo: this.activatedRoute});
  }

}
