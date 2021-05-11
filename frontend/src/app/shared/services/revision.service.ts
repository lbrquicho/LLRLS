import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Ordinances } from '../models/ordinance.model';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {
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

  addRevision(ordinance: Ordinances){
    return this.http.post(environment.apiBaseUrl+'/addRevi',ordinance);
  }
}
