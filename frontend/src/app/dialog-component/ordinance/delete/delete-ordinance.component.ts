import {Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


//import { Members } from 'src/app/models/members';
import { OrdinanceService } from '../../../shared/services/ordinance.service';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './delete-ordinance.component.html',
  styleUrls: ['./delete-ordinance.component.css']
})
export class DeleteOrdinanceComponent implements OnInit {

  deletelogo = '../assets/img/delete.png'
  memberPosition = ['S.B Member','S.B Member1'];

  constructor(
    public dialogRef: MatDialogRef<DeleteOrdinanceComponent>,
    private OrdinanceService: OrdinanceService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    ngOnInit(): void{

    }

    openSnackBar() {
      this._snackBar.open(  this.data.ordinanceNo + " Ordinance Deleted", "DISMISS",
      {
        duration: 2500,
        verticalPosition: 'bottom',
      });
    }

  onNoClick() {
    this.dialogRef.close();
  }

  deleteOr() {
    this.openSnackBar();
    this.OrdinanceService.deleteOrdinance(this.data.dselectedOitem._id).subscribe();
    this.dialogRef.close();
  }



}
