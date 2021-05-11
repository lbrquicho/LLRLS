export class Resolutions {
  _id!: string;
  rDate!: string;
  rTime!: string;
  rClassification!: string;
  rSubClassification!: string;
  resolutionNo!: string;
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
  }]
  resolutionDes!: string;
  approDes!: string;
  rSecretary!: string;
  rViceMayor!: string;
  rMayor!: string;
}
