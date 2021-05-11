import {Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { FormBuilder, FormControlName, FormGroup, FormArray, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { ResolutionService } from '../../../shared/services/resolution.service';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './edit-resolution.component.html',
  styleUrls: ['./edit-resolution.component.css']
})
export class EditResolutionComponent implements OnInit {

  resoClass = ['Authorizing the Mun. Mayor', 'Health and Sanitation', 'Public Policy and Safety', 'Education and National Heritage', 'Supplemental Budget', 'Annual Budget', 'Requesting',
  'Expressing Support', 'Environment Protection', 'Fishing Ordinance', 'Human Resources', 'Financial Assistance', 'Authorized Signatory',
  'Condolence to Bereaved Family','Revenue Raising', 'Re-enactment of Budget', 'Adopting Provincial Ordinance', 'Commendation', 'Lot Donations', 'Lot Purchase',
  'Subdivision Approval', 'Administrative Cases', 'Municipal Properties', 'Waste Management', 'Extending Loans',
  'Donation of Equipment & Machinery', 'Executive Legislative Agenda', 'Senior Citizen Affairs'];

  authMayor = ['MOA', 'Donation', 'Purchase', 'Open Account', 'Close Account', 'Transfer Account', 'Sale'];

  subApp = ['PALC', 'FADP'];

  memberPosition = ['S.B Member','S.K Fed. President', 'Acting S.K Fed. President', 'Liga Ng Mga Brgy. Pres', 'ABC President', 'IPs Representative',
  'Acting Liga Ng Mga Brgy. Pres', 'Acting Municipal Vice Mayor', 'Municipal Vice Mayor', 'Municipal Mayor', 'Acting Municipal Mayor'];

  subHR = ['Creation of Positions', 'Retitling of Positions', 'Concurrence of Appointment', 'Appreciation Adoption'];

  subFinancial = ['Extending','Requesting'];

  subRequesting = ['Funding Request'];

  subBudget = ['Barangay', 'Municipal'];

  subMP = ['Boundary Dispute'];

  constructor(
    public dialogRef: MatDialogRef<EditResolutionComponent>,
    private ResolutionService: ResolutionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    ngOnInit(): void{

    }

  onNoClick() {
    this.dialogRef.close();
  }

  updateResForm(form: NgForm){
    if(this.data.rClassification == 'Authorizing the Mun. Mayor' || this.data.rClassification == 'Subdivision Approval' || this.data.rClassification == 'Financial Assistance' || this.data.rClassification == 'Human Resources'
    || this.data.rClassification == 'Supplemental Budget' || this.data.rClassification == 'Annual Budget' || this.data.rClassification == 'Requesting' || this.data.rClassification == 'Municipal Properties'){
      this.ResolutionService.updateResolution(this.data._id, this.data).subscribe();
      this.dialogRef.close();
    }else
      this.data.rSubClassification = '';
      this.ResolutionService.updateResolution(this.data._id, this.data).subscribe();
      this.dialogRef.close();
  }

  toggle(){
    this.data.revisionInput=!this.data.revisionInput;
  }

  public options: Object = {
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
    'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|',
    'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|',
    'quote', 'insertHR', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
    immediateAngularModelUpdate: false
  };


}
