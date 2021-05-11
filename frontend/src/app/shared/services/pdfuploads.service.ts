import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PdfuploadsService {

  constructor(private http: HttpClient) {
  }

  uploadFiles(files: FormData) {
    return this.http.post(environment.apiBaseUrl+'/uploadFiles', files)
  }

  getPDF(filename: String) {
    return this.http.get(environment.apiBaseUrl+`/getPDF/${filename}`);
  }

  deletePDF(filename: String){
    return this.http.delete(environment.apiBaseUrl+`/deletePDF/${filename}`);
  }

}
