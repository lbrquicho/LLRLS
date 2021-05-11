import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from '../shared/services/user.service';

import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-header-module',
  templateUrl: './header-module.component.html',
  styleUrls: ['./header-module.component.scss']
})
export class HeaderModuleComponent implements OnInit {
  userDetails: any;
  constructor(private userService: UserService, private router: Router) { }




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

onLogout(){
  this.userService.deleteToken();
  this.router.navigate(['/login']);
}
}
