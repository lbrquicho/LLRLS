import { analyzeAndValidateNgModules, ThisReceiver, ThrowStmt } from '@angular/compiler';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { Resolutions } from '../../../shared/models/resolution.model';
import { Ordinances } from '../../../shared/models/ordinance.model';

import { DeleteResolutionComponent } from 'src/app/dialog-component/resolution/delete/delete-resolution.component';
import { DeleteOrdinanceComponent } from 'src/app/dialog-component/ordinance/delete/delete-ordinance.component';


import { UserService } from '../../../shared/services/user.service';
import { ResolutionService } from '../../../shared/services/resolution.service';
import { RevisionService } from '../../../shared/services/revision.service';
import { OrdinanceService } from '../../../shared/services/ordinance.service';


import { viewResolutionComponent } from 'src/app/dialog-component/resolution/view/view-resolution.component';
import { viewOrdinanceComponent } from 'src/app/dialog-component/ordinance/view/view-ordinance.component';
import { EditResolutionComponent } from 'src/app/dialog-component/resolution/update/edit-resolution.component';
import { EditOrdinanceComponent } from 'src/app/dialog-component/ordinance/update/edit-ordinance.component';



@Component({
  selector: 'view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.scss']
})
export class ViewModuleComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userDetails: any;
  usertypes = ['Admin','Encoder','User'];

  searchText = '';
  searchTextord = '';
  selectedResultR: any;
  selectedResultO: any;
  resultsR = [];
  resultsO = [];
  resolutionArray: Resolutions [] = [];

  lengthR: number;
  lengthO: number;
  lengthRev: number;

  pageSizeR = 5;
  pageSizeO= 5;
  pageSizeOptionsR: number[] = [1, 2, 5, 10];
  pageSizeOptionsO: number[] = [1, 2, 5, 10];
  totalRes = [];

  public selectedRitem: any;
  public selectedOitem: any;


  constructor(
    private userService: UserService,
    private resolutionService: ResolutionService,
    private revisionService: RevisionService,
    private ordinanceService: OrdinanceService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,

  ) {
    this.lengthR = length;
    this.lengthO = length;
    this.lengthRev = length;
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


    this.resolutionService.allResolution().subscribe((
      res: any )=> {
        this.resultsR = res;
        this.lengthR = this.resultsR.length;
        this.selectedResultR = this.resultsR.slice(0, this.pageSizeR);
      },
      err => {
        console.log(err);
      }
    );

    this.ordinanceService.allOrdinance().subscribe((
      res: any )=> {
        this.resultsO = res;
        this.lengthO = this.resultsO.length;
        this.selectedResultO = this.resultsO.slice(0, this.pageSizeO);
      },
      err => {
        console.log(err);
      }
    );


  }

  refreshView(){
    this.resolutionService.allResolution().subscribe((resolutionArray: any) => {
      this.resultsR = resolutionArray;
      this.lengthR = this.resultsR.length;
      this.selectedResultR = this.resultsR.slice(0, this.pageSizeR);
    });

    this.ordinanceService.allOrdinance().subscribe((ordinanceArray: any) => {
      this.resultsO = ordinanceArray;
      this.lengthO = this.resultsO.length;
      this.selectedResultO = this.resultsO.slice(0, this.pageSizeO);
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptionsR = setPageSizeOptionsInput.split(',').map(str => +str);
    }
    if (setPageSizeOptionsInput) {
      this.pageSizeOptionsO = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  getDataR( event: PageEvent) {
    console.log(event);
    this.selectedResultR = this.resultsR
    .slice(event.pageIndex * event.pageSize,
      event.pageIndex * event.pageSize + event.pageSize);
    return event;
  }

  getDataO( event: PageEvent) {
    console.log(event);
    this.selectedResultO = this.resultsO
    .slice(event.pageIndex * event.pageSize,
       event.pageIndex * event.pageSize + event.pageSize);

    return event;
  }
  openEditReso(){
    const dialogRef = this.dialog.open(EditResolutionComponent, {
      width: '90%',
      height: '95%',
      data: { _id: this.selectedRitem._id, rDate: this.selectedRitem.rDate, rTime: this.selectedRitem.rTime,
        rClassification: this.selectedRitem.rClassification, rSubClassification: this.selectedRitem.rSubClassification,
        resolutionNo: this.selectedRitem.resolutionNo, isTagalog: this.selectedRitem.isTagalog, isPursuantTo: this.selectedRitem.isPursuantTo,
        pSection: this.selectedRitem.pSection, pParagraph: this.selectedRitem.pParagraph, pArticle: this.selectedRitem.pArticle,
        pChapter: this.selectedRitem.pChapter, pTitle: this.selectedRitem.pTitle, pBook: this.selectedRitem.pBook, presMem: this.selectedRitem.presMem,
        absMem: this.selectedRitem.absMem, resolutionDes: this.selectedRitem.resolutionDes, approDes: this.selectedRitem.approDes,
        rSecretary: this.selectedRitem.rSecretary, rViceMayor:  this.selectedRitem.rViceMayor, rMayor: this.selectedRitem.rMayor}
    }).afterClosed().subscribe(() => this.refreshView());
    this.paginator.pageIndex = 0;
  }

  openEditOrdi(){
    const dialogRef = this.dialog.open(EditOrdinanceComponent, {
      width: '90%',
      height: '95%',
      data: {_id: this.selectedOitem._id, ordRRSubclass: this.selectedOitem.ordRRSubclass, oSubRRClassification: this.selectedOitem.oSubRRClassification, oDate: this.selectedOitem.oDate, oTime: this.selectedOitem.oTime,
        oClassification: this.selectedOitem.oClassification, ordinanceNo: this.selectedOitem.ordinanceNo,
        resolutionRefNo: this.selectedOitem.resolutionRefNo, isRevised: this.selectedOitem.isRevised,
        ordinanceRefNo: this.selectedOitem.ordinanceRefNo, sectionNo: this.selectedOitem.sectionNo, chapterNo: this.selectedOitem.chapterNo,
        isTagalog: this.selectedOitem.isTagalog, isPursuantTo: this.selectedOitem.isPursuantTo, pSection: this.selectedOitem.pSection,
        pParagraph: this.selectedOitem.pParagraph, pArticle: this.selectedOitem.pArticle, pChapter: this.selectedOitem.pChapter,
        pTitle: this.selectedOitem.pTitle, pBook: this.selectedOitem.pBook, presMem: this.selectedOitem.presMem,
        absMem: this.selectedOitem.absMem, resolutionDes: this.selectedOitem.resolutionDes, ordinanceDes: this.selectedOitem.ordinanceDes,
        approDes: this.selectedOitem.approDes, oSecretary: this.selectedOitem.oSecretary, oViceMayor:  this.selectedOitem.oViceMayor,
        oMayor: this.selectedOitem.oMayor}
    }).afterClosed().subscribe(() => this.refreshView());
    this.paginator.pageIndex = 0;
  }

  opendialogR(){
    const dialogRef = this.dialog.open(viewResolutionComponent, {
      width: '90%',
      height: '95%',
      data: {_id: this.selectedRitem._id, rDate: this.selectedRitem.rDate, rTime: this.selectedRitem.rTime,
        rClassification: this.selectedRitem.rClassification, rSubClassification: this.selectedRitem.rSubClassification,
        resolutionNo: this.selectedRitem.resolutionNo, isTagalog: this.selectedRitem.isTagalog, isPursuantTo: this.selectedRitem.isPursuantTo,
        pSection: this.selectedRitem.pSection, pParagraph: this.selectedRitem.pParagraph, pArticle: this.selectedRitem.pArticle,
        pChapter: this.selectedRitem.pChapter, pTitle: this.selectedRitem.pTitle, pBook: this.selectedRitem.pBook, presMem: this.selectedRitem.presMem,
        absMem: this.selectedRitem.absMem, resolutionDes: this.selectedRitem.resolutionDes, approDes: this.selectedRitem.approDes,
        rSecretary: this.selectedRitem.rSecretary, rViceMayor:  this.selectedRitem.rViceMayor, rMayor: this.selectedRitem.rMayor}
    });
  }

  opendialogO(){
    const dialogRef = this.dialog.open(viewOrdinanceComponent, {
      width: '90%',
      height: '95%',
      data: {_id: this.selectedOitem._id, oSubRRClassification:this.selectedOitem.oSubRRClassification, oDate: this.selectedOitem.oDate, oTime: this.selectedOitem.oTime,
        oClassification: this.selectedOitem.oClassification, ordinanceNo: this.selectedOitem.ordinanceNo,
        resolutionRefNo: this.selectedOitem.resolutionRefNo, isRevised: this.selectedOitem.isRevised,
        ordinanceRefNo: this.selectedOitem.ordinanceRefNo, sectionNo: this.selectedOitem.sectionNo, chapterNo: this.selectedOitem.chapterNo,
        isTagalog: this.selectedOitem.isTagalog, isPursuantTo: this.selectedOitem.isPursuantTo, pSection: this.selectedOitem.pSection,
        pParagraph: this.selectedOitem.pParagraph, pArticle: this.selectedOitem.pArticle, pChapter: this.selectedOitem.pChapter,
        pTitle: this.selectedOitem.pTitle, pBook: this.selectedOitem.pBook, presMem: this.selectedOitem.presMem,
        absMem: this.selectedOitem.absMem, resolutionDes: this.selectedOitem.resolutionDes, ordinanceDes: this.selectedOitem.ordinanceDes,
        approDes: this.selectedOitem.approDes, oSecretary: this.selectedOitem.oSecretary, oViceMayor:  this.selectedOitem.oViceMayor,
        oMayor: this.selectedOitem.oMayor}
    });
  }

  opendialogDeleteR(){
    const dialogRef = this.dialog.open(DeleteResolutionComponent, {
      width: 'auto',
      height: 'auto',
      data: {dselectedRitem: this.selectedRitem, resolutionNo: this.selectedRitem.resolutionNo,}
    }).afterClosed().subscribe(() => this.refreshView());
    this.paginator.pageIndex = 0;
  }

  opendialogDeleteO(){
    const dialogRef = this.dialog.open(DeleteOrdinanceComponent, {
      width: 'auto',
      height: 'auto',
      data: {dselectedOitem: this.selectedOitem, ordinanceNo: this.selectedOitem.ordinanceNo,}
    }).afterClosed().subscribe(() => this.refreshView());
    this.paginator.pageIndex = 0;
  }

  deleteReso(){
    this.opendialogDeleteR();
  }

  deleteOrd(){
    this.opendialogDeleteO();
  }

  editReso(){
    this.openEditReso();
  }

  editOrdi(){
    this.openEditOrdi();
  }

  viewMoreR(){
    this.opendialogR();
  }

  viewMoreO(){
    this.opendialogO();
  }

}
