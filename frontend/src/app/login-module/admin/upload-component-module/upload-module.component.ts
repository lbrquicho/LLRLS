import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {FormControlName, NgForm, FormGroup, Validators, FormArray,FormBuilder, FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { Resolutions } from '../../../shared/models/resolution.model';
import { Ordinances } from '../../../shared/models/ordinance.model';
import { ResolutionService } from '../../../shared/services/resolution.service';
import { RevisionService } from '../../../shared/services/revision.service';
import { OrdinanceService } from '../../../shared/services/ordinance.service';
import { PdfuploadsService } from '../../../shared/services/pdfuploads.service'
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'upload-module',
  templateUrl: './upload-module.component.html',
  styleUrls: ['./upload-module.component.scss']
})
export class UploadModuleComponent implements OnInit {

  @ViewChild('pdfupload') pdfupload!: ElementRef;

  memberPosition = ['S.B Member','S.K Fed. President', 'Acting S.K Fed. President', 'Liga Ng Mga Brgy. Pres', 'ABC President', 'IPs Representative',
  'Acting Liga Ng Mga Brgy. Pres', 'Acting Municipal Vice Mayor', 'Municipal Vice Mayor', 'Municipal Mayor', 'Acting Municipal Mayor'];
  ordClass = ['Contractors and Employees','Education and National Heritage', 'Environment Protection', 'Fishing Ordinance', 'General Ordinance',
  'Health and Sanitation', 'Investment Code', 'Lot Reclassification', 'Peace and Order', 'Public Policy | Public Safety', 'Revenue Raising Ordinances', 'Subdivision Approval', 'Traffic Management']

  ordRRSubclass = ['Market Code', 'Revenue Code'];

  resoClass = ['Authorizing the Mun. Mayor', 'Health and Sanitation', 'Public Policy and Safety', 'Education and National Heritage', 'Supplemental Budget', 'Annual Budget', 'Requesting',
  'Expressing Support', 'Environment Protection', 'Fishing Ordinance', 'Human Resources', 'Financial Assistance', 'Authorized Signatory',
  'Condolence to Bereaved Family','Revenue Raising', 'Re-enactment of Budget', 'Adopting Provincial Ordinance', 'Commendation', 'Lot Donations', 'Lot Purchase',
  'Subdivision Approval', 'Administrative Cases', 'Municipal Properties', 'Waste Management', 'Extending Loans',
  'Donation of Equipment & Machinery', 'Executive Legislative Agenda', 'Senior Citizen Affairs'];

  subApp = ['PALC', 'FADP'];

  authMayor = ['MOA', 'Donation', 'Purchase', 'Open Account', 'Close Account', 'Transfer Account', 'Sale'];

  subHR = ['Creation of Positions', 'Retitling of Positions', 'Concurrence of Appointment', 'Appreciation Adoption'];

  subFinancial = ['Extending','Requesting'];

  subRequesting = ['Funding Request'];

  subBudget = ['Barangay', 'Municipal'];

  subMP = ['Boundary Dispute'];


  resolution: Resolutions;
  ordinance: Ordinances;

  lengthO: number;
  lengthR: number;

  empForm:FormGroup;
  aEmpForm:FormGroup;
  empFormOr:FormGroup;
  aEmpFormOr:FormGroup;

  showSuccessMessage!: boolean;
  serverErrorMessage!: string;
  pdfuploaded!: boolean;

  multidata: any;
  pdfSrc: any;

  constructor(
    private resolutionService: ResolutionService,
    private revisionService: RevisionService,
    private ordinanceService: OrdinanceService,
    private pdfuploadsService: PdfuploadsService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public fb:FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.lengthR = length;
    this.lengthO = length;


    this.resolution = {
      _id: '',
      rDate: '',
      rTime: '',
      resolutionNo: '',
      rClassification: '',
      rSubClassification:'',
      isTagalog: false,
      isPursuantTo: false,
      pSection: '',
      pParagraph: '',
      pArticle: '',
      pChapter: '',
      pTitle: '',
      pBook: '',
      presMem:[{
        memberName1: '',
        memberPos1:'',
      }],
      absMem:[{
        memberName1: '',
        memberPos1:'',
      }],
      resolutionDes: '',
      approDes: '',
      rSecretary: '',
      rViceMayor: '',
      rMayor: '',
     };

     this.ordinance = {
      _id: '',
      oDate: '',
      oTime: '',
      oClassification!: '',
      oSubRRClassification!: '',
      ordinanceNo: '',
      resolutionRefNo: '',
      isRevised: false,
      ordinanceRefNo: '',
      sectionNo: '',
      chapterNo: '',
      isTagalog: false,
      isPursuantTo: false,
      pSection: '',
      pParagraph: '',
      pArticle: '',
      pChapter: '',
      pTitle: '',
      pBook: '',
      presMem!:[{
        memberName1: '',
        memberPos1:'',
      }],
      absMem!:[{
        memberName1: '',
        memberPos1:'',
      }],
      resolutionDes!: '',
      ordinanceDes: '',
      approDes: '',
      oSecretary: '',
      oViceMayor: '',
      oMayor: '',
     };

     this.empForm = this.fb.group({
      employees: this.fb.array([
           ]),
        })
      this.aEmpForm = this.fb.group({
      aEmployees: this.fb.array([]) ,
          })

          this.empFormOr = this.fb.group({
            employeesOr: this.fb.array([
            ]) ,
          }),
          this.aEmpFormOr = this.fb.group({
            aEmployeesOr: this.fb.array([]) ,
          })
  }

