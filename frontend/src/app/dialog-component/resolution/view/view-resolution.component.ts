import {Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EMPTY } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../shared/services/user.service';
import { PdfuploadsService } from '../../../shared/services/pdfuploads.service';


@Component({
  selector: 'app-dialog-example',
  templateUrl: './view-resolution.component.html',
  styleUrls: ['./view-resolution.component.css']
})
export class viewResolutionComponent implements OnInit {
  limaylogo = '../assets/img/logo.png'
  header = '../assets/img/header.PNG'
  pdfSrc: any;

  constructor(
    private userService: UserService,
    private pdfuploadsService: PdfuploadsService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<viewResolutionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    usertypes = ['Admin','Encoder','User'];
    userDetails: any;

    appropriation = true;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((
      res: any )=> {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);

      }
    );
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section')!.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin!.document.open();
    popupWin!.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
            .header{
              margin-top: -20px !important;
              width: 100% !important;
              }
            .divider{

                margin-top: -30px !important;
                border-top-style: solid !important;
              }

              .row:after {
                content: "";
                display: table;
                clear: both;
              }

              .printFpara{
                text-align: center;
                padding-left: 5px;
                padding-right: 5px;
              }
              .pads{
                margin-left: 13px !important;
                maargin-right: 13px !important;
              }
              .resNo{
                text-align: center;
                text-decoration: underline !important;
              }

          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin!.document.close();
}

printTagalog(): void {
  let printContents, popupWin;
  printContents = document.getElementById('print-section-tagalog')!.innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  popupWin!.document.open();
  popupWin!.document.write(`
    <html>
      <head>
        <title>Print tab</title>
        <style>
          .header{
            margin-top: -20px !important;
            width: 100% !important;
            }
          .divider{
              margin-top: -30px !important;
              border-top-style: solid !important;
            }
            .divider2{
              padding-top: -15px !important;
              border-top-style: solid !important;
            }
            .row:after {
              content: "";
              display: table;
              clear: both;
            }
            .printFpara{
              text-align: center;
              margin-left: 5px;
              margin-right: 5px;
            }
            .pads{
              margin-left: 13px !important;
              margin-right: 13px !important;
            }
            .padsTagalog{
              padding-left: 23px !important;
              padding-right: 23px !important;
            }
            .padsTagalogTable{
              padding-left: 20px !important;
            }
            .resNo{
              margin-top: 20px;
              text-align: center;
              text-decoration: underline !important;
            }

        </style>
      </head>
  <body onload="window.print();window.close()">${printContents}</body>
    </html>`
  );
  popupWin!.document.close();
}

tabClick(event: any){
  this.pdfuploadsService.getPDF("R" + this.data.resolutionNo+".pdf").subscribe(
    res => {

    },
    err => {
      if(err.status == 200){
        this.pdfSrc = err.url;
      }
    });
}

openSnackBar() {
  this._snackBar.open("PDF Deleted", "DISMISS",
  {
    duration: 2500,
    verticalPosition: 'bottom',
  });
}

deletePDF(){
  this.pdfuploadsService.deletePDF("R" + this.data.resolutionNo+".pdf").subscribe();
  this.openSnackBar();
}



}
