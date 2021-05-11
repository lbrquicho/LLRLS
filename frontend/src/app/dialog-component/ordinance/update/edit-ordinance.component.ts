import {Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { FormBuilder, FormControlName, FormGroup, FormArray, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Ordinances } from '../../../shared/models/ordinance.model';
//import { Members } from 'src/app/models/members';
import { OrdinanceService } from '../../../shared/services/ordinance.service';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './edit-ordinance.component.html',
  styleUrls: ['./edit-ordinance.component.css']
})
export class EditOrdinanceComponent implements OnInit {

  memberPosition = ['S.B Member','S.K Fed. President', 'Acting S.K Fed. President', 'Liga Ng Mga Brgy. Pres', 'ABC President', 'IPs Representative',
  'Acting Liga Ng Mga Brgy. Pres', 'Acting Municipal Vice Mayor', 'Municipal Vice Mayor', 'Municipal Mayor', 'Acting Municipal Mayor'];

  ordClass = ['Contractors and Employees','Education and National Heritage', 'Environment Protection', 'Fishing Ordinance', 'General Ordinance',
  'Health and Sanitation', 'Investment Code', 'Lot Reclassification', 'Peace and Order', 'Public Policy | Public Safety', 'Revenue Raising Ordinances', 'Subdivision Approval', 'Traffic Management']
  ordRRSubclass = ['Market Code', 'Revenue Code']


  revisionInput=true;
  appropriation = true;
  constructor(
    public dialogRef: MatDialogRef<EditOrdinanceComponent>,
    private OrdinanceService: OrdinanceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    ngOnInit(): void{

    }

  onNoClick() {
    this.dialogRef.close();
  }

  updateOrdForm(form: NgForm){
    console.log("sample" +JSON.stringify(this.data));

    this.OrdinanceService.updateOrdinance(this.data._id, this.data).subscribe();
    this.dialogRef.close();
  }

  toggle(){
    this.revisionInput=!this.revisionInput;

  }

  public options: Object = {
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
    'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|',
    'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|',
    'quote', 'insertHR', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
    immediateAngularModelUpdate: false
  };


}
