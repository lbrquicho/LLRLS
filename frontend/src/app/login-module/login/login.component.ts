import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  limaylogo = '../assets/img/logo.png';


  constructor(private userService: UserService,private router : Router
  ) {

  }

  userDetails: any;
  model= {
    email:'',
    password:''
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages!: string;

  ngOnInit() {
    this.userService.allUserProfile().subscribe((
      res: any )=> {
        this.userDetails = res['user'];
        this.userDetails = res;
      },
      err => {
        console.log(err);
      }
    );

 if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/userprofile');

     }


  onSubmit(form : NgForm){

    this.userService.login(form.value).subscribe((
      res: any)=> {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }





}