  public newEmployee(): FormGroup {
    return this.fb.group({
       memberName: '',
        memberPos:'',
    })
  }
  newAEmployee(): FormGroup {
    return this.fb.group({
      memberName: '',
      memberPos: ''
    })
  }

  public newEmployeeOr(): FormGroup {
    return this.fb.group({
      memberName: '',
      memberPos:'',
    })
  }

  newAEmployeeOr(): FormGroup {
    return this.fb.group({
      memberName: '',
      memberPos:'',
    })
  }

employees(): FormArray {
  return this.empForm.get("employees") as FormArray
}
aEmployees(): FormArray {
  return this.aEmpForm.get("aEmployees") as FormArray
}

employeesOr(): FormArray {
  return this.empFormOr.get("employeesOr") as FormArray
}

aEmployeesOr(): FormArray {
  return this.aEmpFormOr.get("aEmployeesOr") as FormArray
}

addAEmployee() {
  this.aEmployees().push(this.newAEmployee());
}

removeAEmployee() {
  this.aEmployees().removeAt(this.aEmployees.length -1);
}

addEmployee() {
 this.employees().push(this.newEmployee());
}

removeEmployee() {
  this.employees().removeAt(this.employees.length -1);
}

addEmployeeOr() {
  console.log("Adding a employee i ordinance");
  this.employeesOr().push(this.newEmployeeOr());
}

removeEmployeeOr() {
  this.employeesOr().removeAt(this.employeesOr.length -1);
}

addAEmployeeOr() {
  console.log("Adding a absent employee");
  this.aEmployeesOr().push(this.newAEmployeeOr());
}

removeAEmployeeOr() {
  this.aEmployeesOr().removeAt(this.aEmployeesOr.length -1);
}

public options: Object = {
  toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
  'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|',
  'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|',
  'quote', 'insertHR', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
  immediateAngularModelUpdate: false
};


  ngOnInit(): void {

  }

  resetRForm(form: NgForm){
    this.resolution = {
      _id: '',
      rDate: '',
      rTime: '',
      resolutionNo: '',
      rClassification: '',
      rSubClassification:'',
      isTagalog: false,
      isPursuantTo: false,
      pSection: '',
      pParagraph: '',
      pArticle: '',
      pChapter: '',
      pTitle: '',
      pBook: '',
      presMem:[{
        memberName1: '',
        memberPos1:'',
      }],
      absMem:[{
        memberName1: '',
        memberPos1:'',
      }],
      resolutionDes: '',
      approDes: '',
      rSecretary: '',
      rViceMayor: '',
      rMayor: '',
    };
  }

  resetOForm(form: NgForm){

    this.ordinance = {
      _id: '',
      oDate: '',
      oTime: '',
      oClassification!: '',
      oSubRRClassification!: '',
      ordinanceNo: '',
      resolutionRefNo: '',
      isRevised: false,
      ordinanceRefNo: '',
      sectionNo: '',
      chapterNo: '',
      isTagalog: false,
      isPursuantTo: false,
      pSection: '',
      pParagraph: '',
      pArticle: '',
      pChapter: '',
      pTitle: '',
      pBook: '',
      presMem!:[{
        memberName1: '',
        memberPos1:'',
      }],
      absMem!:[{
        memberName1: '',
        memberPos1:'',
      }],
      resolutionDes!: '',
      ordinanceDes: '',
      approDes: '',
      oSecretary: '',
      oViceMayor: '',
      oMayor: '',
    };

  }

  clearReactiveForm(){
    this.empForm = this.fb.group({
      employees: this.fb.array([
           ]),
        })
        this.aEmpForm = this.fb.group({
          aEmployees: this.fb.array([]) ,
              })

              this.empFormOr = this.fb.group({
                employeesOr: this.fb.array([
                ]) ,
              }),
              this.aEmpFormOr = this.fb.group({
                aEmployeesOr: this.fb.array([]) ,
              })
  }


