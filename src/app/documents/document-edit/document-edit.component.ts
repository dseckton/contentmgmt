import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from "../document.model";

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  subscription: Subscription;
  document: Document;
  editMode = false;
  documentForm: FormGroup;

  constructor(private documentsService: DocumentsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let id = params.id;

      if (params.id === null || !params.id) {
        this.editMode = false;
        return;
      }

      this.originalDocument = this.documentsService.getDocument(id);

      if (!this.originalDocument || this.originalDocument === null) {
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    })
  }

  onSubmit(form: NgForm) {
    let values = form.value;
    let newDocument = new Document(values.id, values.name, values.description, values.url, values.children);

    if (this.editMode) {
      this.documentsService.updateDocument(this.originalDocument, newDocument)
    } else {
      this.documentsService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

}
