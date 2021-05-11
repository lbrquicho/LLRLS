import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Resolutions } from '../models/resolution.model';

@Injectable({
  providedIn: 'root'
})
export class ResolutionService {
  selectedUser: Resolutions = {
    _id: "",
  rDate: "",
  rTime: "",
  rClassification: "",
  rSubClassification: "",
  resolutionNo: "",
  isTagalog: false,
  isPursuantTo: false,
  pSection: "",
  pParagraph: "",
  pArticle: "",
  pChapter: "",
  pTitle: "",
  pBook: "",
  presMem!:[{
    memberName1: '',
    memberPos1:'',
  }],
  absMem!:[{
    memberName1: '',
    memberPos1:'',
  }],
  resolutionDes: "",
  approDes: "",
  rSecretary: "",
  rViceMayor: "",
  rMayor: "",
  };


  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  addResolution(resolution: Resolutions){
    return this.http.post(environment.apiBaseUrl+'/addReso',resolution);
  }

  allResolution() {
    return this.http.get(environment.apiBaseUrl + '/allResolution');
  }

  deleteResolution(resolutionsId: string) {
    return this.http.delete(environment.apiBaseUrl + `/deleteResolution/${resolutionsId}`);
  }

  updateResolution(resolutionsId: string, resolution:Resolutions) {
    return this.http.patch(environment.apiBaseUrl + `/updateResolution/${resolutionsId}`, resolution);
  }
}
