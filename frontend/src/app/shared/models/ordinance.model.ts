export class Ordinances {
  _id!: string;
  oDate!: string;
  oTime!: string;
  oClassification!: string;
  oSubRRClassification!: string;
  ordinanceNo!: string;
  resolutionRefNo!: string;
  isRevised!: boolean;
  ordinanceRefNo!: string;
  sectionNo!: string;
  chapterNo!: string;
  isTagalog!: boolean;
  isPursuantTo!: boolean;
  pSection!: string;
  pParagraph!: string;
  pArticle!: string;
  pChapter!: string;
  pTitle!: string;
  pBook!: string;
  presMem!:[{
    memberName1: '',
    memberPos1:'',
  }];
  absMem!:[{
    memberName1: '',
    memberPos1:'',
  }];
  resolutionDes!: string;
  ordinanceDes!: string;
  approDes!: string;
  oSecretary!: string;
  oViceMayor!: string;
  oMayor!: string;
}
