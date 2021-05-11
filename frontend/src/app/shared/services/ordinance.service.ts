import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Ordinances } from '../models/ordinance.model';

@Injectable({
  providedIn: 'root'
})
export class OrdinanceService {
  selectedUser: Ordinances = {
    _id: "",
    oDate: "",
    oTime: "",
    oClassification: "",
    oSubRRClassification: "",
    ordinanceNo: "",
    resolutionRefNo: "",
    isRevised: false,
    ordinanceRefNo: "",
    sectionNo: "",
    chapterNo: "",
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
  ordinanceDes: "",
  approDes: "",
  oSecretary: "",
  oViceMayor: "",
  oMayor: "",
  };


  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  addOrdinance(ordinance: Ordinances){
    return this.http.post(environment.apiBaseUrl+'/addOrdi',ordinance);
  }
  allOrdinance() {
    return this.http.get(environment.apiBaseUrl + '/allOrdinance');
  }

  deleteOrdinance(ordinancesId: string) {
    return this.http.delete(environment.apiBaseUrl + `/deleteOrdinance/${ordinancesId}`);
  }

  updateOrdinance(ordinancesId: string, ordinance:Ordinances) {
    return this.http.patch(environment.apiBaseUrl + `/updateOrdinance/${ordinancesId}`, ordinance);
  }
}