  onSubmitRForm(form: NgForm){

    console.log("test for shift"+ JSON.stringify(this.resolution.presMem ))
    if(this.resolution.rDate == ''|| this.resolution.rTime == ''|| this.resolution.rClassification == '' ||
      this.resolution.resolutionNo == ''|| this.resolution.resolutionDes == ''|| this.resolution.rSecretary == ''
      || this.resolution.rViceMayor == ''|| this.resolution.rMayor == ''){
      this.clearReactiveForm();

    }else{

      const presentValue = this.empForm.value.employees.values();
      const absentValue = this.aEmpForm.value.aEmployees.values();

      for (const value of presentValue) {
       this.resolution.presMem.push(value);
      }
      for (const valueA of absentValue) {
        this.resolution.absMem.push(valueA);
      }
    this.resolutionService.addResolution(this.resolution).subscribe(
        res => {
          this._snackBar.open(  this.resolution.resolutionNo + " Resolution Saved", "DISMISS",
              {
                duration: 2500,
                verticalPosition: 'bottom',
              });

          this.showSuccessMessage = true;
          setTimeout(() => this.showSuccessMessage = false, 4000)
          this.resetRForm(form)
          this.clearReactiveForm();
      },

        err => {
          if(err.status == 422){
            this.serverErrorMessage = err.error.join('<br>');
          } else
              this.serverErrorMessage = 'Something went wrong. Please contact Admin.';
            }
          );
        }
        this.reloadCurrentRoute();
}

onSubmitOForm(form: NgForm){

  if (this.ordinance.isRevised == false){

    if(this.ordinance.oClassification == '' || this.ordinance.oDate == ''|| this.ordinance.oTime == ''||
    this.ordinance.ordinanceNo == ''||  this.ordinance.oSecretary== ''
    || this.ordinance.oViceMayor == ''|| this.ordinance.oMayor == ''){
    this.clearReactiveForm();

     }else{
    //inserting employee data from reactive form
    const presentValue = this.empFormOr.value.employeesOr.values();
    const absentValue = this.aEmpFormOr.value.aEmployeesOr.values();

    for (const value of presentValue) {
      this.ordinance.presMem.push(value);
    }
    for (const valueA of absentValue) {
      this.ordinance.absMem.push(valueA);
    }
    this.ordinanceService.addOrdinance(this.ordinance).subscribe(
      res => {
          this._snackBar.open(  this.ordinance.ordinanceNo + " Ordinance Saved", "DISMISS",
          {
            duration: 2500,
            verticalPosition: 'bottom',
          });

        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000)
        this.resetOForm(form)
        this.clearReactiveForm();
    },
      err => {
        if(err.status == 422){
          this.serverErrorMessage = err.error.join('<br>');
        } else
            this.serverErrorMessage = 'Something went wrong. Please contact Admin.';
      }
    );
    }
  }
  else {
  if(this.ordinance.oClassification == '' || this.ordinance.oDate == ''|| this.ordinance.oTime == ''||
  this.ordinance.ordinanceNo == ''||  this.ordinance.oSecretary== ''
  || this.ordinance.oViceMayor == ''|| this.ordinance.oMayor == ''){
  this.clearReactiveForm();

}else{
    //inserting employee data from reactive form
    const presentValue = this.empFormOr.value.employeesOr.values();
    const absentValue = this.aEmpFormOr.value.aEmployeesOr.values();

    for (const value of presentValue) {
      this.ordinance.presMem.push(value);
    }
    for (const valueA of absentValue) {
      this.ordinance.absMem.push(valueA);
    }

    this.revisionService.addRevision(this.ordinance).subscribe(
      res => {
        this._snackBar.open(  this.ordinance.ordinanceNo + " Ordinance Saved", "DISMISS",
          {
            duration: 2500,
            verticalPosition: 'bottom',
          });

        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000)
        this.resetOForm(form)
        this.clearReactiveForm();
    },
      err => {
        if(err.status == 422){
          this.serverErrorMessage = err.error.join('<br>');
        } else
            this.serverErrorMessage = 'Something went wrong. Please contact Admin.';
      }
     );

    }
  }
  this.reloadCurrentRoute();
}

onSubmit() {
  console.log(this.empForm.value);
}

reloadCurrentRoute() {
  let currentUrl = this.router.url;
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate([currentUrl]);
}

onFilesSelect(event: any){

  if (event.target.files.length > 0) {
    const files = event.target.files;
    this.multidata = files;

    console.log(this.multidata);
  }

}

uploadFiles(){

  if (this.multidata != null){
    const formData = new FormData();
    for(let x of this.multidata){
      formData.append('files', x);
    }
    console.log(formData);
    this.pdfuploadsService.uploadFiles(formData).subscribe();
    this._snackBar.open("Uploaded Successfully", "DISMISS",
      {
        duration: 2500,
        verticalPosition: 'bottom',
      });
    this.pdfupload.nativeElement.value = "";
  }
  else{

  }
}

}

