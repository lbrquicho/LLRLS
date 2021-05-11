import {Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


import { ResolutionService } from '../../../shared/services/resolution.service';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './delete-resolution.component.html',
  styleUrls: ['./delete-resolution.component.css']
})
export class DeleteResolutionComponent implements OnInit {

  deletelogo = '../assets/img/delete.png'
  memberPosition = ['S.B Member','S.B Member1'];

  constructor(
    public dialogRef: MatDialogRef<DeleteResolutionComponent>,
    private ResolutionService: ResolutionService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    ngOnInit(): void{

    }

    openSnackBar() {
      this._snackBar.open(  this.data.resolutionNo + " Resolution Deleted", "DISMISS",
      {
        duration: 2500,
        verticalPosition: 'bottom',
      });
    }

  onNoClick() {
    this.dialogRef.close();
  }

  deleteRes() {
    this.openSnackBar();
    this.ResolutionService.deleteResolution(this.data.dselectedRitem._id).subscribe();
    this.dialogRef.close();
  }



}
