
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { Router } from "@angular/router";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  usertypes = ['Admin','Encoder','User'];
  userDetails: any;
  limaylogo = '../assets/img/logo.png';


  constructor(
    private userService: UserService, private router: Router
  ) {

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



}
