import { Component, Inject, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControlName, FormGroup, FormArray, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {

  @ViewChild('dialogForm') dialogForm: any;

  usertypes = ['Admin','Encoder','User'];
  departments = ['SB', 'MIS', 'HR'];

  showErrorMessage1 = false;
  showErrorMessage2 = false;

  passwordholder = this.data.password;

  constructor(public dialogRef: MatDialogRef<AccountManagementComponent>,
              private fb: FormBuilder, private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              @Inject(MAT_DIALOG_DATA)
              public data: any) { }

  ngOnInit(): void {
  }

  updateForm(form: NgForm){

    if (this.data.password == ""){
      this.showErrorMessage1 = true;
      this.showErrorMessage2 = false;
      console.log("failed");
    }
    else if (this.data.password.length < 4){
      this.showErrorMessage1 = false;
      this.showErrorMessage2 = true;
      console.log("failed");
    }
    else{
      console.log("success");

      this.showErrorMessage1 = false;
      this.showErrorMessage2 = false;

      if (this.data.password != this.passwordholder){
        console.log("changed");
        this.userService.updateUserProfile(this.data._id, this.data).subscribe();
        this.dialogRef.close();
      }
      else{
        console.log("unchanged");
        //console.log(JSON.stringify(this.data));
        this.userService.updateUserProfileWithoutPassword(this.data._id, this.data).subscribe();
        this.dialogRef.close();
      }


    }

  }

  deleteForm(){
    this.userService.deleteUser(this.data._id).subscribe();
    this.dialogRef.close();

  }

}
