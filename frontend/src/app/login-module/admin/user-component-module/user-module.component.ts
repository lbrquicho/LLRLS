import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';
import { Router } from "@angular/router";

import { AccountManagementComponent } from '../../../dialog-component/account-management/account-management.component';




@Component({
  selector: 'user-header-module',
  templateUrl: './user-module.component.html',
  styleUrls: ['./user-module.component.scss']
})
export class UserModuleComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userDetails: any;
  user: User;

  public selectedUser: any;

  usertypes = ['Admin','Encoder','User'];
  departments = ['SB', 'MIS', 'HR'];
  displayedColumns: string[] = ['usertype', 'firstname','middlename',
  'lastname','department','position', 'email'];

  dataSource: any;


  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage!: boolean;
  serverErrorMessages!: string;

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) {
    this.user = new User;

  }

  ngOnInit() {
     this.userService.allUserProfile().subscribe((
      res: any )=> {
        this.userDetails = res['user'];

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      },
      err => {
        console.log(err);

      }

    );


    this.userService.getUserProfile().subscribe((
      res: any )=> {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);

      }
    );
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
        this.refreshForm();
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      usertype: '',
      firstname : '',
      middlename : '',
      lastname : '',
      department: '',
      position: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

  refreshForm(){
    this.userService.allUserProfile().subscribe((guser: any) => {
      this.dataSource = new MatTableDataSource(guser);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(){
    const dialogRef = this.dialog.open(AccountManagementComponent, {
      width: '40%',
      height: '90%',
      data: {_id: this.selectedUser._id, usertype: this.selectedUser.usertype, firstname: this.selectedUser.firstname,
        middlename: this.selectedUser.middlename, lastname: this.selectedUser.lastname,
        department: this.selectedUser.department, position: this.selectedUser.position,
        password: this.selectedUser.password, email: this.selectedUser.email}
    }).afterClosed().subscribe(() => this.refreshForm());
  }

  RowSelected(guser: any){
    this.selectedUser = guser;
    this.openDialog();
  }

  HighlightRow(guser: any){
    this.selectedUser = guser._id;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
